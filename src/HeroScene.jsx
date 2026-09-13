/** Geometry reconstructed in SVG, without a screenshot backdrop. */
export default function HeroScene() {
  return <svg className="hero-scene" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <radialGradient id="night" cx="70%" cy="65%" r="80%"><stop stopColor="#111b23"/><stop offset=".65" stopColor="#070b0e"/><stop offset="1" stopColor="#030506"/></radialGradient>
      <linearGradient id="upper-plane" x1="1" y1="0" x2="0" y2="1"><stop stopColor="#3e4850"/><stop offset=".42" stopColor="#1c242b"/><stop offset="1" stopColor="#070b0e"/></linearGradient>
      <radialGradient id="metal-sphere" cx="65%" cy="39%" r="68%"><stop stopColor="#04080c"/><stop offset=".50" stopColor="#091017"/><stop offset=".72" stopColor="#1b2835"/><stop offset=".91" stopColor="#61798e"/><stop offset=".98" stopColor="#bed8ea"/><stop offset="1" stopColor="#e8f5ff"/></radialGradient>
      <linearGradient id="sphere-shade" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#152937" stopOpacity="0"/><stop offset=".7" stopColor="#03070b" stopOpacity=".3"/><stop offset="1" stopColor="#03101a" stopOpacity=".6"/></linearGradient>
      <linearGradient id="rim" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#0073a6"/><stop offset=".18" stopColor="#c8f8ff"/><stop offset=".3" stopColor="#35caff"/><stop offset=".53" stopColor="#9cbbd1"/><stop offset=".8" stopColor="#e5f5ff"/><stop offset="1" stopColor="#16bfff"/></linearGradient>
      <linearGradient id="slab" gradientUnits="userSpaceOnUse" x1="1000" y1="790" x2="1300" y2="1100"><stop stopColor="#9aaebb"/><stop offset=".19" stopColor="#5b6e7c"/><stop offset=".46" stopColor="#303f4a"/><stop offset=".72" stopColor="#17212a"/><stop offset="1" stopColor="#050a0d"/></linearGradient>
      <linearGradient id="cut-edge" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#cadce7"/><stop offset=".45" stopColor="#c7ecfc"/><stop offset=".72" stopColor="#48d9ff"/><stop offset="1" stopColor="#32607d"/></linearGradient>
      <linearGradient id="slab-shadow" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#02070b" stopOpacity=".02"/><stop offset="1" stopColor="#02070b" stopOpacity=".6"/></linearGradient>
      <radialGradient id="sphere-edge"><stop offset=".88" stopColor="#9dbbd1" stopOpacity="0"/><stop offset=".985" stopColor="#a7c5dc" stopOpacity=".22"/><stop offset="1" stopColor="#dceaf6" stopOpacity=".7"/></radialGradient>
      <radialGradient id="blue-halo"><stop stopColor="#9eeeff" stopOpacity=".7"/><stop offset=".17" stopColor="#1bc3ff" stopOpacity=".42"/><stop offset=".47" stopColor="#169edf" stopOpacity=".16"/><stop offset="1" stopColor="#149ded" stopOpacity="0"/></radialGradient>
      <filter id="metal-grain" x="0%" y="0%" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
      <filter id="light-blur"><feGaussianBlur stdDeviation="10"/></filter>
      <filter id="light-core"><feGaussianBlur stdDeviation="2.8"/></filter>
      <clipPath id="cut-band"><path d="M700 928L1600 89L1671 171L771 1010Z"/></clipPath>
      <clipPath id="ball-clip"><circle cx="1205" cy="550" r="347"/></clipPath>
      <clipPath id="slab-clip"><path d="M 350 1400 L 1672 158 L 1672 627 L 865 1400 Z"/></clipPath>
      <linearGradient id="left-shadow"><stop stopColor="#030506" stopOpacity=".35"/><stop offset=".7" stopColor="#030506" stopOpacity="0"/></linearGradient>
    </defs>
    <path fill="url(#night)" d="M0 0H1672V941H0Z"/>
    <g className="scene-back-plane"><path d="M660 0H1110L660 451Z" fill="url(#upper-plane)"/><path d="M1110 0L660 451" stroke="#acbac5" strokeWidth="1.1"/><path d="M487 941L945 493L1113 941Z" fill="#142029" opacity=".23"/><path d="M487 941L862 575" stroke="#60849a" strokeOpacity=".25"/></g>
    <g stroke="#a5bac7" strokeWidth="1" opacity=".27" fill="none"><path d="M660 0V941 M985 126H1672 M1405 126V941 M1567 0V941 M660 435H1190 M819 435V941 M1146 510H1672 M660 779H1340"/></g>
    <g className="orb-parallax"><g className="orb-ambient"><g className="orb-float">
      <ellipse cx="879" cy="609" rx="165" ry="192" fill="url(#blue-halo)" className="rim-halo"/><ellipse cx="1410" cy="291" rx="170" ry="172" fill="url(#blue-halo)" className="rim-halo"/>
      <circle cx="1205" cy="550" r="347" fill="url(#metal-sphere)"/>
      <g clipPath="url(#ball-clip)"><path d="M858 203H1552V897H858Z" fill="#6c7a86" filter="url(#metal-grain)" opacity=".075"/><circle cx="1205" cy="550" r="347" fill="url(#sphere-shade)"/></g>
      <circle cx="1205" cy="550" r="347" stroke="url(#rim)" strokeWidth="1.25" fill="none"/>
      <circle cx="1205" cy="550" r="347" fill="url(#sphere-edge)"/>
      <path d="M863 496 A347 347 0 0 0 982 816 M1340 230 A347 347 0 0 1 1476 334" fill="none" stroke="#00aeff" strokeWidth="12" filter="url(#light-blur)"/>
      <path d="M861 521 A347 347 0 0 0 920 749 M1364 242 A347 347 0 0 1 1476 334" fill="none" stroke="#42d8ff" strokeWidth="5" filter="url(#light-core)"/>
      <path d="M861 533 A347 347 0 0 0 920 749 M1383 253 A347 347 0 0 1 1476 334" fill="none" stroke="#c7faff" strokeWidth="2.5"/>
      <circle className="orbit-tracer" cx="1205" cy="550" r="346.5" fill="none" stroke="#a3f1ff" strokeWidth="2.5" strokeDasharray="105 2075" filter="url(#light-core)"/>
      <g clipPath="url(#ball-clip)"><path d="M700 928L1600 89L1671 171L771 1010Z" fill="#030709"/><path d="M700 928L1600 89" stroke="#80acc6" strokeWidth=".8"/><g clipPath="url(#cut-band)"><path d="M1146 510H1567M1146 510V941M1405 126V941" stroke="#a5bac7" strokeOpacity=".25" fill="none"/></g></g><circle cx="1205" cy="550" r="347" fill="none" stroke="url(#rim)" strokeWidth="1.2"/>
    </g></g></g>
    <g className="scene-front-plane">
      <path d="M350 1400L1672 158V627L865 1400Z" fill="url(#slab)"/>
      <path d="M350 1400L1672 158V627L865 1400Z" fill="url(#slab-shadow)"/>
      <g clipPath="url(#slab-clip)"><path d="M350 158H1672V1400H350Z" filter="url(#metal-grain)" fill="#8597a7" opacity=".065"/><path d="M1405 158V941 M1567 158V941 M839 510H1672" fill="none" stroke="#8798a4" opacity=".22"/></g>
      <path d="M350 1400L1672 158" stroke="url(#cut-edge)" strokeWidth="1.7"/><path d="M1318 491L1500 320" stroke="#02baff" strokeWidth="8" filter="url(#light-blur)" className="rim-halo"/><path d="M1343 468L1496 323" stroke="#b9f6ff" strokeWidth="1.8"/><path d="M865 1400L1672 627" stroke="#647581" strokeOpacity=".45"/>
    </g>
    <path className="grid-signal" d="M660 941V779H819V435H1130" fill="none" stroke="#27d1ff" strokeWidth="1.1" strokeDasharray="60 1800" opacity=".45"/>
    <path fill="url(#left-shadow)" d="M0 0H1672V941H0Z"/>
  </svg>
}
