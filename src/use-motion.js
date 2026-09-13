import {useEffect,useLayoutEffect} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger)
let smoothScroll
export function scrollToTarget(target,immediate=false){
 let destination=target
 if(typeof target==='string'){
  const node=document.getElementById(decodeURIComponent(target.replace(/^#/,'')))
  if(!node)return
  const header=document.querySelector('.site-header')?.offsetHeight||78
  const extra=node.matches('[data-case-chapter]')?90:node.matches('[data-work-scene]')&&innerWidth<=760?65:20
  destination=Math.max(0,scrollY+node.getBoundingClientRect().top-header-extra)
 }
 if(smoothScroll)smoothScroll.scrollTo(destination,{immediate})
 else window.scrollTo({top:destination,behavior:immediate||document.documentElement.classList.contains('motion-paused')||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
}
export function useSmoothScroll(paused){
 useEffect(()=>{
  if(paused||matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const lenis=new Lenis({duration:1.1,smoothWheel:true,syncTouch:false,prevent:node=>node.closest('dialog, [data-lenis-prevent]')})
  smoothScroll=lenis;lenis.on('scroll',ScrollTrigger.update)
  const tick=time=>lenis.raf(time*1000)
  gsap.ticker.add(tick)
  return()=>{gsap.ticker.remove(tick);lenis.destroy();smoothScroll=undefined}
 },[paused])
}
export function usePageMotion(root,key,paused){
 useLayoutEffect(()=>{
  if(paused||matchMedia('(prefers-reduced-motion: reduce)').matches)return
  let ambient,observer,mm,alive=true
  const contextCleanups=[]
  const context=gsap.context(()=>{
   if(root.current.querySelector('.hero')){
    gsap.from('.hero-char',{yPercent:110,rotate:4,duration:1.3,stagger:.085,ease:'power4.out',clearProps:'all'})
    gsap.from('.hero-year>span,.hero-subtitle,.noir-byline>p,.hero-principle>p,.hero-contacts>a',{y:22,opacity:0,duration:1.1,stagger:.09,delay:.2,ease:'power3.out',clearProps:'all'})

    ambient=gsap.timeline({repeat:-1,yoyo:true})
    ambient.to('.orb-ambient',{y:-9,x:3,rotation:.6,transformOrigin:'1205px 550px',duration:5,ease:'sine.inOut'},0)
    ambient.to('.rim-halo',{opacity:.48,duration:2.5,repeat:1,yoyo:true,ease:'sine.inOut'},0)
    const tracer=gsap.to('.orbit-tracer',{strokeDashoffset:-2180,duration:13,repeat:-1,ease:'none'})
    const signal=gsap.fromTo('.grid-signal',{strokeDashoffset:1900},{strokeDashoffset:0,duration:9,repeat:-1,ease:'none'})
    const ambientSync=visible=>{const play=visible&&!document.hidden;[ambient,tracer,signal].forEach(t=>play?t.play():t.pause())}
    let visible=true
    observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;ambientSync(visible)},{threshold:.02});observer.observe(document.querySelector('.hero'))
    const onVisibility=()=>ambientSync(visible)
    document.addEventListener('visibilitychange',onVisibility)
    contextCleanups.push(()=>document.removeEventListener('visibilitychange',onVisibility))
   }
   gsap.utils.toArray('[data-title]').forEach(el=>gsap.from(el.firstElementChild,{yPercent:105,rotation:1.5,duration:1.15,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 92%',once:true},clearProps:'transform'}))
   gsap.utils.toArray('[data-window]').forEach(el=>{
    gsap.fromTo(el,{clipPath:'polygon(0 12%,80% 12%,100% 35%,100% 100%,0 100%)'},{clipPath:'polygon(0 0,100% 0,100% 0,100% 100%,0 100%)',duration:1.25,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true},clearProps:'clipPath'})
   })
   gsap.utils.toArray('[data-plate]').forEach(el=>gsap.from(el,{y:55,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true},clearProps:'transform'}))
   gsap.utils.toArray('.project-card').forEach((el,i)=>gsap.fromTo(el,{clipPath:'polygon(0 8%,85% 8%,100% 25%,100% 100%,0 100%)',y:28},{clipPath:'polygon(0 0,100% 0,100% 0,100% 100%,0 100%)',y:0,duration:.9,delay:(i%3)*.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 95%',once:true},clearProps:'clipPath,transform'}))
   mm=gsap.matchMedia()
   mm.add('(min-width: 761px)',()=>{
    if(document.querySelector('.opening-sequence')){
     const handoff=gsap.timeline({scrollTrigger:{trigger:'.opening-sequence',start:'top top',end:'bottom bottom',scrub:.55}})
     handoff.fromTo('.noir-heading',{y:0,opacity:1},{y:-90,opacity:0,ease:'power1.in'},0)
     handoff.fromTo('.hero-year,.noir-byline,.hero-principle,.hero-contacts,.hero-edition,.vertical-caption,.hero-signature,.hero-rail,.noir-scroll',{y:0,opacity:1},{y:-50,opacity:0,stagger:.015,ease:'power1.in'},0)
     handoff.to('.orb-parallax',{x:115,y:-80,rotation:8,scale:.92,transformOrigin:'1205px 550px',ease:'none'},0)
     handoff.to('.scene-front-plane',{x:190,y:-35,ease:'none'},0)
     handoff.to('.scene-back-plane',{x:-80,y:-35,ease:'none'},0)
     handoff.fromTo('.hero-scene',{opacity:1},{opacity:.2,ease:'power1.in'},.45)
     handoff.fromTo('.opening-bridge',{opacity:0},{opacity:1,ease:'power2.out'},.30)
     handoff.from('.bridge-type',{y:100,ease:'power2.out'},.30)
     handoff.from('.bridge-ray',{scaleX:0,transformOrigin:'right center',ease:'power2.out'},.35)
    }
    if(document.querySelector('.gateway-films')){
     gsap.fromTo('.gateway-films',{y:35},{y:-25,ease:'none',scrollTrigger:{trigger:'.motion-gateway',start:'top bottom',end:'bottom top',scrub:.7}})
     gsap.fromTo('.gateway-orb',{rotation:-43},{rotation:-30,ease:'none',scrollTrigger:{trigger:'.motion-gateway',start:'top bottom',end:'bottom top',scrub:1}})
    }
   })
   const resizeObserver=new ResizeObserver(()=>ScrollTrigger.refresh());resizeObserver.observe(root.current);contextCleanups.push(()=>resizeObserver.disconnect())
   ScrollTrigger.refresh()
  },root)
  function refresh(){if(alive)ScrollTrigger.refresh()}
  addEventListener('load',refresh);document.fonts.ready.then(refresh)
  return()=>{alive=false;observer?.disconnect();contextCleanups.forEach(fn=>fn());removeEventListener('load',refresh);mm?.revert();context.revert()}
 },[root,key,paused])
}
