(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  /* ---------- theme ---------- */
  var KEY = 'nsug-theme';
  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function currentTheme() {
    return root.getAttribute('data-theme') || (systemDark() ? 'dark' : 'light');
  }
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.style.setProperty('--d', (i % 3) * 80 + 'ms');
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- app download ----------
     Put the APK address here once. Easiest hosting: a GitHub Release, e.g.
     https://github.com/USERNAME/REPO/releases/latest/download/kadhi.apk
     While this is empty the buttons just scroll to the Get the app section. */
  var APK_URL = 'https://github.com/nilesoftug/kadhi/releases/download/Androd/kadhi_app.apk';
  var apkBtn = document.getElementById('apkBtn');
  var apkNote = document.getElementById('apkNote');
  if (APK_URL) {
    document.querySelectorAll('[data-download]').forEach(function (a) {
      a.setAttribute('href', APK_URL);
      a.setAttribute('download', 'kadhi.apk');
    });
  } else {
    if (apkBtn) apkBtn.hidden = true;
    if (apkNote) apkNote.textContent = 'The Android download link is coming soon. Until then, Kadhi works in your phone browser.';
  }

  /* ---------- footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- contact form (Web3Forms) ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var WA = 'https://wa.me/256786319064';
  function say(msg, ok) {
    if (!note) return;
    note.textContent = msg;
    note.classList.toggle('ok', !!ok);
    note.classList.toggle('err', ok === false);
  }
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, bad = [];
      ['name', 'email', 'message'].forEach(function (k) {
        var el = f[k];
        var ok = el.value.trim() && (k !== 'email' || /^\S+@\S+\.\S+$/.test(el.value.trim()));
        el.classList.toggle('invalid', !ok);
        if (!ok) bad.push(el);
      });
      if (bad.length) {
        bad[0].focus();
        say('Please fill in your name, a valid email and a message.', false);
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var label = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending…';
      say('Sending your message…');

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.subject = 'Nilesoft UG enquiry: ' + (data.topic || 'General');

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j.success !== false, j: j }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error('failed');
          form.reset();
          say('Message sent. Thank you, we will reply by email soon.', true);
        })
        .catch(function () {
          say('Could not send right now. Please message us on WhatsApp instead: ' + WA, false);
        })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });
    form.addEventListener('input', function (e) {
      if (e.target.classList) e.target.classList.remove('invalid');
    });
  }
})();
