import {useEffect,useRef,useState} from 'react'
import {MotionContext} from './ui'
import {Header} from './HeaderHero'
import {Home,WorkArchive,CaseStudy,MotionTheatre,AboutPage,ContactSection,MissingPage} from './Pages'
import {projectMeta} from './project-meta'
import {scrollToTarget,useSmoothScroll,usePageMotion} from './use-motion'

export default function App(){
 const root=useRef(null)
 const [path,setPath]=useState(window.location.pathname.replace(/\/$/,'')||'/')
 const [paused,setPaused]=useState(()=>typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches)
 useSmoothScroll(paused)
 usePageMotion(root,path,paused)
 useEffect(()=>{
  history.scrollRestoration='manual'
  const handler=event=>{setPath(window.location.pathname.replace(/\/$/,'')||'/');requestAnimationFrame(()=>requestAnimationFrame(()=>{if(location.hash)scrollToTarget(location.hash,true);else scrollToTarget(event.state?.scroll||0,true)}))}
  addEventListener('popstate',handler)
  const query=matchMedia('(prefers-reduced-motion: reduce)'), change=e=>setPaused(e.matches)
  query.addEventListener('change',change)
  return()=>{removeEventListener('popstate',handler);query.removeEventListener('change',change)}
 },[])
 useEffect(()=>{document.documentElement.classList.toggle('motion-paused',paused)},[paused])
 useEffect(()=>{
  const m=projectMeta[path.split('/')[2]]
  document.title=m?`${m.name} · 马庆林 UI/UX 作品集`:path==='/motion'?'动效画廊 · 马庆林':path==='/work'?'精选作品 · 马庆林':'马庆林 MA QINGLIN · UI/UX Designer'
  if(location.hash)requestAnimationFrame(()=>scrollToTarget(location.hash,true))
 },[path])
 return <MotionContext.Provider value={paused}><div ref={root} id="top" className={path==='/'?'is-home':'is-inner'}><a className="skip-link" href="#content">跳转至主要内容</a><Header path={path} paused={paused} setPaused={setPaused}/><main id="content" tabIndex={-1}>{path==='/'?<Home/>:path==='/work'?<><WorkArchive standalone/><ContactSection/></>:path==='/motion'?<MotionTheatre/>:path==='/about'?<><AboutPage standalone/><ContactSection/></>:/^\/project\/[^/]+$/.test(path)&&projectMeta[path.split('/')[2]]?<CaseStudy key={path} id={path.split('/')[2]}/>:<MissingPage/>}</main></div></MotionContext.Provider>
}
