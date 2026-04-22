import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/authStore';
import { Design, Template } from '../types';
import api from '../api/client';

const CANVAS_SIZES = [
  { label: 'Instagram Post',    width: 1080, height: 1080 },
  { label: 'Instagram Story',   width: 1080, height: 1920 },
  { label: 'Facebook Cover',    width: 851,  height: 315  },
  { label: 'Twitter Banner',    width: 1500, height: 500  },
  { label: 'YouTube Thumbnail', width: 1280, height: 720  },
  { label: 'Business Card',     width: 1050, height: 600  },
  { label: 'A4 Poster',         width: 794,  height: 1123 },
  { label: 'Custom',            width: 800,  height: 600  },
];

type MainTab = 'designs' | 'templates';
type TplTab  = 'system' | 'mine';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [designs,      setDesigns]      = useState<Design[]>([]);
  const [shareDesignId, setShareDesignId] = useState<string | null>(null);
  const [templates,    setTemplates]    = useState<Template[]>([]);
  const [myTemplates,  setMyTemplates]  = useState<Template[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle,     setNewTitle]     = useState('Untitled Design');
  const [selectedSize, setSelectedSize] = useState(CANVAS_SIZES[0]);
  const [activeTab,    setActiveTab]    = useState<MainTab>('designs');
  const [tplTab,       setTplTab]       = useState<TplTab>('system');

  useEffect(() => {
    Promise.all([
      api.get('/designs').then(r => setDesigns(r.data)),
      api.get('/templates').then(r => {
        const all: Template[] = r.data;
        setTemplates(all.filter(t => !t.userId));
      }),
      api.get('/templates/mine').then(r => setMyTemplates(r.data)),
    ]).finally(() => setLoading(false));
  }, []);

  const createDesign = async () => {
    const { data } = await api.post('/designs', {
      title: newTitle,
      width: selectedSize.width,
      height: selectedSize.height,
      canvasData: { version: '5.3.0', objects: [], background: '#ffffff' },
    });
    navigate(`/editor/${data.id}`);
  };

  const createFromTemplate = async (tpl: Template) => {
    const { data } = await api.post('/designs', {
      title: tpl.name,
      width: tpl.width,
      height: tpl.height,
      canvasData: tpl.canvasData,
    });
    navigate(`/editor/${data.id}`);
  };

  const deleteDesign = async (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!confirm('Видалити цей дизайн?')) return;
    await api.delete(`/designs/${id}`);
    setDesigns(prev => prev.filter(d => d.id !== id));
  };

  const deleteMyTemplate = async (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!confirm('Видалити цей шаблон?')) return;
    await api.delete(`/templates/${id}`);
    setMyTemplates(prev => prev.filter(t => t.id !== id));
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' });

  const copyShareLink = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const url = `${window.location.origin}/share/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareDesignId(id);
      setTimeout(() => setShareDesignId(null), 2000);
    });
  };

  const tabBtn = (label: string, active: boolean, onClick: () => void) => (
    <button onClick={onClick} style={{
      padding: '7px 20px', borderRadius: 6, border: 'none', fontSize: 14, fontWeight: 500,
      background: active ? 'var(--primary)' : 'transparent',
      color: active ? '#fff' : 'var(--text-muted)',
      transition: 'var(--transition)', cursor: 'pointer',
    }}>{label}</button>
  );

  const ThumbCard = ({ children, onClick, onDelete, onShare, shareId, title, sub }: {
    children: React.ReactNode; onClick?: () => void;
    onDelete?: (e: React.MouseEvent) => void;
    onShare?: (e: React.MouseEvent) => void;
    shareId?: string;
    title: string; sub: string;
  }) => (
    <div className="card" style={{ overflow: 'hidden', transition: 'var(--transition)', cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('.hover-btn').forEach(b => b.style.opacity = '1');
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('.hover-btn').forEach(b => b.style.opacity = '0');
      }}>
      <div style={{ height: 160, position: 'relative', overflow: 'hidden' }}>
        {children}
        <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
          {onShare && (
            <button className="hover-btn" onClick={onShare} title={shareId && shareDesignId === shareId ? 'Скопійовано!' : 'Скопіювати посилання'} style={{
              background: 'rgba(0,0,0,0.55)', color: shareId && shareDesignId === shareId ? '#4ade80' : '#fff',
              border: 'none', borderRadius: 6, padding: '4px 9px', fontSize: 12, cursor: 'pointer',
              opacity: 0, transition: 'opacity 0.2s',
            }}>
              {shareId && shareDesignId === shareId ? '✓' : '⬡'}
            </button>
          )}
          {onDelete && (
            <button className="hover-btn" onClick={onDelete} style={{
              background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none',
              borderRadius: 6, padding: '4px 9px', fontSize: 12, cursor: 'pointer',
              opacity: 0, transition: 'opacity 0.2s',
            }}>✕</button>
          )}
        </div>
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <Navbar />
      <div className="container" style={{ padding: '32px 24px', flex: 1 }}>

        <div style={{ position: 'relative', background: 'linear-gradient(120deg, #1a1a2e 0%, #2d2d6e 60%, #6c63ff 100%)', borderRadius: 16, padding: '32px 36px', marginBottom: 36, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <svg style={{ position: 'absolute', right: -40, top: -40, opacity: 0.12 }} width="220" height="220" viewBox="0 0 220 220"><circle cx="110" cy="110" r="110" fill="#fff"/></svg>
          <svg style={{ position: 'absolute', left: '40%', bottom: -30, opacity: 0.08 }} width="140" height="140" viewBox="0 0 140 140"><polygon points="70,5 135,135 5,135" fill="#a855f7"/></svg>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: 26, marginBottom: 4, color: '#fff', fontFamily: 'Playfair Display, serif' }}>Вітаємо, {user?.name?.split(' ')[0]}!</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>Що ви створите сьогодні?</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowNewModal(true)} style={{ position: 'relative', zIndex: 1, background: '#fff', color: '#6c63ff', fontWeight: 700, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            + Новий дизайн
          </button>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--surface)', borderRadius: 'var(--radius-sm)', padding: 4, border: '1px solid var(--border)', width: 'fit-content' }}>
          {tabBtn(`Мої дизайни (${designs.length})`, activeTab === 'designs', () => setActiveTab('designs'))}
          {tabBtn(`Шаблони (${templates.length + myTemplates.length})`, activeTab === 'templates', () => setActiveTab('templates'))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
            <span className="spinner" style={{ width: 40, height: 40, borderWidth: 3 }} />
          </div>
        ) : activeTab === 'designs' ? (
          designs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ marginBottom: 20 }}>
                <rect width="72" height="72" rx="18" fill="#ede9ff"/>
                <rect x="14" y="22" width="44" height="30" rx="4" fill="#6c63ff" opacity=".2"/>
                <rect x="20" y="28" width="20" height="3" rx="2" fill="#6c63ff"/>
                <rect x="20" y="35" width="32" height="3" rx="2" fill="#6c63ff" opacity=".6"/>
                <rect x="20" y="42" width="26" height="3" rx="2" fill="#6c63ff" opacity=".4"/>
                <circle cx="52" cy="20" r="8" fill="#a855f7"/>
                <line x1="49" y1="20" x2="55" y2="20" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="52" y1="17" x2="52" y2="23" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h2 style={{ marginBottom: 8 }}>Ще немає дизайнів</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Створіть свій перший шедевр!</p>
              <button className="btn btn-primary btn-lg" onClick={() => setShowNewModal(true)}>Створити дизайн</button>
            </div>
          ) : (
            <div className="grid-4">
              {designs.map(d => (
                <Link key={d.id} to={`/editor/${d.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <ThumbCard
                    title={d.title}
                    sub={`${d.width}×${d.height} · ${formatDate(d.updatedAt)}`}
                    onDelete={e => deleteDesign(d.id, e)}
                    onShare={d.isPublic ? e => copyShareLink(d.id, e) : undefined}
                    shareId={d.id}
                  >
                    {d.thumbnail ? (
                      <img src={d.thumbnail} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}
                        onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div style={{ height: '100%', background: 'linear-gradient(135deg, var(--primary-light), #fde7f0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 6 }}>
                            <rect width="40" height="40" rx="8" fill="rgba(108,99,255,0.15)"/>
                            <rect x="6" y="10" width="28" height="20" rx="3" fill="none" stroke="#6c63ff" strokeWidth="1.5"/>
                            <circle cx="13" cy="16" r="2" fill="#6c63ff"/>
                            <polyline points="6 26 15 18 22 24 27 20 34 26" fill="none" stroke="#6c63ff" strokeWidth="1.5"/>
                          </svg>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.width}×{d.height}</div>
                        </div>
                      </div>
                    )}
                  </ThumbCard>
                </Link>
              ))}
            </div>
          )
        ) : (
          <>
            <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--surface)', borderRadius: 'var(--radius-sm)', padding: 4, border: '1px solid var(--border)', width: 'fit-content' }}>
              {tabBtn(`Системні (${templates.length})`, tplTab === 'system', () => setTplTab('system'))}
              {tabBtn(`Мої шаблони (${myTemplates.length})`, tplTab === 'mine', () => setTplTab('mine'))}
            </div>

            {tplTab === 'system' ? (
              <div className="grid-4">
                {templates.map(t => (
                  <ThumbCard key={t.id} title={t.name} sub={`${t.width}×${t.height} · ${t.category}`} onClick={() => createFromTemplate(t)}>
                    <div style={{
                      height: '100%',
                      background: `linear-gradient(135deg, ${(t.canvasData as any).background || '#6c63ff'} 0%, #a855f7 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect x="4" y="4" width="32" height="32" rx="6" fill="rgba(255,255,255,0.2)"/>
                        <rect x="10" y="10" width="20" height="3" rx="1.5" fill="#fff" opacity=".8"/>
                        <rect x="10" y="17" width="14" height="2" rx="1" fill="#fff" opacity=".5"/>
                        <rect x="10" y="23" width="18" height="2" rx="1" fill="#fff" opacity=".5"/>
                        <rect x="10" y="29" width="10" height="2" rx="1" fill="#fff" opacity=".4"/>
                      </svg>
                    </div>
                  </ThumbCard>
                ))}
              </div>
            ) : myTemplates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ marginBottom: 20 }}>
                  <rect width="72" height="72" rx="18" fill="#f5f0ff"/>
                  <rect x="16" y="14" width="40" height="44" rx="5" fill="none" stroke="#a855f7" strokeWidth="2"/>
                  <rect x="22" y="24" width="28" height="3" rx="1.5" fill="#a855f7" opacity=".5"/>
                  <rect x="22" y="32" width="20" height="3" rx="1.5" fill="#a855f7" opacity=".4"/>
                  <rect x="22" y="40" width="24" height="3" rx="1.5" fill="#a855f7" opacity=".3"/>
                  <circle cx="52" cy="52" r="10" fill="#6c63ff"/>
                  <line x1="49" y1="52" x2="55" y2="52" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="52" y1="49" x2="52" y2="55" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h2 style={{ marginBottom: 8 }}>Немає збережених шаблонів</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
                  У редакторі натисніть кнопку <strong>Шаблони → Зберегти поточний</strong>
                </p>
              </div>
            ) : (
              <div className="grid-4">
                {myTemplates.map(t => (
                  <ThumbCard
                    key={t.id}
                    title={t.name}
                    sub={`${t.width}×${t.height} · ${t.createdAt ? formatDate(t.createdAt) : ''}`}
                    onClick={() => createFromTemplate(t)}
                    onDelete={e => deleteMyTemplate(t.id, e)}
                  >
                    {t.thumbnail ? (
                      <img src={t.thumbnail} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}
                        onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div style={{
                        height: '100%',
                        background: `linear-gradient(135deg, ${(t.canvasData as any).background || '#6c63ff'} 0%, #a855f7 100%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <rect x="4" y="4" width="32" height="32" rx="6" fill="rgba(255,255,255,0.2)"/>
                          <rect x="10" y="10" width="20" height="3" rx="1.5" fill="#fff" opacity=".8"/>
                          <rect x="10" y="17" width="14" height="2" rx="1" fill="#fff" opacity=".5"/>
                          <rect x="10" y="23" width="18" height="2" rx="1" fill="#fff" opacity=".5"/>
                        </svg>
                      </div>
                    )}
                  </ThumbCard>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showNewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }}
          onClick={() => setShowNewModal(false)}>
          <div className="card fade-in" style={{ width: '100%', maxWidth: 480, padding: 32 }} onClick={e => e.stopPropagation()}>
            <h2 style={{ marginBottom: 20 }}>Новий дизайн</h2>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Назва</label>
              <input className="input" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label className="label">Розмір полотна</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {CANVAS_SIZES.map(s => (
                  <button key={s.label} onClick={() => setSelectedSize(s)} style={{
                    padding: '10px 12px', borderRadius: 8, border: '1.5px solid',
                    borderColor: selectedSize.label === s.label ? 'var(--primary)' : 'var(--border)',
                    background: selectedSize.label === s.label ? 'var(--primary-light)' : 'transparent',
                    color: selectedSize.label === s.label ? 'var(--primary)' : 'var(--text)',
                    textAlign: 'left', fontSize: 13, cursor: 'pointer',
                  }}>
                    <div style={{ fontWeight: 500 }}>{s.label}</div>
                    {s.label !== 'Custom' && <div style={{ fontSize: 11, opacity: 0.7 }}>{s.width}×{s.height}</div>}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowNewModal(false)}>Скасувати</button>
              <button className="btn btn-primary" onClick={createDesign}>Створити</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
