import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const FRAME_COUNT = 180;
const phases = [
  { end: 0.22, label: 'O começo', sub: 'Toda construção parte de uma boa ideia.' },
  { end: 0.65, label: 'Estrutura', sub: 'A ideia começa a encontrar sua forma.' },
  { end: 0.84, label: 'Evolução', sub: 'Do planejamento aos novos horizontes.' },
  { end: 1.01, label: 'Concretização', sub: 'A transformação ganha espaço na cidade.' },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const frameName = (index) => `frame_${String(index + 1).padStart(4, '0')}.webp`;

function canvasCover(ctx, img, width, height, isMobile) {
  const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
  const drawW = img.naturalWidth * scale;
  const drawH = img.naturalHeight * scale;
  const focalX = isMobile ? 0.52 : 0.50;
  let x = width / 2 - drawW * focalX;
  const y = (height - drawH) / 2;
  x = Math.min(0, Math.max(width - drawW, x));
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, x, y, drawW, drawH);
}

export default function ScrollConstruction() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 680);
  const [progressPercent, setProgressPercent] = useState(0);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    const update = () => setMobile(window.innerWidth <= 680);
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    let disposed = false;
    let raf = 0;
    let prefetchTimer = 0;
    let inflight = 0;
    let lastRendered = -1;
    let wanted = 0;
    const maxCache = mobile ? 24 : 45;
    const maxParallel = mobile ? 3 : 5;
    const cache = new Map();
    const pending = new Set();
    const queue = [];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const storagePath = `/frames/${mobile ? 'mobile' : 'desktop'}/`;

    function render(index) {
      if (!canvas || !ctx) return;
      let key = index;
      if (!cache.has(key)) {
        let distance = FRAME_COUNT;
        for (const stored of cache.keys()) {
          if (Math.abs(stored - index) < distance) {
            key = stored;
            distance = Math.abs(stored - index);
          }
        }
      }
      const frame = cache.get(key);
      if (!frame) return;
      if (key === lastRendered && canvas.width) return;
      const { width, height } = canvas;
      if (!width || !height) return;
      canvasCover(ctx, frame, width, height, mobile);
      lastRendered = key;
    }

    function processQueue() {
      if (disposed) return;
      while (inflight < maxParallel && queue.length) {
        const index = queue.shift();
        if (cache.has(index)) { pending.delete(index); continue; }
        inflight += 1;
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          inflight -= 1;
          pending.delete(index);
          if (disposed) return;
          // LRU: keep the first frame as a persistent fallback.
          if (cache.has(index)) cache.delete(index);
          cache.set(index, img);
          while (cache.size > maxCache) {
            const oldest = cache.keys().next().value;
            if (oldest === 0 && cache.size > 1) {
              cache.delete(oldest);
              cache.set(0, imgForFirstFrame);
              continue;
            }
            cache.delete(oldest);
          }
          if (index === 0) { imgForFirstFrame = img; setImageReady(true); }
          if (index === wanted || lastRendered !== wanted) render(wanted);
          processQueue();
        };
        img.onerror = () => {
          inflight -= 1;
          pending.delete(index);
          if (!disposed) processQueue();
        };
        img.src = `${storagePath}${frameName(index)}`;
      }
    }

    let imgForFirstFrame = null;
    function requestFrame(index, urgent = false) {
      index = clamp(index, 0, FRAME_COUNT - 1);
      if (cache.has(index) || pending.has(index)) return;
      pending.add(index);
      if (urgent) queue.unshift(index);
      else queue.push(index);
      processQueue();
    }

    function updateFrame() {
      raf = 0;
      if (disposed || !hostRef.current) return;
      const rect = hostRef.current.getBoundingClientRect();
      const length = Math.max(1, rect.height - window.innerHeight);
      const ratio = clamp(-rect.top / length, 0, 1);
      const index = Math.round(ratio * (FRAME_COUNT - 1));
      const direction = index >= wanted ? 1 : -1;
      wanted = index;
      setProgressPercent((old) => {
        const next = Math.round(ratio * 100);
        return old === next ? old : next;
      });
      requestFrame(index, true);
      if (mobile) {
        // Prefetch in the direction of travel; going up also reverses the sequence.
        for (let step = 1; step <= 5; step++) requestFrame(index + direction * step * 2);
        requestFrame(index - direction * 2);
        if (queue.length > 48) {
          const obsolete = queue.splice(32);
          obsolete.forEach((entry) => pending.delete(entry));
        }
      } else if (Math.abs(index - lastRendered) <= 7) {
        requestFrame(index + 2);
        requestFrame(index - 2);
      }
      render(index);
    }
    function schedule() { if (!raf) raf = window.requestAnimationFrame(updateFrame); }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        lastRendered = -1;
      }
      schedule();
    }

    setImageReady(false);
    requestFrame(0, true);
    requestFrame(1);
    requestFrame(2);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    resize();
    schedule();

    // Load only useful frames on phones; prepare the full sequence gradually on desktop.
    if (!mobile && !navigator.connection?.saveData) {
      let cursor = 3;
      const warm = () => {
        if (disposed) return;
        if (cursor < FRAME_COUNT) {
          if (queue.length < 10) requestFrame(cursor++);
          prefetchTimer = window.setTimeout(warm, 85);
        }
      };
      prefetchTimer = window.setTimeout(warm, 750);
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(prefetchTimer);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      cache.clear();
      queue.length = 0;
    };
  }, [mobile]);

  const phase = phases.find((item) => progressPercent / 100 < item.end) || phases[3];

  return (
    <section id="inicio" className="building-scroll" ref={hostRef} aria-label="Animação arquitetônica do prédio sendo construído conforme a rolagem">
      <div className="building-sticky">
        <div className="building-media" style={{backgroundImage: `url('/frames/${mobile ? 'mobile' : 'desktop'}/frame_0001.webp')`}} aria-hidden="true">
          <canvas className={`building-canvas ${imageReady ? 'ready' : ''}`} ref={canvasRef} />
        </div>
        <div className="building-tint" aria-hidden="true" />
        <div className="building-content container">
          <div className="hero-eyebrow"><i /> CS EMPREENDIMENTOS <span>•</span> SANTARÉM, PA</div>
          <h1>O futuro<br />começa com<br /><em>uma boa base.</em></h1>
          <p>Construção, engenharia e incorporação imobiliária. Soluções para transformar ideias em possibilidades reais.</p>
          <div className="hero-buttons">
            <a href="#orcamento" className="btn btn-primary">Quero falar sobre meu projeto <ArrowUpRight size={18}/></a>
            <a href="#solucoes" className="hero-secondary">Conheça nossas soluções <ArrowUpRight size={16}/></a>
          </div>
        </div>
        <div className="hero-bottom container">
          <div className="hero-stage">
            <span className="hero-stage-tag">UMA IDEIA, VÁRIAS ETAPAS</span>
            <div className="stage-row"><strong>{phase.label}</strong><span>{String(progressPercent).padStart(2,'0')}%</span></div>
            <div className="hero-progress"><i style={{width: `${progressPercent}%`}}/></div>
          </div>
          <div className="hero-scroll-note"><span>ROLE PARA VER A TRANSFORMAÇÃO</span><ArrowDown size={18}/></div>
        </div>
        <div className="hero-animation-note">Animação ilustrativa • Não representa obra da empresa</div>
      </div>
    </section>
  );
}
