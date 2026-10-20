# How to develop and test Nature Home

Use `src/` as the working app. A desktop browser previews the layout, while a signed TV install is needed to check app discovery and launch.

## Preview a change on your computer

1. Edit `src/index.html` or an asset in `src/`.
2. Open `src/index.html` in a desktop browser.
3. Use the left and right arrow keys to move between tiles. Press Enter to select one. You should see a notice that app launching works on the TV.
4. Wait one minute if you changed the wallpaper rotation. The background should switch to the next image.

The `preview/` directory is a copy, not a separate implementation. If you share that directory after a change, copy the changed app files from `src/` into `preview/` first.

## Run the available check

From the workspace root, run:

```powershell
node src/selfcheck.js
```

The expected output is `App matching checks passed`. This check reads `appFor` from `src/index.html` and covers exact matches for YouTube and Stremio plus a missing Netflix match. It does not run the page or contact a TV.

## Build and test on a TV

1. Install Tizen Studio with the Samsung TV and Certificate extensions.
2. Create a Samsung certificate profile for the target TV. Reuse an existing profile only if it covers that TV.
3. Import `src/` as a Tizen web app, then build and sign a new WGT with that profile.
4. Install the new WGT on the TV through Tizen Studio. Open Nature Home from the TV's app list.
5. Check focus movement, Enter selection, the clock, wallpaper rotation, installed-app lookup, the missing-app notice, and app launch on the TV.

The TV must allow development installs, and the certificate must cover its DUID. `development/tv-discovery.json` and the SDB text files describe one earlier device session; the recorded address and connection state can change. Check the device again before installing. Keep certificate files and signing passwords out of shared source archives.
