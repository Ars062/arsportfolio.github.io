import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SkillTopology({ data }) {
  const { categories, nodes, links } = data;
  const canvasRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);
  const [offsets, setOffsets] = useState({});
  const [draggingId, setDraggingId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [activeCat, setActiveCat] = useState("all");
  const [selected, setSelected] = useState(null);
  const dragRef = useRef(null);
  const offsetsRef = useRef(offsets);
  offsetsRef.current = offsets;

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (size.w <= 0) return;
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, [size.w]);

  const nodeById = useMemo(() => {
    const m = {};
    nodes.forEach((n) => (m[n.id] = n));
    return m;
  }, [nodes]);

  const catColor = useMemo(() => {
    const m = {};
    categories.forEach((c) => (m[c.id] = c.color));
    return m;
  }, [categories]);

  const layout = useMemo(() => {
    const { w, h } = size;
    const pos = {};
    if (!w || !h) return pos;
    const cx = w / 2;
    const cy = h / 2;
    const radX = w * 0.34;
    const radY = h * 0.36;
    const C = categories.length;
    categories.forEach((cat, ci) => {
      const a = -Math.PI / 2 + (ci / C) * Math.PI * 2;
      const ccx = cx + Math.cos(a) * radX;
      const ccy = cy + Math.sin(a) * radY;
      const members = nodes.filter((n) => n.cat === cat.id);
      const count = members.length;
      const ring = count > 1 ? 30 + count * 8 : 0;
      members.forEach((n, ni) => {
        const th = count > 1 ? (ni / count) * Math.PI * 2 + ci * 0.7 : 0;
        pos[n.id] = {
          x: ccx + Math.cos(th) * ring,
          y: ccy + Math.sin(th) * ring * 0.82
        };
      });
    });
    return pos;
  }, [size, categories, nodes]);

  const connectedIds = useMemo(() => {
    if (!hoverId) return null;
    const set = new Set([hoverId]);
    links.forEach((l) => {
      if (l.source === hoverId) set.add(l.target);
      if (l.target === hoverId) set.add(l.source);
    });
    return set;
  }, [hoverId, links]);

  const isNodeDim = (node) => {
    if (hoverId && connectedIds && !connectedIds.has(node.id)) return true;
    if (activeCat !== "all" && node.cat !== activeCat) return true;
    return false;
  };

  const isNodeActive = (node) => {
    if (hoverId) return connectedIds && connectedIds.has(node.id);
    if (activeCat !== "all") return node.cat === activeCat;
    return false;
  };

  const point = (id) => {
    const home = layout[id] || { x: 0, y: 0 };
    const off = offsets[id] || { dx: 0, dy: 0 };
    return { x: home.x + off.dx, y: home.y + off.dy };
  };

  const handleDown = (e, id) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      /* noop */
    }
    dragRef.current = {
      id,
      x: e.clientX,
      y: e.clientY,
      base: offsetsRef.current[id] || { dx: 0, dy: 0 },
      moved: false
    };
    setDraggingId(id);
  };

  const handleMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    setOffsets((prev) => ({ ...prev, [d.id]: { dx: d.base.dx + dx, dy: d.base.dy + dy } }));
  };

  const handleUp = (e, id) => {
    const d = dragRef.current;
    dragRef.current = null;
    setDraggingId(null);
    if (d && !d.moved) {
      setSelected((prev) => (prev && prev.id === id ? null : nodeById[id]));
    }
  };

  const related = useMemo(() => {
    if (!selected) return [];
    const ids = new Set();
    links.forEach((l) => {
      if (l.source === selected.id) ids.add(l.target);
      if (l.target === selected.id) ids.add(l.source);
    });
    return [...ids].map((i) => nodeById[i]).filter(Boolean);
  }, [selected, links, nodeById]);

  const center = { x: size.w / 2, y: size.h / 2 };
  const baseDelay = mounted ? 0 : 0;

  return (
    <div className="topo">
      <div className="topo-head">
        <div>
          <h3 className="topo-title">Skill Topology</h3>
          <p className="topo-subtitle">
            Drag nodes to explore structural connections across architectures, pipelines and frameworks.
          </p>
        </div>
        <div className="topo-filters" role="tablist" aria-label="Skill categories">
          <button
            type="button"
            className={`topo-pill ${activeCat === "all" ? "is-active" : ""}`}
            onClick={() => setActiveCat("all")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`topo-pill ${activeCat === cat.id ? "is-active" : ""}`}
              style={{ "--c": cat.color }}
              onClick={() => setActiveCat((prev) => (prev === cat.id ? "all" : cat.id))}
            >
              <span className="topo-pill-dot" style={{ background: cat.color }} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="topo-canvas" ref={canvasRef}>
        <svg className="topo-links" width={size.w || 0} height={size.h || 0} aria-hidden="true">
          <defs>
            <filter id="topoGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {mounted &&
            links.map((l) => {
              const a = point(l.source);
              const b = point(l.target);
              const src = nodeById[l.source];
              const tgt = nodeById[l.target];
              if (!a || !b || !src || !tgt) return null;
              const hot = hoverId
                ? l.source === hoverId || l.target === hoverId
                : activeCat !== "all" && (src.cat === activeCat || tgt.cat === activeCat);
              const dim = hoverId
                ? !hot
                : activeCat !== "all"
                ? !hot
                : false;
              return (
                <line
                  key={`${l.source}-${l.target}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={hot ? catColor[src.cat] : "#64748b"}
                  strokeWidth={hot ? 1.6 : 1}
                  opacity={dim ? 0.06 : hot ? 0.75 : 0.2}
                  filter={hot ? "url(#topoGlow)" : undefined}
                  style={{ transition: "opacity .25s ease, stroke .25s ease" }}
                />
              );
            })}
        </svg>

        {size.w > 0 &&
          nodes.map((node, i) => {
            const home = layout[node.id] || { x: center.x, y: center.y };
            const off = offsets[node.id] || { dx: 0, dy: 0 };
            const x = mounted ? home.x + off.dx : center.x;
            const y = mounted ? home.y + off.dy : center.y;
            const dim = isNodeDim(node);
            const active = isNodeActive(node);
            const dot = 12 + (node.val || 2) * 3;
            const isDragging = draggingId === node.id;
            return (
              <div
                className="topo-node"
                key={node.id}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0)`,
                  transition: isDragging
                    ? "none"
                    : `transform ${mounted ? 0.85 : 0}s cubic-bezier(0.16,1,0.3,1)`,
                  transitionDelay: isDragging ? "0s" : `${i * 0.022 + baseDelay}s`,
                  zIndex: (selected && selected.id === node.id) || active ? 4 : isDragging ? 5 : 1
                }}
              >
                <motion.button
                  type="button"
                  className={`topo-dot ${isDragging ? "is-dragging" : ""}`}
                  aria-label={node.name}
                  style={{
                    "--c": catColor[node.cat],
                    width: dot,
                    height: dot,
                    marginLeft: -dot / 2,
                    marginTop: -dot / 2
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: dim ? 0.22 : 1, scale: active ? 1.22 : 1 }}
                  transition={{ delay: i * 0.022, type: "spring", stiffness: 250, damping: 25 }}
                  onPointerDown={(e) => handleDown(e, node.id)}
                  onPointerMove={handleMove}
                  onPointerUp={(e) => handleUp(e, node.id)}
                  onPointerCancel={() => {
                    dragRef.current = null;
                    setDraggingId(null);
                  }}
                  onPointerEnter={() => setHoverId(node.id)}
                  onPointerLeave={() => setHoverId((prev) => (prev === node.id ? null : prev))}
                />
                <span
                  className="topo-label"
                  style={{ "--c": catColor[node.cat], opacity: dim ? 0.18 : active || !hoverId ? 0.85 : 0.4 }}
                >
                  {node.name}
                </span>
              </div>
            );
          })}

        <AnimatePresence>
          {selected && (
            <motion.aside
              className="topo-panel"
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
            >
              <button type="button" className="topo-panel-close" onClick={() => setSelected(null)} aria-label="Close">
                <ion-icon name="close-outline"></ion-icon>
              </button>
              <span className="topo-panel-cat" style={{ "--c": catColor[selected.cat] }}>
                {categories.find((c) => c.id === selected.cat)?.label}
              </span>
              <h4>{selected.name}</h4>
              <p>{selected.description}</p>
              {related.length > 0 && (
                <>
                  <div className="topo-panel-label">Connected to</div>
                  <div className="topo-panel-chips">
                    {related.map((r) => (
                      <button
                        type="button"
                        key={r.id}
                        className="topo-panel-chip"
                        style={{ "--c": catColor[r.cat] }}
                        onClick={() => setSelected(r)}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <p className="topo-hint">Click a node for detail · drag to rearrange · filter by category</p>
    </div>
  );
}
