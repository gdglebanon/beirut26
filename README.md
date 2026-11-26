# DevFest Beirut 2026

Static event website for DevFest Beirut 2026, organized by GDG Coast Lebanon. Adapted from the GDG North Lebanon DevFest site with Beirut-specific copy, artwork, and sponsorship information.

## Preview

Serve this directory with any static file server, for example `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Content sources

- The [DevFest Beirut 2026 sponsorship deck](https://docs.google.com/presentation/d/1BuKJnen9-sMG9DPsjzI0P-iAUb-UXvu2qSyHo91uqT4/edit) supplies the event description, venue, audience estimate, contact email, and Partner/Sponsor packages.
- `assets/images/devfest-beirut-2026.svg` and `assets/images/beirut-poster-2026.jpg` are the artwork supplied for this site. The supplied `favicon-beirut.svg` is used for both the browser icon and the header logo. `assets/images/gdg-wordmark.svg` displays the supplied Google Developer Groups artwork in the header until the invitation button has passed on phones or the date and venue details have passed on desktop. `assets/images/hero-devfest.svg` uses the supplied DevFest wordmark, sweeping its Fest light left to right, blinking, then sweeping right to left. When the light is off, Fest appears green on the page background. The “Beirut 2026” line loads Google Sans from Google Fonts.

The November 28 event is an exclusive professional edition: attendance is free with a confirmed invitation. A public edition will be announced later. Until the organizers provide a confirmed registration page, invitation and sponsorship inquiries link to `info@gdglebanon.com`. The agenda runs from 8:30 a.m. to 3:35 p.m. Beirut time. The Agenda section starts collapsed with a static skeleton preview. Its native disclosure reveals all 13 time slots; opening `/#agenda` or following an Agenda link expands it automatically. The expanded schedule follows the organizer's latest table of activities, times, locations, speakers and moderators. The agenda includes a notice that it is subject to change.

The compact Team section near the bottom lists the nine people requested by the organizer, with descriptions and locally saved portraits from the [GDG Coast Lebanon organizers page](https://gdg.community.dev/gdg-coast-lebanon/#organizers). Riham Zeidan, Mohamad Darsa, and Abdul Rahman Masri Attal appear first, in that order. The on-page button expands all nine cards. Cards link to verified LinkedIn profiles where available, or their current GDG profiles otherwise. Most LinkedIn links came from the [2025 DevFest team page](https://devfest25.gdglebanon.com/team).

The bottom Supporters section uses the [DevFest Beirut 2026 GDG event page](https://gdg.community.dev/events/details/google-gdg-coast-lebanon-presents-devfest-beirut-2026/) for its initial sponsor and partner roster and logo assets. Semicolon and KDD were added from the organizer's supplied details and logos. The current Semicolon logo is `assets/images/sponsors-2026/semicolon.png`; KDD uses `assets/images/sponsors-2026/kdd.png`. Both are unchanged copies of the supplied PNGs. Sponsors and partners are alphabetized within their groups, with KDD’s logo card placed last in Partners as requested. Google for Developers has a distinct Community Sponsor card of the same size; the four other sponsors are labeled Sponsor without tier names. KDD is an F&B Partner, with the same green Partner styling. KDD’s card and popup use the supplied company description and LinkedIn link. Clicking a card opens a popup with its description, while each external link remains visible separately. The organizer supplied the descriptions for Aboard, Google for Developers, KDD, Lyxa, Murex, Semicolon, Logisoft, and Supportful; the Software Engineering Excellence description comes from the event page. Sponsor cards appear in two columns at all widths. The initial logos are local copies of the images served by the event page's CDN.

Near the bottom, the confirmed Supporters section begins with a closed, expandable sponsorship package card above the sponsor logos, then shows the sponsor and partner roster. Team, Good to know, and See you in Beirut follow.

On phones, a compact bottom navigation provides shortcuts to the main sections. It hides after scrolling down and returns when scrolling up. The header menu keeps access to the complete section list and invitation link.

The GDG Lebanon impact figures on the page (5,000+ members, 200+ on-site events, 5,000+ past DevFest attendees, active since 2017) were supplied by the organizers.

Edit `index.html` for content and `style.css` for presentation. The homepage has no build step or JavaScript dependency. After agenda changes, regenerate the session pages and feedback feed with `python3 scripts/build_sessions.py`.

## Personal banner generator

The homepage includes a clickable badge callout and two hero buttons: a blue View agenda button and an outlined Create your social media badge button. The whole badge section starts collapsed; any Create badge link or a direct `#my-banner` URL opens it automatically. The top navigation also links to Create badge. Agenda and sponsorship shortcuts expand their respective sections.

The `#my-banner` section lets visitors create a 1080 × 1350 PNG with their name, optional job title, company and photo. It defaults to “I’m Attending”; the selector also offers Speaker, Proud Sponsor, Proud Partner, Organizer and Volunteer. Colors automatically follow the selected role using the supplied poster palette (blue, yellow, green, green, red and rose respectively). A single Google multicolor checkbox overrides the role color with a smooth blue → green → yellow → red gradient angled 30° from horizontal using Google’s four colors, matching the Community Sponsor accent and avoiding a blue-to-red purple transition; unchecking it restores the current role’s palette. Sponsors and partners default to fitting the entire uploaded logo. The optional “Adjust your image” controls start collapsed after an upload. All images support zoom and position sliders, dragging in the preview, scrolling over the image to zoom, and a framing reset. Without an image, the export uses initials.

`assets/banner/banner.js` draws both the live preview and the downloaded PNG on the same canvas. `assets/banner/banner.css` styles the section. The SVG artwork and local Google Sans fonts in that directory were extracted from the organizer’s supplied “DevFest 2026 Coast Lebanon — Main Poster (1).html”; its bundled scripts are not used. Images and form details remain in the browser and are not uploaded or saved. Creating a banner does not register someone for the invitation-only event.

The “Copy or share your social media post” panel below the generator is always visible whenever the badge designer is open and provides editable, role-aware sharing text, a Copy text action, and LinkedIn, WhatsApp and email links. Native sharing is available on supported browsers. The LinkedIn button passes the current editable message to the feed composer using `https://www.linkedin.com/feed/?shareActive=true&text=…`; the visitor attaches their downloaded PNG before posting. This is an undocumented LinkedIn route and prefill support varies by client, so Copy text remains available as a fallback. The LinkedIn action does not use the clipboard. If the separate Copy text action cannot access the clipboard, the message is selected with manual copying instructions. Custom edits are preserved when changing roles until Reset message is selected. `assets/banner/share.js` manages this panel. No social post or message is sent automatically.

## Search visibility

The production URL is `https://devfest26.gdglebanon.com/`. `index.html` uses it for the canonical URL and social previews; `sitemap.xml` lists the homepage, session directory and individual session pages, and `robots.txt` points crawlers to that sitemap. Update the origin in `scripts/build_sessions.py` as well if the domain changes.

After deploying these files, verify the URL-prefix property in [Google Search Console](https://search.google.com/search-console/), submit `https://devfest26.gdglebanon.com/sitemap.xml`, and use URL Inspection to request indexing of the home page. Search indexing is not guaranteed. This invitation-only edition is not eligible for Google's [event rich result experience](https://developers.google.com/search/docs/appearance/structured-data/event), so the page does not declare Event rich-result markup.

## Agenda speaker portraits

The original speaker portraits came from the organizer’s supplied “DevFest Lebanon 2026 Posters” folder. The latest organizer agenda supplies the displayed names, roles, session titles, moderators and times where they differ from the posters. Aboard, Google, Lyxa, Semicolon and Jana Kabrit use their matching individual poster portraits. The AI and software engineering panels use portraits from their panel posters. Mohammad Omar uses his poster portrait in the AI Hype panel. Speakers without supplied portraits are shown with initials.

`assets/speakers-2026.json` records the original poster metadata and source paths; the current agenda in `index.html` follows the newer organizer schedule. Circular portraits use a CSS window onto a selected region of the original supplied PNG, preserving the photographs without AI generation or retouching. To substitute standalone headshots later, replace the portrait images and remove their per-image window offsets.

## Session feedback with Open Feedback

`openfeedback.json` is the public schedule source for the Open Feedback JSON URL setup. It contains all 13 agenda entries and 22 speakers; the keynote, five talks and four panels accept feedback. Check-in, lunch and closing have `hideInFeedback: true`. Dates use November 28, 2026 and the Beirut UTC+02:00 offset. Speaker avatars in the feed use neutral initials because the source portraits are full session posters; the website keeps its existing photographic portrait crops.

The event is connected to `gEQjsPtq6m2n4iTrwxe6`: [DevFest Beirut 2026 feedback](https://openfeedback.io/gEQjsPtq6m2n4iTrwxe6/2026-11-28). Each talk and panel in the homepage agenda has a closed-by-default **Rate this session** disclosure. Opening it loads native feedback buttons and an explicit Save comment form. The dedicated session pages show their feedback forms directly. There are no feedback frames or required external navigation. The collapsed agenda offers **View agenda as PDF** (the organizer’s supplied Google Drive document) and **View here & rate sessions**. The latter expands the on-page agenda.

`assets/sessions/feedback.js` renders the event’s current vote items as native controls. It loads the Firebase modules when a feedback panel approaches the viewport, shares one anonymous voter across all forms on the site, and provides in-place retries after loading errors. `feedback-client.mjs` pins Firebase’s official CDN modules at version 13.4.0; `feedback-service.mjs` uses the existing Open Feedback Firebase project through its public web configuration, loaded at runtime from Open Feedback’s Firebase Hosting `/__/firebase/init.json` endpoint via the Vercel rewrite `/api/openfeedback-config.json`. The provider’s public browser API key is not hard-coded in repository source; it remains visible to the browser at runtime, as Firebase web configuration is designed to be. The runtime loader verifies the expected project ID before initializing the client. This is client access under the existing security rules, not administrative access. No service account or private API key is used. The browser keeps its anonymous identity in local storage where permitted; blocking persistent storage limits identity retention to the current visit.

Votes write to `projects/{eventId}/userVotes` using the same field names and `active` / `deleted` / `hidden` transitions as Open Feedback. Boolean votes toggle in one document; comments can be saved, edited and removed. Hidden comments remain hidden on edit. Deterministic IDs prevent duplicate new boolean votes across tabs; existing vote IDs are reused. The UI waits for server acceptance before confirming a write and keeps unsaved comments after an error. Public counts and comments are read from the service-maintained `sessionVotes` aggregates. Voting windows and hide-until-voted result visibility are respected. Native anonymous identities are scoped to this website; they do not reuse an Open Feedback tab’s cross-origin identity.

For a replacement event or a fresh deployment:

1. Publish the repository, then enter `https://devfest26.gdglebanon.com/openfeedback.json` in Open Feedback's **JSON API URL** field. The file needs to be publicly accessible and allow cross-origin requests. `vercel.json` declares the CORS and caching headers for the existing Vercel deployment. A host-independent alternative after pushing to GitHub is `https://raw.githubusercontent.com/gdglebanon/beirut26/main/openfeedback.json`, which serves the same feed with CORS enabled.
2. Create the event and configure its voting form in the Open Feedback admin, including a text/comment item. The feedback choices and result visibility are controlled there; the JSON supplies the schedule, not the voting form. Open Feedback uses feedback votes rather than a built-in five-star rating.
3. Copy the event ID from its public URL (`https://openfeedback.io/EVENT_ID`) into `eventId` in `assets/sessions/feedback-config.js`. This is a public ID; no secret or admin API key belongs in the website. Publish the config change.
4. Verify the native voting buttons and comment form on the homepage and a session page. The options come from the event configuration, so voting-form edits in the Open Feedback admin do not require hard-coding new item IDs in this repository. The public event ID, expected Firebase project ID and public configuration URL are set in `assets/sessions/feedback-config.js`; no browser API-key literal belongs there. The client fetches that configuration from the provider at runtime.

The custom URLs are real static directories, so they need no SPA catch-all or backend. Static hosts normally redirect `/sessions/talk1` to `/sessions/talk1/`. `sessions/index.html` lists all ten sessions, and the homepage agenda provides both session-page links and in-place feedback forms.

| URL | Session |
| --- | --- |
| `/sessions/opening/` | Welcoming & Keynote |
| `/sessions/panel1/` | Building AI in Lebanon |
| `/sessions/talk1/` | AI-Powered Security — Ali Kalout |
| `/sessions/panel2/` | AI Hype vs. Ground Reality |
| `/sessions/panel3/` | Tech Startups in Lebanon |
| `/sessions/talk2/` | From Driverless Trains to Coding Agents — Freddy Demiane |
| `/sessions/panel4/` | Seniority in the Software Engineering Career in Lebanon |
| `/sessions/talk3/` | Inside Lyxa’s Engine — Mhamad Itawi |
| `/sessions/talk4/` | A Developer’s Guide to Web3 Security — Mohamad Mansouri |
| `/sessions/talk5/` | Measuring Quality and Cost with ADK and Gemini — Jana Kabrit |

The integration follows the public [vote actions](https://github.com/HugoGresse/open-feedback/blob/main/src/feedback/vote/voteActions.ts), [anonymous sign-in flow](https://github.com/HugoGresse/open-feedback/blob/main/src/feedback/auth/authActions.ts), and [result visibility rules](https://github.com/HugoGresse/open-feedback/blob/main/src/feedback/talk/core/voteResultsVisibility.ts). Feedback is still stored and moderated by Open Feedback. The website does not maintain a second comments database. Remote labels and comments are rendered as text, never HTML.

### Maintaining the schedule

The homepage agenda is the content source. Keep each `data-session-id` unchanged after feedback starts, even if you change a session title or time. Do not repurpose a session ID for a different talk. Regenerate the feed, speaker initials and static pages after any agenda change:

```sh
python3 scripts/build_sessions.py
python3 scripts/build_sessions.py --check
python3 -m unittest discover -s tests -p 'test_*.py'
node --test tests/*.test.cjs
```

Commit the generated files together with agenda changes; the deployed site needs no build command. The generator also refreshes `sitemap.xml`. The event ID is configured separately and does not require regeneration.
