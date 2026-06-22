# SwiftTrack Express

Static website exported from the original single HTML file.

## Structure

- `index.html` - page markup
- `assets/css/styles.css` - site styles
- `assets/js/app.js` - site interactions
- `original/swifttrack_express.single.html` - original one-file version

## Run

Open `index.html` directly, or run a local server from this folder:

```powershell
python -m http.server 4317 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4317/
```

## Domain

The page metadata is prepared for:

```text
https://www.swiftrackexpres.com/
```

To make that URL work publicly, point the domain DNS to your hosting provider and enable HTTPS/SSL there. Local development still runs on `http://127.0.0.1:4317/`.
