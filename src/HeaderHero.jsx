import {useEffect, useRef, useState} from 'react'
import {ArrowUpRight, ArrowDown, X, Download, Pause, Play, Phone, Mail} from 'lucide-react'
import {Link, EMAIL} from './ui'
import HeroScene from './HeroScene'

export function Header({path, paused, setPaused}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef(null)
  const panel = useRef(null)
  useEffect(() => {setOpen(false)}, [path])
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60)
    update(); window.addEventListener('scroll', update, {passive: true})
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector('a')?.focus()
    const close = e => {
      if (e.key === 'Escape') {setOpen(false); toggle.current?.focus()}
      if (e.key === 'Tab') {
        const nodes = [toggle.current, ...panel.current.querySelectorAll('a, button')]
        const first = nodes[0], last = nodes[nodes.length-1]
        if (e.shiftKey && document.activeElement === first) {e.preventDefault(); last.focus()}
        else if (!e.shiftKey && document.activeElement === last) {e.preventDefault(); first.focus()}
      }
    }
    window.addEventListener('keydown', close)
    return () => {document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', close)}
  }, [open])
  const entries = [['/work', '作品'], ['/motion', '动效'], ['/about', '关于'], ['/#contact', '联系']]
  return <header className={`site-header ${scrolled || path !== '/' ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
    <Link to="/" className="wordmark" aria-label="马庆林作品集首页" onClick={() => setOpen(false)}><span className="monogram">M<span>.</span></span><span className="brand-manifesto">DESIGN CREATES<br/>A BETTER EXPERIENCE</span><span className="brand-rule"/></Link>
    <nav className="desktop-nav" aria-label="主导航">
      {[['/#work', '作品'], ['/project/66vip', '案例'], ['/#about', '关于'], ['/#contact', '联系']].map(([to, label], index) => <Link key={to} to={to} aria-current={(path === '/' && index === 0) || (path.startsWith('/project') && index === 1) ? 'page' : undefined}><span>{label}</span></Link>)}
    </nav>
    <button ref={toggle} className="menu-toggle icon-button" aria-label={open ? '关闭导航' : '打开导航'} aria-expanded={open} aria-controls="navigation-panel" onClick={() => setOpen(!open)}>{open ? <X/> : <span className="menu-strokes"><i/><i/><i/></span>}</button>
    {open && <div ref={panel} id="navigation-panel" className="navigation-panel" role="dialog" aria-modal="true" aria-label="探索作品集" data-lenis-prevent><div className="menu-caption mono">EXPLORE THE PORTFOLIO / 2026</div><div className="menu-links">{entries.map(([to,label],i) => <Link key={to} to={to} onClick={() => setOpen(false)}><span className="mono">0{i+1}</span><span>{label}</span><ArrowUpRight/></Link>)}</div><div className="menu-bottom"><a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={16}/></a><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? <Play size={16}/> : <Pause size={16}/>} {paused ? '开启动效' : '暂停动态效果'}</button><a href="/resume-maqinglin.pdf" download>下载简历 <Download size={16}/></a></div></div>}
  </header>
}

export function Hero() {
  const stage = useRef(null)
  function move(event) {
    if (!matchMedia('(pointer: fine)').matches || document.documentElement.classList.contains('motion-paused')) return
    const box = event.currentTarget.getBoundingClientRect()
    stage.current.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width - .5) * 10}px`)
    stage.current.style.setProperty('--pointer-y', `${((event.clientY - box.top) / box.height - .5) * 8}px`)
  }
  return <section ref={stage} className="hero noir-hero" aria-labelledby="hero-title" onPointerMove={move} onPointerLeave={() => {stage.current.style.setProperty('--pointer-x', '0px'); stage.current.style.setProperty('--pointer-y', '0px')}}>
    <HeroScene/>
    <div className="hero-year"><span>2 0 2 6</span><i/></div>
    <div className="noir-heading"><h1 id="hero-title" className="noir-title" tabIndex={-1} aria-label="设计作品集">{[...'设计作品集'].map((char,i) => <span className="hero-char-mask" key={i} aria-hidden="true"><span className="hero-char">{char}</span></span>)}</h1><p className="hero-subtitle">UI/UX DESIGN PORTFOLIO</p></div>
    <div className="noir-byline"><p><strong>马庆林</strong><span className="byline-divider">|</span><span>UI/UX Designer</span></p><p>专注 C 端产品、B 端系统、运营视觉与设计系统</p></div>
    <div className="hero-principle"><i/><p>从真实需求出发<br/>用设计创造更好的产品体验</p></div>
    <div className="hero-contacts"><a href="tel:+8613893057154"><Phone size={20} fill="currentColor"/>138 9305 7154</a><i/><a href={`mailto:${EMAIL}`}><Mail size={23}/>{EMAIL}</a></div>
    <span className="vertical-caption" aria-hidden="true"><i/> DESIGN WORKS <i/></span>
    <div className="hero-edition" aria-hidden="true"><span className="edition-dots">▪ ▪ ▪</span><span className="edition-number">01</span><span>IDEA<br/>DESIGN<br/>SOLUTION<br/>BETTER EXPERIENCE</span></div>
    <div className="hero-signature" aria-hidden="true"><i/><span>GOOD DESIGN<br/>CONNECTS A BRIGHTER TOMORROW</span></div>
    <div className="hero-rail" aria-hidden="true"><span>▪ ▪</span><i/></div>
    <Link to="/#work" className="noir-scroll"><span>SCROLL<br/>TO EXPLORE</span><ArrowDown/></Link>
  </section>
}

