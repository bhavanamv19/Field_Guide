# Fieldguide

Fieldguide helps developers understand the work, approval risks, and next steps for connecting an app through OAuth. Browse practical provider guides or generate a five-part, source-linked research draft for another app.

## Setup

Requires Node.js 18 or newer. From the project directory, run:

```powershell
node server.js
```

Open [http://localhost:4173](http://localhost:4173). The built-in guides work offline; live app research requires internet access.

## Key decisions

- Show a small, varied guide library instead of presenting a few examples as a complete directory.
- Keep developer setup effort distinct from provider review and its waiting time.
- Make agent assistance and developer-owned actions explicit.
- Generate five focused results—OAuth flow, registration, scopes, review, and testing—with sources and a practical next step for each.
- Label search-source matches and make missing evidence visible instead of implying a requirement is absent.

More detail: [setup instructions](SETUP.md), [product decisions](DECISIONS.md), and [limitations](LIMITATIONS.md).

## Deploy publicly with Render

This project is configured for Render as a Node.js web service.

1. Create a GitHub repository and upload the contents of this project folder to its root (including `render.yaml` and `package.json`).
2. Sign in to [Render](https://render.com/) and choose **New + → Blueprint**.
3. Connect the GitHub repository containing this project and select the `render.yaml` Blueprint.
4. Review the service settings and click **Apply** / **Deploy**.
5. Wait for the first deployment to finish. Render will provide a public URL ending in `onrender.com`.
6. Open that URL and test both a built-in provider guide and the live research form.

The service uses Render's `PORT` environment variable and binds to `0.0.0.0`, as required for a hosted web service. No third-party Node packages or application secrets are required by the current prototype. Live research requires outbound internet access.

**Important:** The public URL does not exist until you connect the repository and complete deployment in your Render account. Do not submit the localhost URL as a public demo link.
