# Claude project instructions

Read [README.md](README.md) for the app map, [docs/development.md](docs/development.md) for the workflow, and [docs/next-steps.md](docs/next-steps.md) for the proposed plan.

Use the installed `pstack:poteto-mode` skill for development work and `pstack:technical-writing` for documentation. If those skills are unavailable, follow the checks and order in `docs/next-steps.md`.

- Treat `src/index.html` and `src/config.xml` as the current app source. The page contains its own CSS and JavaScript.
- Keep `preview/` in sync when delivering that directory as a preview. Do not treat `development/`, `NatureHome.wgt`, or `Nature-Home-source.zip` as editable source.
- `src/app-check.js` is an unused copy of the page script. Check `src/index.html` before changing app behavior.
- Preserve remote keyboard focus, Enter activation, missing-app feedback, and Tizen API error handling when changing the dock.
- Run `node src/selfcheck.js` after changing app-name matching. Preview the page for layout and input changes. Verify app discovery and launch on a TV after building a newly signed WGT.
- Do not put device addresses, DUIDs, certificates, or signing passwords in new documentation or shared packages.
