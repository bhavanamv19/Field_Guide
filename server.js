const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.PORT || 4173);
const root = __dirname;
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(value));
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&rsquo;|&lsquo;|&apos;/g, "'")
    .replace(/&rdquo;|&ldquo;/g, '"')
    .replace(/&ndash;|&mdash;/g, "-")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16)),
    );
}

function cleanText(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractResults(html, app) {
  const entries = [...html.matchAll(
    /<div class="dd algo algo-sr[\s\S]*?(?=<div class="dd algo algo-sr|<\/ol>)/g,
  )];
  const results = [];
  const submittedHost = app.domain?.replace(/^www\./, "").toLowerCase();
  const appName = (submittedHost || app.label).toLowerCase().split(".")[0].replace(/[^a-z\d-]/g, "");

  for (const entry of entries) {
    if (results.length >= 6) break;
    const anchor = /<a[^>]*href="([^"]+)"[^>]*>[\s\S]*?<h3[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/i.exec(entry[0]);
    const snippetMatch = /<div class="compText[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i.exec(entry[0]);
    if (!anchor) continue;

    const rawHref = decodeEntities(anchor[1]);
    let url;
    try {
      url = new URL(rawHref.startsWith("//") ? `https:${rawHref}` : rawHref);
      if (url.hostname.endsWith("search.yahoo.com")) {
        const target = url.pathname.match(/\/RU=([^/]+)/);
        if (!target) continue;
        url = new URL(decodeURIComponent(target[1]));
      }
    } catch {
      continue;
    }

    if (!["http:", "https:"].includes(url.protocol)) continue;
    const title = cleanText(anchor[2]);
    const snippet = cleanText(snippetMatch?.[1] || "");
    if (!title || !url.hostname) continue;

    const sourceHost = url.hostname.replace(/^www\./, "").toLowerCase();
    const domainMatch = submittedHost && (sourceHost === submittedHost || sourceHost.endsWith(`.${submittedHost}`));
    const nameMatch = sourceHost.split(".")[0] === appName;
    results.push({
      title,
      url: url.href,
      domain: sourceHost,
      snippet: snippet || "No search excerpt available; open the source to verify details.",
      matchType: domainMatch ? "submitted_domain" : nameMatch ? "app_name_match" : "independent_source",
    });
  }
  return results.sort((left, right) => {
    const rank = { submitted_domain: 0, app_name_match: 1, independent_source: 2 };
    return rank[left.matchType] - rank[right.matchType];
  });
}

function parseAppInput(value) {
  const input = value.trim().slice(0, 180);
  if (!input) throw new Error("Enter an app name or website.");

  if (/^[a-z][a-z\d+.-]*:\/\//i.test(input) || /^[\w-]+\.[a-z]{2,}/i.test(input)) {
    let parsed;
    try {
      parsed = new URL(input.includes("://") ? input : `https://${input}`);
    } catch {
      throw new Error("That website address does not look valid.");
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Use an http or https website address.");
    }
    return { label: parsed.hostname.replace(/^www\./, ""), domain: parsed.hostname };
  }

  return { label: input, domain: null };
}

const researchTopics = [
  {
    id: "connection",
    title: "OAuth flow & connection model",
    query: "OAuth authorization flow user app installation",
    next: "Confirm whether the provider uses user authorization, workspace installation, or another OAuth flow before designing the connection.",
  },
  {
    id: "registration",
    title: "App registration & redirect setup",
    query: "create OAuth app developer redirect URI client ID secret",
    next: "Locate the provider's app registration page and confirm redirect URL rules, required account access, and where credentials are issued.",
    estimate: "Planning baseline: allow 1–3 hours for portal setup and a successful test; this is not provider-specific and excludes integration coding.",
  },
  {
    id: "permissions",
    title: "Scopes & access requirements",
    query: "OAuth API scopes permissions least privilege",
    next: "List the minimum scopes needed for the first feature and check whether each scope changes verification or user-consent requirements.",
  },
  {
    id: "review",
    title: "Verification, review & distribution",
    query: "OAuth app verification approval review distribution marketplace",
    next: "Check whether review is required for your distribution plan and scopes; ask the provider for a current queue estimate before setting a launch date.",
    estimate: "No review duration is assumed. Treat approval need and waiting time as unknown until confirmed in current provider documentation.",
  },
  {
    id: "testing",
    title: "Testing, security & launch",
    query: "OAuth callback testing token security production checklist",
    next: "Test consent, callback handling, denied access, and token storage in a separate workspace/account before onboarding users.",
  },
];

async function searchTopic(topic, app) {
  const domainName = app.domain?.replace(/^www\./, "").split(".")[0];
  const appName = domainName || app.label;
  const queries = [
    `"${appName}" ${topic.query} developer docs`,
    `${appName} ${topic.query} OAuth`,
  ];

  for (const query of queries) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    try {
      const response = await fetch(`https://search.yahoo.com/search?p=${encodeURIComponent(query)}`, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; OAuthFieldguide/1.0)",
          "Accept-Language": "en-US,en;q=0.8",
        },
      });
      if (!response.ok) throw new Error(`Search provider returned HTTP ${response.status}.`);
      const sources = extractResults(await response.text(), app);
      if (sources.length) return { query, sources, error: null };
    } catch (error) {
      return { query, sources: [], error: error.message || "Search request failed." };
    } finally {
      clearTimeout(timeout);
    }
  }

  return { query: queries[queries.length - 1], sources: [], error: null };
}

async function investigate(value) {
  const app = parseAppInput(value);
  const results = await Promise.all(researchTopics.map(async (topic) => {
    const search = await searchTopic(topic, app);
    return {
      id: topic.id,
      title: topic.title,
      nextAction: topic.next,
      estimate: topic.estimate || null,
      evidence: search.sources.slice(0, 3),
      status: search.sources.length ? "sources_found" : "not_verified",
      error: search.error,
      query: search.query,
    };
  }));
  const failedSearches = results.filter((result) => result.error).length;
  if (failedSearches === results.length) {
    throw new Error("All five topic searches failed. Check your connection and try again.");
  }

  const sources = [...new Map(
    results.flatMap((result) => result.evidence).map((source) => [source.url, source]),
  ).values()];
  return {
    app: app.label,
    searchedAt: new Date().toISOString(),
    results,
    sources,
  };
}

function serveFile(requestPath, response) {
  const pathname = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.resolve(root, `.${pathname}`);
  if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== path.join(root, "index.html")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Unable to read file");
      return;
    }
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  if (request.method === "POST" && request.url === "/api/research") {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 4096) {
        request.destroy();
      }
    });
    request.on("end", async () => {
      try {
        const payload = JSON.parse(body);
        const result = await investigate(String(payload.app || ""));
        sendJson(response, 200, result);
      } catch (error) {
        sendJson(response, 502, {
          error: error instanceof SyntaxError
            ? "Could not read the request. Please try again."
            : error.message || "Live research failed. Please try again.",
        });
      }
    });
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  const pathname = new URL(request.url, "http://localhost").pathname;
  serveFile(pathname, response);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`OAuth Fieldguide running at http://localhost:${port}`);
});
