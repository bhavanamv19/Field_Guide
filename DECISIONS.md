# Product decisions

## Focus on distinct setup paths

The four built-in examples illustrate different OAuth readiness questions:

- **GitHub:** app type, callback configuration, and a comparatively direct registration path.
- **Slack:** OAuth distribution is separate from optional Marketplace listing and review.
- **Google Drive:** scope choice can change verification requirements and add assessment work.
- **Notion:** internal and public integrations serve different connection needs.

This is a useful demonstration of varied setup challenges without suggesting the initial library is a complete directory of 100 providers.

## Show the path, not just documentation links

Each guide groups the work into readiness, next steps, effort, review, blockers, agent/human ownership, and source links. Setup estimates are planning estimates, while provider-published review windows are stated separately and are not guarantees.

## Make the OAuth roles clear

A provider OAuth app identifies the developer's integration to the provider. A user's connection is a separate authorization. Developers should also check whether their integration platform provides managed OAuth before registering their own provider app.

## Keep generated research inspectable

The live flow searches five questions: authorization flow, app registration, scopes, provider review/distribution, and testing/security. Each result shows its search query, evidence when found, and a concrete next action. Sources are labeled as matching the submitted domain, matching the app name, or neither; absent evidence is labeled unknown.

## Keep responsibility with the right owner

An agent can help organize public information and prepare checklists. The developer remains responsible for creating provider accounts and apps, deciding requested access, protecting credentials, making attestations, testing, and submitting for approval.
