/* Jamaica Vacation — facts only. No invented prices or ratings.
   Research date: November 22, 2026 (America/Chicago). Status notes can change. */
window.JV = window.JV || {};

JV.RESEARCH_DATE = "November 22, 2026";
JV.BOT_URL = "grokbot://app/v1/agent?id=c15f4037-78d5-4f7f-b44d-e4da4d53bbfb";
JV.BOT_ID = "c15f4037-78d5-4f7f-b44d-e4da4d53bbfb";

JV.LINKS = {
  c5: "https://enterjamaica.gov.jm/",
  c5Customs: "https://jca.gov.jm/individual/passenger/",
  entry: "https://www.visitjamaica.com/plan-your-adventure/travel-tips/entry-requirements/",
  reopenings: "https://www.visitjamaica.com/travel-alerts/hotel-reopenings/",
  alerts: "https://www.visitjamaica.com/travel-alerts/",
  pica: "https://www.pica.gov.jm/",
  stateDept: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Jamaica.html"
};

JV.DRIVE_NOTE = "Typical private-transfer times drawn from Jamaica transfer operators and travel guides (including reports updated in 2026). Traffic, cruise-ship days in Falmouth, rain, and time of day can add to the journey.";

JV.AREAS = [
  {
    id: "mobay",
    name: "Montego Bay",
    short: "MoBay",
    parish: "St. James",
    airport: "MBJ",
    airportName: "Sangster International Airport (MBJ)",
    whyAirport: "This is the right airport. The terminal is in Montego Bay — most hotels in town are 10–15 minutes away, and Rose Hall / Ironshore about 15–25 minutes.",
    driveFrom: { MBJ: "10–25 min (town 10–15 min; Rose Hall / Ironshore 15–25 min)", KIN: "About 3.5–4.5 hours — fly into MBJ instead" },
    overview: "Jamaica’s second city and the main tourist gateway. Sangster International Airport (MBJ) is here. The Hip Strip, Doctor’s Cave Beach, and a long row of large resorts sit in town and just east along the coast at Rose Hall. Many hotels marketed as “Montego Bay” are actually a short drive east in St. James.",
    vibe: "Beaches, large all-inclusives, shopping, and a busy town.",
    villaAreas: "Look at Ironshore, Coral Gardens, and Rose Hall villa compounds. Many homes are in gated compounds — always confirm security with the host.",
    stayNote: "This is one of the strongest areas for well-known all-inclusive resorts. Some Montego Bay properties were still reopening after Hurricane Melissa when this app was researched (November 22, 2026). Check the official Visit Jamaica list before you book."
  },
  {
    id: "stjames",
    name: "St. James",
    short: "St. James",
    parish: "St. James",
    airport: "MBJ",
    airportName: "Sangster International Airport (MBJ)",
    whyAirport: "Fly into MBJ. St. James is the parish that includes Montego Bay, Ironshore, Coral Gardens, and Rose Hall.",
    driveFrom: { MBJ: "15–25 min to Ironshore, Coral Gardens, and Rose Hall", KIN: "About 3.5–4.5 hours — fly into MBJ instead" },
    overview: "St. James is the parish around Montego Bay. If you want a villa or Airbnb just outside the city — Ironshore, Coral Gardens, Rose Hall — this is the area. The same MBJ airport and many of the same “Montego Bay” resorts serve this parish.",
    vibe: "Residential neighbourhoods, resort coast, and villas near the beach and golf courses.",
    villaAreas: "Ironshore is a well-known residential area east of the city, close to shopping and Rose Hall. Coral Gardens is an established residential community. Rose Hall has resort and villa compounds. Confirm each listing is actually gated.",
    stayNote: "All-inclusives along this coast are listed with Montego Bay as well, because that is how they are sold. Open both area pages when you compare."
  },
  {
    id: "trelawny",
    name: "Trelawny",
    short: "Trelawny",
    parish: "Trelawny",
    airport: "MBJ",
    airportName: "Sangster International Airport (MBJ)",
    whyAirport: "Fly into MBJ. Falmouth is about 40–65 minutes east of the airport. Duncans and Silver Sands take a little longer.",
    driveFrom: { MBJ: "Falmouth about 40–65 min; Duncans / Silver Sands about 50–80 min", KIN: "A long cross-island drive — fly into MBJ instead" },
    overview: "North-coast parish just east of St. James. Falmouth is the capital and a cruise port — traffic can slow down on ship days. The coast has large all-inclusives (including Excellence Oyster Bay and the Royalton Blue Waters complex) and the Silver Sands gated villa community near Duncans.",
    vibe: "Quieter coast than downtown Montego Bay, with big resorts and villa communities.",
    villaAreas: "Silver Sands, near Duncans, is a private gated villa community on the beach (official site: silversandsja.com). Other villas are spread along the Trelawny coast — confirm gate and security with the host.",
    stayNote: "Bahia Principe, which you have stayed at, is not inside Trelawny parish. It is in Runaway Bay, St. Ann, just over the parish line, about 1 hour 15 minutes to 1½ hours from MBJ. It is listed under Ocho Rios / Runaway Bay, with a reminder link here."
  },
  {
    id: "ochi",
    name: "Ocho Rios",
    short: "Ocho Rios",
    parish: "St. Ann",
    airport: "MBJ",
    airportName: "Sangster International Airport (MBJ)",
    whyAirport: "Most visitors fly into MBJ (about 1 hour 45 minutes to 2½ hours). Kingston (KIN) is a similar roughly 2-hour drive and only makes sense if you are also spending time in Kingston.",
    driveFrom: { MBJ: "About 1 hr 45 min–2 hr 30 min (Runaway Bay is a bit shorter)", KIN: "About 2 hours" },
    overview: "A major north-coast town in St. Ann, known for Dunn’s River Falls and a cluster of all-inclusive resorts. Runaway Bay, also in St. Ann and west of town, is where the Bahia Principe resorts are. Some nearby properties (for example Couples Tower Isle) sit just east of town in St. Mary.",
    vibe: "Resort town, waterfalls, and a busy craft and cruise stop.",
    villaAreas: "Drax Hall (including Drax Hall Country Club) and Richmond Estate are established gated communities in St. Ann, near Ocho Rios. Confirm current security with the host.",
    stayNote: "Bahia Principe Explore Jamaica and Bahia Principe Escape Runaway Bay are in Runaway Bay, St. Ann — close to the Trelawny border, not in Trelawny parish itself."
  },
  {
    id: "negril",
    name: "Negril",
    short: "Negril",
    parish: "Westmoreland / Hanover",
    airport: "MBJ",
    airportName: "Sangster International Airport (MBJ)",
    whyAirport: "Fly into MBJ, then drive west. Plan on about 1½–2¼ hours. Do not fly into Kingston unless you want a very long drive across the island.",
    driveFrom: { MBJ: "About 1 hr 30 min–2 hr 15 min (West End cliffs can add 10–15 min)", KIN: "A very long cross-island drive — fly into MBJ instead" },
    overview: "West-coast town famous for Seven Mile Beach and the West End cliffs. It sits across Westmoreland and Hanover. The transfer from MBJ follows a winding coast road through Lucea. Many well-known all-inclusives are on or near Seven Mile Beach.",
    vibe: "Sunsets, a long beach, and a more laid-back west-coast feel.",
    villaAreas: "Villas are common along Seven Mile Beach and the West End. Named gated communities are less clearly documented than in St. James or St. Ann — use the gated-community search and confirm a 24-hour gate with the host before you book.",
    stayNote: "Several Negril resorts were listed as open on Visit Jamaica’s reopening page when this app was researched, but always re-check current status."
  },
  {
    id: "portmore",
    name: "Portmore",
    short: "Portmore",
    parish: "St. Catherine",
    airport: "KIN",
    airportName: "Norman Manley International Airport (KIN)",
    whyAirport: "Fly into KIN in Kingston. Portmore is across the harbour — typically about 45–60 minutes, longer if the Causeway is busy. MBJ is a 3½–4½ hour drive.",
    driveFrom: { KIN: "About 45–60 min (Causeway traffic can add time)", MBJ: "About 3.5–4.5 hours — fly into KIN instead" },
    overview: "A large residential city in St. Catherine, across Kingston Harbour from the capital. It is popular with Jamaican families and returning residents, not a beach all-inclusive destination. You have stayed in an Airbnb in Portmore before.",
    vibe: "Residential communities, local life, and easy access to Kingston.",
    villaAreas: "Look at gated housing schemes such as Caribbean Estates and Phoenix Park Village. Caymanas Estate is a known residential area near Portmore — confirm gate and security with the host. Portmore Pines was not clearly verified as a gated community, so it is not listed as one here.",
    stayNote: "There are no well-known beach all-inclusive resorts in Portmore. Use villas, Airbnbs, or stay in Kingston and drive over."
  },
  {
    id: "kingston",
    name: "Kingston & St. Andrew",
    short: "Kingston",
    parish: "Kingston & St. Andrew",
    airport: "KIN",
    airportName: "Norman Manley International Airport (KIN)",
    whyAirport: "Fly into KIN. Downtown is often 20–30 minutes; New Kingston and uptown St. Andrew about 30–50 minutes, depending on traffic. Do not fly into MBJ unless you want a 3½–4½ hour drive.",
    driveFrom: { KIN: "20–40 min to most city hotels; 30–50 min+ to some uptown neighbourhoods", MBJ: "About 3.5–4.5 hours — fly into KIN instead" },
    overview: "Jamaica’s capital (Kingston) and the adjoining parish of St. Andrew, which includes many uptown residential neighbourhoods. This is a city trip: culture, food, business, and family visits — not a beach all-inclusive strip. Hotels are city hotels. Many homes in uptown St. Andrew sit in gated compounds or guarded neighbourhoods.",
    vibe: "Capital city, uptown neighbourhoods, and cultural sites.",
    villaAreas: "Norbrook (including Norbrook Heights), Cherry Gardens, Jack’s Hill, and Long Mountain Country Club are well-known St. Andrew addresses with many gated or guarded homes. Confirm security on the specific listing.",
    stayNote: "Expect regular city hotels (not all-inclusive resorts). A few verified official hotel sites are listed below."
  }
];

JV.NEARBY = {
  trelawny: [{ id: "bahia-explore", label: "Bahia Principe is just over the parish line in Runaway Bay, St. Ann" }],
  ochi: [{ id: "excellence-oyster", label: "Excellence Oyster Bay is west of here, in Trelawny" }]
};

JV.RESORTS = [
  /* Montego Bay / St. James */
  {
    id: "sandals-mobay",
    name: "Sandals Montego Bay",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "adults",
    official: "https://www.sandals.com/montego-bay/",
    status: { label: "Reopening December 18, 2026", asOf: "November 22, 2026", source: "Visit Jamaica hotel reopening page", url: "https://www.visitjamaica.com/travel-alerts/hotel-reopenings/" },
    note: "Adults-only Sandals resort, close to MBJ (the brand lists transfers at about 10 minutes). Official site said the resort was reopening December 18, 2026, and was open for bookings."
  },
  {
    id: "sandals-cay",
    name: "Sandals Caribbean Cay",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "adults",
    official: "https://www.sandals.com/caribbean-cay/",
    status: { label: "Reopening December 18, 2026", asOf: "November 22, 2026", source: "Visit Jamaica hotel reopening page (listed as Sandals Royal Caribbean, the former name)", url: "https://www.visitjamaica.com/travel-alerts/hotel-reopenings/" },
    note: "Adults-only. Formerly Sandals Royal Caribbean; the official site now uses the Caribbean Cay name. Visit Jamaica still listed the former name on its reopening page."
  },
  {
    id: "iberostar-suites",
    name: "Iberostar Selection Rose Hall Suites",
    areas: ["mobay","stjames"],
    place: "Rose Hall, Montego Bay, St. James",
    audience: "family",
    official: "https://www.iberostar.com/en/hotels/montego-bay/iberostar-selection-rose-hall-suites/",
    stayed: true,
    note: "All-inclusive, all-suites hotel in the Iberostar Rose Hall beachfront complex, about 15 minutes from MBJ according to the official site. You have stayed at an Iberostar all-inclusive in Montego Bay before. Confirm current opening status on Visit Jamaica, because some Rose Hall properties had staggered reopenings after Hurricane Melissa."
  },
  {
    id: "iberostar-waves",
    name: "Iberostar Waves Rose Hall Beach",
    areas: ["mobay","stjames"],
    place: "Rose Hall, Montego Bay, St. James",
    audience: "family",
    official: "https://www.iberostar.com/en/hotels/montego-bay/iberostar-waves-rose-hall-beach/",
    stayed: true,
    note: "All-inclusive hotel in the same Rose Hall beachfront complex as Iberostar Selection Rose Hall Suites. Guests at the Suites property can use some facilities here, according to Iberostar. Confirm current status before you book."
  },
  {
    id: "iberostar-joia",
    name: "JOIA Rose Hall by Iberostar",
    areas: ["mobay","stjames"],
    place: "Rose Hall, Montego Bay, St. James",
    audience: "adults",
    official: "https://www.iberostar.com/en/hotels/montego-bay/joia-rose-hall-by-iberostar/",
    note: "Adults-only Iberostar hotel at Rose Hall (formerly Iberostar Grand Rose Hall). Jamaica Information Service reported a December 2026 reopening among other properties; dates can change, so confirm on the official site and Visit Jamaica."
  },
  {
    id: "hyatt-ziva",
    name: "Hyatt Ziva Rose Hall",
    areas: ["mobay","stjames"],
    place: "Rose Hall, Montego Bay, St. James",
    audience: "family",
    official: "https://www.resortsbyhyatt.com/ziva/ziva-rose-hall",
    status: { label: "Reported closed after Hurricane Melissa; reopening expected in 2027", asOf: "November 22, 2026", source: "Visit Jamaica hotel reopening page and later press reports", url: "https://www.visitjamaica.com/travel-alerts/hotel-reopenings/" },
    note: "Family all-inclusive at Rose Hall. Confirm the latest date on the official Hyatt page and Visit Jamaica before you plan around it."
  },
  {
    id: "hyatt-zilara",
    name: "Hyatt Zilara Rose Hall",
    areas: ["mobay","stjames"],
    place: "Rose Hall, Montego Bay, St. James",
    audience: "adults",
    official: "https://www.resortsbyhyatt.com/zilara/zilara-rose-hall",
    status: { label: "Reported closed after Hurricane Melissa; reopening expected in 2027", asOf: "November 22, 2026", source: "Visit Jamaica hotel reopening page and later press reports", url: "https://www.visitjamaica.com/travel-alerts/hotel-reopenings/" },
    note: "Adults-only sister resort to Hyatt Ziva Rose Hall. Confirm the latest date before you plan around it."
  },
  {
    id: "secrets-stjames",
    name: "Secrets St. James Montego Bay",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "adults",
    official: "https://www.hyattinclusivecollection.com/en/resorts-hotels/secrets/jamaica/st-james-montego-bay/",
    status: { label: "Reopening 2027", asOf: "November 22, 2026", source: "Visit Jamaica hotel reopening page", url: "https://www.visitjamaica.com/travel-alerts/hotel-reopenings/" },
    note: "Adults-only Inclusive Collection (Hyatt) resort. It sits next to Secrets Wild Orchid; the two have been sold with access to each other. Confirm current status."
  },
  {
    id: "secrets-orchid",
    name: "Secrets Wild Orchid Montego Bay",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "adults",
    official: "https://www.hyattinclusivecollection.com/en/destinations/jamaica/",
    status: { label: "Reopening 2027", asOf: "November 22, 2026", source: "Visit Jamaica hotel reopening page and Hyatt Inclusive Collection destination listing", url: "https://www.visitjamaica.com/travel-alerts/hotel-reopenings/" },
    note: "Adults-only sister resort to Secrets St. James. Official brand listing is on the Hyatt Inclusive Collection Jamaica page."
  },
  {
    id: "breathless-mobay",
    name: "Breathless Montego Bay Resort & Spa",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "adults",
    official: "https://www.hyattinclusivecollection.com/en/resorts-hotels/breathless/jamaica/montego-bay-resort-spa/",
    status: { label: "Reopening 2027", asOf: "November 22, 2026", source: "Visit Jamaica hotel reopening page", url: "https://www.visitjamaica.com/travel-alerts/hotel-reopenings/" },
    note: "Adults-oriented Inclusive Collection resort next to the Secrets pair. Confirm current status."
  },
  {
    id: "riu-mobay",
    name: "Hotel Riu Montego Bay",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "adults",
    official: "https://www.riu.com/en/hotel/jamaica/montego-bay/hotel-riu-montego-bay",
    note: "Official RIU site lists this as an all-inclusive hotel in Montego Bay. Confirm whether it is adults-only or mixed on the official page for your dates, and check Visit Jamaica for opening status."
  },
  {
    id: "riu-reggae",
    name: "Hotel Riu Reggae",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "family",
    official: "https://www.riu.com/en/hotel/jamaica/montego-bay/hotel-riu-reggae",
    note: "All-inclusive RIU hotel in Montego Bay. Confirm current status and family policy on the official site."
  },
  {
    id: "riu-palace-ja",
    name: "Riu Palace Jamaica",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "adults",
    official: "https://www.riu.com/en/hotel/jamaica/montego-bay/hotel-riu-palace-jamaica",
    note: "All-inclusive RIU Palace hotel in Montego Bay. Confirm current status on the official site and Visit Jamaica."
  },
  {
    id: "holiday-inn-mobay",
    name: "Holiday Inn Resort Montego Bay",
    areas: ["mobay","stjames"],
    place: "Montego Bay, St. James",
    audience: "family",
    official: "https://www.ihg.com/holidayinnresorts/hotels/us/en/montego-bay/mbjrh/hoteldetail",
    note: "Well-known family all-inclusive on the Montego Bay coast. Confirm current status and use the official IHG page or a comparison search, because some hotel codes redirect."
  },
  /* Trelawny */
  {
    id: "excellence-oyster",
    name: "Excellence Oyster Bay",
    areas: ["trelawny"],
    place: "Oyster Bay, Trelawny (marketed as Montego Bay)",
    audience: "adults",
    official: "https://www.excellenceresorts.com/montego-bay/excellence-oyster-bay/",
    note: "Adults-only all-inclusive on a peninsula at Oyster Bay, Trelawny, near Falmouth. The brand markets it as Montego Bay; the official site has described it as about 30 minutes from the airport. Visit Jamaica listed this property on its Montego Bay reopening board — confirm current status."
  },
  {
    id: "royalton-blue",
    name: "Royalton Blue Waters",
    areas: ["trelawny"],
    place: "Trelawny coast, near Falmouth",
    audience: "family",
    official: "https://www.royaltonresorts.com/resorts/blue-waters",
    note: "Family all-inclusive Royalton resort on the Trelawny coast. Hideaway at Royalton Blue Waters is the adults-only resort in the same complex. Confirm current status on the official site."
  },
  {
    id: "hideaway-blue",
    name: "Hideaway at Royalton Blue Waters",
    areas: ["trelawny"],
    place: "Trelawny coast, near Falmouth",
    audience: "adults",
    official: "https://www.royaltonresorts.com/resorts/hideaway-blue-waters",
    note: "Adults-only Hideaway resort next to Royalton Blue Waters. Royalton White Sands is no longer listed as a current separate resort name, so it is not included here."
  },
  /* Ocho Rios / Runaway Bay */
  {
    id: "sandals-ochi",
    name: "Sandals Ocho Rios",
    areas: ["ochi"],
    place: "Ocho Rios, St. Ann",
    audience: "adults",
    official: "https://www.sandals.com/ocho-rios/",
    note: "Adults-only Sandals resort in Ocho Rios. Official site lists airport transfers as included. Confirm current status."
  },
  {
    id: "sandals-dunns",
    name: "Sandals Dunn’s River",
    areas: ["ochi"],
    place: "Ocho Rios, St. Ann",
    audience: "adults",
    official: "https://www.sandals.com/dunns-river/",
    note: "Adults-only Sandals resort in the Ocho Rios area. Confirm current status."
  },
  {
    id: "sandals-rp",
    name: "Sandals Royal Plantation",
    areas: ["ochi"],
    place: "Ocho Rios, St. Ann",
    audience: "adults",
    official: "https://www.sandals.com/royal-plantation/",
    note: "Adults-only, smaller Sandals property in Ocho Rios. Official site notes that guests can use amenities at a nearby Sandals. Confirm current status."
  },
  {
    id: "couples-tower",
    name: "Couples Tower Isle",
    areas: ["ochi"],
    place: "Just east of Ocho Rios (St. Mary)",
    audience: "adults",
    official: "https://www.couples.com/resorts/tower-isle",
    note: "Adults-only Couples resort just east of Ocho Rios, in St. Mary. Visit Jamaica listed it on the Ocho Rios board. Confirm current status."
  },
  {
    id: "couples-sans",
    name: "Couples Sans Souci",
    areas: ["ochi"],
    place: "Ocho Rios, St. Ann",
    audience: "adults",
    official: "https://www.couples.com/resorts/sans-souci",
    note: "Adults-only Couples resort in Ocho Rios. Confirm current status on the official Couples site and Visit Jamaica."
  },
  {
    id: "riu-ochi",
    name: "Hotel Riu Ocho Rios",
    areas: ["ochi"],
    place: "Ocho Rios, St. Ann",
    audience: "family",
    official: "https://www.riu.com/en/hotel/jamaica/ocho-rios/hotel-riu-ocho-rios",
    note: "All-inclusive RIU hotel in Ocho Rios. Confirm family policy and current status on the official site."
  },
  {
    id: "bahia-explore",
    name: "Bahia Principe Explore Jamaica",
    areas: ["ochi"],
    place: "Runaway Bay, St. Ann",
    audience: "family",
    official: "https://www.bahia-principe.com/en/jamaica/runaway-bay/resort-jamaica/",
    stayed: true,
    note: "All-inclusive in Runaway Bay, St. Ann — close to the Trelawny border, not in Trelawny parish itself. About 1 hour 15 minutes to 1½ hours from MBJ on typical transfers. You have stayed at Bahia Principe before. Jamaica Information Service reported a December 2026 reopening for Bahia Principe Explore Runaway Bay; confirm current dates."
  },
  {
    id: "bahia-escape",
    name: "Bahia Principe Escape Runaway Bay",
    areas: ["ochi"],
    place: "Runaway Bay, St. Ann",
    audience: "adults",
    official: "https://www.bahia-principe.com/en/jamaica/runaway-bay/resort-runaway-bay/",
    stayed: true,
    note: "Sister Bahia Principe property in Runaway Bay, St. Ann. Official site uses the Escape Runaway Bay name; Visit Jamaica has also used “Bahia Principe Luxury Runaway.” Confirm which building and the current status before you book."
  },
  {
    id: "moon-palace",
    name: "Moon Palace Jamaica",
    areas: ["ochi"],
    place: "Ocho Rios area, St. Ann",
    audience: "family",
    official: "https://jamaica.moonpalace.com/",
    note: "Family all-inclusive in the Ocho Rios / St. Ann area. Confirm current status on the official site and Visit Jamaica."
  },
  /* Negril */
  {
    id: "sandals-negril",
    name: "Sandals Negril",
    areas: ["negril"],
    place: "Seven Mile Beach, Negril",
    audience: "adults",
    official: "https://www.sandals.com/negril/",
    note: "Adults-only Sandals resort on Seven Mile Beach. Confirm current status."
  },
  {
    id: "beaches-negril",
    name: "Beaches Negril",
    areas: ["negril"],
    place: "Seven Mile Beach, Negril",
    audience: "family",
    official: "https://www.beaches.com/resorts/negril/",
    note: "Family all-inclusive on Seven Mile Beach (same parent company as Sandals). Official site highlights a waterpark and family facilities. Confirm current status."
  },
  {
    id: "couples-negril",
    name: "Couples Negril",
    areas: ["negril"],
    place: "Negril",
    audience: "adults",
    official: "https://www.couples.com/resorts/negril",
    note: "Adults-only Couples resort in Negril. Visit Jamaica listed it on the Negril board. Confirm current status."
  },
  {
    id: "couples-swept",
    name: "Couples Swept Away",
    areas: ["negril"],
    place: "Negril",
    audience: "adults",
    official: "https://www.couples.com/resorts/swept-away",
    note: "Adults-only Couples resort in Negril. Confirm current status."
  },
  {
    id: "riu-negril",
    name: "Hotel Riu Negril",
    areas: ["negril"],
    place: "Negril",
    audience: "family",
    official: "https://www.riu.com/en/hotel/jamaica/negril/hotel-riu-negril",
    note: "All-inclusive RIU hotel in Negril. Confirm family policy and current status on the official site."
  },
  {
    id: "riu-palace-tb",
    name: "Riu Palace Tropical Bay",
    areas: ["negril"],
    place: "Negril",
    audience: "adults",
    official: "https://www.riu.com/en/hotel/jamaica/negril/hotel-riu-palace-tropical-bay",
    note: "All-inclusive RIU Palace hotel in Negril. Confirm current status and adults/family policy on the official site."
  },
  {
    id: "royalton-negril",
    name: "Royalton Negril",
    areas: ["negril"],
    place: "Seven Mile Beach, Negril",
    audience: "family",
    official: "https://www.royaltonresorts.com/resorts/negril",
    note: "Family all-inclusive on Seven Mile Beach. Hideaway at Royalton Negril is the adults-only resort alongside it. Confirm current status."
  },
  {
    id: "hideaway-negril",
    name: "Hideaway at Royalton Negril",
    areas: ["negril"],
    place: "Seven Mile Beach, Negril",
    audience: "adults",
    official: "https://www.royaltonresorts.com/resorts/hideaway-negril",
    note: "Adults-only Hideaway resort next to Royalton Negril. Confirm current status on the official Royalton site."
  }
];

JV.CITY_HOTELS = [
  {
    id: "pegasus",
    name: "The Jamaica Pegasus",
    areas: ["kingston"],
    place: "New Kingston",
    audience: "city",
    official: "https://www.jamaicapegasus.com/",
    note: "Well-known city hotel in New Kingston. Not an all-inclusive beach resort."
  },
  {
    id: "courtleigh",
    name: "The Courtleigh Hotel & Suites",
    areas: ["kingston"],
    place: "New Kingston",
    audience: "city",
    official: "https://www.courtleigh.com/",
    note: "City hotel in New Kingston. Not an all-inclusive beach resort."
  },
  {
    id: "ac-kingston",
    name: "AC Hotel Kingston",
    areas: ["kingston"],
    place: "Kingston",
    audience: "city",
    official: "https://www.marriott.com/en-us/hotels/kinar-ac-hotel-kingston/overview/",
    note: "Marriott AC city hotel in Kingston. Not an all-inclusive beach resort."
  }
];

JV.GATED = [
  {
    id: "ironshore",
    name: "Ironshore",
    areas: ["stjames","mobay"],
    kind: "Established residential area; many homes and compounds are gated",
    note: "Just east of Montego Bay, close to Rose Hall and shopping. Widely described as a residential neighbourhood with many gated homes and compounds. Confirm 24-hour security and controlled entry with the host — not every listing on the street is behind the same gate."
  },
  {
    id: "coral-gardens",
    name: "Coral Gardens",
    areas: ["stjames","mobay"],
    kind: "Established residential community",
    note: "Residential community in St. James, near Montego Bay. Some properties and compounds are gated. Confirm the gate, guards, and night access with the host."
  },
  {
    id: "rose-hall-villas",
    name: "Rose Hall area compounds",
    areas: ["stjames","mobay"],
    kind: "Resort and villa coast with gated compounds",
    note: "Rose Hall is the resort coast east of Montego Bay. Villa compounds here are often gated, but it is a district, not one single community. Confirm the specific compound and security."
  },
  {
    id: "silver-sands",
    name: "Silver Sands",
    areas: ["trelawny"],
    kind: "Private gated villa community",
    official: "https://silversandsja.com/",
    note: "Private gated villa community on the beach near Duncans, Trelawny, east of Falmouth. Official community site: silversandsja.com. Typical transfer from MBJ is about 50–80 minutes."
  },
  {
    id: "drax-hall",
    name: "Drax Hall / Drax Hall Country Club",
    areas: ["ochi"],
    kind: "Gated residential community with leisure amenities",
    note: "Established gated community in St. Ann, near Ocho Rios, including the Drax Hall Country Club area (residential lots with sports and leisure amenities, including golf). Confirm current security and access with the host or community."
  },
  {
    id: "richmond",
    name: "Richmond Estate",
    areas: ["ochi"],
    kind: "Gated villa and lot estate",
    note: "Recognised gated estate near Ocho Rios in St. Ann, with villas and lots in a managed, secured setting. Confirm current security with the host."
  },
  {
    id: "caribbean-estates",
    name: "Caribbean Estates",
    areas: ["portmore"],
    kind: "Gated housing scheme",
    note: "Gated housing scheme on the northwestern edge of Greater Portmore, St. Catherine. Confirm current gate hours and security with the host."
  },
  {
    id: "phoenix-park",
    name: "Phoenix Park Village",
    areas: ["portmore"],
    kind: "Gated development in Greater Portmore",
    note: "Gated residential development in Greater Portmore (including later phases marketed as Phoenix Park Village II). Confirm the exact phase, gate, and security with the host."
  },
  {
    id: "caymanas-estate",
    name: "Caymanas Estate",
    areas: ["portmore"],
    kind: "Known residential estate near Portmore — confirm gating",
    note: "A known residential area in St. Catherine near Portmore. It is listed here as a place people search, but gating and 24-hour security vary — confirm with the host before you treat it as a gated community."
  },
  {
    id: "norbrook",
    name: "Norbrook / Norbrook Heights",
    areas: ["kingston"],
    kind: "Affluent St. Andrew residential area; many gated homes",
    note: "Well-known uptown St. Andrew address. Many homes are individually gated or sit in guarded pockets. Confirm the security arrangement for the specific property."
  },
  {
    id: "cherry-gardens",
    name: "Cherry Gardens",
    areas: ["kingston"],
    kind: "Premium St. Andrew neighbourhood with strong security",
    note: "Long-standing premium residential neighbourhood in St. Andrew. Properties here are often gated or in well-guarded streets. Confirm security on the listing."
  },
  {
    id: "jacks-hill",
    name: "Jack’s Hill",
    areas: ["kingston"],
    kind: "Hillside St. Andrew residential area",
    note: "Hillside residential area in St. Andrew with many gated homes. Confirm access, lighting, and security with the host, especially at night."
  },
  {
    id: "long-mountain",
    name: "Long Mountain Country Club",
    areas: ["kingston"],
    kind: "Gated residential / golf community",
    note: "Known gated residential community in St. Andrew associated with the Long Mountain golf course. Confirm current access and security with the host."
  }
];

JV.OMITTED = {
  gated: [
    "Portmore Pines was not clearly verified as a gated community, so it is not listed as one.",
    "Named gated communities in Negril were not documented clearly enough to list as fact, so Negril uses search links plus a confirm-with-the-host checklist."
  ]
};

JV.CARRIERS = [
  {
    id: "aa",
    name: "American Airlines",
    airports: ["DFW"],
    dest: ["MBJ","KIN"],
    fact: "As of November 22, 2026, American is the only airline with a nonstop from the Dallas area to Jamaica: DFW to Montego Bay (MBJ), about 3 hours 40 minutes, typically around one flight a day. There is no nonstop DFW–Kingston (KIN). American sells connecting DFW–KIN trips, often via Miami (MIA).",
    source: "FlightConnections (page updated November 22, 2026) and American’s official Dallas–Montego Bay and Dallas–Kingston pages.",
    site: "https://www.aa.com/en-us/flights-from-dallas-to-montego-bay",
    siteKin: "https://www.aa.com/en-us/flights-from-dallas-to-kingston",
    bookBase: "https://www.aa.com/"
  },
  {
    id: "wn",
    name: "Southwest Airlines",
    airports: ["DAL"],
    dest: ["MBJ"],
    fact: "Southwest flies from Dallas Love Field (DAL), not from DFW. There is no DAL–MBJ nonstop. Southwest has offered connecting service to Montego Bay (common connections include Houston or Florida). Schedules change — always search Southwest.com. A Southwest DAL–MBJ route page exists, but month calendars can show no results in some periods.",
    source: "Southwest’s official Dallas–Montego Bay page and FlightConnections (DAL–MBJ, connecting routes).",
    site: "https://www.southwest.com/en/flights/flights-from-dallas-to-montego-bay",
    bookBase: "https://www.southwest.com/"
  },
  {
    id: "b6",
    name: "JetBlue",
    airports: ["DFW"],
    dest: ["MBJ","KIN"],
    fact: "JetBlue sells connecting flights from DFW to both Montego Bay and Kingston, often via Fort Lauderdale (FLL). There is no JetBlue nonstop from Dallas to Jamaica.",
    source: "JetBlue’s official Dallas/Fort Worth–Jamaica page and FlightRoutes (DFW–KIN via FLL).",
    site: "https://www.jetblue.com/en/flights-from-dallas-fort-worth-to-jamaica",
    bookBase: "https://www.jetblue.com/"
  },
  {
    id: "dl",
    name: "Delta Air Lines",
    airports: ["DFW","DAL"],
    dest: ["MBJ","KIN"],
    fact: "Delta sells connecting flights from the Dallas area to Montego Bay and Kingston, often via Atlanta (ATL). There is no Delta nonstop from Dallas to Jamaica.",
    source: "FlightRoutes (DFW–KIN via Atlanta) and FlightConnections connecting-route listings.",
    site: "https://www.delta.com/",
    bookBase: "https://www.delta.com/"
  },
  {
    id: "nk",
    name: "Spirit Airlines",
    airports: ["DFW"],
    dest: ["KIN"],
    fact: "Spirit has offered connecting flights from DFW to Kingston (KIN). Spirit’s own DFW–Montego Bay page showed no fares for the late-2026 months checked on November 22, 2026, so this app does not treat Spirit as a current Dallas–MBJ option. Search Spirit.com for whatever is flying on your dates.",
    source: "Spirit’s official DFW–MBJ page (no monthly results when checked November 22, 2026) and third-party booking sites listing connecting DFW–KIN trips.",
    site: "https://www.spirit.com/",
    bookBase: "https://www.spirit.com/"
  }
];

JV.FARE_TIPS = [
  "This app does not show ticket prices. Fares change all day, and any number put here would go stale. Use the search buttons — they open live results for your dates.",
  "The only nonstop from the Dallas area to Jamaica is American Airlines from DFW to Montego Bay (MBJ). If a short flight matters more than price, start there.",
  "There is no nonstop from Dallas to Kingston (KIN). Plan on one stop, often Miami, Fort Lauderdale, or Atlanta.",
  "Search both DFW and DAL. Southwest uses Love Field (DAL) only, not DFW.",
  "Turn on flexible dates (plus or minus 1–3 days) on Google Flights, Kayak, or Skyscanner. A shift of one day can change the fare a lot.",
  "On Google Flights, open the date grid / flexible calendar and sort by lowest price. On Kayak, use the flexible-date search. On Skyscanner, use the whole-month view.",
  "Compare at least two sites plus the airline’s own site. Low-cost connecting airlines may add bag and seat fees that a “cheap” fare does not include.",
  "If you are going to Montego Bay, St. James, Trelawny, Ocho Rios, or Negril, fly into MBJ. If you are going to Portmore or Kingston & St. Andrew, fly into KIN. A wrong airport can add 3½–4½ hours of driving."
];

JV.SAFETY = [
  "Ask the host, in writing, whether the property is inside a gated community with a 24-hour guard and a controlled vehicle gate — listing titles can overstate this.",
  "Read recent guest reviews and look for comments about the gate, guards, lighting, and night-time access.",
  "Confirm how you get in after dark, where you park, and whether there is backup power.",
  "Share the exact address with someone at home, and use a licensed taxi or a pre-arranged transfer, especially at night.",
  "Do not display cash, jewellery, or expensive phones on the street.",
  "This app does not rate neighbourhood safety. Conditions vary by street and by property. If you are unsure, ask your Jamaica Travel bot or a person you trust on the island."
];

JV.PACK = [
  { id: "passport", label: "Valid passport (needed for U.S. citizens to enter Jamaica and to return to the U.S.)" },
  { id: "c5", label: "C5 confirmation (screenshot or printout) — free form at enterjamaica.gov.jm, one per traveller, up to 30 days before you fly" },
  { id: "tickets", label: "Return or onward ticket details (Jamaica asks visitors to show one)" },
  { id: "address", label: "Address of your hotel or Airbnb in Jamaica (needed for the C5 form)" },
  { id: "insurance", label: "Travel insurance details (if you bought a policy)" },
  { id: "meds", label: "Prescription medicines in original bottles, plus a short extra supply" },
  { id: "bp", label: "Blood-pressure medicine and a simple record of your doses" },
  { id: "copies", label: "Paper and phone copies of your passport photo page (kept separate from the passport)" },
  { id: "cards", label: "A card you already own, and a backup — never type card numbers into this app" },
  { id: "adapters", label: "Phone / tablet chargers (Jamaica uses the same plugs as the U.S.)" },
  { id: "sun", label: "Sunscreen, a hat, and sunglasses" },
  { id: "bug", label: "Mosquito repellent" },
  { id: "clothes", label: "Light clothes, a cover-up for town, and modest clothes if you will visit churches or family" },
  { id: "swim", label: "Swimwear and a rash guard if you want one" },
  { id: "shoes", label: "Comfortable walking shoes and sandals that can get wet" },
  { id: "pork", label: "A short note for the hotel or host that you do not eat pork" },
  { id: "snacks", label: "Any snacks you rely on for the flight" },
  { id: "cash", label: "A little cash for tips and small purchases (you can also use cards in many places)" }
];

JV.ENTRY = [
  {
    title: "Passport",
    body: "U.S. citizens must present a valid passport to enter Jamaica and to re-enter the United States. Visit Jamaica says the passport must be valid at the time of entry and exit. Canadian and British citizens also need valid travel documents; rules differ slightly, so check the official page for your passport."
  },
  {
    title: "No visa for short U.S. visits",
    body: "U.S. citizens do not need a visa for stays of up to 90 days in Jamaica, according to Visit Jamaica. Canadian and British citizens also generally do not need a visa for short visits of up to 90 days. If you plan to stay longer, ask the Passport, Immigration and Citizenship Agency (PICA)."
  },
  {
    title: "Return or onward ticket",
    body: "All visitors are required to show a return ticket or onward ticket when entering Jamaica."
  },
  {
    title: "Free online C5 form",
    body: "Every traveller arriving by air or cruise — including children — must complete the official Electronic C5 Passenger Declaration at enterjamaica.gov.jm. It is free. Do not pay a third-party website to fill it in. You can submit it up to 30 days before travel. Keep the confirmation email or a screenshot to show on arrival. Each person needs their own form. A parent or guardian should complete a separate form for each child under 18. You must complete a new C5 for every trip. If you make a mistake after submitting, fill out a new form."
  },
  {
    title: "This app never asks for passport or payment details",
    body: "Use the official government sites for the C5 and for immigration questions. Do not type passport numbers, dates of birth, or card numbers into this app."
  }
];

JV.BUDGET_ROWS = [
  { id: "flights", label: "Flights" },
  { id: "stay", label: "Hotel, villa, or Airbnb" },
  { id: "transfer", label: "Airport transfers / car" },
  { id: "food", label: "Food and drinks (beyond an all-inclusive)" },
  { id: "activities", label: "Activities and excursions" },
  { id: "tips", label: "Tips" },
  { id: "insurance", label: "Travel insurance" },
  { id: "other", label: "Other" }
];
