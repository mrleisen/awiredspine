/// The entrypoint for the **server** environment.
library;

import 'package:jaspr/dom.dart';
import 'package:jaspr/server.dart';

import 'app.dart';
import 'main.server.options.dart';

void main() {
  Jaspr.initializeApp(
    options: defaultServerOptions,
  );

  runApp(Document(
    title: 'A WIRED SPINE — experimental electronic',
    lang: 'en',
    // Design's style.css is copied to web/style.css — loaded via link below.
    // All animations/keyframes live there; Jaspr renders pure structure.
    styles: [],
    head: [
      meta(charset: 'utf-8'),
      meta(name: 'viewport', content: 'width=device-width, initial-scale=1'),
      link(rel: 'icon', type: 'image/svg+xml', href: 'assets/spine-logo.svg?v=6'),
      link(rel: 'preconnect', href: 'https://fonts.googleapis.com'),
      link(
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        attributes: {'crossorigin': ''},
      ),
      link(
        rel: 'stylesheet',
        href:
            'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Major+Mono+Display&display=swap',
      ),
      link(rel: 'stylesheet', href: 'style.css?v=10'),
      // Scripts deferred so they execute after the DOM is parsed. hero.js
      // paints the canvas background; app.js wires clock, releases,
      // crosshair, and hero parallax.
      Component.element(
        tag: 'script',
        attributes: {'src': 'hero.js', 'defer': ''},
      ),
      Component.element(
        tag: 'script',
        attributes: {'src': 'app.js', 'defer': ''},
      ),
    ],
    body: App(),
  ));
}
