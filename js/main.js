/*
 * KOLAY DÜZENLEME ALANI
 * BAŞLANGIÇ TARİHİ: 07 Şubat 2024, İstanbul saatiyle 00:00:00.
 * GİRİŞİ HATIRLA: false yaparsanız sayfa her açıldığında tarih yeniden sorulur.
 */
const START_DATE = { year: 2024, month: 2, day: 7 };
const REMEMBER_ENTRY = false;
const STORAGE_KEY = 'bizim-hikayemiz-giris-v2';
const TIME_ZONE = 'Europe/Istanbul';
/* Kendi müziğinizi assets/audio/ klasörüne ekleyip yolunu buraya yazın. */
const MUSIC_SRC = '';

/* FOTOĞRAFLAR: assets/photos klasörüne dosya ekleyip bu diziyi düzenleyin. */
const photos = [
  { src: 'assets/photos/ani-01.jpeg', alt: 'Doğada birlikte bir selfie', caption: 'Doğanın içinde, yan yana', date: '', location: '', note: 'Birlikte geçirilen sakin bir an.' },
  { src: 'assets/photos/ani-02.jpeg', alt: 'Gece vapurunda birlikte', caption: 'Bir İstanbul gecesi' },
  { src: 'assets/photos/ani-03.jpeg', alt: 'Aynada birlikte bir fotoğraf', caption: 'Küçük bir an' },
  { src: 'assets/photos/ani-04.jpeg', alt: 'Laleler arasında birlikte', caption: 'Baharın renkleri', date: '', location: '', note: 'Renklerin arasında, yan yana.' },
  { src: 'assets/photos/ani-05.jpeg', alt: 'Akşam birlikte çekilen fotoğraf', caption: 'Yan yana, yine' },
  { src: 'assets/photos/ani-06.jpeg', alt: 'Bir kafede birlikte selfie', caption: 'Sıradan bir günün güzelliği' },
  { src: 'assets/photos/ani-07.jpeg', alt: 'Açık havada birlikte selfie', caption: 'Güneşli bir gün' },
  { src: 'assets/photos/ani-08.jpeg', alt: 'Deniz kıyısında birlikte', caption: 'Deniz, gökyüzü, biz' },
  { src: 'assets/photos/ani-09.jpeg', alt: 'Deniz kıyısında siyah beyaz bir an', caption: 'Siyah beyaz, çok renkli' },
  { src: 'assets/photos/ani-10.jpeg', alt: 'Tiyatro koltuklarında birlikte', caption: 'Birlikte bir akşam' },
  { src: 'assets/photos/ani-11.jpeg', alt: 'Akşam bir masada birbirimize bakarken', caption: 'Bir bakış yeter' },
  { src: 'assets/photos/ani-12.jpeg', alt: 'Ormanda yakın bir selfie', caption: 'İyi ki varsın' },
  { src: 'assets/photos/ani-13.jpeg', alt: 'Galata Kulesi önünde bir selfie', caption: 'Galata ve biz', date: '', location: 'İstanbul · Galata', note: 'Şehrin ortasında bir anımız.' },
  { src: 'assets/photos/ani-14.jpeg', alt: 'Yeşillikler önünde birlikte', caption: 'Yan yana olmak' },
  { src: 'assets/photos/ani-15.jpeg', alt: 'İstanbul Boğazı kıyısında birlikte', caption: 'Boğaz kıyısında', date: '', location: 'İstanbul · Boğaz', note: 'Birlikte baktığımız manzara.' },
  { src: 'assets/photos/ani-16.jpeg', alt: 'Siyah beyaz bir şehir fotoğrafı', caption: 'Şehre karşı' },
  { src: 'assets/photos/ani-17.jpeg', alt: 'Yolculukta birlikte selfie', caption: 'Yolda da birlikte' },
  { src: 'assets/photos/ani-18.jpeg', alt: 'Güneşli bir parkta birlikte', caption: 'Güneşli bir an' },
  { src: 'assets/photos/ani-19.jpeg', alt: 'Çiçek buketiyle birlikte', caption: 'Küçük sürprizler' },
  { src: 'assets/photos/ani-20.jpeg', alt: 'Bir kafede birbirimize bakarken', caption: 'O anlardan biri' }
];

/* TIMELINE / ANILAR: { date, title, description, photo } biçiminde yeni olay ekleyin. photo isteğe bağlıdır. */
const timelineEvents = [
  { date: '07.02.2024', title: 'Taner ve Nisa’nın hikâyesi başladı.', description: 'Birlikte yazacağımız hikâyenin ilk sayfası.' },
  { date: 'Bugün', title: 'İyi ki hâlâ yan yanayız.', description: 'Her yeni gün, konuşmalarımız ve biriktirdiğimiz anılarla hikâyemize yeni bir satır ekliyor.' }
];

const entry = document.getElementById('entry');
const main = document.getElementById('main-content');
const openEnvelope = document.getElementById('open-envelope');
const dateLetter = document.getElementById('date-letter');
const dateInput = document.getElementById('date-answer');
const dateError = document.getElementById('date-error');
const dateForm = document.getElementById('date-form');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readRememberedEntry() {
  if (!REMEMBER_ENTRY) return false;
  try { return localStorage.getItem(STORAGE_KEY) === 'true'; }
  catch { return false; }
}

function rememberEntry() {
  if (!REMEMBER_ENTRY) return;
  try { localStorage.setItem(STORAGE_KEY, 'true'); }
  catch { /* Gizli gezinmede depolama engellenmiş olabilir. */ }
}

function showMain(animated = false) {
  main.hidden = false;
  document.body.classList.remove('is-locked');
  window.scrollTo(0, 0);
  if (animated && !reducedMotion) {
    entry.classList.add('is-unlocking');
    window.setTimeout(() => { entry.hidden = true; }, 1200);
  } else {
    entry.hidden = true;
  }
  updateCounter();
}

openEnvelope.addEventListener('click', () => {
  entry.classList.add('envelope-open');
  window.setTimeout(() => {
    dateLetter.hidden = false;
    dateInput.focus({ preventScroll: true });
  }, reducedMotion ? 0 : 530);
});

dateInput.addEventListener('input', () => {
  const digits = dateInput.value.replace(/\D/g, '').slice(0, 8);
  let formatted = digits.slice(0, 2);
  if (digits.length > 2) formatted += '.' + digits.slice(2, 4);
  if (digits.length > 4) formatted += '.' + digits.slice(4);
  dateInput.value = formatted;
  dateError.textContent = '';
  dateInput.removeAttribute('aria-invalid');
});

dateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const answer = dateInput.value.replace(/\D/g, '');
  const expected = `${String(START_DATE.day).padStart(2, '0')}${String(START_DATE.month).padStart(2, '0')}${START_DATE.year}`;
  if (answer === expected) {
    rememberEntry();
    showMain(true);
  } else {
    dateError.textContent = 'Bir daha düşün bakalım... ❤️';
    dateInput.setAttribute('aria-invalid', 'true');
    dateInput.focus();
  }
});

/* İstanbul yerel tarihine göre takvim yılı, ayı ve günü hesaplanır. */
const istanbulFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
});

function istanbulParts(date) {
  const parts = Object.fromEntries(istanbulFormatter.formatToParts(date)
    .filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]));
  return parts;
}

function calendarDifference(now) {
  const current = istanbulParts(now);
  const startDay = Date.UTC(START_DATE.year, START_DATE.month - 1, START_DATE.day);
  const today = Date.UTC(current.year, current.month - 1, current.day);
  if (today < startDay) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, elapsedDays: 0, totalDays: 0 };

  let years = current.year - START_DATE.year;
  if (current.month < START_DATE.month || (current.month === START_DATE.month && current.day < START_DATE.day)) years--;
  const anniversaryYear = START_DATE.year + years;
  let months = (current.year - anniversaryYear) * 12 + current.month - START_DATE.month;
  if (current.day < START_DATE.day) months--;
  const anchor = Date.UTC(anniversaryYear, START_DATE.month - 1 + months, START_DATE.day);
  const days = Math.floor((today - anchor) / 86400000);

  const elapsedDays = Math.floor((today - startDay) / 86400000);
  return { years, months, days, hours: current.hour, minutes: current.minute, seconds: current.second, elapsedDays, totalDays: elapsedDays + 1 };
}

function updateCounter() {
  const difference = calendarDifference(new Date());
  for (const [unit, value] of Object.entries(difference)) {
    if (unit === 'elapsedDays' || unit === 'totalDays') continue;
    const el = document.getElementById(unit);
    if (el) el.textContent = String(value).padStart(2, '0');
  }
  document.getElementById('elapsed-days').textContent = `Birlikte geçen toplam ${difference.elapsedDays} tam gün`;
  document.getElementById('together-day').textContent = `Bugün bizim ${difference.totalDays}. günümüz. ♥`;
}
updateCounter();
if (readRememberedEntry()) showMain();
window.setInterval(updateCounter, 1000);

/* Galeri kartları */
const filmStrip = document.getElementById('film-strip');
photos.forEach((photo, index) => {
  const figure = document.createElement('figure');
  figure.className = 'film-card';
  const details = [photo.date, photo.location].filter(Boolean).join(' · ');
  figure.innerHTML = `<button class="photo-button" type="button" data-photo="${index}" aria-label="${photo.caption} fotoğrafını büyüt"><img src="${photo.src}" alt="${photo.alt}" loading="lazy" decoding="async"><span class="photo-zoom" aria-hidden="true">↗</span></button><figcaption><span>${photo.caption}${details ? `<small>${details}</small>` : ''}</span><span>${String(index + 1).padStart(2, '0')}</span></figcaption>`;
  filmStrip.appendChild(figure);
});

/* Rastgele anı: aynı fotoğraf arka arkaya gelmez. */
const randomButton = document.getElementById('random-memory');
const randomPhoto = document.getElementById('random-photo');
const randomImage = document.getElementById('random-image');
const randomCaption = document.getElementById('random-caption');
let randomIndex = 0;
randomButton.addEventListener('click', () => {
  randomIndex = (randomIndex + 1 + Math.floor(Math.random() * (photos.length - 1))) % photos.length;
  const photo = photos[randomIndex];
  randomImage.src = photo.src;
  randomImage.alt = photo.alt;
  randomPhoto.dataset.photo = String(randomIndex);
  randomPhoto.setAttribute('aria-label', `${photo.caption} fotoğrafını büyüt`);
  randomCaption.textContent = [photo.caption, photo.date, photo.location, photo.note].filter(Boolean).join(' · ');
});

document.querySelectorAll('.secret-card').forEach(button => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    button.querySelector('.secret-text').hidden = isOpen;
  });
});

const musicButton = document.getElementById('music-toggle');
const music = document.getElementById('background-music');
if (MUSIC_SRC) {
  music.src = MUSIC_SRC;
  music.volume = 0.45;
  musicButton.hidden = false;
  musicButton.addEventListener('click', async () => {
    if (music.paused) {
      try { await music.play(); }
      catch { return; }
    } else {
      music.pause();
    }
    const playing = !music.paused;
    musicButton.setAttribute('aria-pressed', String(playing));
    musicButton.setAttribute('aria-label', playing ? 'Müziği durdur' : 'Müziği aç');
    document.getElementById('music-label').textContent = playing ? 'Müziği durdur' : 'Müziği aç';
  });
}

const timeline = document.getElementById('timeline');
timelineEvents.forEach(event => {
  const item = document.createElement('article');
  item.className = 'timeline-item reveal';
  const date = document.createElement('span'); date.className = 'timeline-date'; date.textContent = event.date;
  const dot = document.createElement('span'); dot.className = 'timeline-dot'; dot.setAttribute('aria-hidden', 'true');
  const body = document.createElement('div'); body.className = 'timeline-body';
  const title = document.createElement('h3'); title.textContent = event.title;
  const description = document.createElement('p'); description.textContent = event.description;
  body.append(title, description);
  if (event.photo) {
    const picture = document.createElement('img');
    picture.src = event.photo; picture.alt = event.title; picture.loading = 'lazy';
    body.appendChild(picture);
  }
  item.append(date, dot, body);
  timeline.appendChild(item);
});

const observer = 'IntersectionObserver' in window && !reducedMotion
  ? new IntersectionObserver((entries, self) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); self.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })
  : null;
document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('is-visible'));

const letterButton = document.getElementById('open-love-letter');
const letterContent = document.getElementById('love-letter-content');
letterButton.addEventListener('click', () => {
  const container = letterButton.closest('.letter-interaction');
  container.classList.add('is-open');
  letterButton.setAttribute('aria-expanded', 'true');
  window.setTimeout(() => {
    letterContent.hidden = false;
    document.getElementById('letter-prompt').hidden = true;
  }, reducedMotion ? 0 : 420);
});

/* Fotoğraf görüntüleyici: tıklama, ok tuşları, Escape ve mobil kaydırma. */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxMeta = document.getElementById('lightbox-meta');
const lightboxCount = document.getElementById('lightbox-count');
let activePhoto = 0;
let lastFocused = null;
let touchStartX = null;

function displayPhoto(index) {
  activePhoto = (index + photos.length) % photos.length;
  const photo = photos[activePhoto];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.caption;
  lightboxMeta.textContent = [photo.date, photo.location, photo.note].filter(Boolean).join(' · ');
  lightboxCount.textContent = `${String(activePhoto + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
}
function openLightbox(index, trigger) {
  lastFocused = trigger;
  displayPhoto(index);
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  lightbox.querySelector('.lightbox-close').focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
  if (lastFocused) lastFocused.focus();
}
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-photo]');
  if (trigger) openLightbox(Number(trigger.dataset.photo), trigger);
});
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => displayPhoto(activePhoto - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => displayPhoto(activePhoto + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') displayPhoto(activePhoto - 1);
  if (event.key === 'ArrowRight') displayPhoto(activePhoto + 1);
  if (event.key === 'Tab') {
    const controls = [...lightbox.querySelectorAll('button')];
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
lightbox.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener('touchend', event => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 50) displayPhoto(activePhoto + (delta < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });
