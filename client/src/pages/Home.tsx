import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Github,
  Linkedin,
  Map,
  Menu,
  Play,
  Radio,
  ScanLine,
  Sparkles,
  X,
} from "lucide-react";

const heroImage = "/assets/geosmart-topography.jpg";
const orbitImage = "/assets/geosmart-orbit.jpg";
const smart15Video = "https://github.com/user-attachments/assets/db3433ff-69a3-4e4b-ba6c-fbabf08c8604";

const projects = [
  {
    id: "smart15",
    number: "01",
    name: "Smart15",
    eyebrow: "Plataforma urbana · projeto cliente",
    description:
      "Análise de acessibilidade na cidade de 15 minutos para pedestres e ciclistas, combinando declividade, temperatura da superfície, vegetação, rede viária e perfil de mobilidade.",
    tags: ["GeoLibre", "Python", "FastAPI"],
    categories: ["Plataformas", "Cliente"],
    repo: "https://github.com/LeandroGregorio7/Smart15-Acessibilidade",
    accent: "lime",
    kind: "video",
    articleImage: "/assets/smart15-study-area.jpg",
    articleLabel: "figura do manuscrito Smart15",
  },
  {
    id: "obia",
    number: "02",
    name: "Smart OBIA",
    eyebrow: "Classificação geoespacial · toolkit",
    description:
      "Toolkit de Object-Based Image Analysis integrado ao QGIS Processing Toolbox para treinar, classificar e validar imagens usando forma, textura e assinatura espectral dos objetos.",
    tags: ["QGIS", "Python", "Machine Learning"],
    categories: ["Pesquisa", "Plugins"],
    repo: "https://github.com/LeandroGregorio7/smart-obia",
    accent: "cyan",
    kind: "image",
  },
  {
    id: "baru",
    number: "03",
    name: "Baru Validator",
    eyebrow: "Validação de modelos · plugin QGIS",
    description:
      "Plugin para validar classificações raster ou vetoriais com amostras de referência, gerando métricas, matriz de confusão e relatórios em PDF, HTML ou CSV.",
    tags: ["QGIS", "QADI", "MCC"],
    categories: ["Plugins", "Pesquisa"],
    repo: "https://github.com/LeandroGregorio7/baru",
    accent: "amber",
    kind: "article",
    articleImage: "/assets/baru-map-classification.jpg",
    articleLabel: "classificação multiescalar · Baru",
  },
  {
    id: "change",
    number: "04",
    name: "Sentinel Change",
    eyebrow: "Sensoriamento remoto · ArcGIS Online",
    description:
      "Ferramenta web para detecção de mudanças a partir de imagens Sentinel, tornando o monitoramento territorial mais rápido, replicável e acionável.",
    tags: ["Sentinel", "ArcGIS Online", "HTML"],
    categories: ["Plataformas", "Pesquisa"],
    repo: "https://github.com/LeandroGregorio7/CHANGE-DETECTION-SENTINEL-TOOL-ARCGIS-ONLINE",
    accent: "pink",
    kind: "image",
  },
  {
    id: "thermal",
    number: "05",
    name: "Thermal SR",
    eyebrow: "Rasters · super-resolução térmica",
    description:
      "Plugin GeoLibre que cria imagens térmicas de maior resolução a partir do Landsat TIRS e uma imagem Sentinel SR2D4 com Sharp.",
    tags: ["Landsat", "Sentinel", "GeoLibre"],
    categories: ["Plugins", "Pesquisa"],
    repo: "https://github.com/LeandroGregorio7/lst-super-resolution",
    accent: "cyan",
    kind: "image",
  },
  {
    id: "lotes",
    number: "06",
    name: "Lotes DF Legal",
    eyebrow: "Inteligência territorial · análise urbana",
    description:
      "Ferramentas para análise de interferências e lotes, conectando dados geoespaciais a rotinas de apoio à fiscalização e ao planejamento urbano.",
    tags: ["TypeScript", "GIS", "Urban Data"],
    categories: ["Plataformas", "Cliente"],
    repo: "https://github.com/LeandroGregorio7/advanced_lotes_dflegal",
    accent: "lime",
    kind: "image",
  },
];

const capabilityItems = [
  { label: "Geospatial data science", value: "01" },
  { label: "GIS & remote sensing", value: "02" },
  { label: "AI / deep learning", value: "03" },
  { label: "Urban & environmental planning", value: "04" },
];

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  if (project.kind === "video") {
    return (
      <div className="project-visual project-video">
        <video
          className="project-video-media"
          poster={project.articleImage || heroImage}
          src={smart15Video}
          controls
          preload="metadata"
          aria-label="Demonstração do Smart15"
        />
        <div className="video-tag"><Play size={12} fill="currentColor" /> demo público · figura real</div>
      </div>
    );
  }

  if (project.kind === "metrics") {
    return (
      <div className="project-visual metrics-visual">
        <div className="metrics-header"><span>VALIDATION / RUN 04</span><span className="dot-live" /></div>
        <div className="metric-score"><strong>0.87</strong><span>QADI INDEX</span></div>
        <div className="metric-bars">
          {["User accuracy", "Producer recall", "MCC"].map((item, index) => (
            <div className="metric-row" key={item}>
              <span>{item}</span><div className="bar"><i style={{ width: `${[87, 92, 81][index]}%` }} /></div><b>{["87%", "92%", "0.81"][index]}</b>
            </div>
          ))}
        </div>
        <div className="confusion-grid">{["0.91", "0.07", "0.02", "0.04", "0.88", "0.08", "0.01", "0.05", "0.94"].map((cell, index) => <span className={index === 0 || index === 4 || index === 8 ? "hot" : ""} key={`${cell}-${index}`}>{cell}</span>)}</div>
      </div>
    );
  }

  if (project.kind === "article") {
    return (
      <div className="project-visual article-visual">
        <img src={project.articleImage} alt="Mapa de classificação do artigo científico sobre Baru" />
        <div className="article-gradient" />
        <span className="visual-chip"><ScanLine size={13} /> {project.articleLabel}</span>
        <span className="article-credit">imagem real · artigo Baru</span>
      </div>
    );
  }

  return (
    <div className={`project-visual still-visual ${project.accent} ${project.articleImage ? "article-visual" : ""}`}>
      <img src={project.articleImage || (project.id === "smart15" ? "/assets/smart15-study-area.jpg" : project.id === "obia" || project.id === "thermal" ? orbitImage : heroImage)} alt="" />
      <div className="visual-scan" />
      <div className="visual-coordinates">-15.7934° S<br />-47.8823° W</div>
      <span className="visual-chip"><ScanLine size={13} /> {project.articleLabel || "spatial layer"}</span>
      {project.articleImage && <span className="article-credit">imagem real · manuscrito Smart15</span>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "Todos") return projects;
    return projects.filter((project) => project.categories.includes(filter));
  }, [filter]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className={`site-shell ${revealed ? "is-revealed" : ""}`}>
      <div className="topline"><span>GEOSMART.ONLINE</span><span>BRASÍLIA · BRASIL</span><span className="topline-status"><i /> disponível para projetos selecionados</span></div>
      <nav className="site-nav" aria-label="Navegação principal">
        <a className="brand" href="#top" onClick={() => scrollTo("top")}><span className="brand-mark"><Map size={16} /></span><span>GeoSmart<span className="brand-dot">.</span></span></a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button onClick={() => scrollTo("projetos")}>projetos <span>01</span></button>
          <button onClick={() => scrollTo("sobre")}>sobre <span>02</span></button>
          <button onClick={() => scrollTo("contato")}>contato <span>03</span></button>
        </div>
        <a className="nav-cta" href="mailto:contato@geosmart.online">vamos conversar <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero" id="top">
        <img className="hero-image" src={heroImage} alt="Textura abstrata de relevo e dados geoespaciais" />
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="hero-content container">
          <div className="hero-kicker"><span className="kicker-line" /> portfólio de geotecnologia <span className="kicker-index">/ 2026</span></div>
          <h1>Eu transformo<br /><em>território</em> em<br />decisão.</h1>
          <p className="hero-description">Soluções espaciais para entender cidades, paisagens e sistemas complexos — do dado bruto à próxima ação.</p>
          <div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo("projetos")}>explorar projetos <ArrowUpRight size={17} /></button><a className="button button-ghost" href="https://www.linkedin.com/in/leandrogregoriogeo/" target="_blank" rel="noreferrer">ver perfil no LinkedIn <Linkedin size={16} /></a></div>
        </div>
        <div className="hero-foot container"><span>scroll para explorar</span><span className="scroll-line" /><span>01 — 06</span></div>
        <div className="hero-coordinates">15°47'36" S<br />47°52'56" W<br /><span>ALT 1.172 M</span></div>
      </section>

      <section className="signal-strip"><div className="container signal-inner"><span className="signal-label"><Radio size={14} /> sinal aberto</span><p>Dados espaciais, inteligência artificial e planejamento urbano em uma mesma camada de leitura.</p><span className="signal-rule" /><span className="signal-label">GIS / AI / RS</span></div></section>

      <section className="projects-section container" id="projetos">
        <div className="section-heading"><div><span className="eyebrow">01 / projetos selecionados</span><h2>Do mapa à<br /><em>materialidade.</em></h2></div><p className="section-intro">Uma seleção de sistemas, plugins e experimentos que tornam o território legível — e a decisão, mais inteligente.</p></div>
        <div className="filter-row"><span>filtrar por</span>{["Todos", "Plataformas", "Plugins", "Pesquisa", "Cliente"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article className={`project-card accent-${project.accent}`} key={project.id}>
              <ProjectVisual project={project} />
              <div className="project-meta"><span className="project-number">{project.number}</span><span className="project-eyebrow">{project.eyebrow}</span><a className="project-link" href={project.repo} target="_blank" rel="noreferrer" aria-label={`Abrir repositório ${project.name}`}><Github size={16} /></a></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-footer"><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.repo} target="_blank" rel="noreferrer">ver repositório <ArrowUpRight size={14} /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-section" id="sobre"><div className="container statement-grid"><div className="statement-index"><span>02 / sobre</span><span className="statement-arrow">↘</span></div><div><h2>O território<br />é um <em>sistema.</em></h2><p>Leandro Gregorio é geógrafo, doutor em Geografia pela UnB e especialista em geotecnologias, sensoriamento remoto e análise espacial aplicada. Há mais de 16 anos, conecta pesquisa, código e políticas urbanas para transformar camadas complexas em escolhas mais claras.</p><a className="text-link" href="https://br.linkedin.com/in/leandrogregoriogeo" target="_blank" rel="noreferrer">conhecer trajetória <ArrowUpRight size={15} /></a></div><div className="capability-list">{capabilityItems.map((item) => <div className="capability" key={item.value}><span>{item.value}</span><strong>{item.label}</strong><ChevronRight size={15} /></div>)}</div></div></section>

      <section className="timeline-section container"><div className="timeline-copy"><span className="eyebrow">experiência em camadas</span><h2>16+ anos<br />lendo o <em>espaço.</em></h2></div><div className="timeline"><div className="timeline-item active"><span>2024 — agora</span><strong>Planejamento urbano & infraestrutura</strong><p>Integração de GIS, IA e dashboards para gestão urbana inteligente em Brasília.</p></div><div className="timeline-item"><span>2009 — 2024</span><strong>Meio ambiente & sensoriamento remoto</strong><p>Risco ambiental, ilhas de calor, queimadas e modelagem espacial aplicada.</p></div><div className="timeline-item"><span>2014 — 2018</span><strong>Doutorado em Geografia · UnB</strong><p>Dinâmica da paisagem urbana e suas interações com a dengue no Distrito Federal.</p></div></div></section>

      <section className="contact-section" id="contato"><img src={orbitImage} alt="" className="contact-image" /><div className="contact-overlay" /><div className="container contact-content"><span className="eyebrow">03 / contato</span><h2>Vamos mapear<br /><em>o próximo.</em></h2><p>Tem um território complexo, uma pergunta difícil ou um projeto que precisa ganhar escala?</p><a className="button button-primary" href="mailto:contato@geosmart.online">entrar em contato <ArrowUpRight size={17} /></a><div className="contact-details"><a href="mailto:contato@geosmart.online">contato@geosmart.online</a><span>Brasília · Brasil</span><a href="https://github.com/LeandroGregorio7" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a></div></div></section>

      <footer className="site-footer container"><a className="brand" href="#top"><span className="brand-mark"><Map size={15} /></span><span>GeoSmart<span className="brand-dot">.</span></span></a><span>© 2026 Leandro Gregorio</span><span>geotecnologia com intenção</span><a href="#top" className="back-top">voltar ao topo ↑</a></footer>
    </main>
  );
}
