import { fabric } from 'fabric';

interface LayersPanelProps {
  canvas: fabric.Canvas | null;
  objects: fabric.Object[];
  selectedObject: fabric.Object | null;
  onSelect: (obj: fabric.Object) => void;
  onRefresh: () => void;
}

function getObjectLabel(obj: fabric.Object): string {
  if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
    const text = (obj as fabric.Textbox).text || '';
    return text.length > 20 ? text.slice(0, 20) + '…' : text || 'Text';
  }
  if (obj.type === 'image') return 'Image';
  if (obj.type === 'rect') return 'Rectangle';
  if (obj.type === 'circle') return 'Circle';
  if (obj.type === 'triangle') return 'Triangle';
  if (obj.type === 'path') return 'Path';
  return obj.type || 'Object';
}

function getObjectIcon(type: string | undefined): string {
  if (type === 'textbox' || type === 'i-text' || type === 'text') return 'T';
  if (type === 'image') return '🖼';
  if (type === 'rect') return '▭';
  if (type === 'circle') return '○';
  if (type === 'triangle') return '△';
  return '◈';
}

export default function LayersPanel({ canvas, objects, selectedObject, onSelect, onRefresh }: LayersPanelProps) {
  const reversed = [...objects].reverse();

  const toggleVisibility = (obj: fabric.Object, e: React.MouseEvent) => {
    e.stopPropagation();
    obj.set('visible', !obj.visible);
    canvas?.renderAll();
    onRefresh();
  };

  const toggleLock = (obj: fabric.Object, e: React.MouseEvent) => {
    e.stopPropagation();
    const locked = (obj as any)._locked;
    obj.set({
      selectable: locked,
      evented: locked,
    });
    (obj as any)._locked = !locked;
    canvas?.renderAll();
    onRefresh();
  };

  return (
    <div style={{ width: 200, background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', fontSize: 13, fontWeight: 600 }}>
        Layers ({objects.length})
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {reversed.length === 0 && (
          <div style={{ padding: 16, color: 'var(--text-muted)', fontSize: 13, textAlign: 'center' }}>
            No layers yet.<br />Add shapes or text.
          </div>
        )}
        {reversed.map((obj, i) => {
          const isSelected = obj === selectedObject;
          const isLocked = (obj as any)._locked;
          const isHidden = !obj.visible;
          return (
            <div key={i} onClick={() => { if (!isLocked) { canvas?.setActiveObject(obj); canvas?.renderAll(); onSelect(obj); } }} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
              background: isSelected ? 'var(--primary-light)' : 'transparent',
              cursor: isLocked ? 'default' : 'pointer',
              borderBottom: '1px solid var(--border)',
              opacity: isHidden ? 0.4 : 1,
              transition: 'background 0.15s',
            }}>
              <span style={{ fontSize: 14, flexShrink: 0, color: isSelected ? 'var(--primary)' : 'var(--text-muted)' }}>{getObjectIcon(obj.type)}</span>
              <span style={{ flex: 1, fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: isSelected ? 'var(--primary)' : 'var(--text)' }}>
                {getObjectLabel(obj)}
              </span>
              <button onClick={(e) => toggleVisibility(obj, e)} title={isHidden ? 'Show' : 'Hide'} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, opacity: 0.6, padding: 2 }}>
                {isHidden ? '🙈' : '👁'}
              </button>
              <button onClick={(e) => toggleLock(obj, e)} title={isLocked ? 'Unlock' : 'Lock'} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, opacity: 0.6, padding: 2 }}>
                {isLocked ? '🔒' : '🔓'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
