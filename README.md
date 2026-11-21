# DevFest Beirut 2026

Static event website for DevFest Beirut 2026, organized by GDG Coast Lebanon. Adapted from the GDG North Lebanon DevFest site with Beirut-specific copy, artwork, and sponsorship information.

## Preview

Serve this directory with any static file server, for example `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Content sources

- The [DevFest Beirut 2026 sponsorship deck](https://docs.google.com/presentation/d/1BuKJnen9-sMG9DPsjzI0P-iAUb-UXvu2qSyHo91uqT4/edit) supplies the event description, venue, audience estimate, contact email, and Partner/Sponsor packages.
- `assets/images/devfest-beirut-2026.svg` and `assets/images/beirut-poster-2026.jpg` are the artwork supplied for this site. The supplied `favicon-beirut.svg` is used for both the browser icon and the header logo. `assets/images/gdg-wordmark.svg` displays the supplied Google Developer Groups artwork in the header until the invitation button has passed on phones or the date and venue details have passed on desktop. `assets/images/hero-devfest.svg` uses the supplied DevFest wordmark, sweeping its Fest light left to right, blinking, then sweeping right to left. When the light is off, Fest appears green on the page background. The “Beirut 2026” line loads Google Sans from Google Fonts.

The November 28 event is an exclusive professional edition: attendance is free with a confirmed invitation. A public edition will be announced later. Until the organizers provide a confirmed registration page, invitation and sponsorship inquiries link to `info@gdglebanon.com`. The agenda runs from 8:30 a.m. to 3:35 p.m. Beirut time. The Agenda section starts collapsed with a static skeleton preview. Its native disclosure reveals all 13 time slots; opening `/#agenda` or following an Agenda link expands it automatically. The expanded schedule uses the organizer’s updated agenda, including the panel moderated by Mohammad Omar, Talk TBD at 11:20 a.m., and the poster-confirmed talks by Aboard, Google, Lyxa, Semicolon and Jana Kabrit. The agenda includes a notice that it is subject to change. No additional speaker or session details are inferred.

The compact Team section near the bottom lists the nine people requested by the organizer, with descriptions and locally saved portraits from the [GDG Coast Lebanon organizers page](https://gdg.community.dev/gdg-coast-lebanon/#organizers). Riham Zeidan, Mohamad Darsa, and Abdul Rahman Masri Attal appear first, in that order. The on-page button expands all nine cards. Cards link to verified LinkedIn profiles where available, or their current GDG profiles otherwise. Most LinkedIn links came from the [2025 DevFest team page](https://devfest25.gdglebanon.com/team).

The bottom Supporters section uses the [DevFest Beirut 2026 GDG event page](https://gdg.community.dev/events/details/google-gdg-coast-lebanon-presents-devfest-beirut-2026/) for its initial sponsor and partner roster and logo assets. Semicolon and KDD were added from the organizer's supplied details and logos. The current Semicolon logo is `assets/images/sponsors-2026/semicolon.png`; KDD uses `assets/images/sponsors-2026/kdd.png`. Both are unchanged copies of the supplied PNGs. Sponsors and partners are alphabetized within their groups, with KDD’s logo card placed last in Partners as requested. Google for Developers has a distinct Community Sponsor card of the same size; the four other sponsors are labeled Sponsor without tier names. KDD is an F&B Partner, with the same green Partner styling. KDD’s card and popup use the supplied company description and LinkedIn link. Clicking a card opens a popup with its description, while each external link remains visible separately. The organizer supplied the descriptions for Aboard, Google for Developers, KDD, Lyxa, Murex, Semicolon, Logisoft, and Supportful; the Software Engineering Excellence description comes from the event page. Sponsor cards appear in two columns at all widths. The initial logos are local copies of the images served by the event page's CDN.

Near the bottom, the confirmed Supporters section begins with a closed, expandable sponsorship package card above the sponsor logos, then shows the sponsor and partner roster. Team, Good to know, and See you in Beirut follow.

On phones, a compact bottom navigation provides shortcuts to the main sections. It hides after scrolling down and returns when scrolling up. The header menu keeps access to the complete section list and invitation link.

The GDG Lebanon impact figures on the page (5,000+ members, 200+ on-site events, 5,000+ past DevFest attendees, active since 2017) were supplied by the organizers.

Edit `index.html` for content and `style.css` for presentation. There is no build step or JavaScript dependency.

## Search visibility

The production URL is `https://devfest26.gdglebanon.com/`. `index.html` uses it for the canonical URL and social previews; `sitemap.xml` lists the single indexable page, and `robots.txt` points crawlers to that sitemap. Update all three if the domain changes.

After deploying these files, verify the URL-prefix property in [Google Search Console](https://search.google.com/search-console/), submit `https://devfest26.gdglebanon.com/sitemap.xml`, and use URL Inspection to request indexing of the home page. Search indexing is not guaranteed. This invitation-only edition is not eligible for Google's [event rich result experience](https://developers.google.com/search/docs/appearance/structured-data/event), so the page does not declare Event rich-result markup.

## Agenda speaker portraits

Names, positions, organizations and detailed session titles were transcribed from the organizer’s supplied “DevFest Lebanon 2026 Posters” folder. The two panel posters each identify four participants; no moderator role is inferred from their order. These replace the generic AI and Software Engineering panel titles. Aboard, Google, Lyxa, Semicolon and the 2:50 p.m. talk use their matching individual posters. Mohammad Omar’s separate solo session was explicitly removed; his portrait and CTO position are used only for his existing Murex moderator role. No additional panelists are inferred for the 10:50 a.m. panel; the 11:20 a.m. session is labeled Talk TBD.

`assets/speakers-2026.json` records the transcribed metadata and poster source paths. Circular portraits use a CSS window onto a selected region of the original supplied PNG, preserving the photographs without AI generation or retouching. The eight source posters are shared by all fourteen profiles. To substitute standalone headshots later, replace the portrait images and remove their per-image window offsets.
