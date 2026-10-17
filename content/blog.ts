export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorRole: string
  publishedAt: string
  readMinutes: number
  tags: string[]
  /** Real body copy — no placeholder text anywhere. */
  body: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-much-does-it-cost-to-rent-gear-in-bangladesh",
    title: "What It Actually Costs to Rent Gear in Bangladesh",
    excerpt:
      "Buying a full kit is overkill for a weekend trip. Here is how daily rental pricing works on GearUp and what you can realistically save.",
    category: "Cost Guide",
    author: "GearUp Team",
    authorRole: "Editorial",
    publishedAt: "2026-09-18",
    readMinutes: 6,
    tags: ["Pricing", "Budget", "Guide"],
    body: [
      "Most people do not need to own a tent. If you camp four or five times a year, renting costs a fraction of what buying does — and you are never stuck storing a tent in a flat in Dhaka.",
      "Rental pricing on GearUp is charged per day. The total you see at checkout is the daily rate multiplied by the number of days in your range, so a three-day hire of a ৳1,200 item lands at ৳3,600. Providers set their own rates, so the same category can vary quite a bit between listings.",
      "The three biggest levers on what you pay are duration, seasonality and lead time. Weekday rentals are consistently cheaper than weekend ones, and booking a week ahead usually beats booking the night before, because popular listings near Dhaka run out first.",
      "There is no listing fee and no membership charge. You only pay for the days you actually use the gear, and Stripe handles the transaction so there is no cash handover to worry about.",
    ],
  },
  {
    slug: "how-to-become-a-gear-provider",
    title: "How to Become a Gear Provider on GearUp",
    excerpt:
      "A practical walkthrough of listing your equipment, pricing it sensibly, and handling your first rental orders.",
    category: "For Providers",
    author: "GearUp Team",
    authorRole: "Editorial",
    publishedAt: "2026-09-02",
    readMinutes: 7,
    tags: ["Providers", "Earnings", "Getting Started"],
    body: [
      "If you own equipment that sits unused most of the year, GearUp gives it a second life while paying for its upkeep. Most listings start earning within the first few weeks.",
      "Register with the Provider role, then add your first listing from the provider dashboard. Photography matters more than anything else — clear, well-lit photos of the actual item consistently receive more bookings than phone snapshots.",
      "Price against comparable listings in the same category rather than against what you paid for it. Gear depreciates, but a rental only needs to cover depreciation, storage and your time.",
      "Orders arrive in your dashboard with a status you control: placed, confirmed, paid, picked up, returned. Confirm quickly — response time is the single biggest factor renters mention when they choose between providers.",
      "Once a rental is returned you can review the renter, and they can review you. Both ratings are visible on your listings, so handling gear carefully pays off directly.",
    ],
  },
  {
    slug: "camping-kit-checklist-for-bandladesh",
    title: "The Camping Kit Checklist for Bangladesh Triangles",
    excerpt:
      "Monsoon humidity, river crossings and sudden weather changes change what you actually need to pack. Here is our field-tested list.",
    category: "Field Guide",
    author: "GearUp Team",
    authorRole: "Editorial",
    publishedAt: "2026-08-21",
    readMinutes: 8,
    tags: ["Camping", "Checklist", "Outdoor"],
    body: [
      "Renting for your first trip is the sensible move, but renting the wrong things is not. Most first-timers overpack shelter and underpack for humidity.",
      "Shelter: a two-person dome tent with a full rainfly and sealed seams is enough for two nights in light rain. Check that every pole is present before you leave — a missing pole is the most common rental complaint we see.",
      "Sleeping: a sleeping bag rated at least 5°C below the forecast overnight low, plus a closed-cell foam mat. In the hills it can drop noticeably after midnight even in September.",
      "Water: two litres per person per day minimum, plus a purification tab. Do not rely on river or stream water, even in areas that look clean.",
      "Storage: dry bags, not plastic bags. A single torn bag in 90% humidity will undo an otherwise careful packing job.",
      "Add a headlamp with spare cells, a basic first-aid kit, and a charged power bank. Rent the bulky items — tent, sleeping bag, stove — and buy the small consumables yourself.",
    ],
  },
  {
    slug: "protecting-your-gear-during-a-rental",
    title: "Protecting Your Gear During a Rental",
    excerpt:
      "Condition photos, clear handover notes and prompt status updates prevent almost every dispute. Here is the process that works.",
    category: "Safety",
    author: "GearUp Team",
    authorRole: "Editorial",
    publishedAt: "2026-08-08",
    readMinutes: 5,
    tags: ["Safety", "Providers", "Best Practice"],
    body: [
      "Nearly every dispute we handle traces back to one thing: nobody documented the condition of the item at handover.",
      "Photograph every face of the gear before it leaves your hands — serial numbers, worn areas, existing scratches. Upload them with the order. This takes two minutes and settles almost every argument later.",
      "Write short handover notes covering what is included, what the renter must not do, and when it is due back. Renting a bicycle with a quick note about the gear-change mechanism prevents most roadside callouts.",
      "Move the order through statuses as things happen. A renter who sees confirmed, then paid, then picked up, knows exactly where things stand and does not chase you.",
      "If something is damaged, document it the same way before the gear comes home and raise it from the order page within 48 hours. Damage protection claims are reviewed on evidence, not assertion.",
    ],
  },
  {
    slug: "best-spots-for-cycling-around-dhaka",
    title: "Best Cycling Routes Around Dhaka",
    excerpt:
      "From the smooth loops of Mirpur to the harder climbs heading north. Routes, distances and where to rent the bike.",
    category: "Field Guide",
    author: "GearUp Team",
    authorRole: "Editorial",
    publishedAt: "2026-07-25",
    readMinutes: 6,
    tags: ["Cycling", "Dhaka", "Routes"],
    body: [
      "City traffic makes riding in Dhaka genuinely unpleasant, which is exactly why the outer ring and the northern approaches have become the training grounds of choice.",
      "Mirpur and the Hatirjheel loop are the smoothest options for a first long ride — wide roads, minimal gradients and plenty of places to stop. Roughly a 25 km round trip.",
      "Savar and the Dhaka–Rajshahi road climb gently for the first 15 km before the gradient settles. It is the most popular weekend route on the platform, so book the bike ahead on Saturdays.",
      "For a proper climb, take the road past Gabtali toward Manikganj. It is steeper, quieter, and worth the extra effort if you want a real test.",
      "Check the tyre pressure and brakes before every ride, especially on a bike that has been idle. Rentals get used hard — a ten-minute check prevents most roadside issues.",
    ],
  },
  {
    slug: "how-deposits-and-refunds-work",
    title: "How Deposits and Refunds Work on GearUp",
    excerpt:
      "What is held, when it is released, and what happens if a rental ends early. The payment side explained without the jargon.",
    category: "Cost Guide",
    author: "GearUp Team",
    authorRole: "Editorial",
    publishedAt: "2026-07-10",
    readMinutes: 5,
    tags: ["Payments", "Refunds", "Stripe"],
    body: [
      "Every rental runs through Stripe, which means no cash changes hands and both sides have a record of exactly what was agreed.",
      "When a rental is created it is only placed. The provider confirms, you pay through Stripe Checkout, and the order moves to paid. You are not charged for a booking that the provider never confirmed.",
      "Deposits are held against the item rather than added to your rental cost. They are released back once the gear is returned and both sides are satisfied with its condition.",
      "Cancelling before pickup is straightforward — cancel a placed or confirmed order and nothing is charged. After pickup, contact the provider to arrange an early return so the rental days can be adjusted.",
      "If a claim is raised after return, the deposit may be partially or fully withheld while it is assessed. Claims are reviewed within 48 hours using the handover photographs.",
    ],
  },
]

export const BLOG_CATEGORIES = Array.from(
  new Set(BLOG_POSTS.map((post) => post.category))
).sort()

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

/** Newest first. */
export function getLatestPosts(limit = 3): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit)
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}