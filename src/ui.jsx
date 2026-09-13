import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {flushSync} from 'react-dom'
import {ArrowLeft, ArrowRight, X, Plus, Minus, ExternalLink} from 'lucide-react'
import dimensions from './asset-dimensions.json'
import videoDimensions from './video-dimensions.json'
import {scrollToTarget} from './use-motion'

export const EMAIL = 'qinglinm71@gmail.com'
export const MotionContext = createContext(false)
export const num = n => String(n).padStart(2, '0')
export const plate = (id,n) => `/projects/${id}/${num(n)}.webp`
export const poster = item => `/posters/${item.src.split('/').pop().replace('.mp4','.webp')}`

export function navigate(to) {
  const url = new URL(to, location.origin)
  if (url.pathname === location.pathname && url.hash) {
    history.pushState({...history.state}, '', to)
    scrollToTarget(url.hash)
    return
  }
  history.replaceState({...history.state, scroll:window.scrollY}, '')
  const update = () => {
    history.pushState({scroll:0}, '', to)
    flushSync(() => window.dispatchEvent(new PopStateEvent('popstate')))
    scrollToTarget(0,true)
    requestAnimationFrame(() => {
      if (url.hash) scrollToTarget(url.hash,true)
      document.querySelector('h1')?.focus({preventScroll:true})
    })
  }
  if (document.startViewTransition && !document.documentElement.classList.contains('motion-paused')) document.startViewTransition(update)
  else update()
}

export function Link({to,children,onClick,...props}) {
  return <a href={to} {...props} onClick={e => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault(); onClick?.(e); navigate(to)
  }}>{children}</a>
}

export function Picture({src,alt,eager=false,...props}) {
  const [width,height] = dimensions[src] || [1600,1000]
  return <img src={src} alt={alt} width={width} height={height} loading={eager?'eager':'lazy'} decoding="async" fetchPriority={eager?'high':'auto'} {...props}/>
}

export function Video({item,controls=false,manual=false,className=''}) {
  const ref = useRef(null)
  const paused = useContext(MotionContext)
  const [loaded,setLoaded] = useState(manual)
  useEffect(() => {
    const node=ref.current
    let visible=false
    const sync=() => {
      if (document.hidden || !visible || (paused && !manual)) node.pause()
      else if (node.currentSrc) node.play().catch(()=>{})
    }
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)setLoaded(true);sync()},{threshold:0,rootMargin:'180px 0px'})
    observer.observe(node); node.addEventListener('loadeddata',sync); document.addEventListener('visibilitychange',sync)
    return ()=>{observer.disconnect();node.removeEventListener('loadeddata',sync);document.removeEventListener('visibilitychange',sync);node.pause()}
  },[item.src,paused,manual])
  const [width,height]=videoDimensions[item.src]||[750,1624]
  return <video width={width} height={height} autoPlay={!paused} ref={ref} className={className} src={loaded?item.src:undefined} poster={poster(item)} muted loop playsInline preload={manual?'metadata':'none'} controls={controls} aria-label={item.title}/>
}

export function RevealTitle({children,as:Tag='h2',className=''}) {
  return <Tag className={className} data-title><span>{children}</span></Tag>
}

export function MediaViewer({items,initial=0,onClose}) {
  const [index,setIndex]=useState(initial)
  const [zoom,setZoom]=useState(false)
  const ref=useRef(null)
  const item=items[index]
  useEffect(()=>{
    const focus=document.activeElement, overflow=document.body.style.overflow
    ref.current.showModal(); document.body.style.overflow='hidden'
    return ()=>{document.body.style.overflow=overflow;focus?.focus({preventScroll:true})}
  },[])
  const change=delta=>{setZoom(false);setIndex(n=>(n+delta+items.length)%items.length)}
  return <dialog ref={ref} className={`viewer ${zoom?'viewer-zoom':''}`} aria-label={item.title||item.alt} onCancel={e=>{e.preventDefault();onClose()}} onKeyDown={e=>{
    if(e.target.tagName==='VIDEO')return
    if(e.key==='ArrowRight'){e.preventDefault();change(1)}
    if(e.key==='ArrowLeft'){e.preventDefault();change(-1)}
  }}>
    <div className="viewer-top"><span className="mono">DESIGN ARCHIVE / {num(index+1)} OF {num(items.length)}</span><div>{!item.src.endsWith('.mp4')&&<button className="icon-button" onClick={()=>setZoom(!zoom)} aria-label={zoom?'适应窗口':'放大原图'}>{zoom?<Minus/>:<Plus/>}</button>}<a className="icon-button" href={item.src} target="_blank" rel="noreferrer" aria-label="新窗口查看原文件"><ExternalLink size={19}/></a><button autoFocus className="icon-button" onClick={onClose} aria-label="关闭预览"><X/></button></div></div>
    <div className="viewer-canvas" data-lenis-prevent key={item.src}>{item.src.endsWith('.mp4')?<Video item={item} controls manual/>:<img src={item.src} alt={item.alt} onClick={()=>setZoom(!zoom)}/>}</div>
    <div className="viewer-bottom"><button className="icon-button" onClick={()=>change(-1)} aria-label="上一件作品"><ArrowLeft/></button><p aria-live="polite">{item.title||item.alt}</p><button className="icon-button" onClick={()=>change(1)} aria-label="下一件作品"><ArrowRight/></button></div>
  </dialog>
}
