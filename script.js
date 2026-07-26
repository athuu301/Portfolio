// ==========================================================
// PORTFOLIO SCRIPT
// Handles: hero typing animation, active-tab tracking,
// mobile nav toggle, back-to-top, and the contact terminal.
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  initTypedHero();
  initTabNav();
  initMobileMenu();
  initBackToTop();
  initContactForm();
});

/* ----------------------------------------------------------
   Footer year
---------------------------------------------------------- */
function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------
   Hero "typing" code block
   Builds the code with syntax-highlight spans, then reveals
   it character by character for a live-editor feel.
---------------------------------------------------------- */
function initTypedHero() {
  const target = document.getElementById('typedCode');
  const cursor = document.getElementById('cursorBlink');
  if (!target) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Each line: array of {text, cls} segments. cls maps to CSS accent classes.
  const lines = [
    [{ t: 'const ', c: 'kw' }, { t: 'student', c: 'plain' }, { t: ' = {', c: 'plain' }],
    [{ t: '  name', c: 'key' }, { t: ': ', c: 'plain' }, { t: '"Atharv Gupta"', c: 'str' }, { t: ',', c: 'plain' }],
    [{ t: '  role', c: 'key' }, { t: ': ', c: 'plain' }, { t: '"Computer Science Student"', c: 'str' }, { t: ',', c: 'plain' }],
    [{ t: '  location', c: 'key' }, { t: ': ', c: 'plain' }, { t: '"Bangalore, India"', c: 'str' }, { t: ',', c: 'plain' }],
    [{ t: '  learning', c: 'key' }, { t: ': ', c: 'plain' }, { t: '["JavaScript", "React", "DSA"]', c: 'str' }, { t: ',', c: 'plain' }],
    [{ t: '  openTo', c: 'key' }, { t: ': ', c: 'plain' }, { t: '"internships & collabs"', c: 'str' }],
    [{ t: '};', c: 'plain' }],
  ];

  const colorMap = {
    kw: 'var(--accent-keyword)',
    key: 'var(--accent-func)',
    str: 'var(--accent-string)',
    num: 'var(--accent-number)',
    plain: 'var(--text)',
  };

  if (prefersReducedMotion) {
    // Render immediately, no animation.
    target.innerHTML = lines.map(renderLine).join('\n');
    if (cursor) cursor.style.display = 'none';
    return;
  }

  // Flatten into a single stream of {char, cls} for typing, remembering line breaks.
  const stream = [];
  lines.forEach((line, li) => {
    line.forEach(seg => {
      for (const ch of seg.t) stream.push({ ch, cls: seg.c });
    });
    if (li < lines.length - 1) stream.push({ ch: '\n', cls: 'plain' });
  });

  let i = 0;
  let html = '';
  let openSpan = false;
  const speed = 16; // ms per character

  function renderLine(line) {
    return line.map(seg => `<span style="color:${colorMap[seg.c]}">${escapeHtml(seg.t)}</span>`).join('');
  }

  function typeNext() {
    if (i >= stream.length) return;
    const item = stream[i];

    if (item.ch === '\n') {
      if (openSpan) { html += '</span>'; openSpan = false; }
      html += '\n';
    } else {
      // Start a new colored span whenever the class changes, for accuracy just wrap per char group.
      const prev = stream[i - 1];
      if (!prev || prev.cls !== item.cls || prev.ch === '\n') {
        if (openSpan) html += '</span>';
        html += `<span style="color:${colorMap[item.cls]}">`;
        openSpan = true;
      }
      html += escapeHtml(item.ch);
    }

    target.innerHTML = html + (openSpan ? '</span>' : '');
    i++;
    setTimeout(typeNext, speed);
  }

  typeNext();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ----------------------------------------------------------
   Active tab tracking via IntersectionObserver
---------------------------------------------------------- */
function initTabNav() {
  const tabs = document.querySelectorAll('.tab');
  const sections = Array.from(tabs)
    .map(tab => document.querySelector(tab.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const setActive = (id) => {
    tabs.forEach(tab => {
      tab.classList.toggle('is-active', tab.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    // Pick the entry closest to the top that's currently intersecting.
    const visible = entries.filter(e => e.isIntersecting);
    if (visible.length > 0) {
      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      setActive(visible[0].target.id);
    }
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));

  // Close mobile menu on tab click
  tabs.forEach(tab => {
    tab.addEventListener('click', () => closeMobileMenu());
  });
}

/* ----------------------------------------------------------
   Mobile burger menu
---------------------------------------------------------- */
function initMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const navTabs = document.getElementById('navTabs');
  if (!burger || !navTabs) return;

  burger.addEventListener('click', () => {
    const isOpen = navTabs.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });
}

function closeMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const navTabs = document.getElementById('navTabs');
  if (!burger || !navTabs) return;
  navTabs.classList.remove('is-open');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}

/* ----------------------------------------------------------
   Back-to-top button
---------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ----------------------------------------------------------
   Contact form — client-side validation + simulated
   terminal "send" sequence (no backend attached).
---------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const messageInput = document.getElementById('messageInput');
  const output = document.getElementById('terminalOutput');
  const sendBtn = document.getElementById('sendBtn');

  const errors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    message: document.getElementById('messageError'),
  };

  function validate() {
    let valid = true;
    errors.name.textContent = '';
    errors.email.textContent = '';
    errors.message.textContent = '';

    if (!nameInput.value.trim()) {
      errors.name.textContent = 'error: name cannot be empty';
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      errors.email.textContent = 'error: enter a valid email address';
      valid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      errors.message.textContent = 'error: message must be at least 10 characters';
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    output.textContent = '';

    if (!validate()) {
      output.style.color = 'var(--accent-danger)';
      output.textContent = '✗ validation failed — fix the fields above';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.6';
    output.style.color = 'var(--accent-string)';

    // Simulated terminal sequence for feedback.
    const sequence = [
      '> connecting to mail server...',
      '> authenticating...',
      `> sending message from ${nameInput.value.trim()}...`,
      '✓ message sent — thanks, I\'ll reply within 1-2 business days.',
    ];

    let idx = 0;
    output.textContent = sequence[0];
    const interval = setInterval(() => {
      idx++;
      if (idx < sequence.length) {
        output.textContent += '\n' + sequence[idx];
      } else {
        clearInterval(interval);
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
        form.reset();
      }
    }, 550);
  });

  // Clear individual field errors as the user types.
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      const key = input.name;
      if (errors[key]) errors[key].textContent = '';
    });
  });
}
