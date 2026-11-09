import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, ArrowRight, Check, ChevronDown, Compass, MapPin, Menu,
  Phone, Instagram, Layers3, Ruler, MessageCircle, X, Building2,
  MoveUpRight, ShieldCheck, Send, ArrowDown, HousePlus, HardHat,
} from 'lucide-react';
import ScrollBuilding from './components/ScrollBuilding.jsx';
import { business, whatsappUrl } from './config.js';
import { services, gallery, steps } from './data/content.js';

const nav = [
  { label: 'Início', href: '#inicio' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Inspirações', href: '#inspiracoes' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Como funciona', href: '#processo' },
];

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#inicio" aria-label="CS Empreendimentos — início">
    <img src="/assets/cs-emblema.png" alt="" width="42" height="62" />
    <span className="brand-type"><strong>CS</strong><small>EMPREENDIMENTOS</small></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.classList.toggle('nav-open', open);
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('nav-open'); };
  }, [open]);
  return <header className={`header ${scrolled ? 'scrolled' : ''}`}>
    <div className="container header-inner">
      <div onClick={() => setOpen(false)}><Brand /></div>
      <nav className={`nav ${open ? 'open' : ''}`} id="primary-nav" aria-label="Menu principal">
        {nav.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a className="mobile-nav-cta" href="#orcamento" onClick={() => setOpen(false)}>Solicitar orçamento <ArrowUpRight size={17}/></a>
      </nav>
      <a href="#orcamento" className="header-cta">Solicitar orçamento <ArrowUpRight size={16}/></a>
      <button type="button" className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="primary-nav">
        {open ? <X size={25}/> : <Menu size={25}/>}
      </button>
    </div>
  </header>;
}

function Eyebrow({ number, children, light = false }) {
  return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span>{number}</span><i />{children}</div>;
}

function ImageWithFallback({ src, alt, className = '', loading = 'lazy' }) {
  const [error, setError] = useState(false);
  return <div className={`image-frame ${className}`}>
    {error ? <div className="image-fallback" role="img" aria-label={alt}><Building2 size={46} strokeWidth={1}/><span>ARQUITETURA • CS</span></div> : <img src={src} alt={alt} loading={loading} onError={() => setError(true)}/>}
  </div>;
}

function Intro() {
  return <div className="intro-ribbon">
    <div className="container ribbon-inner">
      <div className="ribbon-text"><span>ONDE TUDO COMEÇA</span><p>Seu próximo projeto merece <em>ser bem pensado.</em></p></div>
      <div className="ribbon-items"><span><Layers3 size={21}/> Incorporação</span><span><Ruler size={21}/> Engenharia</span><span><ShieldCheck size={21}/> Construção</span></div>
    </div>
  </div>;
}

function Solutions() {
  return <section className="solutions section-pad" id="solucoes">
    <div className="container">
      <div className="section-heading" data-reveal>
        <div><Eyebrow number="01">O QUE FAZEMOS</Eyebrow><h2>Da visão ao projeto.<br/><em>Do projeto à realidade.</em></h2></div>
        <p>Uma boa construção une decisões técnicas, planejamento e um olhar atento para as pessoas que vão ocupar cada espaço.</p>
      </div>
      <div className="solutions-grid">
        {services.map((s, i) => <article key={s.no} className={`solution-card solution-${i+1}`} data-reveal>
          <ImageWithFallback src={s.image} alt={s.alt}/>
          <div className="solution-content"><span className="solution-index">{s.no} / 03</span><div><span className="solution-category">{s.category}</span><h3>{s.title}</h3><p>{s.desc}</p></div><a href="#orcamento" className="solution-link" aria-label={`Conversar sobre ${s.category}`}><ArrowUpRight size={22}/></a></div>
        </article>)}
      </div>
      <div className="solutions-footer"><p>Tem algo diferente em mente? <strong>Conte pra gente o que você imagina.</strong></p><a href="#orcamento" className="link-arrow">Vamos conversar sobre seu projeto <ArrowUpRight size={18}/></a></div>
    </div>
  </section>;
}

function About() {
  return <section id="sobre" className="about section-pad">
    <div className="container about-grid">
      <div className="about-image" data-reveal>
        <ImageWithFallback src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85" alt="Ambiente arquitetônico contemporâneo com materiais naturais e luz suave" />
        <div className="about-image-label"><span>CONSTRUÇÃO CIVIL</span><strong>Planejar.<br/>Construir.<br/>Evoluir.</strong></div>
      </div>
      <div className="about-copy" data-reveal>
        <Eyebrow number="02">SOBRE A CS</Eyebrow>
        <h2>Mais que estruturas. <em>Projetos com propósito.</em></h2>
        <p>A CS Empreendimentos está sediada em Santarém, no Pará, e atua no setor de construção civil e incorporação imobiliária.</p>
        <p>Acreditamos que o ponto de partida de qualquer empreendimento é entender a necessidade de quem está do outro lado. Por isso, valorizamos uma conversa clara antes de definir os próximos passos.</p>
        <div className="about-points">
          <div><span>01</span> Uma visão para cada necessidade</div>
          <div><span>02</span> Planejamento antes da execução</div>
          <div><span>03</span> Atenção ao que realmente importa</div>
        </div>
        <a href="#orcamento" className="btn btn-outline">Apresente sua ideia <ArrowUpRight size={18}/></a>
      </div>
    </div>
  </section>;
}

function Gallery() {
  return <section id="inspiracoes" className="gallery section-pad">
    <div className="container">
      <div className="section-heading gallery-head" data-reveal>
        <div><Eyebrow number="03">OLHARES SOBRE A ARQUITETURA</Eyebrow><h2>Espaços que inspiram<br/><em>novos horizontes.</em></h2></div>
        <p>Algumas referências visuais do que a arquitetura contemporânea pode oferecer. Imagens ilustrativas, não são obras da CS.</p>
      </div>
      <div className="gallery-grid">
        {gallery.map((g, i) => <article key={g.title} className={`gallery-card gallery-card-${i+1}`} data-reveal>
          <ImageWithFallback src={g.image} alt={g.alt}/>
          <div className="gallery-shade"/>
          <div className="gallery-overlay"><span>{String(i+1).padStart(2,'0')} / {g.type}</span><h3>{g.title}</h3><p>{g.sub}</p></div>
        </article>)}
      </div>
      <p className="image-disclaimer">Fotografias de referência obtidas de banco de imagens. Portfólio real a incluir após autorização da empresa.</p>
    </div>
  </section>;
}

function Process() {
  return <section id="processo" className="process section-pad">
    <div className="container">
      <div className="process-top" data-reveal>
        <div><Eyebrow number="04" light>O CAMINHO ATÉ O SEU PROJETO</Eyebrow><h2>Um bom resultado nasce de<br/><em>um começo bem feito.</em></h2></div>
        <p>Antes de qualquer proposta, queremos compreender o que você precisa. Um processo simples para começar a conversar.</p>
      </div>
      <div className="process-steps">{steps.map((step,i) => <div className="step" key={step.n} data-reveal><span className="step-no">{step.n}<i/></span><div className="step-text"><h3>{step.title}</h3><p>{step.detail}</p></div></div>)}</div>
      <div className="process-end"><span>CONSTRUÇÃO COMEÇA COM DIÁLOGO.</span><a href="#orcamento">Vamos dar o primeiro passo? <ArrowUpRight size={18}/></a></div>
    </div>
  </section>;
}

function CtaBanner() {
  return <section className="cta-section">
    <div className="container"><div className="cta-inner" data-reveal>
      <div><span className="cta-overline">É HORA DE TIRAR OS PLANOS DO PAPEL</span><h2>O seu próximo capítulo<br/>pode começar <em>aqui.</em></h2><p>Conte sobre a sua ideia e descubra o próximo passo para transformá-la em um projeto.</p><a className="btn btn-cream" href="#orcamento">Solicitar atendimento <ArrowUpRight size={18}/></a></div>
      <div className="cta-graphic" aria-hidden="true"><span>CS.</span><i/></div>
    </div></div>
  </section>;
}

const initialForm = { name:'', phone:'', email:'', city:'Santarém', intent:'', stage:'', when:'', note:'', consent:false };

function Contact() {
  const [data, setData] = useState(initialForm);
  const [error, setError] = useState('');
  const input = (name) => ({ value:data[name], onChange:e => { setData(v => ({...v,[name]:e.target.value})); if(error) setError(''); }});
  const submit = (event) => {
    event.preventDefault();
    const phoneDigits = data.phone.replace(/\D/g,'');
    if (data.name.trim().length < 2) { setError('Informe seu nome para continuar.'); return; }
    if (phoneDigits.length < 10 || phoneDigits.length > 13) { setError('Informe um WhatsApp válido, incluindo DDD.'); return; }
    if (!data.intent || !data.stage || !data.when) { setError('Preencha as informações principais do projeto.'); return; }
    if (!data.consent) { setError('Precisamos da sua confirmação para preparar a mensagem.'); return; }
    const msg = `Olá, CS Empreendimentos! Gostaria de conversar sobre um projeto.\n\n*Nome:* ${data.name.trim()}\n*Meu WhatsApp:* ${data.phone.trim()}\n*E-mail:* ${data.email || 'Não informado'}\n*Cidade:* ${data.city.trim() || 'Não informada'}\n*Interesse:* ${data.intent}\n*Etapa atual:* ${data.stage}\n*Prazo desejado:* ${data.when}\n*Detalhes:* ${data.note.trim() || 'Prefiro explicar durante o atendimento.'}\n\nMensagem enviada a partir do site.`;
    window.location.assign(whatsappUrl(msg));
  };
  return <section className="contact section-pad" id="orcamento">
    <div className="container contact-grid">
      <div className="contact-copy" data-reveal><Eyebrow number="05">FALE COM A CS</Eyebrow><h2>Vamos falar sobre<br/><em>seu próximo projeto?</em></h2><p>Não precisa ter todas as respostas agora. Conte o que você já sabe e dê o primeiro passo com a nossa equipe.</p>
        <div className="contact-benefits"><div><Check size={18}/><span>Conte sobre o tipo de construção</span></div><div><Check size={18}/><span>Informe em que etapa você está</span></div><div><Check size={18}/><span>Inicie uma conversa direcionada</span></div></div>
        <div className="contact-sidebar"><span>EM SANTARÉM, PARÁ</span><p>Construindo novas possibilidades para quem pensa adiante.</p><a href={business.instagram} target="_blank" rel="noreferrer"><Instagram size={18}/> Acompanhe a CS no Instagram <ArrowUpRight size={15}/></a></div>
      </div>
      <form className="contact-form" onSubmit={submit} data-reveal>
        <div className="form-header"><div><span>FORMULÁRIO DE INTERESSE</span><h3>Conte-nos o que você tem em mente.</h3></div><span className="form-header-icon"><ArrowUpRight size={26}/></span></div>
        <div className="form-row"><label>Seu nome completo <strong>*</strong><input {...input('name')} required autoComplete="name" placeholder="Como podemos te chamar?" minLength={2}/></label><label>WhatsApp com DDD <strong>*</strong><input {...input('phone')} type="tel" inputMode="tel" autoComplete="tel" required placeholder="(93) 99999-9999" /></label></div>
        <div className="form-row"><label>E-mail <small>(opcional)</small><input {...input('email')} type="email" autoComplete="email" placeholder="voce@exemplo.com" /></label><label>Cidade do projeto<input id="city" {...input('city')} placeholder="Santarém" /></label></div>
        <label>Qual é o seu principal interesse? <strong>*</strong><div className="select-wrap"><select {...input('intent')} required><option value="" disabled>Selecione uma opção</option><option>Construção residencial</option><option>Construção comercial</option><option>Empreendimento imobiliário</option><option>Engenharia e planejamento</option><option>Parceria / terreno</option><option>Outro assunto</option></select><ChevronDown size={17}/></div></label>
        <div className="form-row"><label>Em que etapa você está? <strong>*</strong><div className="select-wrap"><select {...input('stage')} required><option value="" disabled>Selecione a etapa</option><option>Pesquisando possibilidades</option><option>Tenho um terreno</option><option>Tenho um projeto</option><option>Quero iniciar uma obra</option><option>Obra já em andamento</option></select><ChevronDown size={17}/></div></label><label>Quando pretende começar? <strong>*</strong><div className="select-wrap"><select {...input('when')} required><option value="" disabled>Escolha um prazo</option><option>O quanto antes</option><option>Em até 3 meses</option><option>De 3 a 6 meses</option><option>De 6 a 12 meses</option><option>Ainda estou planejando</option></select><ChevronDown size={17}/></div></label></div>
        <label>Conte um pouco sobre seu projeto <small>(opcional)</small><textarea {...input('note')} rows={4} maxLength={1000} placeholder="Tipo de imóvel, tamanho aproximado, localização, o que você imagina..." /></label>
        <label className="consent"><input type="checkbox" checked={data.consent} onChange={e=>setData(v=>({...v,consent:e.target.checked}))} required /><span>Autorizo o uso das informações preenchidas para iniciar o atendimento via WhatsApp. Os dados não são armazenados neste site.</span></label>
        {error && <div className="form-error" role="alert">{error}</div>}
        <button type="submit" className="btn btn-primary form-submit">Preparar mensagem no WhatsApp <ArrowUpRight size={18}/></button>
        <p className="form-footnote">Ao enviar, você será direcionado ao WhatsApp com sua mensagem pronta para confirmar o envio.</p>
      </form>
    </div>
  </section>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div className="footer-about"><Brand light/><p>Construção civil e incorporação imobiliária em Santarém, Pará.</p></div>
    <div><span className="footer-heading">Navegação</span><a href="#solucoes">Soluções</a><a href="#inspiracoes">Inspirações</a><a href="#sobre">Sobre a empresa</a><a href="#processo">Como funciona</a></div>
    <div><span className="footer-heading">Fale com a CS</span><a href="#orcamento">Solicitar atendimento</a><a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a><a href={business.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a></div>
    <div><span className="footer-heading">Onde estamos</span><p>Santarém, Pará<br/>Brasil</p><a href="#inicio" className="back-top">Voltar ao topo ↑</a></div></div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} CS Empreendimentos. Todos os direitos reservados.</span><span>Projeto de demonstração • Imagens ilustrativas</span></div>
  </footer>;
}

function FloatingCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const check = () => { const el = document.getElementById('orcamento'); const rect=el?.getBoundingClientRect(); setShow(window.scrollY>window.innerHeight*.65 && (!rect || rect.top > window.innerHeight)); };
    check(); window.addEventListener('scroll', check, { passive:true }); return ()=>window.removeEventListener('scroll', check);
  },[]);
  return <a href="#orcamento" className={`floating-cta ${show?'show':''}`} aria-label="Solicitar orçamento"><MessageCircle size={18}/> Solicitar orçamento</a>;
}

export default function App(){
  useEffect(()=>{
    const nodes = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) { nodes.forEach(el=>el.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}), {threshold:.10,rootMargin:'0px 0px -20px 0px'});
    nodes.forEach(el=>observer.observe(el)); return ()=>observer.disconnect();
  },[]);
  return <><Header/><main><ScrollBuilding/><Intro/><Solutions/><About/><Gallery/><Process/><CtaBanner/><Contact/></main><Footer/><FloatingCTA/></>;
}
