/* ═══════════════════════════════════════════
   VEDIC SANGHA — script.js
   ═══════════════════════════════════════════ */

/* ── PERSONALITIES DATA ─────────────────── */
var PERSONALITIES = [
  {
    id: 1,
    name: "Premanand Govind Sharan",
    title: "Radha Vallabha Saint & Guru",
    shortDesc: "A revered ascetic from the Radha Vallabha Sampradaya, guiding seekers on the sublime path of divine love and bhakti.",
    image: "./images/premanand.jpg",
    fallback: "https://placehold.co/400x530/C8A84B/3A2810?text=Premanand+Maharaj",
    born: "30 March 1969, Sarsaul, Uttar Pradesh",
    tradition: "Radha Vallabha Sampradaya",
    guru: "Gaurangi Sharan",
    location: "Vrindavan, Uttar Pradesh, India",
    quote: "Spirituality is the essence of life, existence, and truth.",
    bio: [
      "Premanand Govind Sharan (born Aniruddh Kumar Pandey, 30 March 1969) is a revered Hindu ascetic and spiritual teacher from the Radha Vallabha Sampradaya. At the tender age of 13, he renounced worldly life and embarked on the path of sannyasa.",
      "He spent his formative years on the sacred banks of the Ganga in Varanasi, meditating beneath peepal trees, immersed in deep spiritual practice. It was during this time that he encountered the Radha Vallabha tradition.",
      "Under the guidance of his guru Gaurangi Sharan, he received the sacred 'Nij Mantra' — entering the exalted order of rasik saints who experience the eternal pastimes of Radha and Krishna.",
      "In 2016, he founded the Shri Hit Radha Keli Kunj Trust in Vrindavan, dedicated to spiritual upliftment. He emphasizes the importance of a true guru and the centrality of divine love in all aspects of life.",
      "Known to his devotees as Premanand Maharaj, his discourses on bhakti attract seekers from across India and the world."
    ]
  },
  {
    id: 2,
    name: "Vinod Baba",
    title: "Vinod Bihari Das Baba",
    shortDesc: "A deeply devoted saint residing at Priya Kunj Ashram, embodying the highest ideals of Vaishnava devotion and selfless service.",
    image: "./images/vinod.jpg",
    fallback: "https://placehold.co/400x530/E8722A/FDFAF3?text=Vinod+Baba",
    born: "Details preserved in ashram tradition",
    tradition: "Vaishnava Bhakti",
    guru: "Paramparā lineage",
    location: "Priya Kunj Ashram",
    quote: "The greatest miracle is the transformation of the human heart.",
    bio: [
      "Vinod Bihari Das Baba, lovingly known as Vinod Baba, is a saint of deep renunciation and boundless compassion at the Priya Kunj Ashram, whose life embodies the highest principles of Vaishnava devotion.",
      "Vinod Baba's life is a testament to the power of sincere bhakti — devotion offered with purity, humility, and one-pointed focus on the Divine. He has dedicated his existence to the welfare of all beings.",
      "His teachings are rooted in the ancient wisdom of the Vedic tradition, emphasizing the primacy of divine love, selfless service (seva), and surrender (sharanagati).",
      "The ashram under his guidance has become a sanctuary of peace — a place where the fragrance of incense, the melody of kirtana, and the warmth of spiritual fellowship create an environment for inner transformation.",
      "Vinod Baba teaches that the greatest miracle is the transformation of a human heart from selfishness to selflessness, from darkness to divine light."
    ]
  },
  {
    id: 3,
    name: "Lokanath Swami",
    title: "ISKCON Sanyasi & Padayatra Minister",
    shortDesc: "A senior disciple of Srila Prabhupada, renowned globally for his inspiring lectures, melodious kirtanas, and sacred padayatras.",
    image: "./images/lokanathswami.jpg",
    fallback: "https://placehold.co/400x530/6B1F1F/FDF3E7?text=Lokanath+Swami",
    born: "Maharashtra, India",
    tradition: "Gaudiya Vaishnavism (ISKCON)",
    guru: "His Divine Grace A.C. Bhaktivedanta Swami Prabhupada",
    location: "ISKCON — Worldwide",
    quote: "Chant, hear, and remember — this is the essence of devotional life.",
    bio: [
      "Lokanath Swami is a senior disciple of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada, the founder-acharya of ISKCON. His life has been a journey of dedicated service, spiritual practice, and global outreach.",
      "As ISKCON's Padayatra Minister, Lokanath Swami expanded the tradition of sacred pilgrimage walking (padayatra) to a worldwide phenomenon, inspiring devotees across continents to chant the holy names of the Lord.",
      "He provided the inspiration to begin ISKCON's yearly Vraja-mandala parikrama in 1987, a sacred circumambulation of Vrindavan's holy forests and temples, which continues to grow each year.",
      "As the Minister for Srila Prabhupada's Centennial, he coordinated a global four-year campaign culminating in ISKCON's grand worldwide centennial celebrations of 1996.",
      "Known for his deeply moving lectures and soul-stirring kirtanas, Lokanath Swami attends hundreds of ISKCON festivals worldwide and personally guides devotees in the quality of their japa."
    ]
  }
];

var QUOTES = [
  "The soul is eternal, the body is temporary. Seek the eternal.",
  "In the silence of the heart, God speaks.",
  "Service to the Divine is the highest form of self-realization.",
  "The lotus rises from muddy waters, pure and untouched — so too the soul.",
  "Devotion is not a practice; it is a way of being."
];

/* ── STATE ──────────────────────────────── */
var currentMode   = "signup";
var currentLang   = "en";
var currentUser   = null;
var currentPerson = null;

/* ── INIT ───────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  var session = safeJSON("vedic_session");
  if (session && session.name) {
    currentUser = session;
    renderDashboard();
    showPage("dashboard");
  } else {
    showPage("auth");
  }

  var q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  document.getElementById("auth-quote").textContent = "\u201c" + q + "\u201d";
});

/* ── PAGE ROUTING ───────────────────────── */
function showPage(name) {
  var pages = document.querySelectorAll(".page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }
  var page = document.getElementById("page-" + name);
  if (page) {
    page.classList.add("active");
    window.scrollTo(0, 0);
  }
}

/* ── LANGUAGE ───────────────────────────── */
function setLang(lang) {
  currentLang = lang;

  var selects = document.querySelectorAll(".lang-select");
  for (var i = 0; i < selects.length; i++) {
    selects[i].value = lang;
  }

  var els = document.querySelectorAll("[data-en]");
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.textContent = el.getAttribute("data-" + lang) || el.getAttribute("data-en");
  }

  var phs = document.querySelectorAll("[data-en-ph]");
  for (var i = 0; i < phs.length; i++) {
    var el = phs[i];
    el.placeholder = el.getAttribute("data-" + lang + "-ph") || el.getAttribute("data-en-ph");
  }

  updateSubmitBtn();
}

/* ── AUTH MODE TOGGLE ───────────────────── */
function switchMode(mode) {
  if (mode === currentMode) return;
  currentMode = mode;

  document.getElementById("tab-signup").classList.toggle("active", mode === "signup");
  document.getElementById("tab-login").classList.toggle("active",  mode === "login");

  var nameField = document.getElementById("field-name");
  nameField.style.display = (mode === "signup") ? "block" : "none";

  document.getElementById("inp-name").value  = "";
  document.getElementById("inp-email").value = "";
  document.getElementById("inp-pass").value  = "";
  hideError();
  updateSubmitBtn();
}

function updateSubmitBtn() {
  var btn = document.getElementById("btn-text");
  var key = "data-" + currentLang + "-" + currentMode;
  btn.textContent = btn.getAttribute(key) || btn.getAttribute("data-en-" + currentMode);
}

/* ── AUTH SUBMIT ────────────────────────── */
function handleAuth() {
  hideError();
  var name  = document.getElementById("inp-name").value.trim();
  var email = document.getElementById("inp-email").value.trim();
  var pass  = document.getElementById("inp-pass").value.trim();

  if (currentMode === "signup" && !name) {
    return showError("Please enter your full name.");
  }
  if (!email || email.indexOf("@") === -1) {
    return showError("Please enter a valid email address.");
  }
  if (!pass || pass.length < 4) {
    return showError("Password must be at least 4 characters.");
  }

  if (currentMode === "signup") {
    var user = { name: name, email: email, password: pass };
    localStorage.setItem("vedic_user",    JSON.stringify(user));
    localStorage.setItem("vedic_session", JSON.stringify(user));
    currentUser = user;
    renderDashboard();
    showPage("dashboard");
  } else {
    var stored = safeJSON("vedic_user");
    if (!stored) return showError("No account found. Please sign up first.");
    if (stored.email !== email || stored.password !== pass) {
      return showError("Incorrect email or password.");
    }
    localStorage.setItem("vedic_session", JSON.stringify(stored));
    currentUser = stored;
    renderDashboard();
    showPage("dashboard");
  }
}

function showError(msg) {
  var el = document.getElementById("auth-error");
  el.textContent = msg;
  el.style.display = "block";
}
function hideError() {
  document.getElementById("auth-error").style.display = "none";
}

/* ── LOGOUT ─────────────────────────────── */
function logout() {
  localStorage.removeItem("vedic_session");
  currentUser   = null;
  currentPerson = null;
  currentMode   = "signup";
  document.getElementById("tab-signup").classList.add("active");
  document.getElementById("tab-login").classList.remove("active");
  document.getElementById("field-name").style.display = "block";
  document.getElementById("inp-name").value  = "";
  document.getElementById("inp-email").value = "";
  document.getElementById("inp-pass").value  = "";
  hideError();
  showPage("auth");
}

/* ── DASHBOARD ──────────────────────────── */
function renderDashboard() {
  if (!currentUser) return;

  document.getElementById("welcome-name-text").textContent = currentUser.name;

  var q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  document.getElementById("dash-quote").textContent = "\u201c" + q + "\u201d";

  var grid = document.getElementById("cards-grid");
  grid.innerHTML = "";
  for (var i = 0; i < PERSONALITIES.length; i++) {
    grid.appendChild(buildCard(PERSONALITIES[i], i));
  }
}

function showDashboard() {
  currentPerson = null;
  showPage("dashboard");
}

/* ── BUILD CARD ─────────────────────────── */
function buildCard(p, idx) {
  var card = document.createElement("div");
  card.className = "p-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

  /* ── IMAGE: primary src + onerror fallback ── */
  var imgSrc = p.image;       /* e.g.  ./images/premanand.jpg  */
  var imgFb  = p.fallback;    /* placeholder URL               */

  card.innerHTML =
    '<div class="card-image-wrap">' +
      '<img class="card-img" src="' + imgSrc + '" alt="' + p.name + '" ' +
           'onerror="this.onerror=null;this.src=\'' + imgFb + '\';" />' +
      '<div class="card-image-overlay"></div>' +
      '<div class="card-corner tl"></div>' +
      '<div class="card-corner tr"></div>' +
      '<div class="card-corner bl"></div>' +
      '<div class="card-corner br"></div>' +
    '</div>' +
    '<div class="card-body">' +
      '<h3 class="card-name">' + p.name  + '</h3>' +
      '<p class="card-title">' + p.title + '</p>' +
      '<div class="om-divider"><span></span><span class="om-icon">✦</span><span></span></div>' +
      '<p class="card-desc">'  + p.shortDesc + '</p>' +
      '<p class="card-read-more">✦ READ FULL BIOGRAPHY ✦</p>' +
    '</div>';

  card.onclick   = function () { showDetail(p); };
  card.onkeydown = function (e) { if (e.key === "Enter") showDetail(p); };
  return card;
}

/* ── DETAIL PAGE ────────────────────────── */
function showDetail(person) {
  currentPerson = person;

  var imgSrc = person.image;
  var imgFb  = person.fallback;

  var metaHTML =
    metaRow("TRADITION", person.tradition) +
    metaRow("GURU",      person.guru) +
    metaRow("BORN",      person.born) +
    metaRow("LOCATION",  person.location);

  var bioHTML = "";
  for (var i = 0; i < person.bio.length; i++) {
    bioHTML += "<p>" + person.bio[i] + "</p>";
  }

  document.getElementById("detail-content").innerHTML =
    '<div class="detail-hero">' +
      '<div class="detail-image-frame">' +
        '<img src="' + imgSrc + '" alt="' + person.name + '" ' +
             'onerror="this.onerror=null;this.src=\'' + imgFb + '\';" />' +
      '</div>' +
      '<div class="detail-info">' +
        '<h1 class="detail-name">'       + person.name  + '</h1>' +
        '<p class="detail-title-text">'  + person.title + '</p>' +
        '<div class="om-divider"><span></span><span class="om-icon">✦</span><span></span></div>' +
        '<div style="margin-top:18px;">' + metaHTML + '</div>' +
      '</div>' +
    '</div>' +

    '<div class="detail-quote-box">' +
      '<p class="detail-quote-text">\u201c' + person.quote + '\u201d</p>' +
    '</div>' +

    '<div class="om-divider"><span></span><span class="om-icon">✦</span><span></span></div>' +
    '<h3 class="bio-section-title" style="margin-top:22px;">📖 LIFE &amp; TEACHINGS</h3>' +
    '<div class="bio-text">' + bioHTML + '</div>' +

    '<div class="comment-section" id="comment-section-' + person.id + '">' +
      '<h3 class="comment-heading">💬 Devotee Reflections</h3>' +
      '<div class="om-divider"><span></span><span class="om-icon">✦</span><span></span></div>' +
      '<div style="margin-top:16px;">' +
        '<textarea class="comment-textarea" id="comment-input-' + person.id + '"' +
          ' placeholder="Share your thoughts or reverence\u2026" rows="4"></textarea>' +
        '<button class="comment-submit-btn" onclick="submitComment(' + person.id + ')">' +
          '🙏 OFFER REFLECTION' +
        '</button>' +
      '</div>' +
      '<div class="comment-list" id="comment-list-' + person.id + '"></div>' +
    '</div>';

  renderComments(person.id);
  showPage("detail");
}

function metaRow(label, value) {
  return '<div class="meta-row">' +
           '<span class="meta-label">' + label + '</span>' +
           '<span class="meta-value">' + value + '</span>' +
         '</div>';
}

/* ── COMMENTS ───────────────────────────── */
function getComments(pid) {
  return safeJSON("vedic_comments_" + pid) || [];
}

function submitComment(pid) {
  var input = document.getElementById("comment-input-" + pid);
  var text  = input ? input.value.trim() : "";
  if (!text) return;

  var comment = {
    id:   Date.now(),
    user: currentUser ? currentUser.name : "Anonymous Seeker",
    text: text,
    time: new Date().toLocaleString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    })
  };

  var all = getComments(pid);
  all.unshift(comment);
  localStorage.setItem("vedic_comments_" + pid, JSON.stringify(all));
  input.value = "";
  renderComments(pid);
}

function renderComments(pid) {
  var list = document.getElementById("comment-list-" + pid);
  if (!list) return;

  var comments = getComments(pid);
  if (comments.length === 0) {
    list.innerHTML = '<p class="comment-empty">Be the first to offer a reflection.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < comments.length; i++) {
    var c = comments[i];
    html +=
      '<div class="comment-item">' +
        '<div class="comment-user">🪷 ' + escapeHTML(c.user) + '</div>' +
        '<p class="comment-body">'       + escapeHTML(c.text) + '</p>' +
        '<div class="comment-time">'     + c.time             + '</div>' +
      '</div>';
  }
  list.innerHTML = html;
}

/* ── HELPERS ────────────────────────────── */
function safeJSON(key) {
  try { return JSON.parse(localStorage.getItem(key)); }
  catch (e) { return null; }
}

function escapeHTML(str) {
  var d = document.createElement("div");
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

/* ── KEYBOARD: Enter = submit ───────────── */
document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;
  var authPage = document.getElementById("page-auth");
  if (authPage && authPage.classList.contains("active")) {
    handleAuth();
  }
});
