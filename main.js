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

  /* ---------- footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- contact form -> mailto ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var TO = 'hello@nilesoftug.com'; // change to your real address
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var bad = [];
      ['name', 'email', 'message'].forEach(function (k) {
        var el = f[k];
        var ok = el.value.trim() && (k !== 'email' || /^\S+@\S+\.\S+$/.test(el.value.trim()));
        el.classList.toggle('invalid', !ok);
        if (!ok) bad.push(el);
      });
      if (bad.length) {
        bad[0].focus();
        if (note) note.textContent = 'Please fill in your name, a valid email and a message.';
        return;
      }
      var topic = f.topic ? f.topic.value : 'General';
      var subject = 'Nilesoft UG enquiry: ' + topic;
      var body = 'Name: ' + f.name.value.trim() + '\nEmail: ' + f.email.value.trim() +
        '\nTopic: ' + topic + '\n\n' + f.message.value.trim();
      window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      if (note) note.textContent = 'Opening your email app… if nothing opens, write to ' + TO + '.';
    });
    form.addEventListener('input', function (e) {
      if (e.target.classList) e.target.classList.remove('invalid');
    });
  }
})();
