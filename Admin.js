/* ═══════════════════════════════════════════
   InternHub — Main Application Script
   Version 2.0
═══════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════
   CONSTANTS & CONFIG
══════════════════════════════════════════ */

const APP = {
  name:    'InternHub',
  version: '2.0.0',
  storage: {
    profile:      'internhub_profile',
    apps:         'internhub_apps',
    skills:       'internhub_skills',
    saved:        'internhub_saved',
    internships:  'internhub_internships',
    adminStats:   'internhub_admin_stats',
    theme:        'internhub_theme',
  },
};

const COMPANY_LOGOS = {
  Google:    '🔵', Microsoft: '🪟', Amazon:   '🟠',
  Spotify:   '🟢', Meta:      '🔴', Apple:    '🍎',
  Netflix:   '🎬', Flipkart:  '🛒', Infosys:  '🔷',
  Wipro:     '⚪', TCS:       '🟣', Zoho:     '🟡',
  Razorpay:  '💙', Swiggy:    '🔶', CRED:     '⚫',
  HDFC:      '🏦', Freshworks:'🟩', Ola:      '🟤',
  default:   '🏢',
};

const STATUS_LABELS = {
  applied:   'Applied',
  interview: 'Interview 📅',
  selected:  'Selected ✓',
  rejected:  'Rejected',
  offer:     'Offer 🎉',
};

const STATUS_COLORS = {
  applied:   { bg: '#EEEDFE', color: '#3C3489' },
  interview: { bg: '#FAEEDA', color: '#854F0B' },
  selected:  { bg: '#EAF3DE', color: '#3B6D11' },
  rejected:  { bg: '#FCEBEB', color: '#A32D2D' },
  offer:     { bg: '#E1F5EE', color: '#0F6E56' },
};

const SAMPLE_INTERNSHIPS = [
  { id:1,  logo:'🪟', company:'Microsoft', role:'Software Engineer Intern', location:'Bangalore', stipend:'₹25,000', duration:'6 Months', type:'hybrid',  cat:'tech',    tags:['new'],      skills:['Java','DSA','SQL'],       deadline:'2026-06-15', openings:12, applicants:243 },
  { id:2,  logo:'🟠', company:'Amazon',    role:'Cloud Solutions Intern',   location:'Hyderabad', stipend:'₹35,000', duration:'6 Months', type:'onsite',  cat:'tech',    tags:['hot'],      skills:['AWS','Python','Linux'],   deadline:'2026-06-20', openings:8,  applicants:310 },
  { id:3,  logo:'🔵', company:'Google',    role:'SWE Intern',               location:'Hyderabad', stipend:'₹40,000', duration:'3 Months', type:'hybrid',  cat:'tech',    tags:['hot','new'],skills:['C++','Algorithms'],       deadline:'2026-06-10', openings:5,  applicants:520 },
  { id:4,  logo:'🟣', company:'Zoho',      role:'Frontend Intern',          location:'Chennai',   stipend:'₹15,000', duration:'6 Months', type:'onsite',  cat:'tech',    tags:[],           skills:['React','CSS','JS'],       deadline:'2026-07-01', openings:20, applicants:180 },
  { id:5,  logo:'🟢', company:'Spotify',   role:'Product Design Intern',    location:'Remote',    stipend:'₹30,000', duration:'3 Months', type:'remote',  cat:'design',  tags:['remote'],   skills:['Figma','UX'],             deadline:'2026-06-25', openings:4,  applicants:95  },
  { id:6,  logo:'🔴', company:'Meta',      role:'ML Engineer Intern',       location:'Bangalore', stipend:'₹45,000', duration:'6 Months', type:'hybrid',  cat:'data',    tags:['hot'],      skills:['Python','ML','PyTorch'],  deadline:'2026-06-18', openings:6,  applicants:430 },
  { id:7,  logo:'💙', company:'Flipkart',  role:'Data Analyst Intern',      location:'Bangalore', stipend:'₹20,000', duration:'3 Months', type:'onsite',  cat:'data',    tags:['new'],      skills:['SQL','Excel','Python'],   deadline:'2026-07-05', openings:15, applicants:210 },
  { id:8,  logo:'🔶', company:'Swiggy',    role:'Growth Marketing Intern',  location:'Bangalore', stipend:'₹18,000', duration:'2 Months', type:'hybrid',  cat:'marketing',tags:[],          skills:['Analytics','SEO'],        deadline:'2026-07-10', openings:10, applicants:140 },
  { id:9,  logo:'🏦', company:'HDFC',      role:'Finance Intern',           location:'Mumbai',    stipend:'₹12,000', duration:'2 Months', type:'onsite',  cat:'finance', tags:[],           skills:['Excel','Finance'],        deadline:'2026-07-15', openings:25, applicants:320 },
  { id:10, logo:'💙', company:'Razorpay',  role:'Backend Intern',           location:'Bangalore', stipend:'₹30,000', duration:'6 Months', type:'hybrid',  cat:'tech',    tags:['new'],      skills:['Node.js','SQL','Redis'],  deadline:'2026-06-28', openings:7,  applicants:190 },
  { id:11, logo:'⚫', company:'CRED',      role:'UI/UX Design Intern',      location:'Remote',    stipend:'₹25,000', duration:'3 Months', type:'remote',  cat:'design',  tags:['remote'],   skills:['Figma','Prototyping'],    deadline:'2026-07-02', openings:3,  applicants:87  },
  { id:12, logo:'🔷', company:'Infosys',   role:'Digital Marketing Intern', location:'Pune',      stipend:'₹10,000', duration:'3 Months', type:'onsite',  cat:'marketing',tags:[],          skills:['Social Media','Canva'],   deadline:'2026-07-20', openings:30, applicants:250 },
];

const SAMPLE_APPLICATIONS = [
  { id:101, company:'Google',    logo:'🔵', role:'SWE Intern',          location:'Hyderabad', stipend:'₹40,000', status:'interview', date:'2026-05-10', notes:'' },
  { id:102, company:'Amazon',    logo:'🟠', role:'Cloud Intern',        location:'Hyderabad', stipend:'₹35,000', status:'applied',   date:'2026-05-07', notes:'' },
  { id:103, company:'Spotify',   logo:'🟢', role:'Design Intern',       location:'Remote',    stipend:'₹30,000', status:'selected',  date:'2026-04-30', notes:'' },
  { id:104, company:'Meta',      logo:'🔴', role:'ML Intern',           location:'Bangalore', stipend:'₹45,000', status:'rejected',  date:'2026-04-20', notes:'' },
  { id:105, company:'Microsoft', logo:'🪟', role:'Cloud Intern',        location:'Bangalore', stipend:'₹25,000', status:'applied',   date:'2026-05-15', notes:'' },
];

const SAMPLE_SKILLS = [
  { id:1, name:'Java',       cat:'programming', level:'Intermediate', pct:70, icon:'☕', cert:'Oracle Java SE 11' },
  { id:2, name:'HTML',       cat:'web',         level:'Advanced',     pct:90, icon:'🌐', cert:'' },
  { id:3, name:'JavaScript', cat:'web',         level:'Intermediate', pct:60, icon:'🟡', cert:'' },
  { id:4, name:'SQL',        cat:'database',    level:'Intermediate', pct:65, icon:'🗄️', cert:'MySQL Certified' },
  { id:5, name:'Git',        cat:'tools',       level:'Intermediate', pct:75, icon:'🔀', cert:'' },
  { id:6, name:'CSS',        cat:'web',         level:'Advanced',     pct:80, icon:'🎨', cert:'' },
];

const DEFAULT_PROFILE = {
  name: 'Chithra B', role: 'Full Stack Developer',
  email: 'chithra@gmail.com', phone: '+91 98765 43210',
  location: 'Chennai, Tamil Nadu', college: 'Anna University, B.Tech CSE',
  grad: '2026', bio: '',
};

/* ══════════════════════════════════════════
   LOCAL STORAGE HELPERS
══════════════════════════════════════════ */

const Store = {
  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch { return fallback; }
  },

  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch { console.warn('Storage write failed:', key); return false; }
  },

  remove(key) {
    try { localStorage.removeItem(key); } catch {}
  },

  clear(prefix = 'internhub_') {
    Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .forEach(k => localStorage.removeItem(k));
  },
};

/* ══════════════════════════════════════════
   TOAST NOTIFICATION SYSTEM
══════════════════════════════════════════ */

const Toast = (() => {
  let timer = null;

  function show(message, duration = 2500) {
    let el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    clearTimeout(timer);
    el.textContent = message;
    el.classList.add('show');
    timer = setTimeout(() => el.classList.remove('show'), duration);
  }

  function success(msg) { show('✓ ' + msg); }
  function error(msg)   { show('✗ ' + msg, 3000); }
  function info(msg)    { show('ℹ ' + msg); }

  return { show, success, error, info };
})();

// Global alias
function showToast(msg) { Toast.show(msg); }

/* ══════════════════════════════════════════
   DATE & TIME HELPERS
══════════════════════════════════════════ */

const DateUtils = {
  today() {
    return new Date().toISOString().split('T')[0];
  },

  daysAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7)  return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} week${diff >= 14 ? 's' : ''} ago`;
    return new Date(dateStr).toLocaleDateString('en-IN', { day:'numeric', month:'short' });
  },

  daysUntil(dateStr) {
    const diff = Math.ceil((new Date(dateStr) - Date.now()) / 86400000);
    if (diff < 0)  return 'Expired';
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `${diff} days left`;
  },

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  },

  greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning ☀️';
    if (h < 17) return 'Good afternoon 🌤️';
    if (h < 20) return 'Good evening 🌆';
    return 'Good night 🌙';
  },
};

/* ══════════════════════════════════════════
   STRING HELPERS
══════════════════════════════════════════ */

const Str = {
  capitalize(s = '') {
    return s.charAt(0).toUpperCase() + s.slice(1);
  },

  initials(name = '') {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  },

  truncate(str, max = 30) {
    return str.length > max ? str.slice(0, max) + '…' : str;
  },

  slugify(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  },

  logo(company) {
    return COMPANY_LOGOS[company] || COMPANY_LOGOS.default;
  },
};

/* ══════════════════════════════════════════
   DOM HELPERS
══════════════════════════════════════════ */

const DOM = {
  get(id)          { return document.getElementById(id); },
  query(sel, ctx)  { return (ctx || document).querySelector(sel); },
  queryAll(sel, ctx){ return [...(ctx || document).querySelectorAll(sel)]; },

  setText(id, val) {
    const el = DOM.get(id);
    if (el) el.textContent = val;
  },

  setHTML(id, html) {
    const el = DOM.get(id);
    if (el) el.innerHTML = html;
  },

  show(id) { const el = DOM.get(id); if (el) el.style.display = ''; },
  hide(id) { const el = DOM.get(id); if (el) el.style.display = 'none'; },

  toggle(id, condition) {
    const el = DOM.get(id);
    if (el) el.style.display = condition ? '' : 'none';
  },

  addClass(id, cls)    { DOM.get(id)?.classList.add(cls); },
  removeClass(id, cls) { DOM.get(id)?.classList.remove(cls); },

  val(id, fallback = '') {
    return DOM.get(id)?.value?.trim() || fallback;
  },

  setVal(id, val) {
    const el = DOM.get(id);
    if (el) el.value = val;
  },

  animateCount(id, target, duration = 1200) {
    const el = DOM.get(id);
    if (!el) return;
    const start     = 0;
    const startTime = performance.now();
    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (target - start) * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  },
};

/* ══════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════ */

const Validate = {
  required(val, label = 'Field') {
    if (!val || val.trim() === '') {
      Toast.error(`${label} is required`);
      return false;
    }
    return true;
  },

  email(val) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!ok) Toast.error('Enter a valid email address');
    return ok;
  },

  minLength(val, min, label = 'Field') {
    const ok = val && val.length >= min;
    if (!ok) Toast.error(`${label} must be at least ${min} characters`);
    return ok;
  },

  phone(val) {
    const ok = /^[\d\s\+\-]{7,15}$/.test(val);
    if (!ok) Toast.error('Enter a valid phone number');
    return ok;
  },

  form(fields) {
    // fields: [{ value, label, rules: ['required', 'email', 'minLength:8'] }]
    for (const f of fields) {
      for (const rule of (f.rules || [])) {
        if (rule === 'required' && !Validate.required(f.value, f.label)) return false;
        if (rule === 'email'    && !Validate.email(f.value))               return false;
        if (rule.startsWith('min:')) {
          const min = parseInt(rule.split(':')[1]);
          if (!Validate.minLength(f.value, min, f.label)) return false;
        }
      }
    }
    return true;
  },
};

/* ══════════════════════════════════════════
   PASSWORD STRENGTH CHECKER
══════════════════════════════════════════ */

function checkPasswordStrength(password, fillId = 's-fill', labelId = 's-label') {
  const fill  = DOM.get(fillId);
  const label = DOM.get(labelId);
  if (!fill || !label) return;

  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    ['',       0,   '#ccc'],
    ['Weak',   25,  '#E24B4A'],
    ['Fair',   50,  '#EF9F27'],
    ['Good',   75,  '#1D9E75'],
    ['Strong', 100, '#534AB7'],
  ];

  const [text, pct, color] = levels[score] || levels[0];
  fill.style.width      = pct + '%';
  fill.style.background = color;
  label.textContent     = text;
  label.style.color     = color;
}

/* ══════════════════════════════════════════
   PASSWORD TOGGLE
══════════════════════════════════════════ */

function togglePassword(inputId, btn) {
  const input = DOM.get(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  const icon = btn?.querySelector('i');
  if (icon) icon.className = isPassword ? 'ti ti-eye-off' : 'ti ti-eye';
}

/* ══════════════════════════════════════════
   AUTHENTICATION
══════════════════════════════════════════ */

const Auth = {
  currentTab: 'login',

  switchTab(tab) {
    this.currentTab = tab;
    const loginForm = DOM.get('form-login');
    const regForm   = DOM.get('form-reg');
    const tabLogin  = DOM.get('tab-login');
    const tabReg    = DOM.get('tab-reg');

    if (loginForm) loginForm.style.display = tab === 'login' ? '' : 'none';
    if (regForm)   regForm.style.display   = tab === 'reg'   ? '' : 'none';
    if (tabLogin)  tabLogin.className = 'tab' + (tab === 'login' ? ' active' : '');
    if (tabReg)    tabReg.className   = 'tab' + (tab === 'reg'   ? ' active' : '');
  },

  login() {
    const email    = DOM.val('li-email');
    const password = DOM.val('li-pw') || DOM.get('li-pw')?.value;

    if (!Validate.form([
      { value: email,    label: 'Email',    rules: ['required', 'email'] },
      { value: password, label: 'Password', rules: ['required'] },
    ])) return;

    Toast.success('Signing you in…');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
  },

  register() {
    const name     = DOM.val('r-name');
    const email    = DOM.val('r-email');
    const password = DOM.get('r-pw')?.value || '';

    if (!Validate.form([
      { value: name,     label: 'Full name', rules: ['required'] },
      { value: email,    label: 'Email',     rules: ['required', 'email'] },
      { value: password, label: 'Password',  rules: ['required', 'min:8'] },
    ])) return;

    Store.set(APP.storage.profile, { ...DEFAULT_PROFILE, name, email });
    Toast.success('Account created! Welcome 🎉');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
  },

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      Toast.show('Logging out…');
      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    }
  },
};

// Global aliases (for inline onclick)
function switchTab(tab) { Auth.switchTab(tab); }
function login()        { Auth.login(); }
function register()     { Auth.register(); }
function confirmLogout(){ Auth.logout(); }

/* ══════════════════════════════════════════
   PROFILE MANAGER
══════════════════════════════════════════ */

const ProfileManager = {
  data: null,

  load() {
    this.data = Store.get(APP.storage.profile, DEFAULT_PROFILE);
    return this.data;
  },

  save(updates) {
    this.data = { ...this.data, ...updates };
    Store.set(APP.storage.profile, this.data);
    return this.data;
  },

  apply() {
    const p = this.load();
    const initials = Str.initials(p.name);

    DOM.setText('heroName',     p.name);
    DOM.setText('heroRole',     p.role);
    DOM.setText('heroEmail',    p.email);
    DOM.setText('infoName',     p.name);
    DOM.setText('infoEmail',    p.email);
    DOM.setText('infoPhone',    p.phone);
    DOM.setText('infoLocation', p.location);
    DOM.setText('infoCollege',  p.college);
    DOM.setText('infoGrad',     p.grad);

    const avatarEl = DOM.get('avatarEl');
    if (avatarEl) avatarEl.textContent = initials;

    // Sync live stats from other stores
    const apps   = Store.get(APP.storage.apps,   []);
    const skills = Store.get(APP.storage.skills, []);
    DOM.setText('statApplied',   apps.length);
    DOM.setText('statInterview', apps.filter(a => a.status === 'interview').length);
    DOM.setText('statSkills',    skills.length);

    // Greeting
    const greetEl = document.querySelector('.greeting p');
    if (greetEl) greetEl.textContent = DateUtils.greeting();
  },
};

/* ══════════════════════════════════════════
   APPLICATION TRACKER
══════════════════════════════════════════ */

const AppTracker = {
  data: [],
  activeTab: 'all',
  sortDesc: true,
  editId: null,

  load() {
    this.data = Store.get(APP.storage.apps, SAMPLE_APPLICATIONS);
  },

  save() {
    Store.set(APP.storage.apps, this.data);
  },

  counts() {
    return {
      all:       this.data.length,
      applied:   this.data.filter(a => a.status === 'applied').length,
      interview: this.data.filter(a => a.status === 'interview').length,
      selected:  this.data.filter(a => a.status === 'selected').length,
      rejected:  this.data.filter(a => a.status === 'rejected').length,
      offer:     this.data.filter(a => a.status === 'offer').length,
    };
  },

  updateCountDisplay() {
    const c = this.counts();
    DOM.setText('cnt-all',       c.all);
    DOM.setText('cnt-interview', c.interview);
    DOM.setText('cnt-selected',  c.selected);
    DOM.setText('cnt-rejected',  c.rejected);
  },

  filter(query = '') {
    const q = query.toLowerCase();
    return this.data
      .filter(a => {
        const matchTab = this.activeTab === 'all' || a.status === this.activeTab;
        const matchQ   = !q || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q);
        return matchTab && matchQ;
      })
      .sort((a, b) => this.sortDesc
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
      );
  },

  render(query = '') {
    const list  = this.filter(query);
    const listEl = DOM.get('appList');
    const emptyEl = DOM.get('emptyState');

    this.updateCountDisplay();

    if (!listEl) return;

    if (list.length === 0) {
      listEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    listEl.innerHTML = list.map(a => `
      <div class="app-card" id="card-${a.id}">
        <div class="app-card-top">
          <div class="co-logo">${a.logo || Str.logo(a.company)}</div>
          <div class="app-meta">
            <h4>${a.company} – ${a.role}</h4>
            <p>${DateUtils.daysAgo(a.date)}</p>
          </div>
          <span class="badge ${a.status}">${STATUS_LABELS[a.status] || a.status}</span>
        </div>
        <div class="app-card-footer">
          <div class="footer-chips" style="display:flex;gap:6px;flex-wrap:wrap;">
            ${a.location ? `<span class="fchip"><i class="ti ti-map-pin"></i>${a.location}</span>` : ''}
            ${a.stipend  ? `<span class="fchip"><i class="ti ti-currency-rupee"></i>${a.stipend.replace('₹','')}</span>` : ''}
          </div>
          <div style="display:flex;gap:6px;">
            <button class="icon-btn" onclick="AppTracker.startEdit(${a.id})" title="Edit">
              <i class="ti ti-edit"></i>
            </button>
            <button class="icon-btn danger" onclick="AppTracker.delete(${a.id})" title="Delete">
              <i class="ti ti-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  startEdit(id) {
    this.editId = id;
    const a = this.data.find(x => x.id === id);
    if (!a) return;
    DOM.setVal('f-company',  a.company);
    DOM.setVal('f-role',     a.role);
    DOM.setVal('f-location', a.location || '');
    DOM.setVal('f-stipend',  a.stipend  || '');
    DOM.setVal('f-status',   a.status);
    DOM.setVal('f-date',     a.date);
    DOM.setText('modalTitle', 'Edit Application');
    DOM.get('modalOverlay')?.classList.add('show');
  },

  openAdd() {
    this.editId = null;
    ['f-company','f-role','f-location','f-stipend'].forEach(id => DOM.setVal(id, ''));
    DOM.setVal('f-status', 'applied');
    DOM.setVal('f-date',   DateUtils.today());
    DOM.setText('modalTitle', 'Add Application');
    DOM.get('modalOverlay')?.classList.add('show');
  },

  saveFromForm() {
    const company  = DOM.val('f-company');
    const role     = DOM.val('f-role');
    const location = DOM.val('f-location');
    const stipend  = DOM.val('f-stipend');
    const status   = DOM.get('f-status')?.value || 'applied';
    const date     = DOM.get('f-date')?.value || DateUtils.today();

    if (!Validate.form([
      { value: company, label: 'Company', rules: ['required'] },
      { value: role,    label: 'Role',    rules: ['required'] },
    ])) return;

    if (this.editId) {
      const idx = this.data.findIndex(a => a.id === this.editId);
      if (idx !== -1) this.data[idx] = { ...this.data[idx], company, role, location, stipend, status, date };
      Toast.success('Application updated');
    } else {
      this.data.unshift({
        id: Date.now(), company, role, location, stipend, status, date,
        logo: Str.logo(company),
      });
      Toast.success('Application added 🎉');
    }

    this.save();
    this.render();
    DOM.get('modalOverlay')?.classList.remove('show');
  },

  delete(id) {
    if (!confirm('Delete this application?')) return;
    this.data = this.data.filter(a => a.id !== id);
    this.save();
    this.render();
    Toast.show('Application removed');
  },

  setTab(el, tab) {
    DOM.queryAll('.ftab').forEach(t => t.classList.remove('active'));
    el?.classList.add('active');
    this.activeTab = tab;
    this.render(DOM.val('searchInput') || DOM.get('searchInput')?.value || '');
  },

  toggleSort() {
    this.sortDesc = !this.sortDesc;
    DOM.setText('sortLabel', this.sortDesc ? 'Newest' : 'Oldest');
    this.render();
  },

  init() {
    this.load();
    this.render();
  },
};

/* ══════════════════════════════════════════
   SKILLS MANAGER
══════════════════════════════════════════ */

const SkillsManager = {
  data: [],
  activeCat: 'all',
  sortDesc: true,
  editId: null,

  load() {
    this.data = Store.get(APP.storage.skills, SAMPLE_SKILLS);
  },

  save() {
    Store.set(APP.storage.skills, this.data);
  },

  counts() {
    return {
      total:  this.data.length,
      strong: this.data.filter(s => s.pct >= 70).length,
      cert:   this.data.filter(s => s.cert).length,
    };
  },

  updateCountDisplay() {
    const c = this.counts();
    DOM.setText('cnt-total',  c.total);
    DOM.setText('cnt-strong', c.strong);
    DOM.setText('cnt-cert',   c.cert);
  },

  filter() {
    return this.data
      .filter(s => this.activeCat === 'all' || s.cat === this.activeCat)
      .sort((a, b) => this.sortDesc ? b.pct - a.pct : a.pct - b.pct);
  },

  barClass(pct) {
    if (pct >= 75) return 'high';
    if (pct >= 45) return 'mid';
    return 'low';
  },

  render() {
    const list  = this.filter();
    const listEl = DOM.get('skillsList');
    const emptyEl = DOM.get('emptyState');

    this.updateCountDisplay();
    if (!listEl) return;

    if (list.length === 0) {
      listEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    listEl.innerHTML = list.map(s => `
      <div class="skill-card">
        <div class="skill-top">
          <div class="skill-icon">${s.icon || '💡'}</div>
          <div class="skill-info">
            <h4>${s.name}</h4>
            <div class="skill-meta" style="display:flex;align-items:center;gap:6px;margin-top:2px;">
              <span class="cat-tag ${s.cat}">${Str.capitalize(s.cat)}</span>
              <span style="font-size:11px;color:#aaa;">${s.level}</span>
            </div>
          </div>
          <span class="skill-pct">${s.pct}%</span>
        </div>
        <div class="skill-bar-wrap">
          <div class="skill-bar-fill ${this.barClass(s.pct)}" style="width:${s.pct}%"></div>
        </div>
        <div class="skill-footer">
          <div>
            ${s.cert
              ? `<span class="cert-chip"><i class="ti ti-certificate"></i>${s.cert}</span>`
              : `<span style="font-size:11px;color:#ccc;">No certificate</span>`}
          </div>
          <div style="display:flex;gap:6px;">
            <button class="icon-btn" onclick="SkillsManager.startEdit(${s.id})" title="Edit">
              <i class="ti ti-edit"></i>
            </button>
            <button class="icon-btn danger" onclick="SkillsManager.delete(${s.id})" title="Delete">
              <i class="ti ti-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  startEdit(id) {
    this.editId = id;
    const s = this.data.find(x => x.id === id);
    if (!s) return;
    DOM.setVal('f-name',  s.name);
    DOM.setVal('f-cat',   s.cat);
    DOM.setVal('f-level', s.level);
    DOM.setVal('f-icon',  s.icon || '');
    DOM.setVal('f-pct',   s.pct);
    DOM.setVal('f-cert',  s.cert || '');
    DOM.setText('sliderVal', s.pct + '%');
    DOM.setText('modalTitle', 'Edit Skill');
    DOM.get('modalOverlay')?.classList.add('show');
  },

  openAdd() {
    this.editId = null;
    ['f-name','f-icon','f-cert'].forEach(id => DOM.setVal(id, ''));
    DOM.setVal('f-cat',   'programming');
    DOM.setVal('f-level', 'Beginner');
    DOM.setVal('f-pct',   50);
    DOM.setText('sliderVal', '50%');
    DOM.setText('modalTitle', 'Add Skill');
    DOM.get('modalOverlay')?.classList.add('show');
  },

  saveFromForm() {
    const name  = DOM.val('f-name');
    const cat   = DOM.get('f-cat')?.value   || 'programming';
    const level = DOM.get('f-level')?.value || 'Beginner';
    const icon  = DOM.val('f-icon') || '💡';
    const pct   = parseInt(DOM.get('f-pct')?.value || 50);
    const cert  = DOM.val('f-cert');

    if (!Validate.required(name, 'Skill name')) return;

    if (this.editId) {
      const idx = this.data.findIndex(s => s.id === this.editId);
      if (idx !== -1) this.data[idx] = { ...this.data[idx], name, cat, level, icon, pct, cert };
      Toast.success('Skill updated');
    } else {
      this.data.unshift({ id: Date.now(), name, cat, level, icon, pct, cert });
      Toast.success('Skill added 🎉');
    }

    this.save();
    this.render();
    DOM.get('modalOverlay')?.classList.remove('show');
  },

  quickAdd(name, cat, pct) {
    if (this.data.find(s => s.name.toLowerCase() === name.toLowerCase())) {
      Toast.info(`${name} is already in your skills`);
      return;
    }
    const icons = { React:'⚛️', Python:'🐍', Figma:'🎨', Docker:'🐳', 'Node.js':'🟢', TypeScript:'🔷' };
    this.data.unshift({ id: Date.now(), name, cat, level: 'Beginner', icon: icons[name] || '💡', pct, cert: '' });
    this.save();
    this.render();
    Toast.success(`${name} added 🎉`);
  },

  delete(id) {
    if (!confirm('Remove this skill?')) return;
    this.data = this.data.filter(s => s.id !== id);
    this.save();
    this.render();
    Toast.show('Skill removed');
  },

  setCat(el, cat) {
    DOM.queryAll('.ctab').forEach(t => t.classList.remove('active'));
    el?.classList.add('active');
    this.activeCat = cat;
    this.render();
  },

  toggleSort() {
    this.sortDesc = !this.sortDesc;
    const label = DOM.get('sortLabel');
    if (label) label.textContent = this.sortDesc ? 'High→Low' : 'Low→High';
    this.render();
  },

  init() {
    this.load();
    this.render();
  },
};

/* ══════════════════════════════════════════
   INTERNSHIPS BROWSER
══════════════════════════════════════════ */

const InternshipBrowser = {
  data: SAMPLE_INTERNSHIPS,
  saved: new Set(),
  activeChip: 'all',
  activeCat: 'all',

  load() {
    const savedArr = Store.get(APP.storage.saved, []);
    this.saved = new Set(savedArr);
  },

  saveSaved() {
    Store.set(APP.storage.saved, [...this.saved]);
  },

  filter(query = '') {
    const q = query.toLowerCase();
    return this.data.filter(j => {
      const matchQ = !q ||
        j.company.toLowerCase().includes(q) ||
        j.role.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q);

      const matchChip =
        this.activeChip === 'all'     ? true :
        this.activeChip === 'remote'  ? j.type === 'remote' :
        this.activeChip === 'hybrid'  ? j.type === 'hybrid' :
        this.activeChip === 'onsite'  ? j.type === 'onsite' :
        this.activeChip === 'new'     ? j.tags.includes('new') :
        this.activeChip === 'stipend' ? true : true;

      const matchCat = this.activeCat === 'all' || j.cat === this.activeCat;
      return matchQ && matchChip && matchCat;
    });
  },

  render(query = '') {
    const list   = this.filter(query);
    const listEl = DOM.get('jobList');
    const emptyEl = DOM.get('emptyState');
    const countEl = DOM.get('countLabel');

    if (countEl) countEl.textContent = `${list.length} results`;
    if (!listEl) return;

    if (list.length === 0) {
      listEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    listEl.innerHTML = list.map(j => `
      <div class="job-card" onclick="InternshipBrowser.view(${j.id})">
        <div class="job-card-top">
          <div class="co-logo">${j.logo}</div>
          <div class="job-info">
            <h4>${j.role}</h4>
            <p>${j.company}</p>
          </div>
          <button class="save-icon ${this.saved.has(j.id) ? 'saved' : ''}"
            onclick="event.stopPropagation(); InternshipBrowser.toggleSave(${j.id}, this)"
            style="background:none;border:none;cursor:pointer;color:${this.saved.has(j.id) ? '#534AB7' : '#ccc'};font-size:20px;"
            aria-label="Save">
            <i class="ti ti-bookmark${this.saved.has(j.id) ? '-filled' : ''}"></i>
          </button>
        </div>
        <div class="job-chips" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
          <span class="jchip"><i class="ti ti-map-pin"></i>${j.location}</span>
          <span class="jchip"><i class="ti ti-clock"></i>${j.duration}</span>
          <span class="jchip"><i class="ti ti-building"></i>${Str.capitalize(j.type)}</span>
          ${j.tags.map(t => `
            <span class="tag ${t}">${
              t === 'new' ? '🆕 New' : t === 'hot' ? '🔥 Hot' : t === 'remote' ? '🌐 Remote' : t
            }</span>
          `).join('')}
        </div>
        <div class="job-card-footer">
          <div style="font-size:14px;font-weight:700;color:#1a1a2e;">
            ${j.stipend} <span style="font-size:11px;color:#aaa;font-weight:500;">/ month</span>
          </div>
          <button class="view-btn" style="padding:7px 16px;font-size:12px;font-weight:700;border:none;border-radius:9px;background:#EEEDFE;color:#534AB7;cursor:pointer;display:flex;align-items:center;gap:5px;">
            <i class="ti ti-eye"></i> View
          </button>
        </div>
      </div>
    `).join('');
  },

  toggleSave(id, btn) {
    if (this.saved.has(id)) {
      this.saved.delete(id);
      if (btn) { btn.style.color = '#ccc'; btn.querySelector('i').className = 'ti ti-bookmark'; }
      Toast.show('Removed from saved');
    } else {
      this.saved.add(id);
      if (btn) { btn.style.color = '#534AB7'; btn.querySelector('i').className = 'ti ti-bookmark-filled'; }
      Toast.success('Saved ✓');
    }
    this.saveSaved();
  },

  view(id) {
    const job = this.data.find(j => j.id === id);
    Toast.show(`Opening ${job?.company || ''} details…`);
    setTimeout(() => { window.location.href = 'job-detail.html'; }, 700);
  },

  setChip(el, val) {
    DOM.queryAll('.chip').forEach(c => c.classList.remove('active'));
    el?.classList.add('active');
    this.activeChip = val;
    this.render(DOM.get('searchInput')?.value || '');
  },

  setCat(el, val) {
    DOM.queryAll('.cat-card').forEach(c => c.classList.remove('active'));
    el?.classList.add('active');
    this.activeCat = val;
    this.render(DOM.get('searchInput')?.value || '');
  },

  init() {
    this.load();
    this.render();
  },
};

/* ══════════════════════════════════════════
   DASHBOARD MANAGER
══════════════════════════════════════════ */

const Dashboard = {
  init() {
    const apps   = Store.get(APP.storage.apps,   SAMPLE_APPLICATIONS);
    const skills = Store.get(APP.storage.skills, SAMPLE_SKILLS);

    // Animate stat counters
    DOM.animateCount('stat-applied',   apps.length,                              1000);
    DOM.animateCount('stat-interview', apps.filter(a => a.status === 'interview').length, 1000);
    DOM.animateCount('stat-selected',  apps.filter(a => a.status === 'selected').length,  1000);

    // Profile greeting
    const greetEl = document.querySelector('.greeting p');
    if (greetEl) greetEl.textContent = DateUtils.greeting();

    const profile = Store.get(APP.storage.profile, DEFAULT_PROFILE);
    const nameEl  = document.querySelector('.greeting h2');
    if (nameEl) nameEl.textContent = `Welcome back, ${profile.name.split(' ')[0]}!`;

    // Recent apps list
    this.renderRecentApps(apps.slice(0, 4));
  },

  renderRecentApps(apps) {
    const listEl = DOM.get('recentApps');
    if (!listEl) return;

    listEl.innerHTML = apps.map(a => `
      <div class="app-card" style="cursor:pointer" onclick="window.location.href='tracker.html'">
        <div class="app-card-top">
          <div class="co-logo">${a.logo || Str.logo(a.company)}</div>
          <div class="app-meta">
            <h4>${a.company} – ${a.role}</h4>
            <p>${DateUtils.daysAgo(a.date)}</p>
          </div>
          <span class="badge ${a.status}">${STATUS_LABELS[a.status] || a.status}</span>
        </div>
      </div>
    `).join('');
  },
};

/* ══════════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════════ */

const Admin = {
  internships: [],
  editId: null,

  load() {
    this.internships = Store.get(APP.storage.internships, SAMPLE_INTERNSHIPS);
  },

  save() {
    Store.set(APP.storage.internships, this.internships);
  },

  updateStats() {
    const apps   = Store.get(APP.storage.apps,   []);
    const skills = Store.get(APP.storage.skills, []);

    DOM.animateCount('totalUsers',        1284, 1500);
    DOM.animateCount('totalInternships',  this.internships.length, 1200);
    DOM.animateCount('totalApplications', 5620, 1800);
  },

  addInternship() {
    const company  = DOM.val('company') || DOM.val('f-company');
    const role     = DOM.val('role')    || DOM.val('f-role');
    const location = DOM.val('f-location') || '';
    const stipend  = DOM.val('f-stipend')  || '';
    const duration = DOM.get('f-duration')?.value || '6 Months';
    const type     = DOM.get('f-type')?.value     || 'hybrid';
    const cat      = DOM.get('f-cat')?.value      || 'Tech';

    if (!Validate.form([
      { value: company, label: 'Company', rules: ['required'] },
      { value: role,    label: 'Role',    rules: ['required'] },
    ])) return;

    if (this.editId) {
      const idx = this.internships.findIndex(j => j.id === this.editId);
      if (idx !== -1) {
        this.internships[idx] = { ...this.internships[idx], company, role, location, stipend, duration, type, cat };
      }
      Toast.success('Internship updated');
      this.editId = null;
    } else {
      this.internships.unshift({
        id:       Date.now(),
        logo:     Str.logo(company),
        company, role, location, stipend, duration, type,
        cat:      cat,
        status:   'active',
        openings: 10,
        applicants: 0,
        deadline: '',
        tags:     [],
        skills:   [],
      });
      Toast.success(`${company} internship added 🎉`);
    }

    this.save();
    DOM.get('addModal')?.classList.remove('show');
    if (typeof renderInternshipsTable === 'function') renderInternshipsTable(this.internships);
    DOM.setText('totalInternships', this.internships.length);
  },

  deleteInternship(id) {
    if (!confirm('Delete this internship listing?')) return;
    this.internships = this.internships.filter(j => j.id !== id);
    this.save();
    Toast.show('Internship deleted');
    DOM.setText('totalInternships', this.internships.length);
    if (typeof renderInternshipsTable === 'function') renderInternshipsTable(this.internships);
  },

  init() {
    this.load();
    this.updateStats();
  },
};

// Legacy alias for old admin.js inline calls
function addInternship() { Admin.addInternship(); }

/* ══════════════════════════════════════════
   MODAL CONTROLLER
══════════════════════════════════════════ */

const Modal = {
  open(id) {
    DOM.get(id)?.classList.add('show');
    document.body.style.overflow = 'hidden';
  },

  close(id) {
    DOM.get(id)?.classList.remove('show');
    document.body.style.overflow = '';
  },

  closeOnOutsideClick(event, modalId) {
    if (event.target.id === modalId) this.close(modalId);
  },
};

// Global aliases
function openModal()  { Modal.open('modalOverlay'); }
function closeModal() { Modal.close('modalOverlay'); }
function closeModalOutside(e) { Modal.closeOnOutsideClick(e, 'modalOverlay'); }

/* ══════════════════════════════════════════
   THEME MANAGER (Light / Dark)
══════════════════════════════════════════ */

const Theme = {
  current: 'light',

  load() {
    this.current = Store.get(APP.storage.theme, 'light');
    this.apply();
  },

  toggle() {
    this.current = this.current === 'light' ? 'dark' : 'light';
    Store.set(APP.storage.theme, this.current);
    this.apply();
    Toast.show(`${this.current === 'dark' ? '🌙 Dark' : '☀️ Light'} mode`);
  },

  apply() {
    document.body.classList.toggle('dark', this.current === 'dark');
  },
};

/* ══════════════════════════════════════════
   SHARE / CLIPBOARD
══════════════════════════════════════════ */

function shareJob(title = 'Check out this internship!') {
  if (navigator.share) {
    navigator.share({ title, url: window.location.href })
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href)
      .then(() => Toast.success('Link copied!'))
      .catch(() => Toast.error('Could not copy link'));
  }
}

/* ══════════════════════════════════════════
   PAGE ROUTER — AUTO INIT
══════════════════════════════════════════ */

function detectPage() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('dashboard'))   return 'dashboard';
  if (path.includes('internship') && !path.includes('job-detail')) return 'internships';
  if (path.includes('job-detail'))  return 'job-detail';
  if (path.includes('tracker'))     return 'tracker';
  if (path.includes('skills'))      return 'skills';
  if (path.includes('profile'))     return 'profile';
  if (path.includes('admin'))       return 'admin';
  if (path.includes('index') || path === '/' || path.endsWith('.html') && document.getElementById('li-email')) return 'login';
  return 'unknown';
}

document.addEventListener('DOMContentLoaded', () => {
  const page = detectPage();

  // Always init theme
  Theme.load();

  switch (page) {
    case 'login':
      // Pre-fill date fields etc if needed
      break;

    case 'dashboard':
      Dashboard.init();
      break;

    case 'internships':
      InternshipBrowser.init();
      break;

    case 'tracker':
      AppTracker.init();
      break;

    case 'skills':
      SkillsManager.init();
      break;

    case 'profile':
      ProfileManager.apply();
      break;

    case 'admin':
      Admin.init();
      break;
  }

  // Global: bottom nav active state
  highlightActiveNav();
});

/* ══════════════════════════════════════════
   BOTTOM NAV ACTIVE HIGHLIGHT
══════════════════════════════════════════ */

function highlightActiveNav() {
  const path = window.location.pathname.toLowerCase();
  const navMap = {
    'dashboard':   0,
    'internship':  1,
    'tracker':     2,
    'skills':      3,
    'profile':     4,
  };

  const navItems = DOM.queryAll('.nav-item');
  if (!navItems.length) return;

  navItems.forEach(n => n.classList.remove('active'));

  for (const [key, idx] of Object.entries(navMap)) {
    if (path.includes(key) && navItems[idx]) {
      navItems[idx].classList.add('active');
      break;
    }
  }
}

/* ══════════════════════════════════════════
   KEYBOARD SHORTCUTS
══════════════════════════════════════════ */

document.addEventListener('keydown', (e) => {
  // Escape closes any open modal
  if (e.key === 'Escape') {
    DOM.queryAll('.modal-overlay.show').forEach(el => el.classList.remove('show'));
    document.body.style.overflow = '';
  }

  // Ctrl/Cmd + K → focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchEl = DOM.get('searchInput');
    if (searchEl) { searchEl.focus(); searchEl.select(); }
  }
});

/* ══════════════════════════════════════════
   GLOBAL ERROR HANDLER
══════════════════════════════════════════ */

window.addEventListener('error', (e) => {
  console.error('[InternHub]', e.message, e.filename, e.lineno);
});

window.addEventListener('unhandledrejection', (e) => {
  console.warn('[InternHub] Unhandled promise:', e.reason);
});

/* ══════════════════════════════════════════
   EXPORT FOR MODULE USE (optional)
══════════════════════════════════════════ */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    APP, Store, Toast, DateUtils, Str, DOM, Validate,
    Auth, ProfileManager, AppTracker, SkillsManager,
    InternshipBrowser, Dashboard, Admin, Modal, Theme,
  };
}
