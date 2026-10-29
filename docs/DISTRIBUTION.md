# Distribution

Streaming distribution for the A WIRED SPINE catalog goes through **CD Baby** (account: awiredspine@gmail.com). SoundCloud stays as the free, primary listening channel linked from the site.

## Status

| Release | Year | CD Baby | Notes |
| --- | --- | --- | --- |
| ROUTINE | 2011 | Live (approved Oct 2026) | On Spotify, Apple Music, YouTube Music and the rest. Artist: https://open.spotify.com/artist/0MqExRl9ITgoQdbi3kObYW |
| EP-1 | 2011 | Not submitted | Masters ready |
| PLEASE, PLEASE!!! | 2010 | Not submitted | Masters transcoded from ~130 to 145 kbps MP3 |
| INTERRUPTOR | 2006 | Not submitted | Masters transcoded from 192 kbps MP3 |

## Masters

Masters live in `assets/audio/_CD Baby/` (ignored by git, too large for the repo):

- One folder per release, named `A Wired Spine - <Title> (<Year>)`.
- Audio: WAV, 16-bit, 44.1 kHz, stereo, named `NN - Track Title.wav`.
- Artwork: `cover.jpg`, 3000 x 3000, sRGB. Source in `_cover-source/`.
- `metadata.csv`: album, year, track order, titles, original titles, durations, source quality.

## Release settings (reuse for every release)

- **Package:** Standard album ($14.99, one-time per release). No CDB Boost, no HearNow.
- **Artist:** A Wired Spine. Label and copyright owner left blank (default to artist name).
- **Release date:** the original release date (CD Baby shows past dates as the release date).
- **Language:** English for titles; every track set to "No lyrics / Instrumental".
- **Genres:** Electronic / Ambient, Avant Garde / Experimental. Mood/style: Type: Experimental. Artist location: Colombia.
- **Tracks:** not explicit, not live, original composition.
- **Songwriter:** full legal name (CD Baby requires it, aliases are not accepted), 100% music, no publisher.
- **ISRC and UPC:** assigned by CD Baby for free.
- **Stores:** downloads + streaming, all stores, all territories.
- **Partner artist IDs:** new artist profiles on Spotify, Apple Music and YouTube Music were created with ROUTINE. Later releases must select those existing profiles.
- **Social video monetization:** skipped for now (can be enabled later).

## Account

- Payout: PayPal. Pay point: $100.
- Tax: W-8BEN submitted. Colombia has no US tax treaty, so US-source royalties are withheld at 30%.

## Keep dates in sync

When a release date changes, update it in all three places:

1. CD Baby (release date).
2. This repo: `web/app.js` (`RELEASES`; the Spotify link lives there and in the SIGNAL section of `lib/app.dart`), `lib/app.dart` and `lib/main.server.dart` if the catalog window changes, and `README.md`.
3. SoundCloud: the album and every track (track edit > Advanced settings > Release date).

SoundCloud stores dates at midnight UTC, so pages viewed from Colombia show the previous day. The stored value is what matters.

## Next steps

- Claim the artist profile on Spotify for Artists (ROUTINE is live; artist ID `0MqExRl9ITgoQdbi3kObYW`).
- Submit EP-1, PLEASE, PLEASE!!! and INTERRUPTOR with the same settings.
