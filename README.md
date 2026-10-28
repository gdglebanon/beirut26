# DevFest Beirut 2026

Static event website for DevFest Beirut 2026, organized by GDG Coast Lebanon. Adapted from the GDG North Lebanon DevFest site with Beirut-specific copy, artwork, and sponsorship information.

## Preview

Serve this directory with any static file server, for example `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Content sources

- The [DevFest Beirut 2026 sponsorship deck](https://docs.google.com/presentation/d/1BuKJnen9-sMG9DPsjzI0P-iAUb-UXvu2qSyHo91uqT4/edit) supplies the event description, venue, audience estimate, contact email, and Partner/Sponsor packages.
- `assets/images/devfest-beirut-2026.svg` and `assets/images/beirut-poster-2026.jpg` are the artwork supplied for this site. The supplied `favicon-beirut.svg` is used for both the browser icon and the header logo. `assets/images/gdg-wordmark.svg` displays the supplied Google Developer Groups artwork in the header until the invitation button has passed on phones or the date and venue details have passed on desktop. `assets/images/hero-devfest.svg` uses the supplied DevFest wordmark, sweeping its Fest light left to right, blinking, then sweeping right to left. When the light is off, Fest appears green on the page background. The “Beirut 2026” line loads Google Sans from Google Fonts.

The November 28 event is an exclusive professional edition: attendance is free with a confirmed invitation. A public edition will be announced later. Until the organizers provide a confirmed registration page, invitation and sponsorship inquiries link to `info@gdglebanon.com`. The agenda, speakers, and commercial sponsor roster are intentionally unpublished until confirmed.

The compact Team section near the bottom lists the nine people requested by the organizer, with descriptions and locally saved portraits from the [GDG Coast Lebanon organizers page](https://gdg.community.dev/gdg-coast-lebanon/#organizers). Riham Zeidan, Mohamad Darsa, and Abdul Rahman Masri Attal appear first, in that order. The on-page button expands all nine cards. Cards link to verified LinkedIn profiles where available, or their current GDG profiles otherwise. Most LinkedIn links came from the [2025 DevFest team page](https://devfest25.gdglebanon.com/team).

The bottom Supporters section presents Google for Developers as the 2026 main supporter at the organizer's request. Its compact slider shows five 2025 sponsors (excluding KDD) and three selected 2025 partners, with locally saved logos from the [2025 sponsor page](https://devfest25.gdglebanon.com/partnersApplication). Semicolon, Murex, Supportful, and Speedlane appear first, in that order. The 2025 label distinguishes these organizations from current-year sponsors.

Near the bottom, Supporters is followed by Team, Good to know, and finally See you in Beirut.

On phones, a compact bottom navigation provides shortcuts to the main sections. It hides after scrolling down and returns when scrolling up. The header menu keeps access to the complete section list and invitation link.

The GDG Lebanon impact figures on the page (5,000+ members, 200+ on-site events, 5,000+ past DevFest attendees, active since 2017) were supplied by the organizers.

Edit `index.html` for content and `style.css` for presentation. There is no build step or JavaScript dependency.
