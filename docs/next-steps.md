# Next development steps

This plan prepares Nature Home for continued work in Claude. It records recommendations, not completed changes. Keep the current launcher behavior until a change has a clear reason and a way to check it.

## Establish a baseline on the TV

1. Run `node src/selfcheck.js` from the workspace root. Confirm that it prints `App matching checks passed`.
2. Open `src/index.html` in a desktop browser. Check the layout, arrow keys, Enter, and the preview notice.
3. Build and sign a WGT from `src/` using the steps in [How to develop and test Nature Home](development.md).
4. Install that WGT on the target TV. Check the dock, clock, wallpaper rotation, installed-app discovery, missing-app notice, and launch of an installed app.
5. Record the result and the Tizen Studio commands or settings that worked. Keep device identifiers and signing secrets out of shared docs.

The Node check passed during this handoff. The browser and TV checks remain open. Do not infer TV behavior from the desktop preview.

## Make the next change from a reported need

1. Write down the requested behavior and the visible result that proves it works.
2. Check `src/index.html` and `src/config.xml` before editing. Change the smallest set of files that can produce the result.
3. If the change affects app matching, add a case to `src/selfcheck.js` for the observed installed-app name. The current substring fallback can pick an unintended app when names overlap.
4. Run `node src/selfcheck.js` and repeat the relevant browser check.
5. For TV API or remote behavior changes, build a new WGT and repeat the affected TV checks.
6. Update `preview/` and recreate the WGT or source ZIP only when those files are deliverables for that change.

Avoid splitting the single page, adding a build system, or changing the app list solely to prepare for future features. Those changes have no current requirement or check.

## Preserve a useful handoff

1. Use the Git history for larger edits. Keep generated staging files, device discovery records, and signing material out of commits.
2. Update `README.md`, `docs/development.md`, and this plan when behavior, commands, or verified TV results change.
3. Leave the next Claude session a short record of what changed, which checks passed, and what still needs a TV.
