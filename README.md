# A Wired Spine

Single-page site for an experimental electronic music project.
Three self-released records on [soundcloud.com/awiredspine](https://soundcloud.com/awiredspine), recorded 2004–2012 in FL Studio.

> _a body plugged in — analog inspiration carried on digital signal._

## Stack

- **[Jaspr](https://docs.jaspr.site)** (Dart, static-rendering mode) for the page skeleton and build pipeline
- Plain CSS in `web/style.css` — no framework, no utility classes
- Plain JS in `web/hero.js` and `web/app.js` — canvas moiré, release list, UTC clock, cursor crosshair, logo parallax
- Google Fonts: Archivo Black, Space Mono, EB Garamond, Major Mono Display
- Logo traced from PNG to SVG via [potrace](https://potrace.sourceforge.net/) (see "Regenerating the logo" below)
- Zero runtime JS framework, no images in the hero — the hypnotic background is canvas + CSS

## Structure

```
lib/
  app.dart              # the whole page as one StatelessComponent
  main.server.dart      # Document, <head>, asset links
  main.client.dart      # client hydration entrypoint
web/
  style.css             # all visual styling
  hero.js               # full-bleed canvas ring field + moiré
  app.js                # release expansion, clock, crosshair, parallax
  assets/
    spine-logo.svg      # vectorized logo (white-ink, no fill)
    spine-logo.png      # original raster source for regeneration
```

## Commands

```bash
dart pub get                                 # install deps
dart run jaspr serve                         # dev server with hot reload
dart run jaspr build                         # static output → build/jaspr/
dart analyze                                 # lints
dart format --line-length 120 .              # format
```

Global install (once): `dart pub global activate jaspr_cli`.

## Regenerating the logo

The SVG is a vector trace of `web/assets/spine-logo.png`. To regenerate:

```bash
pip install potracer pillow numpy
python tool/trace_logo.py    # if you extract the inline script below
```

Current trace parameters (see the build history for the live script):

- Bright-pixel trace (`arr > 128`), so original polarity is preserved — white rings render white on the dark page, black rings stay black via transparency
- `alphamax=0.4` to keep the starburst tips sharp while smoothing the ring curves
- Corner-only artifact filter — drops only small subpaths that hug an edge in both x AND y (keeps all 8 spikes intact)

## Sections

1. **Hero** — full-bleed canvas op-art (concentric rings, radial spokes, counter-rotating moiré), spinning logo, glitched "A WIRED SPINE" title, corner tags
2. **Interlude** — three-row marquee (records · genres · wordmark), alternating color bands
3. **Catalog** — three release rows; click to unspool an inline SoundCloud iframe
4. **Etymology** — anatomical-plate layout explaining SPINE (analog/human/inspiration) and WIRED (electronic/digital/signal)
5. **Signal** — transmission-log readout + primary SoundCloud channel
6. **Footer** — spinning spiral + marquee coda

## Color + type

```
--bg:   #000          --ink:   #F2EFE6          --acid: #E3301A
--mono: Space Mono    --display: Archivo Black
--serif: EB Garamond  --caps:    Major Mono Display
```

## Credits

Music and design direction: Rafael Camargo (A Wired Spine).
Page built in collaboration with Claude.
