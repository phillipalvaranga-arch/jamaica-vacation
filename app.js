/* Jamaica Vacation app. Informational only — never books or pays. */
(function () {
  const STORE_TRIP = "jv-trip-v1";
  const STORE_LIST = "jv-shortlist-v1";
  const STORE_BUDGET = "jv-budget-v1";
  const STORE_PACK = "jv-pack-v1";
  const STORE_NOTES = "jv-notes-v1";
  const BOT = JV.BOT_URL;

  const $ = (sel, el) => (el || document).querySelector(sel);
  const view = $("#view");
  const toastEl = $("#toast");

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 2200);
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function todayISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function defaultTrip() {
    return {
      from: "DFW",
      fromCustom: "",
      to: "MBJ",
      depart: "",
      ret: "",
      adults: 2,
      children: 0,
      flexible: false,
      area: ""
    };
  }
  function trip() {
    return Object.assign(defaultTrip(), load(STORE_TRIP, {}));
  }
  function setTrip(patch) {
    const t = Object.assign(trip(), patch);
    save(STORE_TRIP, t);
    return t;
  }
  function origin(t) {
    if (t.from === "OTHER") return (t.fromCustom || "DFW").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3) || "DFW";
    return t.from;
  }
  function pax(t) {
    return Math.max(1, Number(t.adults || 1)) + Math.max(0, Number(t.children || 0));
  }
  function fmtDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${m}/${d}/${y}`;
  }
  function yymmdd(iso) {
    if (!iso) return "";
    return iso.replace(/-/g, "").slice(2);
  }
  function dateLabel(t) {
    if (t.depart && t.ret) return `${t.depart} → ${t.ret}`;
    if (t.depart) return t.depart + " (one way)";
    return "Dates not set";
  }
  function areaById(id) {
    return JV.AREAS.find((a) => a.id === id);
  }
  function resortById(id) {
    return JV.RESORTS.concat(JV.CITY_HOTELS).find((r) => r.id === id);
  }
  function shortlist() {
    return load(STORE_LIST, []);
  }
  function isSaved(id) {
    return shortlist().some((x) => x.id === id);
  }
  function toggleSaved(item) {
    let list = shortlist();
    if (list.some((x) => x.id === item.id)) list = list.filter((x) => x.id !== item.id);
    else list.push(Object.assign({ savedAt: Date.now() }, item));
    save(STORE_LIST, list);
    return list;
  }

  /* ---------- deep links (no prices) ---------- */
  function flightLinks(t) {
    const o = origin(t);
    const d = t.to;
    const flex = t.flexible;
    const adults = Math.max(1, Number(t.adults || 1));
    const children = Math.max(0, Number(t.children || 0));
    const dep = t.depart;
    const ret = t.ret;
    const qPeople = `Flights from ${o} to ${d}` + (dep && ret ? ` on ${dep} through ${ret}` : dep ? ` on ${dep}` : "") + (flex ? " flexible dates" : "");
    const google = `https://www.google.com/travel/flights?q=${encodeURIComponent(qPeople)}&curr=USD`;
    let kayak = `https://www.kayak.com/flights/${o}-${d}`;
    if (dep && ret) kayak += `/${dep}${flex ? "-flexible" : ""}/${ret}${flex ? "-flexible" : ""}`;
    else if (dep) kayak += `/${dep}${flex ? "-flexible" : ""}`;
    kayak += `?sort=bestflight_a&adults=${adults}` + (children ? `&children=${children}` : "");
    let expedia = `https://www.expedia.com/Flights-Search?mode=search&trip=${ret ? "roundtrip" : "oneway"}&leg1=from:${o},to:${d}` + (dep ? `,departure:${fmtDate(dep)}TANYT` : "") + `&passengers=adults:${adults},children:${children},infants:0,infantinlap:N`;
    if (ret) expedia += `&leg2=from:${d},to:${o},departure:${fmtDate(ret)}TANYT`;
    let sky = `https://www.skyscanner.com/transport/flights/${o.toLowerCase()}/${d.toLowerCase()}/`;
    if (dep) sky += yymmdd(dep) + "/";
    if (ret) sky += yymmdd(ret) + "/";
    sky += `?adults=${adults}` + (children ? `&children=${children}` : "");
    const aaDestPage = d === "KIN"
      ? "https://www.aa.com/en-us/flights-from-dallas-to-kingston"
      : "https://www.aa.com/en-us/flights-from-dallas-to-montego-bay";
    const southwest = `https://www.southwest.com/air/booking/select.html?originationAirportCode=${o === "DFW" ? "DAL" : o}&destinationAirportCode=${d}&adultPassengersCount=${adults}&departureDate=${dep || todayISO()}&tripType=${ret ? "roundtrip" : "oneway"}` + (ret ? `&returnDate=${ret}` : "");
    const jetblue = `https://www.jetblue.com/booking/flights?from=${o}&to=${d}` + (dep ? `&depart=${dep}` : "") + (ret ? `&return=${ret}` : "") + `&adults=${adults}`;
    const delta = `https://www.delta.com/flightsearch/book-a-flight?cacheKeySuffix=&origin=${o}&destination=${d}` + (dep ? `&departureDate=${dep}` : "") + (ret ? `&returnDate=${ret}` : "") + `&paxCount=${adults + children}`;
    const spirit = "https://www.spirit.com/";
    const aaSearch = "https://www.aa.com/";
    return { google, kayak, expedia, sky, aaDestPage, aaSearch, southwest, jetblue, delta, spirit };
  }
  function hotelLinks(name, t) {
    const q = name + ", Jamaica";
    const adults = Math.max(1, Number(t.adults || 2));
    const children = Math.max(0, Number(t.children || 0));
    const google = `https://www.google.com/travel/hotels?q=${encodeURIComponent(q)}` + (t.depart && t.ret ? `&lead=${t.depart}&out=${t.ret}` : "");
    let expedia = `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(q)}&adults=${adults}`;
    if (t.depart) expedia += `&startDate=${t.depart}`;
    if (t.ret) expedia += `&endDate=${t.ret}`;
    if (children) expedia += `&children=${children}`;
    let booking = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(q)}&group_adults=${adults}&no_rooms=1`;
    if (t.depart) booking += `&checkin=${t.depart}`;
    if (t.ret) booking += `&checkout=${t.ret}`;
    if (children) booking += `&group_children=${children}`;
    return { google, expedia, booking };
  }
  function staySearch(kind, areaName, t, extraQuery) {
    const dest = areaName + ", Jamaica";
    const adults = Math.max(1, Number(t.adults || 2));
    const children = Math.max(0, Number(t.children || 0));
    const q = extraQuery || dest;
    let airbnb = `https://www.airbnb.com/s/homes?query=${encodeURIComponent(q)}&adults=${adults}`;
    if (children) airbnb += `&children=${children}`;
    if (t.depart) airbnb += `&checkin=${t.depart}`;
    if (t.ret) airbnb += `&checkout=${t.ret}`;
    let vrbo = `https://www.vrbo.com/search?destination=${encodeURIComponent(dest)}&adults=${adults}`;
    if (t.depart) vrbo += `&startDate=${t.depart}`;
    if (t.ret) vrbo += `&endDate=${t.ret}`;
    let booking = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent((kind === "villa" ? "villas in " : "") + dest)}&group_adults=${adults}`;
    if (t.depart) booking += `&checkin=${t.depart}`;
    if (t.ret) booking += `&checkout=${t.ret}`;
    return { airbnb, vrbo, booking };
  }

  /* ---------- trip details for the bot ---------- */
  function tripMessage() {
    const t = trip();
    const list = shortlist();
    const area = t.area ? (areaById(t.area) || {}).name : "";
    const picks = list.length
      ? list.map((x) => `- ${x.name}${x.place ? " (" + x.place + ")" : ""}`).join("\n")
      : "(none saved yet)";
    return [
      "Hi — please help me plan this Jamaica trip.",
      "",
      "From: " + origin(t) + (t.from === "DAL" ? " (Dallas Love Field)" : t.from === "DFW" ? " (Dallas/Fort Worth)" : ""),
      "To: " + t.to + (t.to === "MBJ" ? " (Montego Bay / Sangster)" : " (Kingston / Norman Manley)"),
      "Dates: " + dateLabel(t) + (t.flexible ? " (flexible dates preferred)" : ""),
      "Travelers: " + t.adults + " adult" + (Number(t.adults) === 1 ? "" : "s") + (Number(t.children) ? ", " + t.children + " child(ren)" : ""),
      area ? "Area: " + area : "Area: not chosen yet",
      "",
      "Saved picks:",
      picks,
      "",
      "I do not eat pork. Please compare options and do not book or pay without my approval."
    ].join("\n");
  }
  function copyTrip() {
    const text = tripMessage();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => toast("Trip details copied"),
        () => fallbackCopy(text)
      );
    } else fallbackCopy(text);
  }
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast("Trip details copied"); }
    catch (e) { toast("Copy failed — select the text yourself"); }
    ta.remove();
  }

  function botCard(compact) {
    return `<section class="botcard">
      <p class="kicker">Your Jamaica Travel bot</p>
      <h2>${compact ? "Plan with my Jamaica Travel bot" : "Attach your Jamaica Travel bot"}</h2>
      <p class="muted">This travel app finds flights and places and saves your shortlist. Your Jamaica Travel bot helps you plan the trip. It will not book or pay without your approval, and neither will this app.</p>
      <div class="btns">
        <a class="btn btn-gold" href="${esc(BOT)}">Open Jamaica Travel bot</a>
        <button type="button" class="btn btn-outline" data-act="copy-trip">Copy trip details</button>
      </div>
      <p class="note">If the Open button does nothing, copy the trip details and paste them into your Jamaica Travel bot in Grok Bot.</p>
    </section>`;
  }

  function tripForm(t) {
    return `<form class="card stack" id="tripForm" autocomplete="off">
      <h3>Your trip</h3>
      <p class="muted">Set this once. Every flight, hotel, villa and Airbnb button in the app will use these dates. This app never books or charges a card.</p>
      <div class="fields">
        <label class="field">Flying from
          <select name="from" id="fromSel">
            <option value="DFW"${t.from === "DFW" ? " selected" : ""}>Dallas/Fort Worth (DFW)</option>
            <option value="DAL"${t.from === "DAL" ? " selected" : ""}>Dallas Love Field (DAL)</option>
            <option value="OTHER"${t.from === "OTHER" ? " selected" : ""}>Other airport</option>
          </select>
        </label>
        <label class="field" id="customWrap" ${t.from === "OTHER" ? "" : "hidden"}>Other airport code
          <input name="fromCustom" maxlength="3" placeholder="e.g. ATL" value="${esc(t.fromCustom)}" style="text-transform:uppercase">
        </label>
        <label class="field">Flying into
          <select name="to">
            <option value="MBJ"${t.to === "MBJ" ? " selected" : ""}>Montego Bay — Sangster (MBJ)</option>
            <option value="KIN"${t.to === "KIN" ? " selected" : ""}>Kingston — Norman Manley (KIN)</option>
          </select>
        </label>
        <label class="field">Area (optional)
          <select name="area">
            <option value="">Not sure yet</option>
            ${JV.AREAS.map((a) => `<option value="${a.id}"${t.area === a.id ? " selected" : ""}>${esc(a.name)}</option>`).join("")}
          </select>
        </label>
        <label class="field">Leave
          <input type="date" name="depart" min="${todayISO()}" value="${esc(t.depart)}">
        </label>
        <label class="field">Return
          <input type="date" name="ret" min="${t.depart || todayISO()}" value="${esc(t.ret)}">
        </label>
        <label class="field">Adults
          <input type="number" name="adults" min="1" max="9" value="${esc(t.adults)}">
        </label>
        <label class="field">Children
          <input type="number" name="children" min="0" max="9" value="${esc(t.children)}">
        </label>
      </div>
      <label class="check"><input type="checkbox" name="flexible"${t.flexible ? " checked" : ""}> Flexible dates (search a few days on either side)</label>
      <div class="btns">
        <button class="btn btn-gold" type="submit">Save trip details</button>
        <a class="btn btn-outline" href="#/flights">Search flights</a>
      </div>
    </form>`;
  }

  function bindTripForm() {
    const form = $("#tripForm");
    if (!form) return;
    const fromSel = $("#fromSel");
    const wrap = $("#customWrap");
    fromSel.addEventListener("change", () => {
      wrap.hidden = fromSel.value !== "OTHER";
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const patch = {
        from: fd.get("from"),
        fromCustom: String(fd.get("fromCustom") || "").toUpperCase(),
        to: fd.get("to"),
        area: fd.get("area") || "",
        depart: fd.get("depart") || "",
        ret: fd.get("ret") || "",
        adults: Number(fd.get("adults") || 2),
        children: Number(fd.get("children") || 0),
        flexible: form.flexible.checked
      };
      if (patch.depart && patch.ret && patch.ret < patch.depart) {
        toast("Return date is before the leave date");
        return;
      }
      setTrip(patch);
      toast("Trip details saved");
      render();
    });
  }

  function compareBtns(name) {
    const t = trip();
    const L = hotelLinks(name, t);
    return `<div class="btns">
      <a class="btn btn-green btn-sm" target="_blank" rel="noopener" href="${esc(L.google)}">Compare on Google Hotels</a>
      <a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${esc(L.expedia)}">Expedia</a>
      <a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${esc(L.booking)}">Booking.com</a>
    </div>
    <p class="note">These open live prices for your dates. This app never invents a rate.</p>`;
  }

  function saveBtn(item) {
    const on = isSaved(item.id);
    return `<button type="button" class="btn ${on ? "btn-gold" : "btn-ghost"} btn-sm" data-act="toggle-save" data-item='${esc(JSON.stringify(item))}'>${on ? "★ Saved" : "☆ Save to shortlist"}</button>`;
  }

  function resortCard(r, compact) {
    const status = r.status
      ? `<span class="tag warn">${esc(r.status.label)}</span>`
      : "";
    const aud = r.audience === "adults" ? `<span class="tag adults">Adults only</span>`
      : r.audience === "family" ? `<span class="tag family">Family</span>`
      : `<span class="tag city">City hotel</span>`;
    const stayed = r.stayed ? `<span class="tag stayed">You’ve stayed here</span>` : "";
    return `<article class="card list-card">
      <div class="between">
        <div>
          <h3><a href="#/stay/${esc(r.id)}">${esc(r.name)}</a></h3>
          <p class="muted">${esc(r.place)}</p>
        </div>
        <div class="row">${aud}${stayed}${status}</div>
      </div>
      ${compact ? "" : `<p>${esc(r.note)}</p>`}
      ${r.status ? `<p class="source">${esc(r.status.source)} (as of ${esc(r.status.asOf)}). <a href="${esc(r.status.url)}" target="_blank" rel="noopener">Visit Jamaica reopenings</a></p>` : ""}
      <div class="btns">
        ${r.official ? `<a class="btn btn-gold btn-sm" target="_blank" rel="noopener" href="${esc(r.official)}">Official site</a>` : ""}
        <a class="btn btn-outline btn-sm" href="#/stay/${esc(r.id)}">Details & price comparison</a>
        ${saveBtn({ id: r.id, type: "stay", name: r.name, place: r.place, area: (r.areas || [])[0] || "" })}
      </div>
    </article>`;
  }

  /* ---------- views ---------- */
  function viewHome() {
    const t = trip();
    return `
      <section class="hero">
        <p class="kicker">Frisco, Texas → Jamaica</p>
        <h1>Jamaica Vacation</h1>
        <p>Find the cheapest live airfares, well-known all-inclusive resorts, villas, and Airbnbs in gated communities — in Montego Bay, St. James, Trelawny, Ocho Rios, Negril, Portmore, and Kingston &amp; St. Andrew.</p>
        <p>This app is for planning only. It never books a flight or room and never takes a card or passport number. You type in the prices you find, and you decide what to book.</p>
      </section>
      <div class="banner">
        <strong>Hotel status after Hurricane Melissa.</strong>
        Some Jamaica hotels were still closed or on staggered reopenings when this app was researched on ${esc(JV.RESEARCH_DATE)}. Dates can change.
        Always check the <a href="${esc(JV.LINKS.reopenings)}" target="_blank" rel="noopener">official Visit Jamaica hotel reopening list</a> and the resort’s own site before you plan around a property.
      </div>
      ${botCard(true)}
      ${tripForm(t)}
      <h2>Choose an area</h2>
      <p class="lead">Each page has an overview, the best airport, typical drive time, resorts, villa links, and gated-community Airbnb searches.</p>
      <div class="grid cols-3">
        ${JV.AREAS.map((a) => `
          <a class="card area-card" href="#/area/${a.id}">
            <span class="tag">${esc(a.airport)} airport</span>
            <h3>${esc(a.name)}</h3>
            <p class="muted">${esc(a.vibe)}</p>
          </a>`).join("")}
      </div>
      <h2 style="margin-top:22px">Quick tools</h2>
      <div class="navgrid">
        <a href="#/flights">✈ Flights<span>Live searches to MBJ or KIN. No made-up fares.</span></a>
        <a href="#/stays">🏨 All-inclusives<span>Well-known resorts, official sites, compare prices.</span></a>
        <a href="#/villas">🏡 Villas<span>Airbnb, Vrbo and Booking searches by area.</span></a>
        <a href="#/gated">🔒 Gated Airbnbs<span>Verified communities plus a safety checklist.</span></a>
        <a href="#/saved">★ Shortlist & compare<span>Save picks and line them up side by side.</span></a>
        <a href="#/budget">🧮 Budget planner<span>You enter the prices you actually find.</span></a>
        <a href="#/pack">🎒 Packing list<span>Passport, C5 form, clothes, medicines.</span></a>
        <a href="#/entry">🛂 Jamaica entry<span>Official passport and free C5 form links.</span></a>
      </div>
      <p class="footer">Facts researched ${esc(JV.RESEARCH_DATE)}. Drive times are typical ranges, not guarantees. This app does not take bookings or payments.</p>
    `;
  }

  function viewFlights() {
    const t = trip();
    const L = flightLinks(t);
    const needDates = !t.depart;
    return `
      <p class="kicker">Flights</p>
      <h1>Cheapest flights to Jamaica</h1>
      <p class="lead">Search live fares from ${esc(origin(t))} to ${esc(t.to)}. This app does not display ticket prices, because they change all day. The buttons below open Google Flights, Kayak, Expedia, Skyscanner, and the airlines that actually serve this route.</p>
      ${tripForm(t)}
      ${needDates ? `<div class="banner">Add a leave date (and a return date if you want a round trip) so the search buttons open the right calendar.</div>` : ""}
      <div class="card">
        <h3>Search live fares</h3>
        <div class="btns">
          <a class="btn btn-gold" target="_blank" rel="noopener" href="${esc(L.google)}">Google Flights</a>
          <a class="btn btn-green" target="_blank" rel="noopener" href="${esc(L.kayak)}">Kayak${t.flexible ? " (flexible)" : ""}</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(L.expedia)}">Expedia</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(L.sky)}">Skyscanner</a>
        </div>
        <p class="note">Tip: on Google Flights open the date grid and sort by cheapest. On Kayak tick flexible dates. On Skyscanner use the whole-month view.</p>
      </div>
      <div class="card">
        <h3>Airline sites</h3>
        <div class="btns">
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(L.aaDestPage)}">American Airlines route page</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(L.aaSearch)}">American.com</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(L.southwest)}">Southwest (from Love Field)</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(L.jetblue)}">JetBlue</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(L.delta)}">Delta</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(L.spirit)}">Spirit.com</a>
        </div>
        <p class="note">Southwest flies from Dallas Love Field (DAL), not from DFW. If you chose DFW, the Southwest button starts a DAL search so you can still compare Love Field.</p>
      </div>
      <h2>Who actually flies this route</h2>
      <p class="lead">Checked ${esc(JV.RESEARCH_DATE)}. Airlines change schedules — always confirm on the airline’s site.</p>
      ${JV.CARRIERS.map((c) => `
        <article class="card">
          <div class="between">
            <h3>${esc(c.name)}</h3>
            <div class="row">${c.airports.map((a) => `<span class="tag">${esc(a)}</span>`).join("")} ${c.dest.map((a) => `<span class="tag">${esc(a)}</span>`).join("")}</div>
          </div>
          <p>${esc(c.fact)}</p>
          <p class="source">Source: ${esc(c.source)}</p>
          <div class="btns">${c.site ? `<a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${esc(c.site)}">Airline page</a>` : ""}</div>
        </article>`).join("")}
      <div class="card">
        <h3>Tips for finding a cheaper fare</h3>
        <ul>${JV.FARE_TIPS.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
      <div class="card">
        <h3>Which airport for which area</h3>
        <table class="table">
          <thead><tr><th>Area</th><th>Use this airport</th><th>Why</th></tr></thead>
          <tbody>
            ${JV.AREAS.map((a) => `<tr><td><a href="#/area/${a.id}">${esc(a.name)}</a></td><td>${esc(a.airport)}</td><td>${esc(a.whyAirport)}</td></tr>`).join("")}
          </tbody>
        </table>
        <p class="source">${esc(JV.DRIVE_NOTE)}</p>
      </div>
      ${botCard(true)}
    `;
  }

  function viewAreas() {
    return `
      <p class="kicker">Destinations</p>
      <h1>Areas in Jamaica</h1>
      <p class="lead">Pick an area to see the best airport, typical drive time, all-inclusives, villa searches, and gated-community Airbnbs.</p>
      <div class="grid cols-2">
        ${JV.AREAS.map((a) => `
          <a class="card area-card" href="#/area/${a.id}">
            <span class="tag">Fly into ${esc(a.airport)}</span>
            <h3>${esc(a.name)}</h3>
            <p>${esc(a.overview)}</p>
          </a>`).join("")}
      </div>
    `;
  }

  function viewArea(id) {
    const a = areaById(id);
    if (!a) return `<h1>Area not found</h1><p><a href="#/areas">Back to areas</a></p>`;
    const t = trip();
    const resorts = JV.RESORTS.filter((r) => r.areas.includes(id));
    const hotels = JV.CITY_HOTELS.filter((r) => r.areas.includes(id));
    const gated = JV.GATED.filter((g) => g.areas.includes(id));
    const villaQ = staySearch("villa", a.name, t);
    const gatedQ = staySearch("gated", a.name, t, "gated community " + a.name + " Jamaica");
    const nearby = (JV.NEARBY[id] || [])
      .map((n) => `<p><a href="#/stay/${n.id}">${esc(n.label)}</a></p>`)
      .join("");
    return `
      <p class="kicker">${esc(a.parish)}</p>
      <h1>${esc(a.name)}</h1>
      <p class="lead">${esc(a.overview)}</p>
      <div class="grid cols-2">
        <div class="card">
          <h3>Best airport</h3>
          <p><strong>${esc(a.airportName)}</strong></p>
          <p>${esc(a.whyAirport)}</p>
          <p class="muted">From MBJ: ${esc(a.driveFrom.MBJ || "See notes")}<br>From KIN: ${esc(a.driveFrom.KIN || "See notes")}</p>
          <p class="source">${esc(JV.DRIVE_NOTE)}</p>
          <div class="btns"><a class="btn btn-gold btn-sm" href="#/flights">Search flights to ${esc(a.airport)}</a></div>
        </div>
        <div class="card">
          <h3>What to expect</h3>
          <p>${esc(a.stayNote)}</p>
          <p>${esc(a.villaAreas)}</p>
        </div>
      </div>
      ${nearby ? `<div class="card">${nearby}</div>` : ""}
      <h2>All-inclusive resorts</h2>
      ${resorts.length ? resorts.map((r) => resortCard(r, true)).join("") : `<div class="card"><p>${esc(a.name)} is not a beach all-inclusive destination. Use villas, Airbnbs, or the city hotels below.</p></div>`}
      ${hotels.length ? `<h2>City hotels (not all-inclusive)</h2>${hotels.map((r) => resortCard(r, true)).join("")}` : ""}
      <h2>Villas</h2>
      <div class="card">
        <p>${esc(a.villaAreas)}</p>
        <div class="btns">
          <a class="btn btn-gold" target="_blank" rel="noopener" href="${esc(villaQ.airbnb)}">Airbnb — ${esc(a.name)}</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(villaQ.vrbo)}">Vrbo</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(villaQ.booking)}">Booking.com villas</a>
        </div>
      </div>
      <h2>Airbnb in gated communities</h2>
      <div class="card">
        <p>These buttons search Airbnb for <strong>gated community ${esc(a.name)} Jamaica</strong> using your dates and guest count. Read the listing and confirm the gate with the host.</p>
        <div class="btns">
          <a class="btn btn-gold" target="_blank" rel="noopener" href="${esc(gatedQ.airbnb)}">Airbnb: gated community ${esc(a.name)}</a>
        </div>
      </div>
      ${gated.length ? gated.map((g) => gatedCard(g)).join("") : `<div class="card"><p class="muted">No named gated community in ${esc(a.name)} was verified clearly enough to list. Use the search button and the safety checklist on the <a href="#/gated">Gated Airbnbs</a> page.</p></div>`}
      ${botCard(true)}
      <p><a href="#/areas">← All areas</a></p>
    `;
  }

  function gatedCard(g) {
    const t = trip();
    const area = areaById(g.areas[0]);
    const q = staySearch("gated", area ? area.name : g.name, t, "gated community " + g.name + " Jamaica");
    return `<article class="card">
      <div class="between">
        <div>
          <h3>${esc(g.name)}</h3>
          <p class="muted">${esc(g.kind)} · ${(g.areas.map((id) => (areaById(id) || {}).name).filter(Boolean).join(", "))}</p>
        </div>
        ${saveBtn({ id: "gated-" + g.id, type: "gated", name: g.name, place: g.kind, area: g.areas[0] })}
      </div>
      <p>${esc(g.note)}</p>
      <div class="btns">
        ${g.official ? `<a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${esc(g.official)}">Community site</a>` : ""}
        <a class="btn btn-gold btn-sm" target="_blank" rel="noopener" href="${esc(q.airbnb)}">Airbnb search</a>
        <a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${esc(q.vrbo)}">Vrbo</a>
      </div>
    </article>`;
  }

  function viewStay(id) {
    const r = resortById(id);
    if (!r) return `<h1>Not found</h1><p><a href="#/stays">Back to stays</a></p>`;
    const t = trip();
    return `
      <p class="kicker">${esc(r.place)}</p>
      <h1>${esc(r.name)}</h1>
      <div class="row" style="margin-bottom:12px">
        ${r.audience === "adults" ? `<span class="tag adults">Adults only</span>` : r.audience === "family" ? `<span class="tag family">Family</span>` : `<span class="tag city">City hotel</span>`}
        ${r.stayed ? `<span class="tag stayed">You’ve stayed here</span>` : ""}
        ${r.status ? `<span class="tag warn">${esc(r.status.label)}</span>` : ""}
      </div>
      <div class="card">
        <p>${esc(r.note)}</p>
        ${r.status ? `<p class="source">${esc(r.status.source)} (as of ${esc(r.status.asOf)}). Reopening dates can change. <a href="${esc(r.status.url)}" target="_blank" rel="noopener">Official reopening list</a></p>` : `<p class="note">Check current opening status on the official site and on <a href="${esc(JV.LINKS.reopenings)}" target="_blank" rel="noopener">Visit Jamaica</a>.</p>`}
        <div class="btns">
          ${r.official ? `<a class="btn btn-gold" target="_blank" rel="noopener" href="${esc(r.official)}">Official site</a>` : ""}
          ${saveBtn({ id: r.id, type: "stay", name: r.name, place: r.place, area: (r.areas || [])[0] || "" })}
        </div>
      </div>
      <div class="card">
        <h3>Compare live prices for your dates</h3>
        <p class="muted">${t.depart && t.ret ? `Using ${esc(t.depart)} to ${esc(t.ret)}, ${esc(String(t.adults))} adult(s).` : "Add dates on the home page or in Flights so these buttons open the right stay."} This app does not invent rates or star ratings.</p>
        ${compareBtns(r.name)}
      </div>
      ${botCard(true)}
      <p><a href="#/stays">← All stays</a> · ${(r.areas || []).map((id) => `<a href="#/area/${id}">${esc((areaById(id) || {}).name || id)}</a>`).join(" · ")}</p>
    `;
  }

  function viewStays() {
    const params = new URLSearchParams((location.hash.split("?")[1] || ""));
    const area = params.get("area") || "";
    const who = params.get("who") || "";
    let list = JV.RESORTS.slice();
    if (area) list = list.filter((r) => r.areas.includes(area));
    if (who) list = list.filter((r) => r.audience === who);
    return `
      <p class="kicker">Places to stay</p>
      <h1>All-inclusive resorts</h1>
      <p class="lead">Well-known resorts with official site links. Ratings and nightly prices are omitted on purpose — only live comparison sites can show a current number. Some properties were still reopening after Hurricane Melissa as of ${esc(JV.RESEARCH_DATE)}.</p>
      <form class="card row" id="stayFilter">
        <label class="field">Area
          <select name="area">
            <option value="">All areas</option>
            ${JV.AREAS.map((a) => `<option value="${a.id}"${area === a.id ? " selected" : ""}>${esc(a.name)}</option>`).join("")}
          </select>
        </label>
        <label class="field">Who it’s for
          <select name="who">
            <option value="">Family and adults</option>
            <option value="family"${who === "family" ? " selected" : ""}>Family</option>
            <option value="adults"${who === "adults" ? " selected" : ""}>Adults only</option>
          </select>
        </label>
        <button class="btn btn-gold" type="submit">Filter</button>
      </form>
      ${list.length ? list.map((r) => resortCard(r, false)).join("") : `<div class="card"><p>No resorts match that filter. Portmore and Kingston are covered on their area pages as villas and city hotels.</p></div>`}
      <div class="card">
        <h3>Portmore and Kingston</h3>
        <p>There are no well-known beach all-inclusives in Portmore or Kingston &amp; St. Andrew. See <a href="#/area/portmore">Portmore</a> for gated Airbnbs and <a href="#/area/kingston">Kingston &amp; St. Andrew</a> for city hotels.</p>
      </div>
      ${botCard(true)}
    `;
  }

  function viewVillas() {
    const t = trip();
    return `
      <p class="kicker">Private stays</p>
      <h1>Villas</h1>
      <p class="lead">These buttons open Airbnb, Vrbo, and Booking.com villa searches for each area, using your dates and guest count. This app does not invent a villa inventory or a nightly rate.</p>
      ${JV.AREAS.map((a) => {
        const L = staySearch("villa", a.name, t);
        return `<article class="card">
          <h3><a href="#/area/${a.id}">${esc(a.name)}</a></h3>
          <p>${esc(a.villaAreas)}</p>
          <div class="btns">
            <a class="btn btn-gold btn-sm" target="_blank" rel="noopener" href="${esc(L.airbnb)}">Airbnb</a>
            <a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${esc(L.vrbo)}">Vrbo</a>
            <a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${esc(L.booking)}">Booking.com villas</a>
          </div>
        </article>`;
      }).join("")}
      ${botCard(true)}
    `;
  }

  function viewGated() {
    const t = trip();
    return `
      <p class="kicker">Safer stays</p>
      <h1>Airbnb in gated communities</h1>
      <p class="lead">Search links use the words <strong>gated community [area] Jamaica</strong> plus your dates. Only communities that could be verified are named below. A search result is not a guarantee — confirm the gate with the host.</p>
      <div class="banner"><strong>Portmore Pines</strong> was not clearly verified as a gated community, so it is not listed as one. Named gated communities in Negril were also not documented clearly enough to list by name.</div>
      <h2>Search by area</h2>
      ${JV.AREAS.map((a) => {
        const L = staySearch("gated", a.name, t, "gated community " + a.name + " Jamaica");
        return `<div class="card between">
          <div><h3>${esc(a.name)}</h3><p class="muted">Airbnb query: gated community ${esc(a.name)} Jamaica</p></div>
          <a class="btn btn-gold btn-sm" target="_blank" rel="noopener" href="${esc(L.airbnb)}">Search Airbnb</a>
        </div>`;
      }).join("")}
      <h2>Verified or well-documented communities</h2>
      ${JV.GATED.map(gatedCard).join("")}
      <div class="card">
        <h3>Safety checklist</h3>
        <ul>${JV.SAFETY.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
      ${botCard(true)}
    `;
  }

  function viewSaved() {
    const list = shortlist();
    const notes = load(STORE_NOTES, {});
    return `
      <p class="kicker">Your picks</p>
      <h1>Shortlist</h1>
      <p class="lead">Save resorts, villas, or communities as you browse, add the price you actually found, and compare them side by side. Nothing here is booked.</p>
      <div class="btns">
        <a class="btn btn-gold" href="#/compare">Compare saved options</a>
        <button type="button" class="btn btn-outline" data-act="copy-trip">Copy trip details</button>
      </div>
      ${list.length ? list.map((item) => `
        <article class="card">
          <div class="between">
            <div>
              <h3>${esc(item.name)}</h3>
              <p class="muted">${esc(item.place || item.type || "")}</p>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" data-act="toggle-save" data-item='${esc(JSON.stringify(item))}'>Remove</button>
          </div>
          <label class="field">Price you found (you type it — this app will not invent one)
            <input type="text" inputmode="decimal" data-act="note-price" data-id="${esc(item.id)}" placeholder="e.g. $2,400 for 7 nights" value="${esc((notes[item.id] || {}).price || "")}">
          </label>
          <label class="field">Your notes
            <textarea rows="2" data-act="note-text" data-id="${esc(item.id)}" placeholder="Room type, what’s included, source of the price…">${esc((notes[item.id] || {}).text || "")}</textarea>
          </label>
        </article>`).join("") : `<div class="card"><p>Your shortlist is empty. Open a resort or community and tap <strong>Save to shortlist</strong>.</p></div>`}
      ${botCard(true)}
    `;
  }

  function viewCompare() {
    const list = shortlist();
    const notes = load(STORE_NOTES, {});
    const t = trip();
    if (!list.length) {
      return `<h1>Compare</h1><div class="card"><p>Save at least two options to compare them. <a href="#/stays">Browse resorts</a> or <a href="#/gated">gated Airbnbs</a>.</p></div>`;
    }
    return `
      <p class="kicker">${esc(dateLabel(t))}</p>
      <h1>Compare saved options</h1>
      <p class="lead">Side by side, using only what you saved and the prices you typed. Empty price boxes mean you have not entered a number yet.</p>
      <div class="compare">
        ${list.map((item) => {
          const n = notes[item.id] || {};
          const r = resortById(item.id);
          return `<article class="card">
            <h3>${esc(item.name)}</h3>
            <p class="muted">${esc(item.place || "")}</p>
            ${r ? `<p>${r.audience === "adults" ? "Adults only" : r.audience === "family" ? "Family" : "City hotel"}</p>` : `<p>${esc(item.type || "")}</p>`}
            ${r && r.status ? `<p class="tag warn">${esc(r.status.label)}</p>` : ""}
            <p><strong>Price you entered:</strong> ${n.price ? esc(n.price) : "<span class='muted'>Not entered</span>"}</p>
            <p>${n.text ? esc(n.text) : "<span class='muted'>No notes yet</span>"}</p>
            ${r && r.official ? `<a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="${esc(r.official)}">Official site</a>` : ""}
            ${r ? compareBtns(r.name) : ""}
          </article>`;
        }).join("")}
      </div>
      <div class="btns" style="margin-top:14px">
        <button type="button" class="btn btn-gold" data-act="copy-trip">Copy trip details for my bot</button>
        <a class="btn btn-outline" href="${esc(BOT)}">Open Jamaica Travel bot</a>
      </div>
    `;
  }

  function viewBudget() {
    const t = trip();
    const b = Object.assign({}, load(STORE_BUDGET, {}));
    const rows = JV.BUDGET_ROWS.map((row) => {
      const val = b[row.id] === undefined || b[row.id] === "" ? "" : b[row.id];
      return `<tr>
        <td>${esc(row.label)}</td>
        <td><input class="money" type="number" min="0" step="0.01" data-budget="${row.id}" value="${esc(val)}" placeholder="Enter a price you found"></td>
      </tr>`;
    }).join("");
    const total = JV.BUDGET_ROWS.reduce((s, row) => s + (Number(b[row.id]) || 0), 0);
    const people = pax(t);
    const each = people ? total / people : total;
    return `
      <p class="kicker">Your numbers only</p>
      <h1>Budget planner</h1>
      <p class="lead">Type the prices you see on airline and hotel sites. This app will not fill in a fare or a hotel rate for you. Totals update as you type. Amounts stay on this device.</p>
      <div class="card">
        <table class="table">
          <thead><tr><th>Item</th><th>Amount (USD)</th></tr></thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr><th>Total</th><th class="money" id="budgetTotal">$${total.toFixed(2)}</th></tr>
            <tr><th>Per person (${people})</th><th class="money" id="budgetEach">$${each.toFixed(2)}</th></tr>
          </tfoot>
        </table>
        <p class="note">Travelers counted from your trip form: ${esc(String(t.adults))} adult(s)${Number(t.children) ? ", " + esc(String(t.children)) + " child(ren)" : ""}.</p>
      </div>
      ${botCard(true)}
    `;
  }

  function viewPack() {
    const checked = load(STORE_PACK, {});
    return `
      <p class="kicker">Before you fly</p>
      <h1>Packing checklist</h1>
      <p class="lead">A practical list for a Jamaica trip from Texas. Tick items off; the checks stay on this device. Add your own notes at the bottom if you want.</p>
      <div class="card">
        <ul class="checklist">
          ${JV.PACK.map((p) => `<li><input type="checkbox" data-pack="${p.id}" ${checked[p.id] ? "checked" : ""}><span>${esc(p.label)}</span></li>`).join("")}
        </ul>
      </div>
      <p><a href="#/entry">Jamaica entry essentials →</a></p>
    `;
  }

  function viewEntry() {
    return `
      <p class="kicker">Official rules</p>
      <h1>Jamaica entry essentials</h1>
      <p class="lead">Taken from Visit Jamaica’s entry-requirements page, the Jamaica Customs Agency, and PICA. This is not legal advice. Rules can change — use the official links.</p>
      ${JV.ENTRY.map((b) => `<article class="card"><h3>${esc(b.title)}</h3><p>${esc(b.body)}</p></article>`).join("")}
      <div class="card">
        <h3>Official links</h3>
        <div class="btns">
          <a class="btn btn-gold" target="_blank" rel="noopener" href="${esc(JV.LINKS.c5)}">Free C5 form (enterjamaica.gov.jm)</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(JV.LINKS.entry)}">Visit Jamaica entry requirements</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(JV.LINKS.c5Customs)}">Jamaica Customs — passenger C5</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(JV.LINKS.pica)}">PICA</a>
          <a class="btn btn-outline" target="_blank" rel="noopener" href="${esc(JV.LINKS.stateDept)}">U.S. State Department — Jamaica</a>
        </div>
        <p class="note">The C5 form is free on the government site. Avoid look-alike sites that charge a fee.</p>
      </div>
      ${botCard(true)}
    `;
  }

  function viewMore() {
    return `
      <p class="kicker">App</p>
      <h1>More</h1>
      <div class="navgrid">
        <a href="#/saved">★ Shortlist</a>
        <a href="#/compare">Compare</a>
        <a href="#/budget">Budget planner</a>
        <a href="#/pack">Packing list</a>
        <a href="#/entry">Entry essentials</a>
        <a href="#/villas">Villas</a>
        <a href="#/gated">Gated Airbnbs</a>
      </div>
      ${botCard(false)}
      <div class="card">
        <h3>Install this app</h3>
        <p>On a phone or tablet in Chrome: tap <strong>⋮</strong>, then <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>
        <p>On a computer, your App maker can add a desktop icon. The app works offline for the pages already opened, but live flight and hotel searches need a connection.</p>
      </div>
      <div class="card">
        <h3>What this app will not do</h3>
        <ul>
          <li>It will not book a flight, hotel, villa, or car.</li>
          <li>It will not take a card, password, passport number, or other private ID.</li>
          <li>It will not invent a fare, a hotel rate, or a star rating.</li>
        </ul>
      </div>
      <p class="footer">Jamaica Vacation · researched ${esc(JV.RESEARCH_DATE)} · facts only · no bookings or payments.</p>
    `;
  }

  /* ---------- router ---------- */
  function parseHash() {
    const h = (location.hash || "#/").replace(/^#/, "");
    const [path] = h.split("?");
    const parts = path.split("/").filter(Boolean);
    return { parts, path: "/" + parts.join("/") };
  }

  function render() {
    const { parts } = parseHash();
    const page = parts[0] || "home";
    const id = parts[1] || "";
    let html = "";
    if (page === "home" || page === "") html = viewHome();
    else if (page === "flights") html = viewFlights();
    else if (page === "areas") html = viewAreas();
    else if (page === "area") html = viewArea(id);
    else if (page === "stays") html = viewStays();
    else if (page === "stay") html = viewStay(id);
    else if (page === "villas") html = viewVillas();
    else if (page === "gated") html = viewGated();
    else if (page === "saved") html = viewSaved();
    else if (page === "compare") html = viewCompare();
    else if (page === "budget") html = viewBudget();
    else if (page === "pack") html = viewPack();
    else if (page === "entry") html = viewEntry();
    else if (page === "more") html = viewMore();
    else html = viewHome();
    view.innerHTML = html;
    view.focus();
    bindTripForm();
    const filter = $("#stayFilter");
    if (filter) {
      filter.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(filter);
        const q = new URLSearchParams();
        if (fd.get("area")) q.set("area", fd.get("area"));
        if (fd.get("who")) q.set("who", fd.get("who"));
        location.hash = "#/stays" + (q.toString() ? "?" + q.toString() : "");
      });
    }
    paintChrome(page);
    window.scrollTo(0, 0);
  }

  function paintChrome(page) {
    const t = trip();
    const bar = $("#tripSummary");
    if (bar) {
      bar.innerHTML = `<a href="#/">${esc(origin(t))} → ${esc(t.to)}</a>
        <a href="#/">${esc(dateLabel(t))}</a>
        <a href="#/">${esc(String(t.adults))} adult${Number(t.adults) === 1 ? "" : "s"}${Number(t.children) ? " · " + t.children + " child" : ""}</a>
        ${t.area ? `<a href="#/area/${esc(t.area)}">${esc((areaById(t.area) || {}).name || "")}</a>` : ""}`;
    }
    document.querySelectorAll(".tabbar a, .top-nav a").forEach((a) => {
      const r = a.getAttribute("data-route");
      a.classList.toggle("on", r === page || (r === "home" && !page) || (r === "areas" && (page === "area" || page === "areas")) || (r === "stays" && (page === "stay" || page === "stays" || page === "villas" || page === "gated")));
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.getAttribute("data-act");
    if (act === "copy-trip") {
      copyTrip();
    } else if (act === "toggle-save") {
      try {
        const item = JSON.parse(btn.getAttribute("data-item"));
        const list = toggleSaved(item);
        const nowOn = list.some((x) => x.id === item.id);
        toast(nowOn ? "Saved to shortlist" : "Removed from shortlist");
        render();
      } catch (err) {}
    }
  });
  document.addEventListener("input", (e) => {
    const pack = e.target.getAttribute("data-pack");
    if (pack) {
      const checked = load(STORE_PACK, {});
      checked[pack] = e.target.checked;
      save(STORE_PACK, checked);
      return;
    }
    const budget = e.target.getAttribute("data-budget");
    if (budget) {
      const b = load(STORE_BUDGET, {});
      b[budget] = e.target.value;
      save(STORE_BUDGET, b);
      const t = trip();
      const total = JV.BUDGET_ROWS.reduce((s, row) => s + (Number(b[row.id]) || 0), 0);
      const people = pax(t);
      const tot = $("#budgetTotal");
      const each = $("#budgetEach");
      if (tot) tot.textContent = "$" + total.toFixed(2);
      if (each) each.textContent = "$" + (people ? total / people : total).toFixed(2);
      return;
    }
    const noteId = e.target.getAttribute("data-id");
    const act = e.target.getAttribute("data-act");
    if (noteId && (act === "note-price" || act === "note-text")) {
      const notes = load(STORE_NOTES, {});
      notes[noteId] = notes[noteId] || {};
      if (act === "note-price") notes[noteId].price = e.target.value;
      if (act === "note-text") notes[noteId].text = e.target.value;
      save(STORE_NOTES, notes);
    }
  });

  window.addEventListener("hashchange", render);
  render();
})();
