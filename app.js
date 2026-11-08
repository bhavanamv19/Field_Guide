const guides = [
  {
    id: "github",
    name: "GitHub",
    mark: "GH",
    color: "#292f36",
    tint: "#eaedf0",
    description: "A clean first OAuth flow. The sharp edge is choosing the right app type.",
    challenge: "Choose your OAuth app",
    time: "30–90 min to register + test",
    effort: "LOW",
    effortColor: "#4b9a6d",
    filters: ["quick"],
    tags: ["No listing review", "Up to 10 callbacks"],
    intro: "GitHub OAuth Apps are a straightforward way to let users authorize your app. Build a test flow first; do not confuse an OAuth App with a GitHub App, which has a different permission model.",
    readiness: "Ready to build",
    readinessDetail: "The docs reviewed describe registration and authorization—not a pre-launch provider approval queue for OAuth Apps.",
    readinessTime: "Developer setup: usually hours, not days",
    workEstimate: "30–90 minutes for registration and a successful test; integration coding is separate. Planning estimate, not a provider SLA.",
    reviewEstimate: "No OAuth App review gate identified in the cited registration docs. Re-check current policies for your product and requested data.",
    checklist: [
      ["Create an OAuth App in your account's Developer settings; supply a homepage URL.", "YOU"],
      ["Set the authorization callback URL. GitHub allows up to 10 callback URLs; register the exact URLs you need and test each environment.", "YOU"],
      ["Keep the client secret on your server; exchange the returned code server-side and handle denied or expired authorization.", "YOU + AGENT"],
      ["Test the complete consent and callback flow with a non-production account before inviting users.", "YOU + AGENT"],
    ],
    blockers: "A mismatch between the registered callback and the URL used in the authorization flow is a common integration stop. GitHub Apps may fit better if you need fine-grained permissions or app activity independent of a user.",
    agent: "Draft the authorization URL, callback handler, and test checklist; review scopes and error paths.",
    human: "Create the app in your GitHub account, choose the public-facing URLs, protect the secret, and decide whether an OAuth App is the right product.",
    sources: [
      { title: "Creating an OAuth app", url: "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app", note: "Official GitHub Docs · registration fields and callback URL" },
      { title: "Authorizing OAuth apps", url: "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps", note: "Official GitHub Docs · authorization flow" },
    ],
    verified: "Guide checked against GitHub's OAuth App registration and authorization docs. No account creation or live consent flow was performed.",
  },
  {
    id: "slack",
    name: "Slack",
    mark: "S",
    color: "#5b4b8a",
    tint: "#f0eafa",
    description: "Test in one workspace, then decide how broadly to distribute.",
    challenge: "Distribution is not listing",
    time: "1–3h setup · listing review up to 10 weeks",
    effort: "MEDIUM",
    effortColor: "#dc9657",
    filters: ["quick", "review"],
    tags: ["App Distribution", "Marketplace is optional"],
    intro: "Slack distinguishes development-workspace installs, OAuth distribution to other workspaces, and an optional Slack Marketplace listing. Getting an OAuth installation working is not the same checkpoint as being listed in the Marketplace.",
    readiness: "Ready for OAuth distribution",
    readinessDetail: "The official distribution guide says a new app starts installable in its development workspace; set a redirect URL and enable App Distribution for other workspaces.",
    readinessTime: "Core setup: hours · listing: up to 10 weeks",
    workEstimate: "1–3 hours to configure and test a basic OAuth install. Estimate excludes writing the integration and handling Slack events or tokens.",
    reviewEstimate: "Marketplace listing is separate from App Distribution. Slack currently says preliminary feedback may take up to 10 business days and a new functional review up to 10 weeks (updates adding functionality: up to 6 weeks). These are estimates, not guarantees; check the submission page for the current queue.",
    checklist: [
      ["Create a Slack app in a development workspace and request only the bot/user scopes the product needs.", "YOU + AGENT"],
      ["Register the exact OAuth redirect URL and implement the OAuth v2 callback.", "YOU + AGENT"],
      ["Install and exercise the app in the development workspace before enabling distribution.", "YOU"],
      ["In Manage Distribution, complete the checklist and activate public distribution for an unlisted install URL. Treat this as separate from a Marketplace listing.", "YOU"],
      ["If pursuing a Marketplace listing, confirm eligibility: Slack currently requires at least 10 active workspaces (used within the past 28 days) and a demo video for new submissions or updates adding features/scopes.", "YOU"],
    ],
    blockers: "Do not tell customers a Marketplace listing is required just to use Slack OAuth across workspaces. Distribution and directory listing are different tracks. Marketplace readiness includes an active-workspace threshold; coded workflows are currently ineligible for listing. Workspace admin controls can also affect installation.",
    agent: "Map Slack's OAuth steps, draft minimal-scope recommendations, and prepare a test checklist.",
    human: "Create and configure the Slack app, enable distribution, approve the actual requested scopes, and submit/answer Marketplace review if you choose to list.",
    sources: [
      { title: "Installing via OAuth authorization code flow", url: "https://docs.slack.dev/authentication/installing-with-oauth/", note: "Official Slack Developer Docs · scopes and OAuth install" },
      { title: "App distribution", url: "https://docs.slack.dev/app-management/distribution", note: "Official Slack Developer Docs · activate public distribution" },
      { title: "Marketplace review guide", url: "https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide", note: "Official Slack Developer Docs · review stages and timing" },
      { title: "Marketplace app guidelines", url: "https://docs.slack.dev/slack-marketplace/slack-marketplace-app-guidelines-and-requirements", note: "Official Slack Developer Docs · listing eligibility and requirements" },
    ],
    verified: "OAuth distribution, Marketplace requirements, and published review estimates were checked against Slack's official documentation. The submission page's live queue estimate may differ.",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    mark: "G",
    color: "#3478d4",
    tint: "#e9f1fb",
    description: "Your scopes determine whether verification is a launch gate.",
    challenge: "Sensitive-scope verification",
    time: "Prep: 1–3 days · review: 10 days to weeks",
    effort: "HIGH",
    effortColor: "#d57752",
    filters: ["review"],
    tags: ["Scope-dependent", "Potential assessment"],
    intro: "Google's consent-screen path is scope-dependent. Sensitive or restricted scopes require OAuth verification before publication; restricted-scope access can also trigger an annual re-verification and a security assessment.",
    readiness: "Scope-dependent",
    readinessDetail: "First decision: can the product work with the narrowest non-sensitive scope? That choice may change the approval path and evidence you must prepare.",
    readinessTime: "Prep: 1–3 days · review: up to weeks",
    workEstimate: "Plan 1–3 days to inventory scopes, prepare a demo, and assemble consent-screen materials. This is a planning estimate, not a Google deadline.",
    reviewEstimate: "Google says sensitive-scope verification can take up to 10 days; restricted-scope verification can take several weeks. These are not guarantees. Restricted-scope apps may also need a Google-approved security assessment, with ongoing re-verification.",
    checklist: [
      ["Inventory the exact Google APIs and scopes your product needs; remove anything you do not use.", "YOU + AGENT"],
      ["Check each scope's current classification in Google's scope list and the Cloud Console.", "YOU"],
      ["Complete the consent screen, app identity, verified domains, a relevant public homepage, and a same-domain privacy policy linked from the consent screen.", "YOU"],
      ["For sensitive or restricted scopes, prepare a demo video showing the consent flow, exact scopes, and features that use them; submit verification if required.", "YOU + AGENT"],
      ["For restricted scopes handled by your server, confirm security-assessment requirements, assessor, cost, and re-verification obligations before committing to a launch date.", "YOU"],
    ],
    blockers: "A sensitive or restricted scope can change the work from a same-day setup to a verification process. Google notes that non-sensitive scopes do not require app verification, but brand verification may be needed to display your app name and logo.",
    agent: "Audit a proposed scope list, draft a reviewer walkthrough, and organize evidence. An agent cannot attest to your business, submit as you, or complete an independent security assessment.",
    human: "Own the Cloud project and OAuth brand, confirm scope necessity, submit the verification request, answer reviewer questions, and arrange any required assessment.",
    sources: [
      { title: "OAuth App Verification", url: "https://support.google.com/cloud/answer/13463073?hl=en", note: "Official Google Cloud Help · scope-dependent verification" },
      { title: "Verification requirements", url: "https://support.google.com/cloud/answer/13464321?hl=en", note: "Official Google Cloud Help · evidence and requirements" },
      { title: "Sensitive-scope verification", url: "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification", note: "Official Google Developers · review timing and requirements" },
      { title: "Restricted-scope verification", url: "https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification", note: "Official Google Developers · additional assessment path" },
      { title: "OAuth 2.0 Scopes for Google APIs", url: "https://developers.google.com/identity/protocols/oauth2/scopes", note: "Official Google Developers · scope classifications" },
    ],
    verified: "Google's official verification pages state sensitive verification can take up to 10 days and restricted verification several weeks. A particular scope's outcome, current queue, and assessment fees remain unverified.",
  },
  {
    id: "notion",
    name: "Notion",
    mark: "N",
    color: "#252525",
    tint: "#eee",
    description: "Pick the integration type before choosing the authorization flow.",
    challenge: "Internal vs public integration",
    time: "1–2 hours to configure + test",
    effort: "MEDIUM",
    effortColor: "#dc9657",
    filters: ["quick"],
    tags: ["Workspace access", "Public distribution"],
    intro: "Notion supports internal and public integrations. For a product that connects many customers' workspaces, use the public OAuth path rather than sharing an internal integration secret.",
    readiness: "Start with integration type",
    readinessDetail: "A single workspace's internal integration is not a substitute for public OAuth distribution. Decide which customers and workspaces need to connect first.",
    readinessTime: "Core setup: hours · review: confirm current policy",
    workEstimate: "1–2 hours to register an integration, configure a redirect, and test consent. Integration coding and any current listing or review requirements are separate.",
    reviewEstimate: "Public integrations use OAuth. Review or listing requirements can change; confirm current requirements in the developer portal before promising a launch date.",
    checklist: [
      ["Choose internal for a controlled workspace or public for user-authorized connections across workspaces.", "YOU"],
      ["Register an OAuth redirect URI and select the smallest access needed.", "YOU + AGENT"],
      ["Complete the authorization callback and test with a separate workspace.", "YOU + AGENT"],
      ["Before public launch, confirm current Notion publishing and review requirements in the developer portal.", "YOU"],
    ],
    blockers: "An internal integration is limited to the workspace where it is installed. If your customers connect their own workspaces, choose the public integration flow early and re-check current publishing rules.",
    agent: "Compare internal vs public paths, outline authorization steps, and prepare a redirect/callback test.",
    human: "Create the integration, control its credentials and requested capabilities, and confirm any publishing or review requirements.",
    sources: [
      { title: "Authorization", url: "https://developers.notion.com/docs/authorization", note: "Official Notion Developers · OAuth authorization" },
      { title: "Integration capabilities", url: "https://developers.notion.com/docs/getting-started", note: "Official Notion Developers · integration setup" },
    ],
    verified: "Notion developer documentation links were identified; public review and listing requirements were not independently verified. Confirm them in the provider portal before launch.",
  },
];

const grid = document.querySelector("#guide-grid");
const searchInput = document.querySelector("#guide-search");
const dialog = document.querySelector("#guide-dialog");
const dialogContent = document.querySelector("#dialog-content");
const generatedSection = document.querySelector("#generated-guide");
const form = document.querySelector("#research-form");
const submitButton = document.querySelector("#research-submit");
const statusBox = document.querySelector("#research-status");
const statusText = document.querySelector("#status-text");
let activeFilter = "all";

function iconMarkup(guide) {
  return `<span class="app-icon" style="--app-color:${guide.color};--app-tint:${guide.tint}">${guide.mark}</span>`;
}

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = guides.filter((guide) => {
    const matchesText = `${guide.name} ${guide.description} ${guide.challenge} ${guide.tags.join(" ")}`.toLowerCase().includes(query);
    const matchesFilter = activeFilter === "all" || guide.filters.includes(activeFilter);
    return matchesText && matchesFilter;
  });
  grid.innerHTML = visible.map((guide) => `
    <article class="guide-card">
      <div class="card-top">${iconMarkup(guide)}<span class="difficulty"><i style="--difficulty-color:${guide.effortColor}"></i>${guide.effort}</span></div>
      <h3>${guide.name}</h3>
      <p class="card-subtitle">${guide.description}</p>
      <div class="card-bottom">
        <div class="card-time"><span class="clock" aria-hidden="true">◷</span>${guide.time}</div>
        <div class="card-tags">${guide.tags.map((tag, index) => `<span class="pill${index === 1 && guide.filters.includes("review") ? " warm" : ""}">${tag}</span>`).join("")}</div>
        <button class="open-guide" type="button" data-guide="${guide.id}">View setup guide <span aria-hidden="true">↗</span></button>
      </div>
    </article>`).join("");
  document.querySelector("#empty-search").hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
  grid.querySelectorAll("[data-guide]").forEach((button) => {
    button.addEventListener("click", () => openGuide(button.dataset.guide));
  });
}

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function addSection(parent, title, marker) {
  const section = node("section", "dialog-section");
  const heading = node("div", "dialog-section-title");
  heading.append(node("h3", "", title), node("span", "", marker));
  section.append(heading);
  parent.append(section);
  return section;
}

function openGuide(id) {
  const guide = guides.find((item) => item.id === id);
  if (!guide) return;
  history.replaceState(null, "", `#guide/${encodeURIComponent(id)}`);
  dialogContent.replaceChildren();
  const body = node("div", "dialog-body");
  body.append(node("div", "dialog-eyebrow", "FIELDGUIDE / " + guide.challenge.toUpperCase()));
  const titleRow = node("div", "dialog-title-row");
  titleRow.append(node("h2", "", guide.name), node("span", "difficulty", guide.effort + " EFFORT"));
  body.append(titleRow);
  body.append(node("p", "dialog-description", guide.intro));

  const readiness = node("div", "readiness-box");
  const badge = document.createElement("div");
  badge.append(node("strong", "", guide.readiness), node("span", "", guide.readinessTime));
  readiness.append(badge, node("p", "", guide.readinessDetail));
  body.append(readiness);
  const managedNote = node("p", "managed-note");
  managedNote.append(document.createTextNode("Before registering your own client, check whether your integration platform already offers managed OAuth. If it does, the platform may own provider app credentials; confirm who handles review and verification. "));
  const managedLink = node("a", "", "Read about managed auth ↗");
  managedLink.href = "https://docs.composio.dev/toolkits/managed-auth";
  managedLink.target = "_blank";
  managedLink.rel = "noopener noreferrer";
  managedNote.append(managedLink);
  body.append(managedNote);

  const checklistSection = addSection(body, "Your next steps", "CHECKLIST");
  const checklist = node("div", "checklist");
  guide.checklist.forEach(([text, owner], index) => {
    const item = node("div", "check-item");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `${guide.id}-step-${index}`;
    const label = node("label", "", text);
    label.htmlFor = checkbox.id;
    item.append(checkbox, label, node("span", `check-owner${owner === "YOU" ? " human" : ""}`, owner));
    checklist.append(item);
  });
  checklistSection.append(checklist);

  const estimateSection = addSection(body, "Time & effort", "PLANNING ESTIMATE");
  const estimates = node("div", "estimate-grid");
  for (const [label, text] of [["Setup work", guide.workEstimate], ["Provider review", guide.reviewEstimate]]) {
    const cell = node("div", "estimate-cell");
    cell.append(node("span", "", label), node("p", "", text));
    estimates.append(cell);
  }
  estimateSection.append(estimates);

  const blockerSection = addSection(body, "What could slow you down", "WATCH FOR");
  blockerSection.append(node("div", "blocker-note", guide.blockers));

  const ownershipSection = addSection(body, "Agent vs. you", "HANDOFF");
  const ownership = node("div", "estimate-grid");
  for (const [label, text] of [["The agent can", guide.agent], ["You take over for", guide.human]]) {
    const cell = node("div", "estimate-cell");
    cell.append(node("span", "", label), node("p", "", text));
    ownership.append(cell);
  }
  ownershipSection.append(ownership);

  const sourcesSection = addSection(body, "Evidence & sources", "OPEN TO VERIFY");
  const sources = node("div", "dialog-sources");
  guide.sources.forEach((source) => {
    const link = node("a", "dialog-source", source.title);
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(node("small", "", source.note));
    sources.append(link);
  });
  sourcesSection.append(sources, node("p", "source-note", guide.verified));

  const footer = node("div", "dialog-footer");
  footer.append(node("span", "", "Planning estimates are not provider promises."));
  const copy = node("button", "", "Copy share link ↗");
  copy.type = "button";
  copy.addEventListener("click", () => copyLink(`${location.origin}${location.pathname}#guide/${guide.id}`, copy));
  footer.append(copy);
  body.append(footer);
  dialogContent.append(body);
  dialog.showModal();
}

function copyLink(url, button) {
  navigator.clipboard.writeText(url).then(() => {
    const original = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => { button.textContent = original; }, 1600);
  }).catch(() => {
    button.textContent = "Copy failed — copy the URL above";
  });
}

function renderGenerated(data) {
  generatedSection.replaceChildren();
  generatedSection.hidden = false;
  const header = node("div", "generated-header");
  const heading = document.createElement("div");
  heading.append(node("div", "generated-eyebrow", "✳ LIVE RESEARCH / FIVE-POINT GUIDE"));
  heading.append(node("h2", "", `${data.app}: your starting path`));
  const foundCount = data.results.filter((result) => result.evidence.length > 0).length;
  const intro = node("p", "", `5 focused topic searches · evidence found for ${foundCount} topics · ${data.sources.length} unique sources · ${new Date(data.searchedAt).toLocaleString()}`);
  heading.append(intro);
  header.append(heading);
  const actions = node("div", "generated-actions");
  const share = node("button", "utility-button", "Copy share link ↗");
  share.type = "button";
  share.addEventListener("click", () => copyLink(`${location.origin}${location.pathname}?app=${encodeURIComponent(data.app)}`, share));
  const hide = node("button", "utility-button", "Close");
  hide.type = "button";
  hide.addEventListener("click", () => {
    generatedSection.hidden = true;
    history.replaceState(null, "", location.pathname + location.hash);
  });
  actions.append(share, hide);
  header.append(actions);
  generatedSection.append(header);

  const resultsHeading = node("div", "evidence-heading");
  resultsHeading.append(
    node("h3", "", "Five setup questions, researched separately"),
    node("span", "", "EACH RESULT HAS EVIDENCE + A NEXT STEP"),
  );
  generatedSection.append(resultsHeading);

  const resultList = node("div", "structured-results");
  data.results.forEach((result, index) => {
    const card = node("article", "structured-result");
    const resultHeader = node("div", "structured-result-header");
    const title = node("h3", "", result.title);
    const status = node(
      "span",
      `result-status${result.evidence.length ? " found" : ""}`,
      result.evidence.length ? `${result.evidence.length} SOURCES` : "NOT VERIFIED",
    );
    resultHeader.append(node("span", "result-number", String(index + 1).padStart(2, "0")), title, status);
    card.append(resultHeader);
    card.append(node("p", "result-query", `SEARCH QUERY · ${result.query}`));
    if (result.estimate) {
      const estimate = node("p", "result-estimate", result.estimate);
      card.append(estimate);
    }
    const next = node("p", "result-next");
    next.append(node("strong", "", "Next step: "), document.createTextNode(result.nextAction));
    card.append(next);

    if (result.error) {
      card.append(node("p", "result-unknown", `This topic search failed: ${result.error}`));
    } else if (result.evidence.length) {
      const sources = node("div", "result-sources");
      result.evidence.forEach((source) => {
        let safeUrl;
        try {
          safeUrl = new URL(source.url);
        } catch {
          return;
        }
        if (!["http:", "https:"].includes(safeUrl.protocol)) return;
        const sourceCard = node("a", "result-source");
        sourceCard.href = safeUrl.href;
        sourceCard.target = "_blank";
        sourceCard.rel = "noopener noreferrer";
        const matchLabel = {
          submitted_domain: "SUBMITTED DOMAIN",
          app_name_match: "APP-NAME MATCH",
          independent_source: "INDEPENDENT SOURCE",
        }[source.matchType] || "SEARCH RESULT";
        sourceCard.append(
          node("span", "source-domain", source.domain),
          node("span", "source-match", matchLabel),
          node("strong", "", source.title),
          node("span", "source-snippet", source.snippet),
        );
        sources.append(sourceCard);
      });
      card.append(sources);
      card.append(node("p", "result-caveat", "Search excerpt only — open the source to confirm this applies to your app."));
    } else {
      card.append(node("p", "result-unknown", "No usable source surfaced for this question. This is unknown, not evidence that the requirement does not exist."));
    }
    resultList.append(card);
  });
  generatedSection.append(resultList);
  generatedSection.append(node("p", "source-note", "These five sections are built from targeted public-search excerpts, not a full review of provider documentation. The 1–3 hour setup range is a generic planning baseline, not a measured or provider-published estimate. Review waits stay unknown unless an excerpt explicitly supports a timeline. The agent cannot create your account, approve scopes, submit on your behalf, or promise a review outcome."));
  generatedSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function researchApp(appName) {
  statusBox.hidden = false;
  submitButton.disabled = true;
  generatedSection.hidden = true;
  const phases = ["Running five focused provider searches", "Organizing sources by setup question", "Preparing your five-point guide"];
  let phaseIndex = 0;
  statusText.textContent = phases[phaseIndex];
  const phaseTimer = setInterval(() => {
    phaseIndex = (phaseIndex + 1) % phases.length;
    statusText.textContent = phases[phaseIndex];
  }, 1150);
  try {
    const response = await fetch("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app: appName }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Live research failed.");
    history.replaceState(null, "", `${location.pathname}?app=${encodeURIComponent(appName)}`);
    renderGenerated(result);
  } catch (error) {
    generatedSection.replaceChildren();
    generatedSection.hidden = false;
    generatedSection.append(node("div", "guide-error", `Research did not complete: ${error.message}`));
    generatedSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } finally {
    clearInterval(phaseTimer);
    statusBox.hidden = true;
    submitButton.disabled = false;
  }
}

document.querySelectorAll(".filter-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-tab.selected").classList.remove("selected");
    button.classList.add("selected");
    activeFilter = button.dataset.filter;
    renderCards();
  });
});
searchInput.addEventListener("input", renderCards);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const appName = document.querySelector("#app-query").value.trim();
  if (appName) researchApp(appName);
});
document.querySelector(".dialog-close").addEventListener("click", () => {
  dialog.close();
  history.replaceState(null, "", location.pathname);
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
    history.replaceState(null, "", location.pathname);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderCards();
const sharedGuide = location.hash.match(/^#guide\/([^/]+)$/);
if (sharedGuide) openGuide(decodeURIComponent(sharedGuide[1]));
const sharedApp = new URLSearchParams(location.search).get("app");
if (sharedApp) {
  document.querySelector("#app-query").value = sharedApp;
  researchApp(sharedApp);
}
