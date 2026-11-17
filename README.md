# DevFest Beirut 2026

Static event website for DevFest Beirut 2026, organized by GDG Coast Lebanon. Adapted from the GDG North Lebanon DevFest site with Beirut-specific copy, artwork, and sponsorship information.

## Preview

Serve this directory with any static file server, for example `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Content sources

- The [DevFest Beirut 2026 sponsorship deck](https://docs.google.com/presentation/d/1BuKJnen9-sMG9DPsjzI0P-iAUb-UXvu2qSyHo91uqT4/edit) supplies the event description, venue, audience estimate, contact email, and Partner/Sponsor packages.
- `assets/images/devfest-beirut-2026.svg` and `assets/images/beirut-poster-2026.jpg` are the artwork supplied for this site. The supplied `favicon-beirut.svg` is used for both the browser icon and the header logo. `assets/images/gdg-wordmark.svg` displays the supplied Google Developer Groups artwork in the header until the invitation button has passed on phones or the date and venue details have passed on desktop. `assets/images/hero-devfest.svg` uses the supplied DevFest wordmark, sweeping its Fest light left to right, blinking, then sweeping right to left. When the light is off, Fest appears green on the page background. The “Beirut 2026” line loads Google Sans from Google Fonts.

The November 28 event is an exclusive professional edition: attendance is free with a confirmed invitation. A public edition will be announced later. Until the organizers provide a confirmed registration page, invitation and sponsorship inquiries link to `info@gdglebanon.com`. The agenda is not published yet; speakers remain unconfirmed.

The compact Team section near the bottom lists the nine people requested by the organizer, with descriptions and locally saved portraits from the [GDG Coast Lebanon organizers page](https://gdg.community.dev/gdg-coast-lebanon/#organizers). Riham Zeidan, Mohamad Darsa, and Abdul Rahman Masri Attal appear first, in that order. The on-page button expands all nine cards. Cards link to verified LinkedIn profiles where available, or their current GDG profiles otherwise. Most LinkedIn links came from the [2025 DevFest team page](https://devfest25.gdglebanon.com/team).

The bottom Supporters section uses the [DevFest Beirut 2026 GDG event page](https://gdg.community.dev/events/details/google-gdg-coast-lebanon-presents-devfest-beirut-2026/) for its current sponsor and partner roster and logo assets. Sponsors and partners are alphabetized within their groups. Google for Developers has a distinct Community Sponsor card of the same size; the three other sponsors are labeled Sponsor without tier names. Clicking a card opens a popup with its description, while each website link remains visible separately. The organizer supplied the descriptions for Aboard, Google for Developers, Lyxa, Murex, Logisoft, and Supportful; the Software Engineering Excellence description comes from the event page. On phones the cards appear in two columns. Logos are local copies of the images served by the event page's CDN.

Near the bottom, the confirmed Supporters section begins with a closed, expandable sponsorship package card above the sponsor logos, then shows the sponsor and partner roster. Team, Good to know, and See you in Beirut follow.

On phones, a compact bottom navigation provides shortcuts to the main sections. It hides after scrolling down and returns when scrolling up. The header menu keeps access to the complete section list and invitation link.

The GDG Lebanon impact figures on the page (5,000+ members, 200+ on-site events, 5,000+ past DevFest attendees, active since 2017) were supplied by the organizers.

Edit `index.html` for content and `style.css` for presentation. There is no build step or JavaScript dependency.

## Search visibility

The production URL is `https://devfest26.gdglebanon.com/`. `index.html` uses it for the canonical URL and social previews; `sitemap.xml` lists the single indexable page, and `robots.txt` points crawlers to that sitemap. Update all three if the domain changes.

After deploying these files, verify the URL-prefix property in [Google Search Console](https://search.google.com/search-console/), submit `https://devfest26.gdglebanon.com/sitemap.xml`, and use URL Inspection to request indexing of the home page. Search indexing is not guaranteed. This invitation-only edition is not eligible for Google's [event rich result experience](https://developers.google.com/search/docs/appearance/structured-data/event), so the page does not declare Event rich-result markup.
