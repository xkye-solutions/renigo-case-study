---
order: 2
title: "Facility booking"
icon: "calendar-event"
goto: {"screen": "facilities", "action": "book", "data": {"id": "pool"}}
before: "Walk to the admin office, ask if Saturday is free, write your name in the logbook."
after: "See open slots for the next 10 days and confirm in three taps."
decisions: [{"lead": "Taken slots stay visible but struck through", "text": ", so people see the facility is popular rather than wondering if it's broken."}, {"lead": "The confirm button says what you're booking", "text": " (\"Confirm · 18 Oct, 4:00 PM\") so there's no surprise afterwards."}]
try: "Try booking the pool"
---

Residents browse by category and book in a single sheet: pick a day, a two-hour slot and the number of guests.
