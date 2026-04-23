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

  const siteUrl = 'https://awiredspine.com/';
  const siteTitle =
      'A WIRED SPINE — instrumental experiments in ambient, noise & electronic rock';
  const siteDescription =
      'Three self-released instrumental records (2004 – 2012) by A WIRED SPINE — '
      'analog bone, digital current. Bedroom-made ambient, noise, and hypnotic '
      'electronic rock. No vocals. Free to stream on SoundCloud.';
  const ogImage = 'https://awiredspine.com/og-image.png?v=1';

  runApp(Document(
    title: siteTitle,
    lang: 'en',
    // Design's style.css is copied to web/style.css — loaded via link below.
    // All animations/keyframes live there; Jaspr renders pure structure.
    styles: [],
    head: [
      meta(charset: 'utf-8'),
      meta(name: 'viewport', content: 'width=device-width, initial-scale=1'),
      meta(name: 'description', content: siteDescription),
      meta(name: 'author', content: 'Rafael Camargo'),
      meta(
        name: 'keywords',
        content:
            'A Wired Spine, experimental electronic, instrumental, ambient, noise, '
            'electronic rock, FL Studio, SoundCloud, Rafael Camargo',
      ),
      meta(name: 'theme-color', content: '#000000'),
      link(rel: 'canonical', href: siteUrl),

      // Open Graph — used by LinkedIn, Facebook, WhatsApp, Discord, etc.
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:type', 'content': 'website'},
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:site_name', 'content': 'A WIRED SPINE'},
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:url', 'content': siteUrl},
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:title', 'content': siteTitle},
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:description', 'content': siteDescription},
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:image', 'content': ogImage},
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:image:width', 'content': '1200'},
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:image:height', 'content': '630'},
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:image:type', 'content': 'image/png'},
      ),
      Component.element(
        tag: 'meta',
        attributes: {
          'property': 'og:image:alt',
          'content':
              'A WIRED SPINE — black hypnotic spiral on acid-red, with stacked wordmark',
        },
      ),
      Component.element(
        tag: 'meta',
        attributes: {'property': 'og:locale', 'content': 'en_US'},
      ),

      // Twitter / X card.
      meta(name: 'twitter:card', content: 'summary_large_image'),
      meta(name: 'twitter:title', content: siteTitle),
      meta(name: 'twitter:description', content: siteDescription),
      meta(name: 'twitter:image', content: ogImage),
      meta(
        name: 'twitter:image:alt',
        content:
            'A WIRED SPINE — black hypnotic spiral on acid-red, with stacked wordmark',
      ),

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
            'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Major+Mono+Display&family=VT323&family=Share+Tech+Mono&display=swap',
      ),
      link(rel: 'stylesheet', href: 'style.css?v=34'),
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
