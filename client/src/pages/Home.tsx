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
    articleImage: "/assets/cover-smart15-drive.jpg",
    articleLabel: "capa Smart15 · Drive",
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
    articleImage: "/assets/smart-obia-icon.png",
    articleLabel: "ícone oficial · Smart OBIA",
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
    articleImage: "/assets/cover-baru-drive.jpg",
    articleLabel: "capa Baru Validator · Drive",
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
    articleImage: "/assets/cover-interferencias-drive.jpg",
    articleLabel: "capa análise territorial · Drive",
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
    articleImage: "/assets/cover-thermal-drive.jpg",
    articleLabel: "capa Thermal SR · Drive",
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
    articleImage: "/assets/cover-dflegal-drive.jpg",
    articleLabel: "capa DF Legal · Drive",
  },
];

const capabilityItems = [
  { pt: "Ciência de dados geoespaciais", en: "Geospatial data science", value: "01" },
  { pt: "GIS e sensoriamento remoto", en: "GIS & remote sensing", value: "02" },
  { pt: "IA e deep learning", en: "AI / deep learning", value: "03" },
  { pt: "Planejamento urbano e ambiental", en: "Urban & environmental planning", value: "04" },
];

const projectEnglish: Record<string, { eyebrow: string; description: string; articleLabel: string }> = {
  smart15: { eyebrow: "Urban platform · client project", description: "A 15-minute city accessibility analysis for pedestrians and cyclists, combining slope, land-surface temperature, vegetation, street network and mobility profiles.", articleLabel: "Smart15 cover · Drive" },
  obia: { eyebrow: "Geospatial classification · toolkit", description: "An Object-Based Image Analysis toolkit integrated with the QGIS Processing Toolbox to train, classify and validate imagery using object shape, texture and spectral signature.", articleLabel: "official icon · Smart OBIA" },
  baru: { eyebrow: "Model validation · QGIS plugin", description: "A plugin for validating raster or vector classifications with reference samples, generating metrics, confusion matrices and PDF, HTML or CSV reports.", articleLabel: "Baru Validator cover · Drive" },
  change: { eyebrow: "Remote sensing · ArcGIS Online", description: "A web tool for detecting change from Sentinel imagery, making territorial monitoring faster, repeatable and actionable.", articleLabel: "territorial analysis cover · Drive" },
  thermal: { eyebrow: "Rasters · thermal super-resolution", description: "A GeoLibre plugin that creates higher-resolution thermal imagery from Landsat TIRS and a Sentinel SR2D4 image with Sharp.", articleLabel: "Thermal SR cover · Drive" },
  lotes: { eyebrow: "Territorial intelligence · urban analysis", description: "Tools for analyzing conflicts and plots, connecting geospatial data to inspection support routines and urban planning.", articleLabel: "DF Legal cover · Drive" },
};

function ProjectVisual({ project, lang }: { project: (typeof projects)[number]; lang: "pt" | "en" }) {
  const copy = lang === "en" ? projectEnglish[project.id] : undefined;
  if (project.kind === "video") {
    return (
      <div className="project-visual project-video">
        <video
          className="project-video-media"
          poster={project.articleImage || heroImage}
          src={smart15Video}
          controls
          preload="metadata"
          aria-label={lang === "pt" ? "Demonstração do Smart15" : "Smart15 demo"}
        />
        <div className="video-tag"><Play size={12} fill="currentColor" /> {lang === "pt" ? "demo público · figura real" : "public demo · real figure"}</div>
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
        <img src={project.articleImage} alt={lang === "pt" ? "Mapa de classificação do artigo científico sobre Baru" : "Classification map from the Baru scientific article"} />
        <div className="article-gradient" />
        <span className="visual-chip"><ScanLine size={13} /> {copy?.articleLabel || project.articleLabel}</span>
        <span className="article-credit">{lang === "pt" ? "imagem real · artigo Baru" : "real image · Baru article"}</span>
      </div>
    );
  }

  return (
    <div className={`project-visual still-visual ${project.accent} ${project.articleImage ? "article-visual" : ""}`}>
      <img src={project.articleImage || (project.id === "smart15" ? "/assets/smart15-study-area.jpg" : project.id === "obia" || project.id === "thermal" ? orbitImage : heroImage)} alt={copy?.articleLabel || project.articleLabel || ""} />
      <div className="visual-scan" />
      <div className="visual-coordinates">-15.7934° S<br />-47.8823° W</div>
      <span className="visual-chip"><ScanLine size={13} /> {copy?.articleLabel || project.articleLabel || (lang === "pt" ? "camada espacial" : "spatial layer")}</span>
      {project.articleImage && <span className="article-credit">{lang === "pt" ? "imagem real · " : "real image · "}{copy?.articleLabel || project.articleLabel}</span>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [revealed, setRevealed] = useState(false);
  const [lang, setLang] = useState<"pt" | "en">(() => (localStorage.getItem("geosmart-lang") as "pt" | "en") || "pt");

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

  const setLanguage = (value: "pt" | "en") => { setLang(value); localStorage.setItem("geosmart-lang", value); };

  return (
    <main className={`site-shell ${revealed ? "is-revealed" : ""}`}>
      <div className="topline"><span>GEOSMART.ONLINE</span><span>BRASÍLIA · BRASIL</span><span className="topline-status"><i /> disponível para projetos selecionados</span></div>
      <nav className="site-nav" aria-label="Navegação principal">
        <a className="brand" href="#top" onClick={() => scrollTo("top")}><span className="brand-mark"><Map size={16} /></span><span>GeoSmart<span className="brand-dot">.</span></span></a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button onClick={() => scrollTo("projetos")}>{lang === "pt" ? "projetos" : "projects"} <span>01</span></button>
          <button onClick={() => scrollTo("sobre")}>{lang === "pt" ? "sobre" : "about"} <span>02</span></button>
          <button onClick={() => scrollTo("contato")}>{lang === "pt" ? "contato" : "contact"} <span>03</span></button>
        </div>
        <div className="nav-tools"><div className="language-switch"><button className={lang === "pt" ? "active" : ""} onClick={() => setLanguage("pt")}>PT-BR</button><button className={lang === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div><a className="nav-cta" href="mailto:contato@geosmart.online">{lang === "pt" ? "vamos conversar" : "let's talk"} <ArrowUpRight size={15} /></a></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero" id="top">
        <img className="hero-image" src={heroImage} alt="Textura abstrata de relevo e dados geoespaciais" />
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="hero-content container">
          <div className="hero-kicker"><span className="kicker-line" /> {lang === "pt" ? "portfólio de geotecnologia" : "geospatial technology portfolio"} <span className="kicker-index">/ 2026</span></div>
          <h1>{lang === "pt" ? <>Eu transformo<br /><em>território</em> em<br />decisão.</> : <>I turn<br /><em>territory</em> into<br />decisions.</>}</h1>
          <p className="hero-description">{lang === "pt" ? "Soluções espaciais para entender cidades, paisagens e sistemas complexos — do dado bruto à próxima ação." : "Spatial solutions for understanding cities, landscapes and complex systems — from raw data to the next action."}</p>
          <div className="hero-actions"><button className="button button-primary" onClick={() => scrollTo("projetos")}>{lang === "pt" ? "explorar projetos" : "explore projects"} <ArrowUpRight size={17} /></button><a className="button button-ghost" href="https://www.linkedin.com/in/leandrogregoriogeo/" target="_blank" rel="noreferrer">{lang === "pt" ? "ver perfil no LinkedIn" : "view LinkedIn profile"} <Linkedin size={16} /></a></div>
        </div>
        <div className="hero-foot container"><span>{lang === "pt" ? "scroll para explorar" : "scroll to explore"}</span><span className="scroll-line" /><span>01 — 06</span></div>
        <div className="hero-coordinates">15°47'36" S<br />47°52'56" W<br /><span>ALT 1.172 M</span></div>
      </section>

      <section className="signal-strip"><div className="container signal-inner"><span className="signal-label"><Radio size={14} /> {lang === "pt" ? "sinal aberto" : "open signal"}</span><p>{lang === "pt" ? "Dados espaciais, inteligência artificial e planejamento urbano em uma mesma camada de leitura." : "Spatial data, artificial intelligence and urban planning in the same layer of interpretation."}</p><span className="signal-rule" /><span className="signal-label">GIS / AI / RS</span></div></section>

      <section className="what-section container" aria-labelledby="what-title">
        <div className="what-intro"><span className="eyebrow">00 / {lang === "pt" ? "quem sou eu" : "who I am"}</span><h2 id="what-title">{lang === "pt" ? <>Eu leio o território<br />para <em>melhorar decisões.</em></> : <>I read territory<br />to <em>improve decisions.</em></>}</h2><p>{lang === "pt" ? "Sou Leandro Gregorio, geógrafo, doutor em Geografia pela UnB e desenvolvedor de soluções geoespaciais. Uno pesquisa, código e planejamento para transformar dados difíceis em informação que pessoas, equipes e cidades conseguem usar." : "I am Leandro Gregorio, a geographer, PhD in Geography from UnB, and geospatial solutions developer. I connect research, code and planning to turn difficult data into information that people, teams and cities can use."}</p><a className="text-link" href="https://www.linkedin.com/in/leandrogregoriogeo/" target="_blank" rel="noreferrer">{lang === "pt" ? "ver perfil completo" : "view full profile"} <Linkedin size={15} /></a></div>
        <div className="what-services"><span className="eyebrow">01 / {lang === "pt" ? "o que eu faço" : "what I do"}</span><div className="service-grid"><article><span className="service-number">01</span><h3>{lang === "pt" ? "Transformo dados em leitura territorial" : "I turn data into territorial insight"}</h3><p>{lang === "pt" ? "Integro GIS, sensoriamento remoto, IA e análise espacial para revelar padrões, riscos, oportunidades e prioridades." : "I combine GIS, remote sensing, AI and spatial analysis to reveal patterns, risks, opportunities and priorities."}</p></article><article><span className="service-number">02</span><h3>{lang === "pt" ? "Crio plugins que resolvem trabalho real" : "I build plugins for real work"}</h3><p>{lang === "pt" ? "Automatizo rotinas no QGIS, GeoLibre e ArcGIS para que equipes validem, classifiquem, comparem e processem mais rápido." : "I automate workflows in QGIS, GeoLibre and ArcGIS so teams can validate, classify, compare and process faster."}</p></article><article><span className="service-number">03</span><h3>{lang === "pt" ? "Conecto tecnologia a consequência" : "I connect technology to consequence"}</h3><p>{lang === "pt" ? "O resultado não é apenas um mapa ou um plugin: é uma decisão mais segura, uma fiscalização mais objetiva e um território melhor cuidado." : "The outcome is not just a map or a plugin: it is a safer decision, more objective inspection and a better cared-for territory."}</p></article></div></div>
      </section>

      <section className="projects-section container" id="projetos">
        <div className="section-heading"><div><span className="eyebrow">01 / {lang === "pt" ? "projetos selecionados" : "selected projects"}</span><h2>{lang === "pt" ? <>Do mapa à<br /><em>materialidade.</em></> : <>From maps to<br /><em>meaning.</em></>}</h2></div><p className="section-intro">{lang === "pt" ? "Uma seleção de sistemas, plugins e experimentos que tornam o território legível — e a decisão, mais inteligente." : "A selection of systems, plugins and experiments that make territory legible — and decisions smarter."}</p></div>
        <div className="filter-row"><span>{lang === "pt" ? "filtrar por" : "filter by"}</span>{["Todos", "Plataformas", "Plugins", "Pesquisa", "Cliente"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{lang === "en" ? ({ Todos: "All", Plataformas: "Platforms", Plugins: "Plugins", Pesquisa: "Research", Cliente: "Client" } as Record<string,string>)[item] : item}</button>)}</div>
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article className={`project-card accent-${project.accent}`} key={project.id}>
              <ProjectVisual project={project} lang={lang} />
              <div className="project-meta"><span className="project-number">{project.number}</span><span className="project-eyebrow">{lang === "en" ? projectEnglish[project.id].eyebrow : project.eyebrow}</span><a className="project-link" href={project.repo} rel="noreferrer" aria-label={lang === "pt" ? `Abrir repositório ${project.name}` : `Open ${project.name} repository`}><Github size={16} /></a></div>
              <h3>{project.name}</h3>
              <p>{lang === "en" ? projectEnglish[project.id].description : project.description}</p>
              <div className="project-footer"><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><a href={project.repo} rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="statement-section" id="sobre"><div className="container statement-grid"><div className="statement-index"><span>02 / {lang === "pt" ? "sobre" : "about"}</span><span className="statement-arrow">↘</span></div><div><h2>{lang === "pt" ? <>O território<br />é um <em>sistema.</em></> : <>Territory<br />is a <em>system.</em></>}</h2><p>{lang === "pt" ? "Leandro Gregorio é geógrafo, doutor em Geografia pela UnB e especialista em geotecnologias, sensoriamento remoto e análise espacial aplicada. Há mais de 16 anos, conecta pesquisa, código e políticas urbanas para transformar camadas complexas em escolhas mais claras." : "Leandro Gregorio is a geographer with a PhD from UnB and a specialist in geospatial technologies, remote sensing and applied spatial analysis. For 16+ years, he has connected research, code and urban policy to turn complex layers into clearer choices."}</p><a className="text-link" href="https://br.linkedin.com/in/leandrogregoriogeo" target="_blank" rel="noreferrer">{lang === "pt" ? "conhecer trajetória" : "explore the journey"} <ArrowUpRight size={15} /></a></div><div className="capability-list">{capabilityItems.map((item) => <div className="capability" key={item.value}><span>{item.value}</span><strong>{lang === "pt" ? item.pt : item.en}</strong><ChevronRight size={15} /></div>)}</div></div></section>

      <section className="timeline-section container"><div className="timeline-copy"><span className="eyebrow">{lang === "pt" ? "experiência em camadas" : "layered experience"}</span><h2>{lang === "pt" ? <>16+ anos<br />lendo o <em>espaço.</em></> : <>16+ years<br />reading <em>space.</em></>}</h2></div><div className="timeline"><div className="timeline-item active"><span>{lang === "pt" ? "2024 — agora" : "2024 — now"}</span><strong>{lang === "pt" ? "Planejamento urbano & infraestrutura" : "Urban planning & infrastructure"}</strong><p>{lang === "pt" ? "Integração de GIS, IA e dashboards para gestão urbana inteligente em Brasília." : "Integrating GIS, AI and dashboards for intelligent urban management in Brasília."}</p></div><div className="timeline-item"><span>2009 — 2024</span><strong>{lang === "pt" ? "Meio ambiente & sensoriamento remoto" : "Environment & remote sensing"}</strong><p>{lang === "pt" ? "Risco ambiental, ilhas de calor, queimadas e modelagem espacial aplicada." : "Environmental risk, heat islands, fires and applied spatial modeling."}</p></div><div className="timeline-item"><span>2014 — 2018</span><strong>{lang === "pt" ? "Doutorado em Geografia · UnB" : "PhD in Geography · UnB"}</strong><p>{lang === "pt" ? "Dinâmica da paisagem urbana e suas interações com a dengue no Distrito Federal." : "Urban landscape dynamics and their interactions with dengue in the Federal District."}</p></div></div></section>

      <section className="contact-section" id="contato"><img src={orbitImage} alt="" className="contact-image" /><div className="contact-overlay" /><div className="container contact-content"><span className="eyebrow">03 / {lang === "pt" ? "contato" : "contact"}</span><h2>{lang === "pt" ? <>Vamos mapear<br /><em>o próximo.</em></> : <>Let's map<br /><em>what's next.</em></>}</h2><p>{lang === "pt" ? "Tem um território complexo, uma pergunta difícil ou um projeto que precisa ganhar escala?" : "Do you have a complex territory, a difficult question or a project ready to scale?"}</p><a className="button button-primary" href="mailto:contato@geosmart.online">{lang === "pt" ? "entrar em contato" : "get in touch"} <ArrowUpRight size={17} /></a><div className="contact-details"><a href="mailto:contato@geosmart.online">contato@geosmart.online</a><span>Brasília · Brasil</span><a href="https://github.com/LeandroGregorio7" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a></div></div></section>

      <footer className="site-footer container"><a className="brand" href="#top"><span className="brand-mark"><Map size={15} /></span><span>GeoSmart<span className="brand-dot">.</span></span></a><span>© 2026 Leandro Gregorio</span><span>{lang === "pt" ? "geotecnologia com intenção" : "geospatial technology with intent"}</span><a href="#top" className="back-top">{lang === "pt" ? "voltar ao topo" : "back to top"} ↑</a></footer>
    </main>
  );
}
