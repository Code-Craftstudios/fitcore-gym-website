(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== PHOTOS: assets/images/<name>.jpg is used if it exists, otherwise the Unsplash photo loads ===== */
const PHOTOS = {
  'hero': '1689877020200-403d8542d95d',
  'about': '1534438327276-14e5300c3a48',
  'cta': '1605296867304-46d5465a13f1',
  'strength': '1517836357463-d25dfeac3438',
  'personal': '1722925541142-5db2668ca492',
  'weight-loss': '1593079831268-3381b0db4a77',
  'muscle': '1581009146145-b5ef050c2e1e',
  'functional': '1548690312-e3b507d8c110',
  'hiit': '1526506118085-60ce8714f8c5',
  'squat-rack': '1709315859957-3b3583bf364c',
  'cable-machine': '1637430308606-86576d8fef3c',
  'leg-press': '1571902943202-507ec2618e8f',
  'smith-machine': '1689514226761-336eaf77e311',
  'bench-press': '1623874514711-0f321325f318',
  'dumbbells': '1576678927484-cc907957088c',
  'treadmill': '1593079831268-3381b0db4a77',
  'functional-trainer': '1590487988256-9ed24133863e',
  'trainer-alex': '1623946724822-ba48a838f3da',
  'trainer-maya': '1541534741688-6078c6bfb5c5',
  'trainer-rahul': '1709315847224-6c8a812e886a',
  'trainer-sophia': '1722925541142-5db2668ca492'
};
const SRC = {};
Object.entries(PHOTOS).forEach(([name, id]) => {
  const local = new URL(`assets/images/${name}.jpg`, document.baseURI).href;
  const remote = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;
  const use = src => { SRC[name] = src; document.documentElement.style.setProperty(`--img-${name}`, `url("${src}")`); };
  const probe = new Image();
  probe.onload = () => use(local);
  probe.onerror = () => use(remote);
  probe.src = local;
});

/* ===== DATA (photo sources are in PHOTOS above) ===== */
const PROGRAMS = [
  ['Strength Training', 'Barbell-based progressive overload for real, measurable power.', 'Intermediate', '12 weeks', 'strength', 'Athlete performing a heavy barbell squat'],
  ['Personal Training', 'One-to-one coaching built around your body, schedule and goals.', 'All levels', 'Flexible', 'personal', 'Trainer coaching a member through a lift'],
  ['Weight Loss', 'Structured conditioning and nutrition guidance for lasting fat loss.', 'Beginner', '16 weeks', 'weight-loss', 'Member running on a treadmill'],
  ['Muscle Building', 'Hypertrophy splits with tracked volume and recovery.', 'Intermediate', '12 weeks', 'muscle', 'Member training chest with dumbbells'],
  ['Functional Training', 'Mobility, balance and core work for everyday strength.', 'Beginner', '8 weeks', 'functional', 'Group doing functional training with kettlebells'],
  ['HIIT & Conditioning', 'Short, intense intervals that build stamina fast.', 'Advanced', '6 weeks', 'hiit', 'Group performing high-intensity intervals']
];
const EQUIPMENT = [
  ['Squat Rack', 'Strength', 'Precision equipment', 'Engineered for progressive overload and controlled movement.', 'squat-rack'],
  ['Cable Machine', 'Strength', 'Constant tension', 'Adjustable pulleys for smooth, joint-friendly isolation work.', 'cable-machine'],
  ['Leg Press', 'Strength', 'Heavy and safe', 'Load the legs hard with a guided path and safety stops.', 'leg-press'],
  ['Smith Machine', 'Strength', 'Guided barbell', 'A fixed bar path for confident solo training.', 'smith-machine'],
  ['Bench Press', 'Strength', 'Classic pressing', 'Competition-grade benches with stable racks.', 'bench-press'],
  ['Dumbbells', 'Free weights', 'Full range', 'Hex dumbbells from 2 kg to 50 kg.', 'dumbbells'],
  ['Treadmill', 'Cardio', 'Built to run', 'Cushioned decks with incline and interval programs.', 'treadmill'],
  ['Functional Trainer', 'Functional', 'Move freely', 'Dual adjustable stacks for multi-plane training.', 'functional-trainer']
];

/* ===== PROGRAM CARDS ===== */
$('#program-grid').innerHTML = PROGRAMS.map(([n, d, lv, du, img, alt], i) => `
<article class="card" data-r style="--d:${(i % 3) * 0.1}s">
  <div class="thumb"><div class="ph" style="--img:var(--img-${img})" role="img" aria-label="${alt}"></div></div>
  <div class="body"><h3>${n}</h3><p>${d}</p>
  <div class="meta"><span>${lv} · ${du}</span><a href="#contact" aria-label="Enquire about ${n}">→</a></div></div>
</article>`).join('');

/* ===== WHY CHOOSE US ===== */
const WHY = [
  ['Expert coaching', 'Certified coaches fix your form and keep you progressing.', 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z'],
  ['Premium equipment', 'Competition-grade racks, machines and free weights.', 'M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11'],
  ['Personalized plans', 'A program built around your goal, schedule and level.', 'M9 4h6v3H9zM7 5.5H5.5v15h13v-15H17M9 14l2 2 4-4'],
  ['Progress tracking', 'Regular check-ins and measurable strength targets.', 'M3 20h18M5 16l4-4 3 3 6-7M14 8h4v4'],
  ['Clean & hygienic', 'Cleaned through the day, with fresh towels and filtered water.', 'M12 3c3 4 6 7 6 11a6 6 0 01-12 0c0-4 3-7 6-11z'],
  ['Supportive community', 'Train with people who push you and celebrate your wins.', 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M17 11a2.5 2.5 0 100-5M18 15c2 .4 3 1.8 3 5']
];
const ICON = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="%"/></svg>';
$('#why-grid').innerHTML = WHY.map(([t, d, p], i) => `<article class="feat" data-r style="--d:${(i % 3) * 0.1}s"><b>0${i + 1}</b>${ICON.replace('%', p)}<h3>${t}</h3><p class="muted">${d}</p></article>`).join('');

/* ===== TRAINERS ===== */
const TRAINERS = [
  ['Alex Carter', 'Strength & Conditioning', '8 years experience', 'alex'],
  ['Maya Sharma', 'Weight Loss Specialist', '6 years experience', 'maya'],
  ['Rahul Mehra', 'Bodybuilding Coach', '10 years experience', 'rahul'],
  ['Sophia Wilson', 'Functional Training', '7 years experience', 'sophia']
];
const SOCIAL = [['Instagram', 'IG'], ['Facebook', 'FB'], ['YouTube', 'YT']];
$('#trainer-grid').innerHTML = TRAINERS.map(([n, s, e, k], i) => `<article class="trainer" data-r style="--d:${i * 0.1}s"><div class="thumb"><div class="ph" style="--img:var(--img-trainer-${k});aspect-ratio:3/4" role="img" aria-label="${n}, ${s}"></div><div class="social">${SOCIAL.map(([x, a]) => `<a href="#" aria-label="${n} on ${x}">${a}</a>`).join('')}</div></div><h3>${n}</h3><p class="muted">${s}</p><p class="exp">${e}</p></article>`).join('');

/* ===== GALLERY + LIGHTBOX ===== */
const GALLERY = [
  ['about', '4/5', 'Members training in the main hall'], ['strength', '1/1', 'Barbell strength session'],
  ['dumbbells', '4/3', 'Dumbbell rack'], ['personal', '3/4', 'Personal training'],
  ['hiit', '4/3', 'High-intensity conditioning'], ['functional', '4/5', 'Functional training with ropes'],
  ['treadmill', '1/1', 'Cardio area'], ['muscle', '4/3', 'Dumbbell workout']
];
$('#gallery-grid').innerHTML = GALLERY.map(([k, r, a], i) => `<button type="button" class="g" data-i="${i}" aria-label="Open photo: ${a}"><span class="ph" style="--img:var(--img-${k});--r:${r}"></span></button>`).join('');
const lb = $('#lightbox'), lbImg = $('#lb-img');
let cur = 0, lastFocus = null;
const lbShow = i => {
  cur = (i + GALLERY.length) % GALLERY.length;
  const [k, , a] = GALLERY[cur];
  if (SRC[k]) lbImg.src = SRC[k]; else lbImg.removeAttribute('src');
  lbImg.alt = a;
};
const lbOpen = i => { lastFocus = document.activeElement; lbShow(i); lb.hidden = false; void lb.offsetWidth; lb.classList.add('open'); $('.lb-close').focus(); };
const lbClose = () => { lb.classList.remove('open'); setTimeout(() => { lb.hidden = true; }, reduce ? 0 : 300); if (lastFocus) lastFocus.focus(); };
$('#gallery-grid').addEventListener('click', e => { const b = e.target.closest('.g'); if (b) lbOpen(+b.dataset.i); });
$('.lb-close').addEventListener('click', lbClose);
$('.lb-prev').addEventListener('click', () => lbShow(cur - 1));
$('.lb-next').addEventListener('click', () => lbShow(cur + 1));
lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbShow(cur - 1);
  if (e.key === 'ArrowRight') lbShow(cur + 1);
});

/* ===== NAVBAR, MENU, SCROLL-TOP, PARALLAX ===== */
const header = $('header'), menu = $('#menu'), burger = $('.burger'), toTop = $('#to-top'), heroBg = $('.hero-bg');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
});
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = scrollY;
    header.classList.toggle('solid', y > 40);
    toTop.classList.toggle('show', y > 700);
    if (!reduce && y < innerHeight) heroBg.style.transform = `translate3d(0,${y * 0.25}px,0)`;
    ticking = false;
  });
}, { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

/* ===== SCROLL REVEAL + COUNTERS + ACTIVE LINK ===== */
const reveal = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { const t = e.target; t.classList.add('in'); reveal.unobserve(t); setTimeout(() => t.style.setProperty('--d', '0s'), 1600); }
}), { threshold: 0.15 });
$$('[data-r]').forEach(el => reveal.observe(el));

const fmt = (n, s) => n.toLocaleString('en-IN') + s;
const counter = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, suf = el.dataset.suf || '', t0 = performance.now();
  counter.unobserve(el);
  if (reduce) { el.textContent = fmt(end, suf); return; }
  const step = t => {
    const p = Math.min((t - t0) / 1600, 1);
    el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))), suf);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}), { threshold: 0.6 });
$$('[data-count]').forEach(el => counter.observe(el));

const links = $$('nav a[href^="#"]');
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => spy.observe(s));

/* ===== EQUIPMENT SELECTOR ===== */
const eqList = $('#eq-list'), eqPanel = $('#eq-panel'), eqImg = $('#eq-img');
function showEquipment(i) {
  const [name, cat, title, desc, file] = EQUIPMENT[i];
  $$('button', eqList).forEach((b, j) => b.setAttribute('aria-selected', j === i));
  eqPanel.classList.add('swap');
  setTimeout(() => {
    eqImg.style.setProperty('--img', `var(--img-${file})`);
    eqImg.setAttribute('aria-label', `${name} in the FITCORE gym`);
    $('#eq-cat').textContent = cat;
    $('#eq-name').textContent = name;
    $('#eq-desc').textContent = `${title}. ${desc}`;
    eqPanel.classList.remove('swap');
  }, reduce ? 0 : 250);
}
EQUIPMENT.forEach(([name], i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = name;
  b.setAttribute('role', 'tab');
  b.addEventListener('click', () => showEquipment(i));
  eqList.append(b);
});
showEquipment(0);

/* ===== BMI CALCULATOR ===== */
$('#bmi-form').addEventListener('submit', e => {
  e.preventDefault();
  const h = parseFloat($('#h').value), w = parseFloat($('#w').value), a = parseInt($('#a').value, 10);
  const out = $('#bmi-out'), err = $('#bmi-err');
  if (!(h >= 100 && h <= 250) || !(w >= 25 && w <= 300) || !(a >= 14 && a <= 100) || !$('#g').value) {
    err.textContent = 'Enter height 100–250 cm, weight 25–300 kg, age 14–100 and select a gender.';
    out.hidden = true;
    return;
  }
  err.textContent = '';
  const m = h / 100, bmi = w / (m * m);
  const [cat, tip] = bmi < 18.5 ? ['Underweight', 'Aim for a small calorie surplus with progressive strength training.']
    : bmi < 25 ? ['Normal', 'Great range. Keep training consistently and eat for performance.']
    : bmi < 30 ? ['Overweight', 'Combine strength work, cardio and a modest calorie deficit.']
    : ['Obese', 'Start with low-impact training and speak with a doctor and our coaches.'];
  $('#bmi-score').textContent = bmi.toFixed(1);
  $('#bmi-cat').textContent = cat;
  $('#bmi-range').textContent = `Healthy range for your height: ${(18.5 * m * m).toFixed(1)}–${(24.9 * m * m).toFixed(1)} kg`;
  $('#bmi-tip').textContent = tip;
  out.hidden = false;
  out.classList.remove('pop'); void out.offsetWidth; out.classList.add('pop');
});

/* ===== TESTIMONIAL CAROUSEL ===== */
const track = $('.track'), slides = $$('.slide'), carousel = $('.carousel');
let idx = 0, timer;
const go = n => {
  idx = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${idx * 100}%)`;
  slides.forEach((s, i) => s.setAttribute('aria-hidden', i !== idx));
};
const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(idx + 1), 6000); };
$('#prev').addEventListener('click', () => { go(idx - 1); auto(); });
$('#next').addEventListener('click', () => { go(idx + 1); auto(); });
carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', auto);
go(0); auto();

/* ===== CONTACT FORM VALIDATION ===== */
const rules = {
  name: v => v.trim().length >= 2,
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  phone: v => /^[+\d][\d\s-]{7,14}$/.test(v.trim())
};
$('#contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  let ok = true;
  Object.keys(rules).forEach(k => {
    const el = f.elements.namedItem(k), bad = !rules[k](el.value);
    el.setAttribute('aria-invalid', bad);
    if (bad) ok = false;
  });
  $('#form-msg').textContent = ok ? 'Thank you! Our team will contact you within 24 hours.' : 'Please enter a valid name, email and phone number.';
  if (ok) f.reset();
});
})();