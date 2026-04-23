import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// The entire page structure — ported 1:1 from the design's index.html.
/// Visual styling lives in web/style.css; interactivity (canvas,
/// release list, clock, crosshair, parallax) lives in web/hero.js and
/// web/app.js.
class App extends StatelessComponent {
  const App({super.key});

  @override
  Component build(BuildContext context) {
    return Component.fragment([
      // Full-bleed hypnotic background + overlay layers.
      Component.element(
        tag: 'canvas',
        id: 'bg',
        attributes: {'aria-hidden': 'true'},
      ),
      div(classes: 'vignette', attributes: {'aria-hidden': 'true'}, []),
      div(classes: 'grain', attributes: {'aria-hidden': 'true'}, []),
      div(classes: 'scanlines', attributes: {'aria-hidden': 'true'}, []),
      div(classes: 'crosshair', attributes: {'aria-hidden': 'true'}, [
        div(classes: 'crosshair__h', []),
        div(classes: 'crosshair__v', []),
      ]),

      // Topbar — fixed; AWS mark + nav + VU meter + UTC clock.
      header(classes: 'topbar', [
      div(classes: 'topbar__mark', [
        div(classes: 'topbar__spin', attributes: {'aria-hidden': 'true'}, []),
        span([text('AWS//TRANSMITTING')]),
      ]),
      nav(classes: 'topbar__nav', [
        a(href: '#releases', [text('RELEASES')]),
        a(href: '#etymology', [text('ETYMOLOGY')]),
        a(href: '#signal', [text('SIGNAL')]),
      ]),
      div(classes: 'topbar__stamp', [
        span(classes: 'vu', [
          for (var i = 0; i < 7; i++) span(classes: 'vu__bar', []),
        ]),
        span(id: 'clock', [text('00:00:00')]),
      ]),
    ]),

    // ===== HERO =====
    section(id: 'top', classes: 'hero', [
      div(classes: 'hero__tag hero__tag--tl', [
        text('COORD · 41.3851 N / 2.1734 E'),
      ]),
      div(classes: 'hero__tag hero__tag--tr', [text('SIGNAL · 0dB REF')]),
      div(classes: 'hero__tag hero__tag--bl', [text('TRK 01/∞ · LOOP')]),
      div(classes: 'hero__tag hero__tag--br', [text('CH.1 · MONO')]),
      div(classes: 'hero__inner', [
        div(classes: 'hero__logo-wrap', [
          div(id: 'heroLogo', classes: 'hero__logo', [
            img(src: 'assets/spine-logo.svg?v=5', alt: 'A Wired Spine'),
          ]),
          div(classes: 'hero__logo-ring', []),
        ]),
        h1(
          classes: 'hero__title',
          attributes: {'aria-label': 'A Wired Spine'},
          [
            span(classes: 'word', attributes: {'data-text': 'A'}, [text('A')]),
            span(classes: 'word', attributes: {'data-text': 'WIRED'},
                [text('WIRED')]),
            span(classes: 'word', attributes: {'data-text': 'SPINE'},
                [text('SPINE')]),
          ],
        ),
        p(classes: 'hero__poem', [
          em([text('analog bone · digital current')]),
          br(),
          text('instrumental experiments in ambient, noise, and electronic rock'),
        ]),
        div(classes: 'hero__meta', [
          span(classes: 'hero__dot', []),
          span([text('ONGOING TRANSMISSION · SINCE 2004')]),
          span(classes: 'hero__dot', []),
        ]),
      ]),
      a(
        href: '#marquee',
        classes: 'hero__scroll',
        attributes: {'aria-label': 'Scroll'},
        [text('↓ DESCEND')],
      ),
    ]),

    // ===== INTERLUDE / MARQUEE BAND =====
    section(
      id: 'marquee',
      classes: 'interlude',
      attributes: {'aria-hidden': 'true'},
      [
        div(classes: 'int-row int-row--1', [
          div(classes: 'int-track', [
            span([
              text(
                'ROUTINE · PLEASE, PLEASE!!! · INTERRUPTOR · ROUTINE · PLEASE, PLEASE!!! · INTERRUPTOR · ROUTINE · PLEASE, PLEASE!!! · INTERRUPTOR · ',
              ),
            ]),
          ]),
        ]),
        div(classes: 'int-row int-row--2', [
          div(classes: 'int-track int-track--rev', [
            span([
              text(
                '◉ ambient ◉ noise ◉ loop ◉ hypnotic ◉ glitch ◉ instrumental ◉ electronic ◉ rock ◉ ambient ◉ noise ◉ loop ◉ hypnotic ◉ glitch ◉ instrumental ◉ electronic ◉ rock ◉ ',
              ),
            ]),
          ]),
        ]),
        div(classes: 'int-row int-row--3', [
          div(classes: 'int-track', [
            span([
              text(
                'A\u00a0WIRED\u00a0SPINE \u00a0//\u00a0 A\u00a0WIRED\u00a0SPINE \u00a0//\u00a0 A\u00a0WIRED\u00a0SPINE \u00a0//\u00a0 A\u00a0WIRED\u00a0SPINE \u00a0//\u00a0 A\u00a0WIRED\u00a0SPINE \u00a0//\u00a0 ',
              ),
            ]),
          ]),
        ]),
      ],
    ),

    // ===== RELEASES =====
    section(id: 'releases', classes: 'releases', [
      div(classes: 'section__head', [
        div(classes: 'section__num', [text('01')]),
        div(classes: 'section__title', [text('CATALOG / THREE TRANSMISSIONS')]),
        div(classes: 'section__rule', []),
        div(classes: 'section__stamp', [text('N=3')]),
      ]),
      div(
        classes: 'rel-header',
        attributes: {'aria-hidden': 'true'},
        [
          span([text('CAT.')]),
          span([text('TITLE')]),
          span([text('FORMAT')]),
          span([text('YEAR')]),
          span([]),
        ],
      ),
      // app.js populates this list client-side with the three releases.
      ol(id: 'rel-list', classes: 'rel-list', []),
      p(classes: 'releases__note', [
        text(
          'Click a transmission to unspool the player — all self-released, mastered in a bedroom.',
        ),
      ]),
    ]),

    // ===== ETYMOLOGY / ANATOMICAL PLATE =====
    section(id: 'etymology', classes: 'etym', [
      div(classes: 'section__head', [
        div(classes: 'section__num', [text('02')]),
        div(classes: 'section__title', [text('ETYMOLOGY / WHY THIS NAME')]),
        div(classes: 'section__rule', []),
        div(classes: 'section__stamp', [text('PL. II')]),
      ]),
      div(classes: 'plate', [
        // Left — SPINE
        div(classes: 'plate__side plate__side--left', [
          div(classes: 'plate__word-wrap', [
            div(classes: 'plate__word', [text('SPINE')]),
            Component.element(
              tag: 'svg',
              classes: 'plate__line',
              attributes: {
                'viewBox': '0 0 200 200',
                'preserveAspectRatio': 'none',
                'aria-hidden': 'true',
              },
              children: [
                Component.element(
                  tag: 'path',
                  attributes: {
                    'd': 'M 10 100 L 60 100 L 90 60 L 170 60',
                    'fill': 'none',
                    'stroke': 'currentColor',
                    'stroke-width': '1',
                  },
                ),
                Component.element(
                  tag: 'circle',
                  attributes: {
                    'cx': '170',
                    'cy': '60',
                    'r': '3',
                    'fill': 'currentColor',
                  },
                ),
              ],
            ),
          ]),
          div(classes: 'plate__defn', [
            div(classes: 'plate__label', [text('fig. A — SPINE')]),
            p([
              em([text('noun.')]),
              text(' the column that holds a body upright.'),
            ]),
            p(classes: 'plate__mean', [
              text('Here: '),
              strong([text('the analog, the human, the inspiration.')]),
              text(
                ' The flesh that remembers walking home at 3am. The bone that was there before any machine.',
              ),
            ]),
          ]),
        ]),
        // Center — specimen
        div(classes: 'plate__center', [
          div(classes: 'plate__specimen', [
            img(src: 'assets/spine-logo.svg?v=5', alt: ''),
          ]),
          div(classes: 'plate__caption', [text('SPECIMEN — fig. I')]),
        ]),
        // Right — WIRED
        div(classes: 'plate__side plate__side--right', [
          div(classes: 'plate__word-wrap plate__word-wrap--r', [
            div(classes: 'plate__word', [text('WIRED')]),
            Component.element(
              tag: 'svg',
              classes: 'plate__line plate__line--r',
              attributes: {
                'viewBox': '0 0 200 200',
                'preserveAspectRatio': 'none',
                'aria-hidden': 'true',
              },
              children: [
                Component.element(
                  tag: 'path',
                  attributes: {
                    'd': 'M 190 100 L 140 100 L 110 140 L 30 140',
                    'fill': 'none',
                    'stroke': 'currentColor',
                    'stroke-width': '1',
                  },
                ),
                Component.element(
                  tag: 'circle',
                  attributes: {
                    'cx': '30',
                    'cy': '140',
                    'r': '3',
                    'fill': 'currentColor',
                  },
                ),
              ],
            ),
          ]),
          div(classes: 'plate__defn plate__defn--r', [
            div(classes: 'plate__label', [text('fig. B — WIRED')]),
            p([
              em([text('adj.')]),
              text(' connected by conductor; charged; tense; awake.'),
            ]),
            p(classes: 'plate__mean', [
              text('Here: '),
              strong([text('the electronic, the digital, the current.')]),
              text(
                ' Electrons running through software. Technology as the throat that lets the spine sing.',
              ),
            ]),
          ]),
        ]),
        // Conclusion spanning both columns.
        div(classes: 'plate__conclusion', [
          span(classes: 'plate__conj', [text('∴')]),
          text(
            ' A WIRED SPINE is a body plugged in — analog inspiration carried on digital signal. No vocals. Instrumental. ',
          ),
          em([
            text('Experimental electronic · ambient · noise · rock bones.'),
          ]),
          text(' Worked out in FL Studio between '),
          span(classes: 'hl', [text('2004')]),
          text(' and '),
          span(classes: 'hl', [text('2012')]),
          text('.'),
          br(),
          br(),
          span(classes: 'plate__sig', [
            text(
              '— not a band, not a brand. just the willing to express myself through music.',
            ),
          ]),
        ]),
      ]),
    ]),

    // ===== INTERSTITIAL / NOCTURNE =====
    // Typewriter band between Etymology and Signal. Each sentence types in
    // with per-character scramble (random glyph → locks to real char),
    // occasional corruption blocks mid-type, one RGB-split flash during the
    // hold, and a TV-static burst between sentences. Equipment-panel chrome
    // (corners + terminal labels) gives it weight without a red backdrop.
    // Sentences live in data-lines; behavior wired up in web/app.js.
    div(
      classes: 'nocturne',
      attributes: {
        'data-lines':
            'The spine walks at night, through empty streets.|'
            'The city takes its cables and connects to the spine.|'
            'The spine trembles.|'
            'The spine vibrates.|'
            'Through the spine the essence flows.|'
            'Through the spine the sound navigates.|'
            'The wire is connected.|'
            'It always connects at night.|'
            'The wires feed from the empty streets.',
      },
      [
        // Frame aligns corners/chrome/rules with the page content column.
        div(classes: 'nocturne__frame', [
          span(classes: 'nocturne__corner nocturne__corner--tl', []),
          span(classes: 'nocturne__corner nocturne__corner--tr', []),
          span(classes: 'nocturne__corner nocturne__corner--bl', []),
          span(classes: 'nocturne__corner nocturne__corner--br', []),
          div(classes: 'nocturne__chrome', [
            span(classes: 'nocturne__label', [text('> CH.01 · RX')]),
            span(classes: 'nocturne__badge', [text('LOOP · ∞')]),
          ]),
          div(classes: 'nocturne__inner', [
            span(classes: 'nocturne__str', []),
            span(
              classes: 'nocturne__caret',
              attributes: {'aria-hidden': 'true'},
              [],
            ),
          ]),
        ]),
      ],
    ),

    // ===== SIGNAL / LINKS =====
    section(id: 'signal', classes: 'signal', [
      div(classes: 'section__head', [
        div(classes: 'section__num', [text('03')]),
        div(classes: 'section__title', [text('SIGNAL / WHERE TO TUNE IN')]),
        div(classes: 'section__rule', []),
      ]),
      div(classes: 'sig-grid sig-grid--pair', [
        // Broadcast log — technical readout using only confirmed facts about
        // the project (no invented booking/press/merch copy).
        div(classes: 'sig sig--log', [
          div(classes: 'sig__label', [text('TRANSMISSION LOG')]),
          dl(classes: 'sig-log', [
            dt([text('Channel')]),
            dd([text('/awiredspine')]),
            dt([text('Catalog')]),
            dd([text('03 transmissions')]),
            dt([text('Window')]),
            dd([text('2004 → 2012')]),
            dt([text('Engine')]),
            dd([text('FL Studio · bedroom master')]),
            dt([text('Voice')]),
            dd([text('none / instrumental')]),
            dt([text('Format')]),
            dd([text('digital only')]),
          ]),
        ]),
        a(
          classes: 'sig sig--primary',
          href: 'https://soundcloud.com/awiredspine',
          target: Target.blank,
          attributes: {'rel': 'noopener'},
          [
            div(classes: 'sig__label', [text('PRIMARY CHANNEL')]),
            div(classes: 'sig__name', [text('SOUNDCLOUD')]),
            div(classes: 'sig__handle', [text('/awiredspine')]),
            div(classes: 'sig__hint', [
              text('three records · all streams · free to listen'),
            ]),
            div(classes: 'sig__arrow', [text('↗')]),
          ],
        ),
      ]),
    ]),

    // ===== FOOTER =====
    footer(classes: 'foot', [
      // Frame aligns footer content with the 1240px page column, while the
      // border-top on .foot itself stays full-bleed. Text column is placed
      // first so it sits flush with the content edge used by the sections
      // above (01/02/03 headers, plate, cards); spiral lives on the right.
      div(classes: 'foot__frame', [
      div(classes: 'foot__text', [
        div(classes: 'foot__big', [
          text('A\u00a0·\u00a0'),
          span(classes: 'foot__big-wired', [text('WIRED')]),
          text('\u00a0·\u00a0SPINE'),
        ]),
        div(classes: 'foot__small', [
          text('© 2004 — 2026 · thank you for listening'),
        ]),
        div(classes: 'foot__byline', [
          text('— made by one human · '),
          a(
            classes: 'foot__byline-link',
            href: 'https://rafahcf.com',
            target: Target.blank,
            attributes: {'rel': 'noopener'},
            [text('rafahcf.com ↗')],
          ),
        ]),
      ]),
      div(classes: 'foot__spiral', [
        img(src: 'assets/spine-logo.svg?v=5', alt: ''),
      ]),
      ]),
      // Marquee sits outside the frame so it spans the full viewport width.
      div(classes: 'foot__marquee', [
        div(classes: 'foot__marquee-track', [
          text(
            'PLEASE, PLEASE!!! · ROUTINE · INTERRUPTOR · PLEASE, PLEASE!!! · ROUTINE · INTERRUPTOR · PLEASE, PLEASE!!! · ROUTINE · INTERRUPTOR ·',
          ),
        ]),
      ]),
    ]),
    ]);
  }
}
