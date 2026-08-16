import React from 'react';
import './App.css';
import './FeaturesPage.css';

const Ic = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Icons = {
  cpu: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  terminal: "M4 17l6-6-6-6M12 19h8",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
};

const detailedFeatures = {
  tr: [
    {
      icon: 'cpu',
      title: 'Maksimum Performans Optimizasyonu',
      desc: 'Sistem kaynaklarını minimum düzeyde tüketmek üzere tasarlanmıştır. Gelişmiş bellek yönetimi sayesinde uzun süreli kullanımlarda bile FPS düşüşü yaşanmaz. Kod mimarisi tamamen asenkron ve optimize edilmiştir.',
      tags: ['Sıfır FPS Kaybı', 'Asenkron İşlemler', 'Düşük RAM Kullanımı']
    },
    {
      icon: 'shield',
      title: 'Gelişmiş Güvenlik ve Doğrulama',
      desc: 'Lisanslarınız üst düzey şifreleme algoritmalarıyla korunur. Güvenli Lua sanal makinesi (Sandbox) sayesinde kodlar izole bir ortamda çalışır ve dışarıdan müdahalelere karşı tam koruma sağlar.',
      tags: ['AES-256 Şifreleme', 'Sandbox İzolasyonu', 'Dinamik Key Doğrulama']
    },
    {
      icon: 'layers',
      title: 'DUI Tabanlı Modern Arayüz',
      desc: 'Klasik oyun içi menülerin aksine tamamen web teknolojileri (HTML/CSS/JS) kullanılarak tasarlanmış, akıcı ve özelleştirilebilir bir kullanıcı arayüzü (DUI) sunar. Görünmezlik modu ile ekran görüntülerinde asla belirmez.',
      tags: ['Web Tabanlı UI', 'StreamProof', 'Tema Desteği']
    },
    {
      icon: 'zap',
      title: 'Anında Modül Yükleme',
      desc: 'İhtiyacınız olan modüller sadece siz çağırdığınızda aktif olur. Bu dinamik yükleme sistemi, başlangıç süresini sıfıra indirir ve gereksiz sistem yorgunluğunu önler.',
      tags: ['Lazy Loading', 'Hızlı Başlatma', 'Modüler Mimari']
    },
    {
      icon: 'code',
      title: 'Özelleştirilebilir Config Sistemi',
      desc: 'Scriptin her bir parçasını kendi zevkinize ve ihtiyaçlarınıza göre yapılandırabilirsiniz. Gelişmiş JSON tabanlı config dosyaları ile kısayol tuşlarından renk paletine kadar her şeyi ayarlayın.',
      tags: ['JSON Yapılandırma', 'Sınırsız Renk', 'Kısayol Atamaları']
    },
    {
      icon: 'terminal',
      title: 'Gelişmiş Geliştirici API\'si',
      desc: 'Kendi eklentilerinizi ve özelliklerinizi yazabilmeniz için kapsamlı bir Lua API\'si sunulmaktadır. Dokümantasyon sayesinde narcolepsy ekosistemini dilediğiniz gibi genişletebilirsiniz.',
      tags: ['Açık API', 'Genişletilebilirlik', 'Detaylı Dokümantasyon']
    }
  ],
  en: [
    {
      icon: 'cpu',
      title: 'Maximum Performance Optimization',
      desc: 'Designed to consume minimal system resources. Thanks to advanced memory management, no FPS drops occur even during prolonged use. The code architecture is fully asynchronous and highly optimized.',
      tags: ['Zero FPS Drop', 'Asynchronous Execution', 'Low RAM Usage']
    },
    {
      icon: 'shield',
      title: 'Advanced Security & Verification',
      desc: 'Your licenses are protected with high-level encryption algorithms. The secure Lua virtual machine (Sandbox) ensures that code runs in an isolated environment, providing full protection against external tampering.',
      tags: ['AES-256 Encryption', 'Sandbox Isolation', 'Dynamic Key Auth']
    },
    {
      icon: 'layers',
      title: 'DUI Based Modern Interface',
      desc: 'Unlike traditional in-game menus, it offers a fluid and customizable user interface (DUI) designed entirely using web technologies. With its stealth mode, it never appears in screenshots.',
      tags: ['Web Based UI', 'StreamProof', 'Theme Support']
    },
    {
      icon: 'zap',
      title: 'Instant Module Loading',
      desc: 'Modules are only activated when you call them. This dynamic loading system reduces startup time to zero and prevents unnecessary system fatigue.',
      tags: ['Lazy Loading', 'Fast Boot', 'Modular Architecture']
    },
    {
      icon: 'code',
      title: 'Customizable Config System',
      desc: 'You can configure every part of the script according to your taste and needs. Adjust everything from hotkeys to the color palette with advanced JSON-based config files.',
      tags: ['JSON Config', 'Unlimited Colors', 'Custom Hotkeys']
    },
    {
      icon: 'terminal',
      title: 'Advanced Developer API',
      desc: 'A comprehensive Lua API is provided so you can write your own plugins and features. Extend the narcolepsy ecosystem however you like with our documentation.',
      tags: ['Open API', 'Extensibility', 'Detailed Docs']
    }
  ]
};

export default function FeaturesPage({ lang, setPage }) {
  const data = detailedFeatures[lang];
  const tTitle = lang === 'tr' ? 'Detaylı Özellikler' : 'Detailed Features';
  const tSub = lang === 'tr' ? 'narcolepsy.lua altyapısının sunduğu profesyonel avantajlar' : 'Professional advantages offered by the narcolepsy.lua infrastructure';
  const tBack = lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home';

  return (
    <div className="features-page">
      <div className="features-page-header">
        <button className="btn-back" onClick={() => setPage('home')}>
          ← {tBack}
        </button>
        <h1 className="features-page-title">{tTitle}</h1>
        <p className="features-page-sub">{tSub}</p>
      </div>

      <div className="features-page-grid">
        {data.map((f, i) => (
          <div className="detailed-feat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="df-icon">
              <Ic d={Icons[f.icon]} size={28} />
            </div>
            <h3 className="df-title">{f.title}</h3>
            <p className="df-desc">{f.desc}</p>
            <div className="df-tags">
              {f.tags.map((tag, j) => (
                <span className="df-tag" key={j}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Information Alert regarding policies */}
      <div className="features-notice">
        <div className="fn-icon">ⓘ</div>
        <div className="fn-text">
          {lang === 'tr' 
            ? 'Güvenlik politikaları gereği spesifik yazılım atlatma (anti-cheat bypass) yöntemleri ve exploit detayları bu sayfada listelenmemektedir.'
            : 'Due to safety policies, specific software circumvention (anti-cheat bypass) methods and exploit details are not listed on this page.'}
        </div>
      </div>
    </div>
  );
}
