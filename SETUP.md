# Setup instructions

## Requirements

- Node.js 18 or newer.
- Internet access for the live research feature. No package installation, API key, or provider account is required to run the prototype.

## Run locally

From the project directory:

```powershell
node server.js
```

Open [http://localhost:4173](http://localhost:4173). The server listens on port `4173` by default and serves the prototype and its research endpoint from the same origin. To use another port, set the `PORT` environment variable before starting the server.

## Try the experience

1. Browse or filter the built-in GitHub, Slack, Google Drive, and Notion guides.
2. Open a guide to review its checklist, effort estimate, review caveats, agent/human handoff, and provider sources.
3. Enter an app name or website in the research form. The app searches five OAuth setup topics and displays the query, available excerpts, and next action for each.
4. Use the share link to reopen a built-in guide or rerun research for the submitted app.

## Stop the server

Press `Ctrl+C` in the terminal running `node server.js`.
