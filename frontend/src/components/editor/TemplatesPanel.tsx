export interface Template {
  id: string;
  label: string;
  category: string;
  width: number;
  height: number;
  background: string;
  thumb: string;
  objects: object[];
}

const enc = (svg: string) =>
  `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

export const TEMPLATES: Template[] = [
  {
    id: 'blank',
    label: 'Чистий аркуш',
    category: 'Базові',
    width: 800, height: 600,
    background: '#ffffff',
    objects: [],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120">
      <rect width="160" height="120" fill="#fff" stroke="#ddd" stroke-width="2"/>
      <text x="80" y="66" text-anchor="middle" fill="#ccc" font-size="11" font-family="sans-serif">Порожній</text>
    </svg>`),
  },
  {
    id: 'social',
    label: 'Соц. мережа',
    category: 'Публікації',
    width: 800, height: 800,
    background: '#6c63ff',
    objects: [
      { type:'rect', left:40, top:40, width:720, height:720, fill:'transparent', stroke:'rgba(255,255,255,0.25)', strokeWidth:2, rx:16, ry:16, selectable:true, evented:true },
      { type:'ellipse', left:280, top:160, rx:110, ry:110, fill:'rgba(255,255,255,0.12)', selectable:true, evented:true },
      { type:'textbox', left:80, top:340, width:640, text:'ВАШ ЗАГОЛОВОК', fontSize:56, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:120, top:430, width:560, text:'Підзаголовок або короткий опис публікації', fontSize:24, fontFamily:'Inter', fill:'rgba(255,255,255,0.8)', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:300, top:660, width:200, text:'@yourhandle', fontSize:20, fontFamily:'Inter', fill:'rgba(255,255,255,0.6)', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="#6c63ff"/>
      <rect x="8" y="8" width="104" height="104" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" rx="4"/>
      <circle cx="60" cy="42" r="22" fill="rgba(255,255,255,0.15)"/>
      <text x="60" y="76" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif" font-weight="bold">ЗАГОЛОВОК</text>
      <text x="60" y="90" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="7" font-family="sans-serif">Підзаголовок</text>
    </svg>`),
  },
  {
    id: 'banner',
    label: 'Широкий банер',
    category: 'Банери',
    width: 1200, height: 400,
    background: '#1a1a2e',
    objects: [
      { type:'rect', left:0, top:0, width:360, height:400, fill:'#6c63ff', selectable:true, evented:true },
      { type:'ellipse', left:80, top:80, rx:120, ry:120, fill:'rgba(255,255,255,0.08)', selectable:true, evented:true },
      { type:'textbox', left:400, top:120, width:700, text:'Ваш рекламний банер', fontSize:52, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:400, top:200, width:700, text:'Короткий опис або заклик до дії', fontSize:26, fontFamily:'Inter', fill:'rgba(255,255,255,0.7)', selectable:true, evented:true },
      { type:'rect', left:400, top:280, width:200, height:56, fill:'#6c63ff', rx:28, ry:28, selectable:true, evented:true },
      { type:'textbox', left:420, top:293, width:160, text:'Детальніше', fontSize:20, fontFamily:'Inter', fill:'#ffffff', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 53">
      <rect width="160" height="53" fill="#1a1a2e"/>
      <rect x="0" y="0" width="48" height="53" fill="#6c63ff"/>
      <circle cx="24" cy="26" r="16" fill="rgba(255,255,255,0.1)"/>
      <text x="65" y="22" fill="#fff" font-size="9" font-family="sans-serif" font-weight="bold">БАНЕР</text>
      <text x="65" y="34" fill="rgba(255,255,255,0.6)" font-size="6" font-family="sans-serif">Опис або заклик</text>
      <rect x="65" y="39" width="38" height="9" fill="#6c63ff" rx="4"/>
    </svg>`),
  },
  {
    id: 'presentation',
    label: 'Презентація',
    category: 'Базові',
    width: 960, height: 540,
    background: '#f8f8fc',
    objects: [
      { type:'rect', left:0, top:0, width:960, height:100, fill:'#6c63ff', selectable:true, evented:true },
      { type:'textbox', left:60, top:24, width:840, text:'Заголовок презентації', fontSize:40, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', selectable:true, evented:true },
      { type:'rect', left:40, top:140, width:420, height:340, fill:'#ffffff', rx:8, ry:8, shadow:'2px 4px 12px rgba(0,0,0,0.1)', selectable:true, evented:true },
      { type:'rect', left:500, top:140, width:420, height:340, fill:'#ffffff', rx:8, ry:8, shadow:'2px 4px 12px rgba(0,0,0,0.1)', selectable:true, evented:true },
      { type:'textbox', left:60, top:160, width:380, text:'Секція 1', fontSize:22, fontFamily:'Inter', fontWeight:'bold', fill:'#6c63ff', selectable:true, evented:true },
      { type:'textbox', left:60, top:200, width:380, text:'Опис першої секції або список пунктів для вашої презентації.', fontSize:16, fontFamily:'Inter', fill:'#555', selectable:true, evented:true },
      { type:'textbox', left:520, top:160, width:380, text:'Секція 2', fontSize:22, fontFamily:'Inter', fontWeight:'bold', fill:'#6c63ff', selectable:true, evented:true },
      { type:'textbox', left:520, top:200, width:380, text:'Опис другої секції або список пунктів для вашої презентації.', fontSize:16, fontFamily:'Inter', fill:'#555', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90">
      <rect width="160" height="90" fill="#f8f8fc"/>
      <rect x="0" y="0" width="160" height="22" fill="#6c63ff"/>
      <text x="80" y="15" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif" font-weight="bold">Презентація</text>
      <rect x="8" y="30" width="68" height="52" fill="#fff" rx="3"/>
      <rect x="84" y="30" width="68" height="52" fill="#fff" rx="3"/>
      <text x="14" y="44" fill="#6c63ff" font-size="6" font-family="sans-serif" font-weight="bold">Секція 1</text>
      <text x="90" y="44" fill="#6c63ff" font-size="6" font-family="sans-serif" font-weight="bold">Секція 2</text>
    </svg>`),
  },
  {
    id: 'bizcard',
    label: 'Візитка',
    category: 'Бізнес',
    width: 900, height: 500,
    background: '#2d2d45',
    objects: [
      { type:'rect', left:0, top:0, width:300, height:500, fill:'#6c63ff', selectable:true, evented:true },
      { type:'ellipse', left:60, top:140, rx:80, ry:80, fill:'rgba(255,255,255,0.15)', selectable:true, evented:true },
      { type:'textbox', left:10, top:200, width:280, text:'ВА', fontSize:56, fontFamily:'Inter', fontWeight:'bold', fill:'rgba(255,255,255,0.4)', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:340, top:130, width:500, text:"Ваше Ім'я", fontSize:44, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:340, top:195, width:500, text:'Посада / Компанія', fontSize:26, fontFamily:'Inter', fill:'rgba(255,255,255,0.6)', selectable:true, evented:true },
      { type:'rect', left:340, top:245, width:460, height:2, fill:'rgba(255,255,255,0.2)', selectable:true, evented:true },
      { type:'textbox', left:340, top:265, width:220, text:'email@example.com', fontSize:18, fontFamily:'Inter', fill:'rgba(255,255,255,0.7)', selectable:true, evented:true },
      { type:'textbox', left:560, top:265, width:240, text:'+38 (000) 000-00-00', fontSize:18, fontFamily:'Inter', fill:'rgba(255,255,255,0.7)', selectable:true, evented:true },
      { type:'textbox', left:340, top:300, width:460, text:'вул. Прикладна 1, Київ, Україна', fontSize:16, fontFamily:'Inter', fill:'rgba(255,255,255,0.5)', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 89">
      <rect width="160" height="89" fill="#2d2d45"/>
      <rect x="0" y="0" width="48" height="89" fill="#6c63ff"/>
      <circle cx="24" cy="44" r="16" fill="rgba(255,255,255,0.2)"/>
      <text x="24" y="49" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="sans-serif" font-weight="bold">ВА</text>
      <text x="58" y="36" fill="#fff" font-size="9" font-family="sans-serif" font-weight="bold">Ваше Ім'я</text>
      <text x="58" y="49" fill="rgba(255,255,255,0.6)" font-size="6" font-family="sans-serif">Посада · Компанія</text>
      <line x1="58" y1="55" x2="150" y2="55" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
      <text x="58" y="65" fill="rgba(255,255,255,0.5)" font-size="5.5" font-family="sans-serif">email@example.com</text>
      <text x="58" y="75" fill="rgba(255,255,255,0.5)" font-size="5.5" font-family="sans-serif">+38 (000) 000-00-00</text>
    </svg>`),
  },
  {
    id: 'poster',
    label: 'Постер',
    category: 'Публікації',
    width: 600, height: 840,
    background: '#ff6b6b',
    objects: [
      { type:'rect', left:0, top:560, width:600, height:280, fill:'rgba(0,0,0,0.3)', selectable:true, evented:true },
      { type:'ellipse', left:100, top:60, rx:200, ry:200, fill:'rgba(255,255,255,0.1)', selectable:true, evented:true },
      { type:'ellipse', left:300, top:120, rx:120, ry:120, fill:'rgba(255,255,255,0.08)', selectable:true, evented:true },
      { type:'textbox', left:40, top:580, width:520, text:'НАЗВА ЗАХОДУ', fontSize:56, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:60, top:670, width:480, text:'Підзаголовок або опис заходу', fontSize:26, fontFamily:'Inter', fill:'rgba(255,255,255,0.85)', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:60, top:730, width:480, text:'📅 Дата  ·  📍 Місце  ·  🎫 Квитки', fontSize:22, fontFamily:'Inter', fill:'rgba(255,255,255,0.7)', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 126">
      <rect width="90" height="126" fill="#ff6b6b"/>
      <rect x="0" y="80" width="90" height="46" fill="rgba(0,0,0,0.3)"/>
      <circle cx="45" cy="42" r="28" fill="rgba(255,255,255,0.12)"/>
      <circle cx="60" cy="28" r="16" fill="rgba(255,255,255,0.08)"/>
      <text x="45" y="96" text-anchor="middle" fill="#fff" font-size="9" font-family="sans-serif" font-weight="bold">ПОСТЕР</text>
      <text x="45" y="109" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="6" font-family="sans-serif">Захід · Дата · Місце</text>
    </svg>`),
  },
  {
    id: 'logo',
    label: 'Логотип',
    category: 'Бізнес',
    width: 500, height: 500,
    background: '#ffffff',
    objects: [
      { type:'ellipse', left:100, top:80, rx:150, ry:150, fill:'none', stroke:'#6c63ff', strokeWidth:8, selectable:true, evented:true },
      { type:'ellipse', left:152, top:132, rx:98, ry:98, fill:'#6c63ff', selectable:true, evented:true },
      { type:'textbox', left:50, top:360, width:400, text:'КОМПАНІЯ', fontSize:42, fontFamily:'Inter', fontWeight:'bold', fill:'#1a1a2e', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:416, width:340, text:'TAGLINE · SINCE 2024', fontSize:18, fontFamily:'Inter', fill:'#888', textAlign:'center', letterSpacing:4, selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#fff"/>
      <circle cx="50" cy="42" r="28" fill="none" stroke="#6c63ff" stroke-width="4"/>
      <circle cx="50" cy="42" r="18" fill="#6c63ff"/>
      <text x="50" y="82" text-anchor="middle" fill="#1a1a2e" font-size="9" font-family="sans-serif" font-weight="bold">ЛОГОТИП</text>
      <text x="50" y="93" text-anchor="middle" fill="#888" font-size="5.5" font-family="sans-serif">TAGLINE</text>
    </svg>`),
  },
  {
    id: 'certificate',
    label: 'Сертифікат',
    category: 'Документи',
    width: 900, height: 630,
    background: '#fffdf0',
    objects: [
      { type:'rect', left:12, top:12, width:876, height:606, fill:'transparent', stroke:'#c9a227', strokeWidth:4, selectable:true, evented:true },
      { type:'rect', left:22, top:22, width:856, height:586, fill:'transparent', stroke:'#c9a227', strokeWidth:1, selectable:true, evented:true },
      { type:'textbox', left:100, top:60, width:700, text:'СЕРТИФІКАТ', fontSize:62, fontFamily:'Inter', fontWeight:'bold', fill:'#c9a227', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:100, top:145, width:700, text:'Цей сертифікат підтверджує, що', fontSize:22, fontFamily:'Inter', fill:'#666', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:200, width:740, text:'Ваше Повне Ім\'я', fontSize:48, fontFamily:'Inter', fontStyle:'italic', fill:'#1a1a2e', textAlign:'center', selectable:true, evented:true },
      { type:'rect', left:200, top:265, width:500, height:2, fill:'#c9a227', selectable:true, evented:true },
      { type:'textbox', left:80, top:285, width:740, text:'успішно завершив(ла) курс', fontSize:22, fontFamily:'Inter', fill:'#666', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:330, width:740, text:'«Назва курсу або програми»', fontSize:32, fontFamily:'Inter', fontWeight:'bold', fill:'#1a1a2e', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:500, width:300, text:'_________________\nПідпис директора', fontSize:18, fontFamily:'Inter', fill:'#444', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:520, top:500, width:300, text:'_________________\nДата видачі', fontSize:18, fontFamily:'Inter', fill:'#444', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 112">
      <rect width="160" height="112" fill="#fffdf0"/>
      <rect x="4" y="4" width="152" height="104" fill="none" stroke="#c9a227" stroke-width="2"/>
      <rect x="8" y="8" width="144" height="96" fill="none" stroke="#c9a227" stroke-width="0.6"/>
      <text x="80" y="34" text-anchor="middle" fill="#c9a227" font-size="11" font-family="serif" font-weight="bold">СЕРТИФІКАТ</text>
      <line x1="30" y1="42" x2="130" y2="42" stroke="#c9a227" stroke-width="0.8"/>
      <text x="80" y="56" text-anchor="middle" fill="#666" font-size="7" font-family="serif">Ваше Повне Ім'я</text>
      <text x="80" y="70" text-anchor="middle" fill="#333" font-size="6.5" font-family="sans-serif">«Назва курсу»</text>
      <line x1="20" y1="92" x2="65" y2="92" stroke="#888" stroke-width="0.8"/>
      <line x1="95" y1="92" x2="140" y2="92" stroke="#888" stroke-width="0.8"/>
    </svg>`),
  },
  {
    id: 'flyer',
    label: 'Флаєр',
    category: 'Публікації',
    width: 600, height: 800,
    background: '#0f3460',
    objects: [
      { type:'rect', left:0, top:0, width:600, height:260, fill:'#16213e', selectable:true, evented:true },
      { type:'ellipse', left:150, top:30, rx:150, ry:150, fill:'rgba(22,160,133,0.15)', selectable:true, evented:true },
      { type:'textbox', left:40, top:80, width:520, text:'ПОДІЯ\nМІСЯЦЯ', fontSize:64, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', textAlign:'center', lineHeight:1.1, selectable:true, evented:true },
      { type:'rect', left:200, top:255, width:200, height:6, fill:'#16a085', rx:3, ry:3, selectable:true, evented:true },
      { type:'textbox', left:40, top:290, width:520, text:'Короткий та яскравий опис події\nщо зацікавить вашу аудиторію', fontSize:24, fontFamily:'Inter', fill:'rgba(255,255,255,0.8)', textAlign:'center', selectable:true, evented:true },
      { type:'rect', left:40, top:620, width:520, height:100, fill:'rgba(22,160,133,0.2)', rx:12, ry:12, selectable:true, evented:true },
      { type:'textbox', left:60, top:638, width:480, text:'📅 15 листопада 2025', fontSize:22, fontFamily:'Inter', fill:'#16a085', selectable:true, evented:true },
      { type:'textbox', left:60, top:670, width:480, text:'📍 Київ, вул. Хрещатик 1', fontSize:20, fontFamily:'Inter', fill:'rgba(255,255,255,0.7)', selectable:true, evented:true },
      { type:'rect', left:175, top:735, width:250, height:50, fill:'#16a085', rx:25, ry:25, selectable:true, evented:true },
      { type:'textbox', left:185, top:747, width:230, text:'Зареєструватись', fontSize:20, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 120">
      <rect width="90" height="120" fill="#0f3460"/>
      <rect x="0" y="0" width="90" height="45" fill="#16213e"/>
      <circle cx="45" cy="22" r="20" fill="rgba(22,160,133,0.2)"/>
      <text x="45" y="19" text-anchor="middle" fill="#fff" font-size="10" font-family="sans-serif" font-weight="bold">ФЛАЄР</text>
      <text x="45" y="32" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif" font-weight="bold">ПОДІЇ</text>
      <rect x="30" y="44" width="30" height="3" fill="#16a085" rx="1"/>
      <text x="45" y="62" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="6" font-family="sans-serif">Опис події та деталі</text>
      <rect x="8" y="90" width="74" height="18" fill="rgba(22,160,133,0.3)" rx="4"/>
      <text x="45" y="103" text-anchor="middle" fill="#16a085" font-size="6" font-family="sans-serif">📅 Дата  📍 Місце</text>
    </svg>`),
  },
  {
    id: 'invitation',
    label: 'Запрошення',
    category: 'Документи',
    width: 700, height: 500,
    background: '#fdf6e3',
    objects: [
      { type:'rect', left:16, top:16, width:668, height:468, fill:'transparent', stroke:'#b8860b', strokeWidth:2, selectable:true, evented:true },
      { type:'rect', left:28, top:28, width:644, height:444, fill:'transparent', stroke:'#daa520', strokeWidth:0.5, selectable:true, evented:true },
      { type:'ellipse', left:270, top:30, rx:80, ry:80, fill:'rgba(184,134,11,0.06)', selectable:true, evented:true },
      { type:'textbox', left:80, top:60, width:540, text:'Запрошення', fontSize:52, fontFamily:'Georgia, serif', fontStyle:'italic', fill:'#b8860b', textAlign:'center', selectable:true, evented:true },
      { type:'rect', left:200, top:125, width:300, height:1, fill:'#daa520', selectable:true, evented:true },
      { type:'textbox', left:80, top:145, width:540, text:'Шановний(а) _____________,', fontSize:20, fontFamily:'Inter', fill:'#5a4a2a', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:195, width:540, text:'з великою радістю запрошуємо вас\nна наше особливе свято', fontSize:22, fontFamily:'Inter', fill:'#5a4a2a', textAlign:'center', lineHeight:1.5, selectable:true, evented:true },
      { type:'textbox', left:80, top:295, width:240, text:'📅 Дата\n20 грудня 2025', fontSize:18, fontFamily:'Inter', fill:'#7a6a4a', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:380, top:295, width:240, text:'📍 Місце\nм. Київ', fontSize:18, fontFamily:'Inter', fill:'#7a6a4a', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:410, width:540, text:'Чекаємо на вас!', fontSize:20, fontFamily:'Georgia, serif', fontStyle:'italic', fill:'#b8860b', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 100">
      <rect width="140" height="100" fill="#fdf6e3"/>
      <rect x="4" y="4" width="132" height="92" fill="none" stroke="#b8860b" stroke-width="1.5"/>
      <rect x="8" y="8" width="124" height="84" fill="none" stroke="#daa520" stroke-width="0.5"/>
      <text x="70" y="32" text-anchor="middle" fill="#b8860b" font-size="10" font-family="serif" font-style="italic">Запрошення</text>
      <line x1="35" y1="38" x2="105" y2="38" stroke="#daa520" stroke-width="0.8"/>
      <text x="70" y="52" text-anchor="middle" fill="#5a4a2a" font-size="6.5" font-family="sans-serif">Шановний(а) ___________,</text>
      <text x="70" y="64" text-anchor="middle" fill="#5a4a2a" font-size="6" font-family="sans-serif">запрошуємо вас на свято</text>
      <text x="35" y="82" text-anchor="middle" fill="#7a6a4a" font-size="5.5" font-family="sans-serif">📅 Дата</text>
      <text x="105" y="82" text-anchor="middle" fill="#7a6a4a" font-size="5.5" font-family="sans-serif">📍 Місце</text>
    </svg>`),
  },
  {
    id: 'youtube',
    label: 'YouTube обкладинка',
    category: 'Банери',
    width: 1280, height: 720,
    background: '#0a0a0a',
    objects: [
      { type:'rect', left:0, top:0, width:420, height:720, fill:'#ff0000', selectable:true, evented:true },
      { type:'ellipse', left:60, top:200, rx:180, ry:180, fill:'rgba(255,255,255,0.06)', selectable:true, evented:true },
      { type:'textbox', left:10, top:260, width:400, text:'▶', fontSize:96, fill:'rgba(255,255,255,0.15)', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:460, top:180, width:780, text:'НАЗВА\nКАНАЛУ', fontSize:96, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', lineHeight:1, selectable:true, evented:true },
      { type:'rect', left:460, top:390, width:780, height:4, fill:'#ff0000', selectable:true, evented:true },
      { type:'textbox', left:460, top:412, width:780, text:'Підписуйтесь та натискайте 🔔', fontSize:32, fontFamily:'Inter', fill:'rgba(255,255,255,0.7)', selectable:true, evented:true },
      { type:'textbox', left:460, top:470, width:780, text:'Новий відеоролик щотижня', fontSize:28, fontFamily:'Inter', fill:'rgba(255,255,255,0.5)', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90">
      <rect width="160" height="90" fill="#0a0a0a"/>
      <rect x="0" y="0" width="52" height="90" fill="#ff0000"/>
      <text x="26" y="50" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="24" font-family="sans-serif">▶</text>
      <text x="82" y="36" fill="#fff" font-size="11" font-family="sans-serif" font-weight="bold">КАНАЛ</text>
      <rect x="60" y="50" width="94" height="2" fill="#ff0000"/>
      <text x="82" y="63" fill="rgba(255,255,255,0.6)" font-size="6" font-family="sans-serif">Підписуйтесь 🔔</text>
      <text x="82" y="74" fill="rgba(255,255,255,0.4)" font-size="5.5" font-family="sans-serif">Новий відео щотижня</text>
    </svg>`),
  },
  {
    id: 'email',
    label: 'Email банер',
    category: 'Банери',
    width: 600, height: 220,
    background: '#ffffff',
    objects: [
      { type:'rect', left:0, top:0, width:600, height:220, fill:'#6c63ff', selectable:true, evented:true },
      { type:'rect', left:0, top:160, width:600, height:60, fill:'rgba(0,0,0,0.2)', selectable:true, evented:true },
      { type:'ellipse', left:400, top:-40, rx:180, ry:180, fill:'rgba(255,255,255,0.07)', selectable:true, evented:true },
      { type:'textbox', left:40, top:48, width:380, text:'Спеціальна пропозиція!', fontSize:36, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:40, top:100, width:380, text:'Знижка 30% на всі товари до кінця місяця', fontSize:18, fontFamily:'Inter', fill:'rgba(255,255,255,0.85)', selectable:true, evented:true },
      { type:'rect', left:440, top:68, width:130, height:44, fill:'#ffffff', rx:22, ry:22, selectable:true, evented:true },
      { type:'textbox', left:448, top:78, width:114, text:'Купити →', fontSize:16, fontFamily:'Inter', fontWeight:'bold', fill:'#6c63ff', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:40, top:172, width:520, text:'© 2025 Ваша Компанія  ·  Відписатись', fontSize:13, fontFamily:'Inter', fill:'rgba(255,255,255,0.5)', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 59">
      <rect width="160" height="59" fill="#6c63ff"/>
      <rect x="0" y="43" width="160" height="16" fill="rgba(0,0,0,0.2)"/>
      <circle cx="130" cy="10" r="30" fill="rgba(255,255,255,0.07)"/>
      <text x="14" y="22" fill="#fff" font-size="8.5" font-family="sans-serif" font-weight="bold">Спеціальна пропозиція!</text>
      <text x="14" y="33" fill="rgba(255,255,255,0.8)" font-size="6" font-family="sans-serif">Знижка 30% на всі товари</text>
      <rect x="118" y="15" width="34" height="14" fill="#fff" rx="7"/>
      <text x="135" y="25" text-anchor="middle" fill="#6c63ff" font-size="6" font-family="sans-serif" font-weight="bold">Купити</text>
    </svg>`),
  },
  {
    id: 'menu',
    label: 'Меню ресторану',
    category: 'Бізнес',
    width: 800, height: 1000,
    background: '#1c1c1c',
    objects: [
      { type:'rect', left:0, top:0, width:800, height:200, fill:'#2a1a0a', selectable:true, evented:true },
      { type:'textbox', left:60, top:60, width:680, text:'НАЗВА\nРЕСТОРАНУ', fontSize:56, fontFamily:'Inter', fontWeight:'bold', fill:'#d4a017', textAlign:'center', lineHeight:1.1, selectable:true, evented:true },
      { type:'rect', left:80, top:195, width:640, height:2, fill:'#d4a017', selectable:true, evented:true },
      { type:'textbox', left:80, top:230, width:640, text:'— ЗАКУСКИ —', fontSize:22, fontFamily:'Inter', fontWeight:'bold', fill:'#d4a017', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:270, width:500, text:'Брускети з томатами та базиліком', fontSize:18, fontFamily:'Inter', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:600, top:270, width:120, text:'120 грн', fontSize:18, fontFamily:'Inter', fill:'#d4a017', textAlign:'right', selectable:true, evented:true },
      { type:'textbox', left:80, top:305, width:500, text:'Карпаччо з лосося', fontSize:18, fontFamily:'Inter', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:600, top:305, width:120, text:'185 грн', fontSize:18, fontFamily:'Inter', fill:'#d4a017', textAlign:'right', selectable:true, evented:true },
      { type:'rect', left:80, top:345, width:640, height:1, fill:'rgba(212,160,23,0.3)', selectable:true, evented:true },
      { type:'textbox', left:80, top:365, width:640, text:'— ОСНОВНІ СТРАВИ —', fontSize:22, fontFamily:'Inter', fontWeight:'bold', fill:'#d4a017', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:405, width:500, text:'Стейк Рібай (300г)', fontSize:18, fontFamily:'Inter', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:600, top:405, width:120, text:'650 грн', fontSize:18, fontFamily:'Inter', fill:'#d4a017', textAlign:'right', selectable:true, evented:true },
      { type:'textbox', left:80, top:440, width:500, text:'Паста Карбонара', fontSize:18, fontFamily:'Inter', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:600, top:440, width:120, text:'220 грн', fontSize:18, fontFamily:'Inter', fill:'#d4a017', textAlign:'right', selectable:true, evented:true },
      { type:'textbox', left:80, top:475, width:500, text:'Лосось на грилі', fontSize:18, fontFamily:'Inter', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:600, top:475, width:120, text:'380 грн', fontSize:18, fontFamily:'Inter', fill:'#d4a017', textAlign:'right', selectable:true, evented:true },
      { type:'rect', left:80, top:520, width:640, height:1, fill:'rgba(212,160,23,0.3)', selectable:true, evented:true },
      { type:'textbox', left:80, top:540, width:640, text:'— ДЕСЕРТИ —', fontSize:22, fontFamily:'Inter', fontWeight:'bold', fill:'#d4a017', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:80, top:580, width:500, text:'Тірамісу класичний', fontSize:18, fontFamily:'Inter', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:600, top:580, width:120, text:'140 грн', fontSize:18, fontFamily:'Inter', fill:'#d4a017', textAlign:'right', selectable:true, evented:true },
      { type:'textbox', left:80, top:615, width:500, text:'Чізкейк Нью-Йорк', fontSize:18, fontFamily:'Inter', fill:'#ffffff', selectable:true, evented:true },
      { type:'textbox', left:600, top:615, width:120, text:'130 грн', fontSize:18, fontFamily:'Inter', fill:'#d4a017', textAlign:'right', selectable:true, evented:true },
      { type:'textbox', left:80, top:920, width:640, text:'Тел: +38 (050) 000-00-00  ·  вул. Прикладна 1', fontSize:16, fontFamily:'Inter', fill:'rgba(212,160,23,0.6)', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 112">
      <rect width="90" height="112" fill="#1c1c1c"/>
      <rect x="0" y="0" width="90" height="26" fill="#2a1a0a"/>
      <text x="45" y="12" text-anchor="middle" fill="#d4a017" font-size="7" font-family="sans-serif" font-weight="bold">НАЗВА</text>
      <text x="45" y="22" text-anchor="middle" fill="#d4a017" font-size="7" font-family="sans-serif" font-weight="bold">РЕСТОРАНУ</text>
      <line x1="10" y1="28" x2="80" y2="28" stroke="#d4a017" stroke-width="0.8"/>
      <text x="45" y="39" text-anchor="middle" fill="#d4a017" font-size="5.5" font-family="sans-serif">— ЗАКУСКИ —</text>
      <text x="12" y="50" fill="#fff" font-size="5" font-family="sans-serif">Брускети</text>
      <text x="78" y="50" text-anchor="end" fill="#d4a017" font-size="5" font-family="sans-serif">120 грн</text>
      <line x1="10" y1="58" x2="80" y2="58" stroke="rgba(212,160,23,0.3)" stroke-width="0.5"/>
      <text x="45" y="67" text-anchor="middle" fill="#d4a017" font-size="5.5" font-family="sans-serif">— ОСНОВНІ —</text>
      <text x="12" y="78" fill="#fff" font-size="5" font-family="sans-serif">Стейк Рібай</text>
      <text x="78" y="78" text-anchor="end" fill="#d4a017" font-size="5" font-family="sans-serif">650 грн</text>
    </svg>`),
  },
  {
    id: 'instagram-story',
    label: 'Instagram Story',
    category: 'Публікації',
    width: 750, height: 1334,
    background: '#833ab4',
    objects: [
      { type:'rect', left:0, top:0, width:750, height:1334, fill:'transparent',
        stroke:'transparent', selectable:false, evented:false },
      { type:'ellipse', left:-100, top:-100, rx:400, ry:400, fill:'rgba(253,29,29,0.3)', selectable:true, evented:true },
      { type:'ellipse', left:350, top:800, rx:350, ry:350, fill:'rgba(252,176,69,0.2)', selectable:true, evented:true },
      { type:'rect', left:40, top:560, width:670, height:220, fill:'rgba(0,0,0,0.35)', rx:20, ry:20, selectable:true, evented:true },
      { type:'textbox', left:60, top:575, width:630, text:'ВАША ІСТОРІЯ', fontSize:60, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:60, top:665, width:630, text:'Поділіться моментом з підписниками', fontSize:26, fontFamily:'Inter', fill:'rgba(255,255,255,0.85)', textAlign:'center', selectable:true, evented:true },
      { type:'rect', left:250, top:820, width:250, height:60, fill:'#ffffff', rx:30, ry:30, selectable:true, evented:true },
      { type:'textbox', left:262, top:832, width:226, text:'Дізнатись більше', fontSize:22, fontFamily:'Inter', fontWeight:'bold', fill:'#833ab4', textAlign:'center', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 133">
      <defs>
        <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#833ab4"/>
          <stop offset="50%" stop-color="#fd1d1d"/>
          <stop offset="100%" stop-color="#fcb045"/>
        </linearGradient>
      </defs>
      <rect width="75" height="133" fill="url(#ig)"/>
      <circle cx="10" cy="10" r="35" fill="rgba(253,29,29,0.25)"/>
      <circle cx="60" cy="100" r="30" fill="rgba(252,176,69,0.2)"/>
      <rect x="6" y="56" width="63" height="28" fill="rgba(0,0,0,0.35)" rx="5"/>
      <text x="37" y="70" text-anchor="middle" fill="#fff" font-size="8" font-family="sans-serif" font-weight="bold">ІСТОРІЯ</text>
      <text x="37" y="79" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="5" font-family="sans-serif">Ваш текст тут</text>
      <rect x="22" y="92" width="31" height="10" fill="#fff" rx="5"/>
      <text x="37" y="100" text-anchor="middle" fill="#833ab4" font-size="5" font-family="sans-serif" font-weight="bold">Детальніше</text>
    </svg>`),
  },
  {
    id: 'resume',
    label: 'Резюме',
    category: 'Документи',
    width: 800, height: 1000,
    background: '#ffffff',
    objects: [
      { type:'rect', left:0, top:0, width:260, height:1000, fill:'#2c3e50', selectable:true, evented:true },
      { type:'ellipse', left:55, top:60, rx:75, ry:75, fill:'#34495e', selectable:true, evented:true },
      { type:'textbox', left:10, top:175, width:240, text:'Ваше\nПовне Ім\'я', fontSize:28, fontFamily:'Inter', fontWeight:'bold', fill:'#ffffff', textAlign:'center', lineHeight:1.2, selectable:true, evented:true },
      { type:'textbox', left:10, top:250, width:240, text:'Посада / Спеціальність', fontSize:16, fontFamily:'Inter', fill:'rgba(255,255,255,0.6)', textAlign:'center', selectable:true, evented:true },
      { type:'rect', left:60, top:280, width:140, height:1, fill:'rgba(255,255,255,0.2)', selectable:true, evented:true },
      { type:'textbox', left:10, top:300, width:240, text:'КОНТАКТИ', fontSize:13, fontFamily:'Inter', fontWeight:'bold', fill:'rgba(255,255,255,0.5)', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:10, top:328, width:240, text:'📧 email@example.com\n📱 +38 (000) 000-00-00\n🌐 linkedin.com/in/name', fontSize:14, fontFamily:'Inter', fill:'rgba(255,255,255,0.75)', textAlign:'center', lineHeight:1.8, selectable:true, evented:true },
      { type:'textbox', left:10, top:460, width:240, text:'НАВИЧКИ', fontSize:13, fontFamily:'Inter', fontWeight:'bold', fill:'rgba(255,255,255,0.5)', textAlign:'center', selectable:true, evented:true },
      { type:'textbox', left:10, top:488, width:240, text:'● Навичка 1\n● Навичка 2\n● Навичка 3\n● Навичка 4', fontSize:14, fontFamily:'Inter', fill:'rgba(255,255,255,0.75)', textAlign:'left', padding:20, lineHeight:1.9, selectable:true, evented:true },
      { type:'textbox', left:300, top:50, width:460, text:'ПРО МЕНЕ', fontSize:14, fontFamily:'Inter', fontWeight:'bold', fill:'#2c3e50', selectable:true, evented:true },
      { type:'rect', left:300, top:72, width:460, height:1, fill:'#2c3e50', selectable:true, evented:true },
      { type:'textbox', left:300, top:84, width:460, text:'Короткий опис про себе, ваші досягнення та цілі. Розкажіть про свій досвід та що ви можете запропонувати роботодавцю.', fontSize:15, fontFamily:'Inter', fill:'#555', lineHeight:1.6, selectable:true, evented:true },
      { type:'textbox', left:300, top:190, width:460, text:'ДОСВІД РОБОТИ', fontSize:14, fontFamily:'Inter', fontWeight:'bold', fill:'#2c3e50', selectable:true, evented:true },
      { type:'rect', left:300, top:212, width:460, height:1, fill:'#2c3e50', selectable:true, evented:true },
      { type:'textbox', left:300, top:224, width:320, text:'Назва посади', fontSize:17, fontFamily:'Inter', fontWeight:'bold', fill:'#2c3e50', selectable:true, evented:true },
      { type:'textbox', left:620, top:224, width:140, text:'2022 – 2025', fontSize:14, fontFamily:'Inter', fill:'#888', textAlign:'right', selectable:true, evented:true },
      { type:'textbox', left:300, top:252, width:460, text:'Назва компанії · м. Київ', fontSize:15, fontFamily:'Inter', fill:'#6c63ff', selectable:true, evented:true },
      { type:'textbox', left:300, top:278, width:460, text:'Опис обов\'язків та досягнень на цій посаді. Використовуйте цифри та конкретні результати.', fontSize:14, fontFamily:'Inter', fill:'#666', lineHeight:1.6, selectable:true, evented:true },
      { type:'textbox', left:300, top:390, width:460, text:'ОСВІТА', fontSize:14, fontFamily:'Inter', fontWeight:'bold', fill:'#2c3e50', selectable:true, evented:true },
      { type:'rect', left:300, top:412, width:460, height:1, fill:'#2c3e50', selectable:true, evented:true },
      { type:'textbox', left:300, top:424, width:320, text:'Назва університету', fontSize:17, fontFamily:'Inter', fontWeight:'bold', fill:'#2c3e50', selectable:true, evented:true },
      { type:'textbox', left:620, top:424, width:140, text:'2018 – 2022', fontSize:14, fontFamily:'Inter', fill:'#888', textAlign:'right', selectable:true, evented:true },
      { type:'textbox', left:300, top:452, width:460, text:'Спеціальність · Ступінь бакалавра', fontSize:15, fontFamily:'Inter', fill:'#6c63ff', selectable:true, evented:true },
    ],
    thumb: enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 112">
      <rect width="90" height="112" fill="#fff"/>
      <rect x="0" y="0" width="28" height="112" fill="#2c3e50"/>
      <circle cx="14" cy="22" r="10" fill="#34495e"/>
      <text x="14" y="44" text-anchor="middle" fill="#fff" font-size="4.5" font-family="sans-serif" font-weight="bold">Ім'я</text>
      <text x="14" y="53" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="3.5" font-family="sans-serif">Посада</text>
      <text x="14" y="66" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="3" font-family="sans-serif">КОНТАКТИ</text>
      <text x="14" y="74" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="3" font-family="sans-serif">email</text>
      <text x="14" y="81" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="3" font-family="sans-serif">телефон</text>
      <text x="34" y="14" fill="#2c3e50" font-size="4" font-family="sans-serif" font-weight="bold">ПРО МЕНЕ</text>
      <line x1="33" y1="16" x2="87" y2="16" stroke="#2c3e50" stroke-width="0.6"/>
      <text x="34" y="26" fill="#666" font-size="3.5" font-family="sans-serif">Короткий опис досвіду</text>
      <text x="34" y="38" fill="#2c3e50" font-size="4" font-family="sans-serif" font-weight="bold">ДОСВІД</text>
      <line x1="33" y1="40" x2="87" y2="40" stroke="#2c3e50" stroke-width="0.6"/>
      <text x="34" y="50" fill="#2c3e50" font-size="3.5" font-family="sans-serif" font-weight="bold">Посада</text>
      <text x="34" y="58" fill="#6c63ff" font-size="3" font-family="sans-serif">Компанія</text>
      <text x="34" y="72" fill="#2c3e50" font-size="4" font-family="sans-serif" font-weight="bold">ОСВІТА</text>
      <line x1="33" y1="74" x2="87" y2="74" stroke="#2c3e50" stroke-width="0.6"/>
    </svg>`),
  },
];

import React, { useState } from 'react';

interface Props {
  onApply: (tpl: Template | any) => void;
  onApplyCustom: (w: number, h: number) => void;
  onClose: () => void;
  userTemplates?: any[];
  onSaveAsTemplate?: () => void;
  onDeleteUserTemplate?: (id: string) => void;
  savingTemplate?: boolean;
}

const BG     = '#16162a';
const BORDER = '#2d2d45';

const categories = Array.from(new Set(TEMPLATES.map(t => t.category)));

const PRESETS = [
  { label: 'HD (1920×1080)',   w: 1920, h: 1080 },
  { label: 'A4 (794×1123)',    w: 794,  h: 1123 },
  { label: 'Square (800×800)', w: 800,  h: 800 },
  { label: 'Story (1080×1920)',w: 1080, h: 1920 },
];

export default function TemplatesPanel({ onApply, onApplyCustom, onClose, userTemplates = [], onSaveAsTemplate, onDeleteUserTemplate, savingTemplate }: Props) {
  const [customW, setCustomW] = useState(800);
  const [customH, setCustomH] = useState(600);

  const numStyle: React.CSSProperties = {
    width: '100%', padding: '5px 8px', borderRadius: 6,
    border: `1px solid ${BORDER}`, fontSize: 12,
    background: '#1e1e30', color: '#ddd', outline: 'none',
  };

  return (
    <div style={{
      width: 272, background: BG, borderRight: `1px solid ${BORDER}`,
      display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 10,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 12px 6px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#ddd' }}>Шаблони</span>
        <button onClick={onClose} style={{
          background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 2px',
        }}>×</button>
      </div>

      <div style={{ overflowY: 'auto', flex: 1, padding: '8px 10px 16px' }}>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0 6px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              Мої шаблони
            </div>
            {onSaveAsTemplate && (
              <button
                onClick={onSaveAsTemplate}
                disabled={savingTemplate}
                title="Зберегти поточне полотно як шаблон"
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '3px 8px', borderRadius: 5, border: `1px solid ${BORDER}`,
                  background: 'var(--primary)', color: '#fff', fontSize: 10,
                  fontWeight: 600, cursor: 'pointer', opacity: savingTemplate ? 0.6 : 1,
                }}
              >
                {savingTemplate ? '…' : '+ Зберегти поточний'}
              </button>
            )}
          </div>

          {userTemplates.length === 0 ? (
            <div style={{ fontSize: 11, color: '#555', padding: '4px 0 8px', fontStyle: 'italic' }}>
              Немає збережених шаблонів
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
              {userTemplates.map((tpl: any) => (
                <div key={tpl.id} style={{ position: 'relative' }}>
                  <button
                    onClick={() => onApply(tpl)}
                    title={tpl.name}
                    style={{
                      width: '100%', background: '#1e1e30', border: `1.5px solid ${BORDER}`,
                      borderRadius: 8, padding: 0, cursor: 'pointer', overflow: 'hidden',
                      textAlign: 'left', transition: 'border-color .15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
                  >
                    {tpl.thumbnail ? (
                      <img src={tpl.thumbnail} alt={tpl.name} style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '4/3', background: '#2d2d45', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 20 }}>📋</span>
                      </div>
                    )}
                    <div style={{ padding: '4px 6px 6px', fontSize: 10, color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {tpl.name}
                    </div>
                  </button>
                  {onDeleteUserTemplate && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteUserTemplate(tpl.id); }}
                      title="Видалити шаблон"
                      style={{
                        position: 'absolute', top: 4, right: 4,
                        width: 18, height: 18, borderRadius: '50%',
                        background: 'rgba(220,50,50,0.85)', border: 'none',
                        color: '#fff', fontSize: 10, lineHeight: '18px', textAlign: 'center',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 0,
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '.06em', padding: '10px 0 6px' }}>
            Власний розмір
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: '#666', marginBottom: 3 }}>Ширина (px)</div>
              <input type="number" min={1} max={10000} value={customW}
                onChange={(e) => setCustomW(Math.max(1, parseInt(e.target.value) || 1))}
                style={numStyle} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#666', marginBottom: 3 }}>Висота (px)</div>
              <input type="number" min={1} max={10000} value={customH}
                onChange={(e) => setCustomH(Math.max(1, parseInt(e.target.value) || 1))}
                style={numStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => { setCustomW(p.w); setCustomH(p.h); }}
                style={{ fontSize: 9, padding: '3px 6px', borderRadius: 4, border: `1px solid ${BORDER}`, background: 'transparent', color: '#888', cursor: 'pointer' }}>
                {p.label}
              </button>
            ))}
          </div>
          <button onClick={() => onApplyCustom(customW, customH)} style={{
            width: '100%', padding: '7px 0', borderRadius: 7, border: 'none',
            background: 'var(--primary)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>
            Застосувати {customW}×{customH}
          </button>
        </div>

        {categories.map(cat => (
          <div key={cat}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '.06em', padding: '10px 0 6px' }}>
              {cat}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {TEMPLATES.filter(t => t.category === cat).map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => onApply(tpl)}
                  title={tpl.label}
                  style={{
                    background: '#1e1e30', border: `1.5px solid ${BORDER}`, borderRadius: 8,
                    padding: 0, cursor: 'pointer', overflow: 'hidden', textAlign: 'left',
                    transition: 'border-color .15s, transform .1s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                >
                  <img src={tpl.thumb} alt={tpl.label} style={{ width: '100%', display: 'block' }} />
                  <div style={{ padding: '4px 6px 6px', fontSize: 10, color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tpl.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
