import {useEffect,useRef,useState} from 'react'
import {ArrowUpRight,ArrowRight,ArrowLeft,ArrowUp,ArrowDown,Play,Expand,Download,Copy,Check,Plus} from 'lucide-react'
import {projects,motionItems,workExperiences,capabilities} from './data'
import {projectMeta,projectOrder} from './project-meta'
import {caseContent} from './case-content'
import {Link,Picture,Video,MediaViewer,RevealTitle,EMAIL,num,plate,poster} from './ui'
import {scrollToTarget} from './use-motion'
import {Hero} from './HeaderHero'

const navTitles={
 '66vip':['研究与定位','视觉语言','会员体验'],property:['业务结构','设计系统','业务界面'],
 rideshare:['出行场景','交互语言','核心旅程'],hmi:['信息层次','主题方向'],
 campaign:['活动主视觉','页面与延展'],visual:['主题与文字','视觉合集']
}

function Label({n,children}) {return <div className="eyebrow"><i/><span className="mono">{n} / {children}</span></div>}

function useActiveSections(selector,key) {
 const [active,setActive]=useState(0)
 useEffect(()=>{
  let frame=0
  const update=()=>{frame=0;const all=[...document.querySelectorAll(selector)];let current=0;all.forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight*.48)current=i});setActive(current)}
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)}
  update();addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule)
  return()=>{removeEventListener('scroll',schedule);removeEventListener('resize',schedule);cancelAnimationFrame(frame)}
 },[selector,key])
 return active
}

export function WorkArchive({standalone=false}) {
 const [active,setActive]=useState('all')
 const groups=[['all','全部作品'],['product','产品体验'],['visual','视觉探索']]
 const visible=projectOrder.filter((id,i)=>active==='all'||(active==='product'?i<3:i>=3))
 return <section className={`work-deck ${standalone?'work-page':''}`} id="work">
  <div className="frame"><div className="deck-heading"><div><Label n="01">SELECTED WORK / 2026</Label>{standalone?<h1 tabIndex={-1}>设计，落于真实<span className="cyan">。</span></h1>:<RevealTitle>设计，落于真实<span className="cyan">。</span></RevealTitle>}</div><Link to="/motion" className="deck-shortcut">直达动效画廊 <ArrowDown size={16}/></Link></div>
  <div className="deck-toolbar"><div role="group" aria-label="项目分类">{groups.map(([key,label])=><button key={key} onClick={()=>setActive(key)} aria-pressed={active===key}>{label}</button>)}</div><span className="mono">{num(visible.length)} / SELECTED PROJECTS</span></div>
  <div className="project-grid">{visible.map(id=>{const m=projectMeta[id],i=projectOrder.indexOf(id);return <Link key={id} to={`/project/${id}`} className="project-card" aria-label={`查看${m.name}案例`}><div className="project-card-top"><span className="mono">{num(i+1)} / {projects.find(p=>p.id===id).category}</span><ArrowUpRight size={18}/></div><div className="project-card-art" style={{background:m.background}}><Picture src={m.cover} alt={`${m.name}项目主视觉`}/><span className="card-light"/></div><div className="project-card-bottom"><h3>{m.name}</h3><p>{m.statement}</p><span className="card-enter">探索案例 <ArrowUpRight size={14}/></span></div></Link>})}</div>
  <div className="deck-baseline"><span className="mono">IDEA / STRUCTURE / EXPERIENCE</span><span>从产品逻辑，到视觉表达。</span></div></div>
 </section>
}

function MotionPortal() {
 const choices=[motionItems[0],motionItems[2],motionItems[6]]
 return <section className="motion-gateway" id="motion"><div className="gateway-grid" aria-hidden="true"/><div className="gateway-orb" aria-hidden="true"/>
 <div className="frame gateway-layout"><div className="gateway-copy"><Label n="02">DESIGN IN MOTION</Label><RevealTitle>不止看见。<br/>让体验，动起来<span className="cyan">。</span></RevealTitle><p>主题皮肤 / 界面反馈 / 角色表情<br/>22 件动态作品，进入即可实时预览。</p><Link to="/motion" className="gateway-cta"><span>打开动效画廊<small>EXPLORE ALL 22 WORKS</small></span><ArrowUpRight/></Link><span className="live-caption"><i/> LIVE PREVIEW / 正在发生</span></div>
 <Link to="/motion" className="gateway-films" aria-label="点击进入全部动效作品画廊">{choices.map((item,i)=><div className={`gateway-phone phone-${i}`} key={item.src}><Video item={item}/></div>)}<span className="gateway-hint">点击探索全部动效 <ArrowUpRight size={18}/></span></Link></div>
 </section>
}

export function AboutPage({standalone=false}) {
 return <section className={`designer-section frame ${standalone?'designer-page':''}`} id="about"><div className="designer-top"><Label n="03">ABOUT THE DESIGNER</Label><span className="mono">MA QINGLIN / UI & UX</span></div>
  <div className="designer-composition"><div className="designer-identity"><p className="designer-en">MA<br/>QINGLIN<span className="cyan">.</span></p><div className="identity-caption"><span>马庆林</span><span>UI/UX Designer</span></div><a href="/resume-maqinglin.pdf" download="马庆林-UIUX设计师.pdf" className="line-cta">下载完整简历 <Download size={18}/></a></div>
   <figure className="designer-photo"><Picture src="/editorial/portrait.webp" alt="马庆林的彩色个人照片"/><figcaption><span className="mono">THE PERSON<br/>BEHIND THE WORK</span><span className="photo-cross">+</span></figcaption></figure>
   <div className="designer-intro">{standalone?<h1 tabIndex={-1}>理解问题。<br/>在意感受。</h1>:<RevealTitle>理解问题。<br/>在意感受。</RevealTitle>}<p>你好，我是马庆林，一名 UI/UX 设计师。我的工作连接产品逻辑与视觉表达，关注真实需求，也在意每一次使用中的细微感受。</p><p>从 C 端出行产品到 B 端业务系统，从设计规范到主题动效，我希望用清楚的结构与恰当的表达，让复杂的事情更容易使用。</p><div className="designer-tags"><span>产品体验</span><span>设计系统</span><span>视觉表达</span><span>动态设计</span></div></div>
  </div>
  <div className="advantages"><div className="advantages-heading"><span className="mono">WHAT I BRING / 个人优势</span><h3>让想法成立，<br/>也让细节落地。</h3></div><div className="advantage-list">{capabilities.map((item,i)=><details key={item.title} open={i===0}><summary><span className="mono">{num(i+1)}</span><h4>{item.title}</h4><Plus size={18}/></summary><div className="advantage-body"><p>{item.note}</p><span>{item.tools}</span></div></details>)}</div></div>
  <div className="career-layout"><div><span className="mono">EXPERIENCE / EDUCATION</span><h3>每一段经历，<br/>都让设计更具体。</h3></div><div className="career-list">{workExperiences.map((work,i)=><div className="career-item" key={work.company}><span className="mono">{num(i+1)}</span><div><h4>{work.company}</h4><p>{work.role}</p></div><time>{work.period}</time></div>)}<div className="career-item"><span className="mono">03</span><div><h4>陇东学院</h4><p>视觉传达设计</p></div><time>2024.09 — 2026.06</time></div></div></div>
 </section>
}

export function ContactSection() {
 const [copied,setCopied]=useState(false)
 const timer=useRef(null)
 useEffect(()=>()=>clearTimeout(timer.current),[])
 const copy=async()=>{try{await navigator.clipboard.writeText(EMAIL);setCopied(true);clearTimeout(timer.current);timer.current=setTimeout(()=>setCopied(false),2500)}catch{location.href=`mailto:${EMAIL}`}}
 return <footer className="contact-section" id="contact"><div className="contact-facet" aria-hidden="true"/><div className="frame contact-frame"><div className="contact-eyebrow"><Label n="04">LET'S CREATE SOMETHING</Label><span className="mono">A BETTER EXPERIENCE STARTS HERE</span></div><a className="contact-invitation" href={`mailto:${EMAIL}`}><span>下一个好设计，<br/>从一次交流开始<span className="cyan">。</span></span><ArrowUpRight/></a><div className="contact-details"><p>关于一个项目、一份机会，<br/>或任何有趣的设计想法。</p><div className="contact-address"><span className="mono">GET IN TOUCH</span><div><a href={`mailto:${EMAIL}`}>{EMAIL}</a><button className="icon-button" aria-label={copied?'邮箱已复制':'复制邮箱'} onClick={copy}>{copied?<Check size={18}/>:<Copy size={18}/>}</button></div><a href="tel:+8613893057154">+86 138 9305 7154</a><span role="status" className="copy-status">{copied?'邮箱已复制':''}</span></div></div><div className="footer-baseline"><Link to="/" className="footer-mark">M<span>.</span></Link><span className="mono">© 2026 MA QINGLIN</span><button onClick={()=>scrollToTarget(0)}>回到顶部 <ArrowUp size={16}/></button></div></div></footer>
}

export function Home() {return <><div className="opening-sequence"><Hero/><div className="opening-bridge" aria-hidden="true"><div className="bridge-ray"/><div className="bridge-type"><span className="mono">FROM IDEAS TO EXPERIENCES</span><span>让设计，走进真实。</span><ArrowDown/></div></div></div><WorkArchive/><MotionPortal/><AboutPage/><ContactSection/></>}

export function CaseStudy({id}) {
 const meta=projectMeta[id],content=caseContent[id],project=projects.find(p=>p.id===id)
 const next=projectOrder[(projectOrder.indexOf(id)+1)%projectOrder.length]
 const [open,setOpen]=useState(null)
 const [indexOpen,setIndexOpen]=useState(false)
 const active=useActiveSections('[data-case-chapter]',id)
 const gallery=meta.chapters.flatMap(ch=>ch.pages.map(n=>({src:plate(id,n),alt:`${meta.name} · ${ch.title} · 原稿 ${num(n)}`})))
 if(id==='visual')gallery.push({src:'/editorial/visual-supplement.webp',alt:'视觉延展 · AI 海报设计原始合集'})
 return <article className={`study study-${id}`}>
  <section className="study-opening"><div className="study-facet" aria-hidden="true"/><div className="frame"><div className="study-topline"><Link to="/work"><ArrowLeft size={15}/> 全部作品</Link><span className="mono">CASE FILE / {num(projectOrder.indexOf(id)+1)}</span></div><div className="study-title-row"><div><Label n={num(projectOrder.indexOf(id)+1)}>{meta.label}</Label><h1 tabIndex={-1}>{meta.name}<span className="cyan">.</span></h1><p>{meta.english}</p></div><a href="#case-overview" className="study-down" onClick={e=>{e.preventDefault();scrollToTarget('#case-overview')}}><span className="mono">EXPLORE<br/>THE CASE</span><ArrowDown/></a></div><div className="study-keyvisual" data-window style={{background:meta.background}}><Picture src={meta.cover} alt={`${meta.name}项目主视觉`} eager/></div></div></section>
  <section className="study-brief frame" id="case-overview"><div className="brief-statement"><span className="mono">THE DESIGN INTENT</span><RevealTitle>{meta.statement}</RevealTitle></div><div className="brief-content"><p>{meta.description}</p><dl><div><dt>设计职责</dt><dd>{content.role}</dd></div><div><dt>设计领域</dt><dd>{project.category}</dd></div><div><dt>项目范围</dt><dd>{project.scope.join(' / ')}</dd></div></dl></div></section>
  <div className="study-navigation"><div className="frame"><nav aria-label="案例章节">{meta.chapters.map((ch,i)=><a key={ch.title} className={active===i?'active':''} aria-current={active===i?'location':undefined} href={`#case-chapter-${i}`} onClick={e=>{e.preventDefault();scrollToTarget(`#case-chapter-${i}`)}}><span className="mono">{num(i+1)}</span>{navTitles[id][i]}</a>)}</nav><button className={indexOpen?'active':''} aria-expanded={indexOpen} aria-controls="study-sheet" onClick={()=>setIndexOpen(!indexOpen)}><span>原稿索引</span><Plus size={18}/></button></div></div>
  {indexOpen&&<div id="study-sheet" className="study-sheet frame">{gallery.map((item,i)=><button key={item.src} onClick={()=>setOpen(i)} aria-label={`预览原稿${num(i+1)}`}><Picture src={item.src} alt={item.alt}/><span className="mono">{num(i+1)}</span></button>)}</div>}
  <div className="study-story frame">{meta.chapters.map((ch,i)=><section id={`case-chapter-${i}`} key={ch.title} data-case-chapter className="study-chapter"><header className="study-chapter-heading"><span className="chapter-figure" aria-hidden="true">{num(i+1)}</span><div><span className="mono">{ch.label}</span><RevealTitle>{ch.title}</RevealTitle></div><p>{content.chapters[i]}</p></header><div className="study-gallery">{ch.pages.map((n,j)=><figure className={j===0?'chapter-lead-plate':''} key={n} data-plate><div className="plate-meta"><span className="mono">{num(i+1)}.{num(j+1)}</span><span>{ch.title}</span><span className="mono">DETAIL / {num(n)}</span></div><button onClick={()=>setOpen(gallery.findIndex(item=>item.src===plate(id,n)))} aria-label={`放大查看${meta.name}第${n}页`}><Picture src={plate(id,n)} alt={`${meta.name} · ${ch.title} · 原稿第${n}页`}/><span className="inspect-icon"><Expand size={20}/></span></button></figure>)}</div></section>)}</div>
  {id==='visual'&&<section className="study-supplement frame"><Label n="+">VISUAL EXTENSION</Label><button onClick={()=>setOpen(gallery.length-1)} aria-label="查看视觉延展合集"><Picture src="/editorial/visual-supplement.webp" alt="AI 海报设计原始合集"/></button><Link to="/motion" className="line-cta">继续探索主题动效 <ArrowUpRight/></Link></section>}
  <div className="study-end frame"><span className="mono">END OF CASE / {meta.label}</span><a href={`mailto:${EMAIL}`}>交流这个项目 <ArrowUpRight size={17}/></a></div>
  <Link to={`/project/${next}`} className="study-next"><div className="frame"><div><span className="mono">NEXT CASE / {num(projectOrder.indexOf(next)+1)}</span><h2>{projectMeta[next].name}</h2><p>{projectMeta[next].statement}</p></div><div className="next-art"><Picture src={projectMeta[next].cover} alt={projectMeta[next].name}/></div><ArrowUpRight className="next-arrow"/></div></Link>
  <ContactSection/>{open!==null&&<MediaViewer items={gallery} initial={open} onClose={()=>setOpen(null)}/>}
 </article>
}

export function MotionTheatre() {
 const [filter,setFilter]=useState('all')
 const changeFilter=key=>{setFilter(key);requestAnimationFrame(()=>scrollToTarget('#motion-collection-start',true))}
 return <><section className="motion-gallery frame"><div className="gallery-heading"><div><Label n="02">MOTION COLLECTION / 2026</Label><h1 tabIndex={-1}>让每一帧，<br/>都有自己的表情<span className="cyan">。</span></h1></div><div><span className="live-caption"><i/> LIVE GALLERY</span><p>主题的个性，角色的情绪。<br/>滑动浏览，让设计自然发生。</p></div></div>
 <div id="motion-collection-start" aria-hidden="true"/><div className="gallery-toolbar"><div role="group" aria-label="动效作品分类">{[['all','全部',22],['phone','主题皮肤',8],['square','角色表情',14]].map(([key,label,count])=><button key={key} onClick={()=>changeFilter(key)} aria-pressed={filter===key}>{label}<sup>{count}</sup></button>)}</div><span className="mono">AUTO LOOP / 无声循环</span></div>
 {['phone','square'].filter(type=>filter==='all'||type===filter).map(type=><section className={`live-collection collection-${type}`} key={type}><header><h2>{type==='phone'?'主题皮肤':'角色表情'}<span className="cyan"> / </span><span className="mono">{type==='phone'?'THEME SKINS':'CHARACTER EXPRESSIONS'}</span></h2><span className="mono">{type==='phone'?'08':'14'} WORKS</span></header><div className={`live-grid live-${type}`}>{motionItems.filter(item=>item.type===type).map((item,i)=><article className="live-tile" key={item.src}><div className="live-film"><Video item={item}/></div><div className="live-meta"><span>{item.title}</span><span className="mono">{num(i+1)}</span></div></article>)}</div></section>)}
 </section><ContactSection/></>
}

export function MissingPage(){return <section className="missing frame"><Label n="404">OFF THE GRID</Label><h1 tabIndex={-1}>这一页，暂时留白。</h1><Link to="/" className="line-cta">回到首页 <ArrowUpRight/></Link></section>}
