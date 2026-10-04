(function () {
  'use strict';

  const IMG = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=70`;
  const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#dde3ea"/><text x="50%" y="50%" fill="#7a8794" font-family="Arial" font-size="28" text-anchor="middle">Photo unavailable</text></svg>');

  // period: label shown after rent price. Prices in USD.
  const properties = [
    { id: 1, title: 'Modern 4-Bedroom Family Villa', listing: 'sale', category: 'house', price: 485000, location: 'Austin, TX', beds: 4, baths: 3, area: 2800, unit: 'sqft', images: ['1568605114967-8130f3a36994', '1560448204-e02f11c3d0e2', '1512917774080-9991f1c4c750'], features: ['Garage', 'Garden', 'Swimming pool', 'Smart home', '24/7 security'], desc: 'A beautifully finished villa in a quiet gated neighbourhood with open-plan living, a modern kitchen and a landscaped garden. Clean title and ready to move in.' },
    { id: 2, title: 'Serviced 2-Bedroom Apartment', listing: 'rent', category: 'apartment', price: 1800, period: 'month', location: 'Austin, TX', beds: 2, baths: 2, area: 1100, unit: 'sqft', images: ['1545324418-cc1a3fa10c00', '1502672260266-1c1ef2d93688', '1560448204-e02f11c3d0e2'], features: ['Gym', 'Parking', 'Elevator', 'Backup power', 'Pet friendly'], desc: 'Bright, fully serviced apartment close to shops, transit and restaurants. Flexible 6 or 12 month leases.' },
    { id: 3, title: 'Prime Residential Land – 600 sqm', listing: 'sale', category: 'land', price: 95000, location: 'Dallas, TX', beds: 0, baths: 0, area: 600, unit: 'sqm', images: ['1500382017468-9049fed747ef', '1500382017468-9049fed747ef'], features: ['Survey plan', 'Registered title', 'Road access', 'Water & power nearby', 'Dry land'], desc: 'Level residential plot in a fast-growing estate with all documents available for inspection. Ideal for building or investment.' },
    { id: 4, title: 'Luxury 5-Bedroom Mansion', listing: 'sale', category: 'house', price: 1250000, location: 'Houston, TX', beds: 5, baths: 5, area: 5200, unit: 'sqft', images: ['1600596542815-ffad4c1539a9', '1523217582562-09d0def993a6', '1512917774080-9991f1c4c750'], features: ['Cinema room', 'Swimming pool', 'Maid quarters', 'Solar power', 'Gated estate'], desc: 'Statement home with premium finishes, double-height living area and resort-style outdoor space.' },
    { id: 5, title: 'Commercial Office Space', listing: 'rent', category: 'commercial', price: 4500, period: 'month', location: 'Dallas, TX', beds: 0, baths: 2, area: 2400, unit: 'sqft', images: ['1486406146926-c627a92ad1ab', '1497366216548-37526070297c'], features: ['Open plan', 'Meeting rooms', 'Reception', 'Parking', 'High-speed internet'], desc: 'Professional office floor in a central business district with ample parking and 24/7 access.' },
    { id: 6, title: 'Cozy 1-Bedroom Studio', listing: 'rent', category: 'apartment', price: 950, period: 'month', location: 'San Antonio, TX', beds: 1, baths: 1, area: 520, unit: 'sqft', images: ['1502672260266-1c1ef2d93688', '1545324418-cc1a3fa10c00'], features: ['Furnished', 'Wi-Fi', 'Laundry', 'Secure entry'], desc: 'Compact, fully furnished studio ideal for students and young professionals.' },
    { id: 7, title: '3-Bedroom Townhouse', listing: 'sale', category: 'house', price: 325000, location: 'San Antonio, TX', beds: 3, baths: 2, area: 1900, unit: 'sqft', images: ['1523217582562-09d0def993a6', '1568605114967-8130f3a36994'], features: ['Garage', 'Patio', 'Fitted kitchen', 'Community park'], desc: 'Well-priced townhouse in a family-friendly community near top-rated schools.' },
    { id: 8, title: 'Commercial Land – 1 Acre', listing: 'sale', category: 'land', price: 380000, location: 'Houston, TX', beds: 0, baths: 0, area: 1, unit: 'acre', images: ['1500382017468-9049fed747ef'], features: ['Corner piece', 'Highway frontage', 'Zoned commercial', 'Clear title'], desc: 'High-visibility corner lot with strong traffic, perfect for retail, warehouses or a filling station.' },
    { id: 9, title: 'Retail Shop Unit', listing: 'rent', category: 'commercial', price: 2200, period: 'month', location: 'Austin, TX', beds: 0, baths: 1, area: 900, unit: 'sqft', images: ['1497366216548-37526070297c', '1486406146926-c627a92ad1ab'], features: ['Street frontage', 'Storage room', 'Foot traffic', 'Signage allowed'], desc: 'Ground-floor retail unit in a busy shopping strip with excellent visibility.' }
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const money = (n) => '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: n % 1 ? 2 : 0 });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const imgTag = (id, alt, cls = '') => `<img src="${IMG(id)}" alt="${esc(alt)}" class="${cls}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK}'">`;
  const priceHTML = (p) => `${money(p.price)}${p.listing === 'rent' ? `<small> / ${p.period}</small>` : ''}`;

  const toastEl = $('#appToast');
  function toast(msg, ok = true) {
    toastEl.classList.toggle('text-bg-success', ok);
    toastEl.classList.toggle('text-bg-danger', !ok);
    $('#toastMsg').textContent = msg;
    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 4000 }).show();
  }

  /* ---------- Navbar ---------- */
  const nav = $('#mainNav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach((a) =>
    a.addEventListener('click', () => {
      const c = $('#navMenu');
      if (c.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(c).hide();
    }));
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Listings ---------- */
  const grid = $('#propertyGrid');
  const f = { type: $('#fType'), cat: $('#fCategory'), loc: $('#fLocation'), beds: $('#fBeds'), sort: $('#fSort') };

  function render() {
    const loc = f.loc.value.trim().toLowerCase();
    let list = properties.filter((p) =>
      (f.type.value === 'all' || p.listing === f.type.value) &&
      (f.cat.value === 'all' || p.category === f.cat.value) &&
      (!loc || p.location.toLowerCase().includes(loc) || p.title.toLowerCase().includes(loc)) &&
      (+f.beds.value === 0 || p.beds >= +f.beds.value));
    if (f.sort.value === 'low') list.sort((a, b) => a.price - b.price);
    if (f.sort.value === 'high') list.sort((a, b) => b.price - a.price);

    $('#resultCount').textContent = `${list.length} propert${list.length === 1 ? 'y' : 'ies'} found`;
    $('#noResults').classList.toggle('d-none', list.length > 0);

    grid.innerHTML = list.map((p) => `
      <div class="col-md-6 col-lg-4">
        <article class="card prop-card">
          <div class="prop-img">
            ${imgTag(p.images[0], p.title)}
            <span class="tag ${p.listing}">For ${p.listing === 'sale' ? 'Sale' : 'Rent'}</span>
            <span class="tag tag-type">${p.category}</span>
          </div>
          <div class="card-body d-flex flex-column">
            <div class="price mb-1">${priceHTML(p)}</div>
            <h5 class="card-title h6">${esc(p.title)}</h5>
            <p class="text-muted small mb-3"><i class="bi bi-geo-alt-fill text-danger"></i> ${esc(p.location)}</p>
            <div class="prop-meta mb-3">
              ${p.beds ? `<span><i class="bi bi-door-closed"></i>${p.beds} Beds</span>` : ''}
              ${p.baths ? `<span><i class="bi bi-droplet"></i>${p.baths} Baths</span>` : ''}
              <span><i class="bi bi-arrows-fullscreen"></i>${p.area.toLocaleString()} ${p.unit}</span>
            </div>
            <div class="d-flex gap-2 mt-auto">
              <button class="btn btn-outline-primary flex-fill" data-action="details" data-id="${p.id}">Details</button>
              <button class="btn btn-accent flex-fill" data-action="pay" data-id="${p.id}">${p.listing === 'sale' ? 'Buy / Reserve' : 'Rent Now'}</button>
            </div>
          </div>
        </article>
      </div>`).join('');
  }

  Object.values(f).forEach((el) => el.addEventListener('input', render));
  $('#fReset').addEventListener('click', () => {
    f.type.value = f.cat.value = 'all'; f.loc.value = ''; f.beds.value = '0'; f.sort.value = 'featured'; render();
  });

  $('#heroSearch').addEventListener('submit', (e) => {
    e.preventDefault();
    f.type.value = document.querySelector('input[name="heroType"]:checked').value;
    f.cat.value = $('#heroCategory').value;
    f.loc.value = $('#heroLocation').value;
    render();
    $('#listings').scrollIntoView({ behavior: 'smooth' });
  });

  const byId = (id) => properties.find((p) => p.id === +id);
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const p = byId(btn.dataset.id);
    if (btn.dataset.action === 'details') openDetails(p);
    if (btn.dataset.action === 'pay') openPay(p);
  });

  /* ---------- Details modal ---------- */
  const detailModal = new bootstrap.Modal('#detailModal');
  const payModalEl = $('#payModal');
  const payModal = new bootstrap.Modal(payModalEl);
  const viewingModal = new bootstrap.Modal('#viewingModal');
  let current = null;

  function openDetails(p) {
    current = p;
    $('#detailTitle').textContent = p.title;
    $('#detailBody').innerHTML = `
      <div class="row g-4">
        <div class="col-lg-7">
          <div id="mainImgWrap">${imgTag(p.images[0], p.title, 'detail-main')}</div>
          <div class="row g-2 mt-1">
            ${p.images.map((im, i) => `<div class="col-3">${imgTag(im, p.title + ' photo ' + (i + 1), 'detail-thumb w-100' + (i === 0 ? ' active' : ''))}</div>`).join('')}
          </div>
        </div>
        <div class="col-lg-5">
          <span class="badge ${p.listing === 'sale' ? 'bg-success' : 'bg-primary'} mb-2">For ${p.listing === 'sale' ? 'Sale' : 'Rent'}</span>
          <div class="price fs-2 mb-1">${priceHTML(p)}</div>
          <p class="text-muted"><i class="bi bi-geo-alt-fill text-danger"></i> ${esc(p.location)}</p>
          <div class="prop-meta mb-3">
            ${p.beds ? `<span><i class="bi bi-door-closed"></i>${p.beds} Beds</span>` : ''}
            ${p.baths ? `<span><i class="bi bi-droplet"></i>${p.baths} Baths</span>` : ''}
            <span><i class="bi bi-arrows-fullscreen"></i>${p.area.toLocaleString()} ${p.unit}</span>
          </div>
          <p>${esc(p.desc)}</p>
          <h6>Features</h6>
          <div class="mb-4">${p.features.map((x) => `<span class="feature-pill">${esc(x)}</span>`).join('')}</div>
          <div class="d-grid gap-2">
            <button class="btn btn-accent btn-lg" id="dPay">${p.listing === 'sale' ? 'Buy / Reserve Now' : 'Rent Now'}</button>
            <button class="btn btn-outline-primary" id="dView"><i class="bi bi-calendar-check me-1"></i>Book a Viewing</button>
          </div>
        </div>
      </div>`;
    const body = $('#detailBody');
    body.querySelectorAll('.detail-thumb').forEach((t, i) => t.addEventListener('click', () => {
      body.querySelectorAll('.detail-thumb').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      $('#mainImgWrap').innerHTML = imgTag(p.images[i], p.title, 'detail-main');
    }));
    $('#dPay').addEventListener('click', () => switchModal(detailModal, () => openPay(p)));
    $('#dView').addEventListener('click', () => switchModal(detailModal, () => openViewing(p)));
    detailModal.show();
  }

  function switchModal(from, next) {
    const el = from._element;
    el.addEventListener('hidden.bs.modal', next, { once: true });
    from.hide();
  }

  /* ---------- Viewing ---------- */
  const viewingForm = $('#viewingForm');
  function openViewing(p) {
    current = p;
    viewingForm.reset();
    viewingForm.classList.remove('was-validated');
    $('#viewingProp').textContent = p.title + ' – ' + p.location;
    const d = new Date(); d.setDate(d.getDate() + 1);
    $('#vDate').min = d.toISOString().split('T')[0];
    viewingModal.show();
  }
  viewingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    viewingForm.classList.add('was-validated');
    if (!viewingForm.checkValidity()) return;
    viewingModal.hide();
    toast('Viewing request sent. An agent will contact you shortly.');
  });

  /* ---------- Payment ---------- */
  const FEE = 0.015;
  let payOpts = [];

  function optionsFor(p) {
    if (p.listing === 'rent') {
      return [
        { label: `First ${p.period} rent`, amount: p.price },
        { label: `Rent + security deposit (2 × ${p.period})`, amount: p.price * 2 }
      ];
    }
    return [
      { label: 'Reservation deposit (10%)', amount: Math.round(p.price * 0.1) },
      { label: 'Full payment', amount: p.price }
    ];
  }

  function openPay(p) {
    current = p;
    payOpts = optionsFor(p);
    $('#payStep1').classList.remove('d-none');
    $('#payStep2').classList.add('d-none');
    $('#payForm').reset();
    $('#payForm').classList.remove('was-validated');
    $('#payForm').querySelectorAll('.is-invalid').forEach((x) => x.classList.remove('is-invalid'));
    $('#payImg').src = IMG(p.images[0]);
    $('#payImg').alt = p.title;
    $('#payImg').onerror = function () { this.onerror = null; this.src = FALLBACK; };
    $('#payName').textContent = p.title;
    $('#payLoc').textContent = p.location;
    $('#payOption').innerHTML = payOpts.map((o, i) => `<option value="${i}">${esc(o.label)}</option>`).join('');
    toggleMethod();
    updateTotals();
    payModal.show();
  }

  function totals() {
    const amt = payOpts[+$('#payOption').value].amount;
    const fee = Math.round(amt * FEE * 100) / 100;
    return { amt, fee, total: amt + fee };
  }
  function updateTotals() {
    const t = totals();
    $('#payAmount').textContent = money(t.amt);
    $('#payFee').textContent = money(t.fee);
    $('#payTotal').textContent = money(t.total);
    $('#payBtnAmt').textContent = money(t.total);
  }
  $('#payOption').addEventListener('change', updateTotals);

  function toggleMethod() {
    const m = document.querySelector('input[name="method"]:checked').value;
    $('#cardFields').classList.toggle('d-none', m !== 'card');
    $('#bankFields').classList.toggle('d-none', m !== 'bank');
    $('#mobileFields').classList.toggle('d-none', m !== 'mobile');
  }
  document.querySelectorAll('input[name="method"]').forEach((r) => r.addEventListener('change', toggleMethod));

  // Input formatting
  $('#cardNum').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
  });
  $('#cardExp').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
  });
  $('#cardCvc').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); });

  const luhn = (num) => {
    let sum = 0, alt = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let n = +num[i];
      if (alt) { n *= 2; if (n > 9) n -= 9; }
      sum += n; alt = !alt;
    }
    return sum % 10 === 0;
  };

  function validExpiry(v) {
    const m = /^(\d{2})\/(\d{2})$/.exec(v);
    if (!m) return false;
    const mo = +m[1], yr = 2000 + +m[2];
    if (mo < 1 || mo > 12) return false;
    const now = new Date();
    return yr > now.getFullYear() || (yr === now.getFullYear() && mo >= now.getMonth() + 1);
  }

  const mark = (el, ok) => { el.classList.toggle('is-invalid', !ok); return ok; };

  $('#payForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const method = document.querySelector('input[name="method"]:checked').value;
    let ok = true;
    ok = mark($('#pName'), $('#pName').value.trim().length > 1) && ok;
    ok = mark($('#pEmail'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#pEmail').value.trim())) && ok;
    if (method === 'card') {
      const digits = $('#cardNum').value.replace(/\s/g, '');
      ok = mark($('#cardNum'), digits.length >= 13 && luhn(digits)) && ok;
      ok = mark($('#cardExp'), validExpiry($('#cardExp').value)) && ok;
      ok = mark($('#cardCvc'), /^\d{3,4}$/.test($('#cardCvc').value)) && ok;
    }
    if (method === 'mobile') ok = mark($('#mobileNum'), /^\+?\d{9,15}$/.test($('#mobileNum').value.replace(/[\s-]/g, ''))) && ok;
    if (!ok) return;

    const btn = $('#payBtn');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing…';

    // DEMO: replace this timeout with a call to your payment gateway (Stripe, Paystack, Flutterwave...).
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = original;
      showReceipt(method);
    }, 1800);
  });

  function showReceipt(method) {
    const t = totals();
    const ref = 'PN-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
    const pending = method === 'bank';
    const labels = { card: 'Credit / Debit card', bank: 'Bank transfer', mobile: 'Mobile money' };
    $('#payDoneTitle').textContent = pending ? 'Reservation Submitted' : 'Payment Received';
    $('#payDoneMsg').textContent = pending
      ? 'Complete the bank transfer using the reference below. We will confirm once funds arrive.'
      : `Thank you, ${$('#pName').value.trim()}. A receipt has been sent to ${$('#pEmail').value.trim()}.`;
    $('#receipt').innerHTML = `
      <div><span>Reference</span><strong>${ref}</strong></div>
      <div><span>Property</span><span class="text-end">${esc(current.title)}</span></div>
      <div><span>Payment for</span><span class="text-end">${esc(payOpts[+$('#payOption').value].label)}</span></div>
      <div><span>Method</span><span>${labels[method]}</span></div>
      <div><span>Status</span><span>${pending ? 'Awaiting transfer' : 'Paid'}</span></div>
      <div><span>Total</span><strong>${money(t.total)}</strong></div>
      <div><span>Date</span><span>${new Date().toLocaleString()}</span></div>`;
    $('#payStep1').classList.add('d-none');
    $('#payStep2').classList.remove('d-none');
  }

  /* ---------- Contact & newsletter ---------- */
  const contactForm = $('#contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.classList.add('was-validated');
    if (!contactForm.checkValidity()) return;
    contactForm.reset();
    contactForm.classList.remove('was-validated');
    toast('Message sent! We will get back to you within 24 hours.');
  });
  $('#newsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    toast('Thanks for subscribing!');
  });

  render();
})();
