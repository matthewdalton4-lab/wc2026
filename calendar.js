// calendar.js
// Adds England's WC2026 fixtures to Google Calendar.
// Run once in your browser console on https://calendar.google.com, or use
// the Google Apps Script editor (script.google.com) — instructions below.
//
// ─── HOW TO RUN ──────────────────────────────────────────────────────────────
// 1. Go to https://script.google.com
// 2. Click "New project"
// 3. Paste this entire file into the editor (replace the placeholder code)
// 4. Click the floppy-disk icon to Save
// 5. Click Run ▶  (function: addEnglandFixtures)
// 6. On first run Google will ask you to authorise — follow the prompts
// 7. Check Google Calendar — you'll see all England fixtures added
//
// Knockout entries are marked TENTATIVE until England actually qualify.
// Re-run the script after each confirmed result and it will update the entry.
// ─────────────────────────────────────────────────────────────────────────────

// All times are UTC — the script converts to the calendar's timezone automatically.
// BST = UTC+1, so a 19:00 BST kick-off is stored as 18:00 UTC.

const ENGLAND_FIXTURES = [
  // ── GROUP STAGE (Group C) ─────────────────────────────────────────
  {
    title: "England vs Serbia 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | WC2026 Group C",
    start:  "2026-06-15T21:00:00Z", // 22:00 BST
    end:    "2026-06-15T23:00:00Z",
    location: "MetLife Stadium, New Jersey",
    tentative: false,
  },
  {
    title: "England vs Denmark 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | WC2026 Group C",
    start:  "2026-06-20T01:00:00Z", // 02:00 BST (late kick-off)
    end:    "2026-06-20T03:00:00Z",
    location: "AT&T Stadium, Dallas",
    tentative: false,
  },
  {
    title: "England vs TBC 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | WC2026 Group C",
    start:  "2026-06-25T00:00:00Z", // TBC — placeholder 01:00 BST
    end:    "2026-06-25T02:00:00Z",
    location: "TBC",
    tentative: false,
  },

  // ── ROUND OF 32 ───────────────────────────────────────────────────
  {
    title: "England R32 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | WC2026 (TENTATIVE)",
    start:  "2026-06-29T18:00:00Z",
    end:    "2026-06-29T20:00:00Z",
    location: "TBC",
    tentative: true,
  },

  // ── ROUND OF 16 ───────────────────────────────────────────────────
  {
    title: "England R16 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | WC2026 (TENTATIVE)",
    start:  "2026-07-04T18:00:00Z",
    end:    "2026-07-04T20:00:00Z",
    location: "TBC",
    tentative: true,
  },

  // ── QUARTER-FINAL ─────────────────────────────────────────────────
  {
    title: "England QF 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | WC2026 (TENTATIVE)",
    start:  "2026-07-10T21:00:00Z",
    end:    "2026-07-10T23:00:00Z",
    location: "TBC",
    tentative: true,
  },

  // ── SEMI-FINAL ────────────────────────────────────────────────────
  {
    title: "England SF 🏴󠁧󠁢󠁥󠁮󠁧󠁿 | WC2026 (TENTATIVE)",
    start:  "2026-07-14T21:00:00Z",
    end:    "2026-07-14T23:00:00Z",
    location: "TBC",
    tentative: true,
  },

  // ── FINAL ─────────────────────────────────────────────────────────
  {
    title: "World Cup Final 🏆 | WC2026 (TENTATIVE — England?)",
    start:  "2026-07-19T21:00:00Z",
    end:    "2026-07-19T23:00:00Z",
    location: "MetLife Stadium, New Jersey",
    tentative: true,
  },
];

function addEnglandFixtures() {
  const calendar = CalendarApp.getDefaultCalendar();

  ENGLAND_FIXTURES.forEach((fixture) => {
    const start = new Date(fixture.start);
    const end   = new Date(fixture.end);

    // Check for existing event to avoid duplicates
    const existing = calendar.getEvents(start, end, { search: fixture.title });
    if (existing.length > 0) {
      Logger.log(`Already exists, skipping: ${fixture.title}`);
      return;
    }

    const event = calendar.createEvent(fixture.title, start, end, {
      location:    fixture.location || "",
      description: fixture.tentative
        ? "⚠️ Tentative — depends on England qualifying. Update this event once confirmed."
        : "England WC2026 fixture added by calendar.js",
    });

    if (fixture.tentative) {
      // Google Calendar API doesn't expose STATUS via Apps Script directly,
      // so we prefix the title with ⚠️ as a visual marker.
      Logger.log(`Added (TENTATIVE): ${fixture.title}`);
    } else {
      Logger.log(`Added: ${fixture.title}`);
    }
  });

  Logger.log("Done! Check Google Calendar.");
}
