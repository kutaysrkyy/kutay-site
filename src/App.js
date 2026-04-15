import React, { useState } from 'react';
import './App.css';

// ─── SVG ICON ────────────────────────────────────────────────────────────────
const Ic = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const P = {
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  zap:      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  lock:     "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  eye:      "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  refresh:  "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  layers:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  cpu:      "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  globe:    "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0c2.5 3 4 6.5 4 10s-1.5 7-4 10M12 2C9.5 5 8 8.5 8 12s1.5 7 4 10M2 12h20",
  code:     "M16 18l6-6-6-6M8 6l-6 6 6 6",
  terminal: "M4 17l6-6-6-6M12 19h8",
  key:      "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  users:    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 100 8 4 4 0 000-8z",
  check:    "M20 6L9 17l-5-5",
  x:        "M18 6L6 18M6 6l12 12",
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  tr: {
    nav: {
      features: 'Özellikler', about: 'Hakkında', pricing: 'Fiyatlar', faq: 'SSS', buy: 'Satın Al',
    },
    hero: {
      label: 'Macho Executor · Lua Script',
      sub: 'Macho Executor için özel geliştirilmiş, HWID korumalı ve düzenli güncellenen profesyonel Lua script paketi. Güvenli, hızlı, kararlı.',
      btnBuy: 'Hemen Satın Al',
      btnFeatures: 'Özellikleri Gör',
    },
    stats: {
      users: 'Aktif Kullanıcı', uptime: 'Uptime', support: 'Destek', version: 'Güncel Sürüm',
    },
    sections: {
      featuresLabel: '// özellikler',
      featuresH2a: 'Neden ', featuresH2b: 'kutayilah.lua', featuresH2c: '?',
      aboutLabel: '// hakkında',
      aboutH2: ['Macho için ', 'yazılmış', ',\nher detayı düşünülmüş'],
      aboutP1: 'kutayilah.lua, Macho Executor\'ın altyapısına özel optimize edilmiş bir Lua script paketidir. Piyasadaki genel amaçlı scriptlerin aksine, her modül Macho\'nun API\'ına göre sıfırdan yazılmıştır.',
      aboutP2: 'HWID tabanlı lisanslama sistemi ile script yalnızca senin cihazında çalışır. Kopyalanamaz, paylaşılamaz. Her güncelleme Discord kanalına düşer, hiçbir şeyi kaçırmazsın.',
      aboutList: [
        'Macho Executor native uyumluluk',
        'HWID tabanlı kopyalanmaz lisans sistemi',
        'Oyun güncellemelerine karşı hızlı yama',
        'Modüler yapı — ihtiyacın kadar yükle',
        'Aktif Discord topluluğu ve destek',
      ],
      cardTitle: 'kutayilah.lua — paket detayları',
      cardBadge: 'CANLI',
      cardRows: [
        ['Executor', 'Macho Executor'],
        ['Güncel Sürüm', 'v4.1.0'],
        ['Lisans Tipi', 'HWID Kilidi'],
        ['ESP Modülü', 'Aktif'],
        ['Aimbot Modülü', 'Aktif'],
        ['Anti-Detect', 'Aktif'],
        ['Son Güncelleme', '2025 · v4.1'],
        ['Destek Kanalı', 'Discord 7/24'],
      ],
      pricingLabel: '// fiyatlar',
      pricingH2a: 'Lisans ', pricingH2b: 'Planları',
      reviewsLabel: '// yorumlar',
      reviewsH2a: 'Kullanıcılar ', reviewsH2b: 'Ne Diyor', reviewsH2c: '?',
      faqLabel: '// sss',
      faqH2a: 'Sık Sorulan ', faqH2b: 'Sorular',
      verifiedUser: 'Doğrulanmış Kullanıcı',
    },
    plans: {
      monthly: { name: 'AYLIK', tagline: 'Esnek aylık erişim', period: '/ay', badge: null },
      quarterly: { name: '3 AYLIK', tagline: 'En çok tercih edilen', period: '/3 ay', badge: '★ Popüler' },
      yearly: { name: 'YILLIK', tagline: 'Maksimum tasarruf', period: '/yıl', badge: null },
      buyBtn: 'Satın Al',
      feats: [
        'HWID Kilidi',
        'Full Modül Seti',
        '7/24 Discord Desteği',
        'Ücretsiz Güncellemeler',
        'Anti-Detect Koruma',
        'Öncelikli Destek',
        'Custom Config',
        'Özel Script Desteği',
      ],
    },
    cta: {
      h2: 'Discord Sunucumuza Katıl',
      p: 'Destek, duyurular, trial talebi ve topluluk için Discord\'a gel.',
      btn: 'Discord\'a Katıl',
    },
    modal: {
      title: 'Satın Al',
      nameLabel: 'Kullanıcı Adı',
      namePlaceholder: 'Adın veya takma adın',
      discordLabel: 'Discord Kullanıcı Adı',
      discordPlaceholder: 'örn: kutay',
      paymentLabel: 'Ödeme Yöntemi',
      paymentPlaceholder: 'Seçin...',
      payments: ['Papara', 'Kripto (BTC / ETH / USDT)', 'PayPal', 'Banka Havalesi'],
      submitBtn: 'Talebi Gönder',
      note: '🔒 Bilgileriniz yalnızca sipariş işlemi için kullanılır',
      successTitle: 'Talebiniz Alındı',
      successMsg: 'Discord üzerinden sizinle iletişime geçeceğiz.\nOrtalama 1–12 saat içinde aktif edilir.',
    },
    footer: '© 2025 kutayilah · Tüm hakları saklıdır',
    langBtn: 'English',
  },
  en: {
    nav: {
      features: 'Features', about: 'About', pricing: 'Pricing', faq: 'FAQ', buy: 'Buy Now',
    },
    hero: {
      label: 'Macho Executor · Lua Script',
      sub: 'A professional Lua script package built exclusively for Macho Executor — HWID-protected, regularly updated. Secure, fast, stable.',
      btnBuy: 'Buy Now',
      btnFeatures: 'See Features',
    },
    stats: {
      users: 'Active Users', uptime: 'Uptime', support: 'Support', version: 'Latest Version',
    },
    sections: {
      featuresLabel: '// features',
      featuresH2a: 'Why ', featuresH2b: 'kutayilah.lua', featuresH2c: '?',
      aboutLabel: '// about',
      aboutH2: ['Built for ', 'Macho', ',\nevery detail considered'],
      aboutP1: 'kutayilah.lua is a Lua script package optimized exclusively for the Macho Executor infrastructure. Unlike generic scripts on the market, every module has been written from scratch against Macho\'s API.',
      aboutP2: 'With HWID-based licensing, the script runs only on your device — it cannot be copied or shared. Every update drops in the Discord channel so you never miss a thing.',
      aboutList: [
        'Macho Executor native compatibility',
        'HWID-based, non-copyable license system',
        'Fast patch cycle against game updates',
        'Modular architecture — load only what you need',
        'Active Discord community & support',
      ],
      cardTitle: 'kutayilah.lua — package details',
      cardBadge: 'LIVE',
      cardRows: [
        ['Executor', 'Macho Executor'],
        ['Current Version', 'v4.1.0'],
        ['License Type', 'HWID Lock'],
        ['ESP Module', 'Active'],
        ['Aimbot Module', 'Active'],
        ['Anti-Detect', 'Active'],
        ['Last Update', '2025 · v4.1'],
        ['Support Channel', 'Discord 24/7'],
      ],
      pricingLabel: '// pricing',
      pricingH2a: 'License ', pricingH2b: 'Plans',
      reviewsLabel: '// reviews',
      reviewsH2a: 'What ', reviewsH2b: 'Users Say', reviewsH2c: '',
      faqLabel: '// faq',
      faqH2a: 'Frequently Asked ', faqH2b: 'Questions',
      verifiedUser: 'Verified User',
    },
    plans: {
      monthly: { name: 'MONTHLY', tagline: 'Flexible monthly access', period: '/mo', badge: null },
      quarterly: { name: '3-MONTH', tagline: 'Most popular choice', period: '/3 mo', badge: '★ Popular' },
      yearly: { name: 'YEARLY', tagline: 'Maximum savings', period: '/yr', badge: null },
      buyBtn: 'Buy Now',
      feats: [
        'HWID Lock',
        'Full Module Set',
        '7/24 Discord Support',
        'Free Updates',
        'Anti-Detect Protection',
        'Priority Support',
        'Custom Config',
        'Custom Script Support',
      ],
    },
    cta: {
      h2: 'Join Our Discord Server',
      p: 'Come to Discord for support, announcements, trial requests and community.',
      btn: 'Join Discord',
    },
    modal: {
      title: 'Purchase',
      nameLabel: 'Username',
      namePlaceholder: 'Your name or alias',
      discordLabel: 'Discord Username',
      discordPlaceholder: 'e.g. kutay',
      paymentLabel: 'Payment Method',
      paymentPlaceholder: 'Select...',
      payments: ['Papara', 'Crypto (BTC / ETH / USDT)', 'PayPal', 'Bank Transfer'],
      submitBtn: 'Submit Request',
      note: '🔒 Your info is used only for order processing',
      successTitle: 'Request Received',
      successMsg: 'We will contact you via Discord.\nActivated within 1–12 hours on average.',
    },
    footer: '© 2025 kutayilah · All rights reserved',
    langBtn: 'Türkçe',
  },
};

// ─── FEATURES DATA ────────────────────────────────────────────────────────────
const featuresData = {
  tr: [
    { icon: 'zap',      title: 'Macho Executor Uyumlu',    desc: 'kutayilah.lua tamamen Macho Executor ile test edilmiş ve optimize edilmiştir. Inject sonrası anında aktif olur.' },
    { icon: 'shield',   title: 'Anti-Detect Koruması',     desc: 'Gelişmiş obfuscation ve anti-cheat bypass katmanları ile detect edilmeden çalışır.' },
    { icon: 'eye',      title: 'ESP & Aimbot Modülleri',   desc: 'Oyuncu ESP, araç ESP, item highlight ve hassas aimbot sistemleri tek pakette sunulur.' },
    { icon: 'cpu',      title: 'Düşük CPU Kullanımı',      desc: 'Hafıza yönetimi optimize edilmiştir. FPS düşüşü yaşamadan sorunsuz çalışır.' },
    { icon: 'layers',   title: 'Modüler Yapı',             desc: 'İstediğin modülleri açıp kapatabilirsin. Gereksiz yük olmadan ihtiyacına göre yapılandır.' },
    { icon: 'terminal', title: 'Kolay Kullanım',           desc: 'Basit komut arayüzü ile her özelliği tek tuşla kontrol et. Başlangıç seviyesi için bile ideal.' },
    { icon: 'refresh',  title: 'Düzenli Güncellemeler',    desc: 'Oyun güncellemelerine karşı hızlı yama döngüsü. Lisans süresince tüm güncellemeler ücretsiz.' },
    { icon: 'lock',     title: 'HWID Kilidi',              desc: 'Lisansın yalnızca senin cihazına bağlıdır. Paylaşılamaz, çalınamaz, kopyalanamaz.' },
    { icon: 'globe',    title: 'Çoklu Sunucu Desteği',     desc: 'Farklı sunucular ve region\'lar arası sorunsuz geçiş. Tüm major sunucularla uyumlu.' },
    { icon: 'code',     title: 'Özel Script Desteği',      desc: 'Pro ve Unlimited kullanıcılar için özel Lua entegrasyonu ve kaynak uyarlama desteği.' },
    { icon: 'key',      title: 'Anlık Lisans Aktivasyonu', desc: 'Ödeme sonrası Discord üzerinden 1-12 saat içinde lisans anahtarın teslim edilir.' },
    { icon: 'users',    title: '7/24 Discord Destek',      desc: 'Aktif bir destek ekibi ve topluluk. Her sorunun için ticket sistemi ile hızlı çözüm.' },
  ],
  en: [
    { icon: 'zap',      title: 'Macho Executor Compatible', desc: 'kutayilah.lua has been fully tested and optimized for Macho Executor. Activates instantly after inject.' },
    { icon: 'shield',   title: 'Anti-Detect Protection',    desc: 'Runs undetected with advanced obfuscation and anti-cheat bypass layers.' },
    { icon: 'eye',      title: 'ESP & Aimbot Modules',      desc: 'Player ESP, vehicle ESP, item highlight and precision aimbot systems all in one package.' },
    { icon: 'cpu',      title: 'Low CPU Usage',             desc: 'Memory management is optimized. Runs smoothly without FPS drops.' },
    { icon: 'layers',   title: 'Modular Architecture',      desc: 'Toggle any module on or off. Configure to your needs without unnecessary overhead.' },
    { icon: 'terminal', title: 'Easy to Use',               desc: 'Control every feature with a single key via the simple command interface. Ideal even for beginners.' },
    { icon: 'refresh',  title: 'Regular Updates',           desc: 'Fast patch cycle against game updates. All updates are free for the duration of your license.' },
    { icon: 'lock',     title: 'HWID Lock',                 desc: 'Your license is bound only to your device. Cannot be shared, stolen or copied.' },
    { icon: 'globe',    title: 'Multi-Server Support',      desc: 'Seamless switching between different servers and regions. Compatible with all major servers.' },
    { icon: 'code',     title: 'Custom Script Support',     desc: 'Custom Lua integration and source adaptation support for Pro and Unlimited users.' },
    { icon: 'key',      title: 'Instant License Activation',desc: 'Your license key is delivered via Discord within 1–12 hours after payment.' },
    { icon: 'users',    title: '24/7 Discord Support',      desc: 'An active support team and community. Fast resolution for every issue via ticket system.' },
  ],
};

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const faqsData = {
  tr: [
    { q: 'kutayilah.lua hangi executor\'larla çalışır?',
      a: 'Öncelikli olarak Macho Executor ile optimize edilmiştir. Bunun yanı sıra diğer popüler executor\'larla da büyük ölçüde uyumludur.' },
    { q: 'Lisansım HWID\'e mi bağlı?',
      a: 'Evet. Her lisans tek bir cihaza (HWID) bağlanır. Cihaz değiştirmeniz durumunda Discord\'dan ticket açarak transfer talebinde bulunabilirsiniz.' },
    { q: 'Detect riski var mı?',
      a: 'kutayilah.lua gelişmiş obfuscation ve anti-detect katmanlarıyla korunmaktadır. Ancak hiçbir script %100 garanti veremez; güncel sürümü kullanmanız önemlidir.' },
    { q: 'Güncellemeler nasıl alınır?',
      a: 'Aktif lisansınız boyunca tüm güncellemeler Discord kanalından otomatik olarak duyurulur ve indirme linki paylaşılır.' },
    { q: 'Ödeme yöntemleri nelerdir?',
      a: 'Papara, Kripto para (BTC / ETH / USDT), PayPal ve banka havalesi kabul edilmektedir.' },
    { q: 'Trial mümkün mü?',
      a: 'Discord sunucumuzda belirli koşulları sağlayan üyeler için 24 saatlik trial imkânı sunulmaktadır. Detay için sunucumuza katılın.' },
  ],
  en: [
    { q: 'Which executors does kutayilah.lua support?',
      a: 'It is primarily optimized for Macho Executor. It is also largely compatible with other popular executors.' },
    { q: 'Is my license tied to my HWID?',
      a: 'Yes. Each license is bound to a single device (HWID). If you change your device, you can open a ticket on Discord to request a transfer.' },
    { q: 'Is there a detection risk?',
      a: 'kutayilah.lua is protected by advanced obfuscation and anti-detect layers. However, no script can guarantee 100% safety; always use the latest version.' },
    { q: 'How do I receive updates?',
      a: 'All updates during your active license are announced automatically in the Discord channel and download links are shared.' },
    { q: 'What payment methods are accepted?',
      a: 'Papara, Cryptocurrency (BTC / ETH / USDT), PayPal, and bank transfer are accepted.' },
    { q: 'Is a trial available?',
      a: 'A 24-hour trial is available for members who meet certain conditions in our Discord server. Join us for details.' },
  ],
};

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonialsData = {
  tr: [
    { handle: 'voidor',  label: 'VO', text: 'Macho ile birlikte kullandım, detect yok. ESP modülü özellikle çok temiz çalışıyor.', stars: 5 },
    { handle: 'sxlaris', label: 'SX', text: 'Diğer scriptlere kıyasla CPU kullanımı gerçekten düşük. FPS\'im hiç düşmedi.', stars: 5 },
    { handle: 'rektify', label: 'RK', text: 'Destek ekibi çok hızlı. Sorunum 20 dakikada çözüldü, güncelleme anında geldi.', stars: 5 },
    { handle: 'nxvaris', label: 'NX', text: 'HWID lock sistemi güvenli. Başkasına verdiğim şifreyle kullanmaya çalıştı, çalışmadı.', stars: 5 },
    { handle: 'zpharex', label: 'ZP', text: 'Custom config desteği sayesinde her şeyi kendi istediğim gibi ayarladım.', stars: 5 },
    { handle: 'cxleron', label: 'CX', text: 'Fiyat performans açısından piyasanın en iyisi. Kesinlikle tavsiye ederim.', stars: 5 },
  ],
  en: [
    { handle: 'voidor',  label: 'VO', text: 'Used it alongside Macho, zero detection. The ESP module works especially clean.', stars: 5 },
    { handle: 'sxlaris', label: 'SX', text: 'CPU usage is genuinely low compared to other scripts. My FPS never dropped.', stars: 5 },
    { handle: 'rektify', label: 'RK', text: 'Support team is super fast. My issue was resolved in 20 minutes, update came instantly.', stars: 5 },
    { handle: 'nxvaris', label: 'NX', text: 'The HWID lock system is solid. Someone tried to use it with a shared key — it just didn\'t work.', stars: 5 },
    { handle: 'zpharex', label: 'ZP', text: 'Custom config support let me set everything exactly how I wanted it.', stars: 5 },
    { handle: 'cxleron', label: 'CX', text: 'Best value for money on the market. Highly recommended.', stars: 5 },
  ],
};

// ─── PLAN DATA ────────────────────────────────────────────────────────────────
// Prices: Monthly 25€, 3-Month 40€, Yearly 50€
const makePlans = (lang) => {
  const t = T[lang].plans;
  return [
    {
      id: 'monthly',
      name: t.monthly.name,
      tagline: t.monthly.tagline,
      price: 25,
      currency: '€',
      period: t.monthly.period,
      hot: false,
      badge: t.monthly.badge,
      feats: [
        { t: t.feats[0], ok: true },
        { t: t.feats[1], ok: true },
        { t: t.feats[2], ok: true },
        { t: t.feats[3], ok: true },
        { t: t.feats[4], ok: true },
        { t: t.feats[5], ok: false },
        { t: t.feats[6], ok: false },
        { t: t.feats[7], ok: false },
      ],
      btn: 'btn-plan-line',
    },
    {
      id: 'quarterly',
      name: t.quarterly.name,
      tagline: t.quarterly.tagline,
      price: 40,
      currency: '€',
      period: t.quarterly.period,
      hot: true,
      badge: t.quarterly.badge,
      feats: [
        { t: t.feats[0], ok: true },
        { t: t.feats[1], ok: true },
        { t: t.feats[2], ok: true },
        { t: t.feats[3], ok: true },
        { t: t.feats[4], ok: true },
        { t: t.feats[5], ok: true },
        { t: t.feats[6], ok: true },
        { t: t.feats[7], ok: false },
      ],
      btn: 'btn-plan-red',
    },
    {
      id: 'yearly',
      name: t.yearly.name,
      tagline: t.yearly.tagline,
      price: 50,
      currency: '€',
      period: t.yearly.period,
      hot: false,
      badge: t.yearly.badge,
      feats: [
        { t: t.feats[0], ok: true },
        { t: t.feats[1], ok: true },
        { t: t.feats[2], ok: true },
        { t: t.feats[3], ok: true },
        { t: t.feats[4], ok: true },
        { t: t.feats[5], ok: true },
        { t: t.feats[6], ok: true },
        { t: t.feats[7], ok: true },
      ],
      btn: 'btn-plan-red',
    },
  ];
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ plan, onClose, lang }) {
  const [f, setF] = useState({ name: '', discord: '', payment: '' });
  const [done, setDone] = useState(false);
  const m = T[lang].modal;

  const sub = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => { onClose(); }, 3500);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h3>{m.title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {done ? (
          <div className="modal-success">
            <div className="s-icon">✅</div>
            <h3>{m.successTitle}</h3>
            <p>{m.successMsg.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</p>
          </div>
        ) : (
          <div className="modal-body">
            <div className="modal-plan-info">
              <span className="modal-plan-name">{plan.name} — kutayilah.lua</span>
              <span className="modal-plan-price">{plan.currency}{plan.price}{plan.period}</span>
            </div>
            <form onSubmit={sub}>
              <div className="form-field">
                <label>{m.nameLabel}</label>
                <input required placeholder={m.namePlaceholder} value={f.name}
                  onChange={e => setF({...f, name: e.target.value})} />
              </div>
              <div className="form-field">
                <label>{m.discordLabel}</label>
                <input required placeholder={m.discordPlaceholder} value={f.discord}
                  onChange={e => setF({...f, discord: e.target.value})} />
              </div>
              <div className="form-field">
                <label>{m.paymentLabel}</label>
                <select required value={f.payment} onChange={e => setF({...f, payment: e.target.value})}>
                  <option value="">{m.paymentPlaceholder}</option>
                  {m.payments.map((p, i) => <option key={i} value={p.toLowerCase().replace(/\s/g,'-')}>{p}</option>)}
                </select>
              </div>
              <button type="submit" className="modal-submit">{m.submitBtn}</button>
            </form>
            <p className="modal-note">{m.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('tr');
  const [openFaq, setOpenFaq] = useState(null);

  const t = T[lang];
  const s = t.sections;
  const plans = makePlans(lang);
  const features = featuresData[lang];
  const faqs = faqsData[lang];
  const testimonials = testimonialsData[lang];

  const scroll = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <a className="logo" href="/">
          kutayilah<span className="red">.</span><span className="dim">lua</span>
        </a>
        <ul className="nav-links">
          <li><a href="#features" onClick={e => { e.preventDefault(); scroll('features'); }}>{t.nav.features}</a></li>
          <li><a href="#about"    onClick={e => { e.preventDefault(); scroll('about');    }}>{t.nav.about}</a></li>
          <li><a href="#pricing"  onClick={e => { e.preventDefault(); scroll('pricing');  }}>{t.nav.pricing}</a></li>
          <li><a href="#faq"      onClick={e => { e.preventDefault(); scroll('faq');      }}>{t.nav.faq}</a></li>
        </ul>
        <div className="nav-right">
          <button className="lang-btn" onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}>
            <span className="lang-flag">{lang === 'tr' ? '🇬🇧' : '🇹🇷'}</span>
            {t.langBtn}
          </button>
          <button className="nav-cta" onClick={() => scroll('pricing')}>{t.nav.buy}</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-line" />
        <div className="hero-bg-line" />
        <div className="hero-bg-line" />
        <div className="hero-glow" />

        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-label">
              <span className="hero-label-line" />
              {t.hero.label}
            </div>
            <h1 className="hero-h1">
              kutayilah<span className="accent">.</span>lua
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-actions">
              <button className="btn-red" onClick={() => scroll('pricing')}>{t.hero.btnBuy}</button>
              <button className="btn-ghost" onClick={() => scroll('features')}>{t.hero.btnFeatures}</button>
            </div>
          </div>

          {/* TERMINAL CARD */}
          <div className="hero-terminal">
            <div className="terminal-bar">
              <span className="t-dot t-dot-r" />
              <span className="t-dot t-dot-y" />
              <span className="t-dot t-dot-g" />
              <span className="terminal-file">kutayilah.lua</span>
            </div>
            <div className="terminal-body">
              <div><span className="t-cm">-- kutayilah.lua  v4.1.0</span></div>
              <div><span className="t-cm">-- Macho Executor Compatible</span></div>
              <br/>
              <div><span className="t-kw">local</span> <span className="t-var">cfg</span> = <span className="t-kw">{'{}'}</span></div>
              <div><span className="t-var">cfg</span>.hwid    = <span className="t-str">"HWID-XXXX-XXXX"</span></div>
              <div><span className="t-var">cfg</span>.esp     = <span className="t-num">true</span></div>
              <div><span className="t-var">cfg</span>.aimbot  = <span className="t-num">true</span></div>
              <div><span className="t-var">cfg</span>.fov     = <span className="t-num">90</span></div>
              <br/>
              <div><span className="t-kw">function</span> <span className="t-fn">Init</span><span className="t-var">()</span></div>
              <div>&nbsp; <span className="t-fn">ValidateHWID</span><span className="t-var">(</span><span className="t-var">cfg</span><span className="t-var">)</span></div>
              <div>&nbsp; <span className="t-fn">LoadModules</span><span className="t-var">(</span><span className="t-var">cfg</span><span className="t-var">)</span></div>
              <div>&nbsp; <span className="t-fn">print</span><span className="t-var">(</span><span className="t-str">"✓ loaded"</span><span className="t-var">)</span></div>
              <div><span className="t-kw">end</span></div>
              <br/>
              <div><span className="t-ok">✓ License valid · All modules active</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stat-cell">
          <div className="stat-n">2K+</div>
          <div className="stat-l">{t.stats.users}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-n">99%</div>
          <div className="stat-l">{t.stats.uptime}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-n">7/24</div>
          <div className="stat-l">{t.stats.support}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-n">v4.1</div>
          <div className="stat-l">{t.stats.version}</div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features">
        <div className="section-wrap">
          <div className="section-label">{s.featuresLabel}</div>
          <h2 className="section-h2">{s.featuresH2a}<span>{s.featuresH2b}</span>{s.featuresH2c}</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon-wrap"><Ic d={P[f.icon]} size={16} /></div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>

          {/* YOUTUBE EMBED */}
          <div className="yt-wrap">
            <div className="yt-label">
              <span className="yt-play-dot">▶</span>
              {lang === 'tr' ? 'Script Tanıtım Videosu' : 'Script Preview Video'}
            </div>
            <div className="yt-frame-wrap">
              <iframe
                src="https://www.youtube.com/embed/rq1IxmFKGb4?start=1"
                title="kutayilah.lua preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section-wrap">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-label">{s.aboutLabel}</div>
              <h2 className="section-h2" style={{ marginBottom: 20 }}>
                {s.aboutH2[0]}<span>{s.aboutH2[1]}</span>,<br />{s.aboutH2[2].replace('\n','')}
              </h2>
              <p>{s.aboutP1}</p>
              <p>{s.aboutP2}</p>
              <ul className="check-list">
                {s.aboutList.map((item, i) => (
                  <li key={i}><span className="ck">▸</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-title">{s.cardTitle}</span>
                <span className="info-card-badge">{s.cardBadge}</span>
              </div>
              <div className="info-rows">
                {s.cardRows.map(([label, val], i) => (
                  <div className="info-row" key={i}>
                    <span className="info-row-label">{label}</span>
                    <span className={`info-row-val${val === 'Aktif' || val === 'Active' ? ' green' : val === 'v4.1.0' ? ' red' : ''}`}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="pricing-wrap">
          <div className="pricing-head">
            <div>
              <div className="section-label">{s.pricingLabel}</div>
              <h2 className="section-h2" style={{ marginBottom: 0 }}>
                {s.pricingH2a}<span>{s.pricingH2b}</span>
              </h2>
            </div>
          </div>

          <div className="plans-row">
            {plans.map(plan => (
              <div className={`plan ${plan.hot ? 'hot' : ''}`} key={plan.id}>
                {plan.badge && <span className="plan-pill">{plan.badge}</span>}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-tagline">{plan.tagline}</div>
                <div className="plan-price-row">
                  <span className="p-curr">{plan.currency}</span>
                  <span className="p-amount">{plan.price}</span>
                  <span className="p-period">{plan.period}</span>
                </div>
                <div className="p-old">&nbsp;</div>
                <div className="plan-sep" />
                <ul className="plan-feats">
                  {plan.feats.map((ft, i) => (
                    <li key={i} className={ft.ok ? 'ok' : 'off'}>
                      {ft.ok
                        ? <span className="pf-ck">▸</span>
                        : <span className="pf-x">—</span>
                      }
                      {ft.t}
                    </li>
                  ))}
                </ul>
                <a
                  className={plan.btn}
                  href="https://discord.gg/executor"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display:'block', textAlign:'center', textDecoration:'none', lineHeight:'normal', padding:'12px 20px' }}
                >
                  {T[lang].plans.buyBtn}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section-wrap">
          <div className="section-label">{s.reviewsLabel}</div>
          <h2 className="section-h2">{s.reviewsH2a}<span>{s.reviewsH2b}</span>{s.reviewsH2c}</h2>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-stars">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <span className="t-star" key={j}>★</span>
                  ))}
                </div>
                <p className="testi-quote">"{t.text}"</p>
                <div className="testi-foot">
                  <div className="testi-av">{t.label}</div>
                  <div>
                    <div className="testi-name">{t.handle}</div>
                    <div className="testi-handle">{s.verifiedUser}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section-wrap">
          <div className="section-label">{s.faqLabel}</div>
          <h2 className="section-h2">{s.faqH2a}<span>{s.faqH2b}</span></h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <div
                  className={`faq-q ${openFaq === i ? 'open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  <span className={`faq-icon ${openFaq === i ? 'open' : ''}`}>+</span>
                </div>
                <div className={`faq-a ${openFaq === i ? 'open' : ''}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCORD CTA */}
      <div className="cta-section" id="discord">
        <h2>{t.cta.h2}</h2>
        <p>{t.cta.p}</p>
        <a className="btn-discord" href="https://discord.gg/executor" target="_blank" rel="noopener noreferrer">
          {t.cta.btn}
        </a>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          kutayilah<span className="red">.</span><span className="dim">lua</span>
        </div>
        <div className="footer-copy">{t.footer}</div>
      </footer>

      {/* MODAL */}
    </>
  );
}
