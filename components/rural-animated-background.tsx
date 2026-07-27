'use client'

import { useEffect, useState } from 'react'

export function RuralAnimatedBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax offsets
  const skyOffset       = scrollY * 0.08
  const cloudOffset     = scrollY * 0.14
  const birdOffset      = scrollY * 0.20
  const farHillOffset   = scrollY * 0.26
  const midHillOffset   = scrollY * 0.34
  const foregroundOffset= scrollY * 0.42

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Base sky gradient — slightly deepened sky top → rich green bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, #eef6e8 0%, #e0f2d4 20%, #cce6b2 45%, #a2d674 62%, #72ba3b 80%, #4e9e1c 100%)',
          transform: `translateY(${skyOffset}px)`,
          willChange: 'transform',
        }}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMax slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <style>{`
            @keyframes td-cloud-a  { 0%,100%{transform:translateX(0)}   50%{transform:translateX(22px)} }
            @keyframes td-cloud-b  { 0%,100%{transform:translateX(0)}   50%{transform:translateX(-18px)} }
            @keyframes td-paddy    { 0%,100%{transform:skewX(0deg)}     50%{transform:skewX(1.5deg)} }
            @keyframes td-node     { 0%,100%{transform:translateY(0);opacity:.45} 50%{transform:translateY(-12px);opacity:.85} }
            @keyframes td-bird     { 0%{transform:translate(0,0)}       100%{transform:translate(520px,-65px)} }
            @keyframes td-bird2    { 0%{transform:translate(0,0)}       100%{transform:translate(480px,-40px)} }
            @keyframes td-leaf     { 0%,100%{transform:rotate(-3deg)}   50%{transform:rotate(3deg)} }
            @keyframes td-leaf2    { 0%,100%{transform:rotate(-3.5deg)} 50%{transform:rotate(3.5deg)} }
            @keyframes td-palm     { 0%,100%{transform:rotate(-5deg)}   50%{transform:rotate(5deg)} }
            /* Villager walk bob */
            @keyframes td-walk     { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-3px)} }
            @keyframes td-walk2    { 0%,100%{transform:translateY(-1px)} 50%{transform:translateY(2px)} }
            /* Arm swing */
            @keyframes td-arm-l    { 0%,100%{transform:rotate(-18deg)}  50%{transform:rotate(18deg)} }
            @keyframes td-arm-r    { 0%,100%{transform:rotate(18deg)}   50%{transform:rotate(-18deg)} }
            /* Old man head nod */
            @keyframes td-nod      { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
          `}</style>

          {/* Natural paddy field gradient */}
          <linearGradient id="paddy-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a0dc70" />
            <stop offset="100%" stopColor="#70b845" />
          </linearGradient>

          <linearGradient id="hill-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#82c45c" />
            <stop offset="100%" stopColor="#5a9e3e" />
          </linearGradient>
          <linearGradient id="hill-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5db040" />
            <stop offset="100%" stopColor="#3d8028" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#68c048" />
            <stop offset="100%" stopColor="#4a9030" />
          </linearGradient>

          {/* Top subtle sky blend */}
          <linearGradient id="top-hint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f4faf0" stopOpacity="0.6" />
            <stop offset="18%"  stopColor="#f4faf0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* === CLOUDS PARALLAX (Layer 1) === */}
        <g style={{ transform: `translateY(${cloudOffset}px)`, willChange: 'transform' }}>
          <g style={{ animation: 'td-cloud-a 11s ease-in-out infinite' }} opacity="0.8">
            <ellipse cx="160" cy="65" rx="75" ry="23" fill="white" />
            <ellipse cx="218" cy="58" rx="55" ry="19" fill="white" />
            <ellipse cx="112" cy="72" rx="42" ry="15" fill="white" />
          </g>
          <g style={{ animation: 'td-cloud-b 14s ease-in-out infinite' }} opacity="0.72">
            <ellipse cx="830" cy="48" rx="85" ry="25" fill="white" />
            <ellipse cx="900" cy="41" rx="58" ry="19" fill="white" />
            <ellipse cx="775" cy="56" rx="46" ry="16" fill="white" />
          </g>
          <g style={{ animation: 'td-cloud-a 17s ease-in-out infinite 5s' }} opacity="0.68">
            <ellipse cx="1240" cy="62" rx="70" ry="22" fill="white" />
            <ellipse cx="1298" cy="55" rx="52" ry="18" fill="white" />
            <ellipse cx="1198" cy="70" rx="40" ry="14" fill="white" />
          </g>
        </g>

        {/* === BIRDS PARALLAX (Layer 2) === */}
        <g style={{ transform: `translateY(${birdOffset}px)`, willChange: 'transform' }}>
          <g style={{ animation: 'td-bird 20s linear infinite' }} opacity="0.6" transform="translate(-60,90)">
            <path d="M0 0 Q7-6 14 0 Q21-6 28 0" stroke="#2F6E3F" strokeWidth="2" fill="none" />
            <path d="M35 4 Q42-2 49 4 Q56-2 63 4" stroke="#2F6E3F" strokeWidth="2" fill="none" />
          </g>
          <g style={{ animation: 'td-bird2 28s linear infinite 10s' }} opacity="0.45" transform="translate(-90,130)">
            <path d="M0 0 Q6-4 12 0 Q18-4 24 0" stroke="#3d8028" strokeWidth="1.5" fill="none" />
          </g>
        </g>

        {/* === FAR HILLS PARALLAX (Layer 3) === */}
        <g style={{ transform: `translateY(${farHillOffset}px)`, willChange: 'transform' }}>
          <path
            d="M-100 260 Q250 155 480 215 Q660 165 860 205 Q1060 158 1260 198 Q1380 168 1540 210 L1540 560 L-100 560 Z"
            fill="url(#hill-far)"
            opacity="0.65"
          />
        </g>

        {/* === MID HILLS PARALLAX (Layer 4) === */}
        <g style={{ transform: `translateY(${midHillOffset}px)`, willChange: 'transform' }}>
          <path
            d="M-100 330 Q140 265 295 292 Q420 252 565 280 Q695 250 835 276 Q960 246 1100 270 Q1240 248 1380 275 L1540 278 L1540 560 L-100 560 Z"
            fill="url(#hill-mid)"
            opacity="0.82"
          />
          {/* Terrace contour lines */}
          <path d="M-100 322 Q220 308 450 318 Q680 302 900 312 Q1120 296 1350 308 L1540 310" stroke="#2e7020" strokeWidth="1.8" fill="none" opacity="0.45" />
          <path d="M-100 340 Q230 326 460 336 Q690 320 920 330 Q1140 314 1360 326 L1540 328" stroke="#2e7020" strokeWidth="1.4" fill="none" opacity="0.35" />
        </g>

        {/* === FOREGROUND SCENE PARALLAX (Layer 5 - Sawah, Trees, Houses, Villagers, Rocks) === */}
        <g style={{ transform: `translateY(${foregroundOffset}px)`, willChange: 'transform' }}>
          {/* Sawah terasering utuh */}
          <g style={{ animation: 'td-paddy 6s ease-in-out infinite' }}>
            <path
              d="M-100 365 Q220 352 450 362 Q680 355 900 365 Q1150 352 1540 360 L1540 460 L-100 460 Z"
              fill="url(#paddy-grad)"
              opacity="1"
            />
          </g>

          {/* Tanah depan */}
          <path
            d="M-100 448 Q220 432 445 442 Q660 426 880 438 Q1060 424 1240 436 L1540 432 L1540 560 L-100 560 Z"
            fill="url(#ground)"
            opacity="1"
          />

          {/* === TREES & PALM TREES (BEHIND Houses) === */}
          <rect x="36" y="322" width="9" height="30" fill="#5a3818" rx="3" />
          <g style={{ animation: 'td-leaf 4s ease-in-out infinite', transformOrigin: '40px 322px' }}>
            <ellipse cx="40" cy="306" rx="26" ry="30" fill="#2d7820" />
            <ellipse cx="40" cy="290" rx="18" ry="22" fill="#3a9a2a" />
            <ellipse cx="40" cy="278" rx="12" ry="15" fill="#48b832" />
          </g>

          <rect x="68" y="330" width="8" height="24" fill="#5a3818" rx="3" />
          <g style={{ animation: 'td-leaf2 5.2s ease-in-out infinite 1.3s', transformOrigin: '72px 330px' }}>
            <ellipse cx="72" cy="317" rx="22" ry="26" fill="#359030" />
            <ellipse cx="72" cy="304" rx="15" ry="19" fill="#44aa3c" />
          </g>

          <rect x="1354" y="318" width="9" height="32" fill="#5a3818" rx="3" />
          <g style={{ animation: 'td-leaf 3.8s ease-in-out infinite 0.6s', transformOrigin: '1358px 318px' }}>
            <ellipse cx="1358" cy="300" rx="28" ry="32" fill="#2d7820" />
            <ellipse cx="1358" cy="283" rx="19" ry="23" fill="#3a9a2a" />
            <ellipse cx="1358" cy="270" rx="13" ry="16" fill="#48b832" />
          </g>

          <rect x="1386" y="326" width="8" height="26" fill="#5a3818" rx="3" />
          <g style={{ animation: 'td-leaf2 4.8s ease-in-out infinite 2.4s', transformOrigin: '1390px 326px' }}>
            <ellipse cx="1390" cy="313" rx="21" ry="24" fill="#359030" />
            <ellipse cx="1390" cy="300" rx="14" ry="18" fill="#44aa3c" />
          </g>

          <rect x="596" y="318" width="8" height="28" fill="#5a3818" rx="3" />
          <g style={{ animation: 'td-leaf 4.4s ease-in-out infinite 1.8s', transformOrigin: '600px 318px' }}>
            <ellipse cx="600" cy="303" rx="24" ry="28" fill="#2d7820" />
            <ellipse cx="600" cy="289" rx="16" ry="20" fill="#3a9a2a" />
          </g>

          <rect x="822" y="314" width="9" height="30" fill="#5a3818" rx="3" />
          <g style={{ animation: 'td-leaf2 5.8s ease-in-out infinite 0.4s', transformOrigin: '826px 314px' }}>
            <ellipse cx="826" cy="298" rx="26" ry="29" fill="#2d7820" />
            <ellipse cx="826" cy="283" rx="17" ry="21" fill="#3a9a2a" />
            <ellipse cx="826" cy="270" rx="11" ry="14" fill="#48b832" />
          </g>

          {/* Pohon Kelapa */}
          <path d="M157 348 Q155 318 153 292 Q152 276 157 262" stroke="#6b4820" strokeWidth="6" fill="none" strokeLinecap="round" />
          <g style={{ animation: 'td-palm 3.5s ease-in-out infinite 1s', transformOrigin: '157px 262px' }}>
            <path d="M157 266 Q128 250 106 264" stroke="#3a8828" strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.9" />
            <path d="M157 271 Q186 257 206 268" stroke="#48a030" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.9" />
            <path d="M157 268 Q162 244 174 237" stroke="#3a8828" strokeWidth="9"  fill="none" strokeLinecap="round" opacity="0.85" />
            <path d="M157 269 Q143 245 130 240" stroke="#3a8828" strokeWidth="8"  fill="none" strokeLinecap="round" opacity="0.8" />
          </g>

          <path d="M1270 348 Q1268 316 1266 288 Q1265 272 1270 258" stroke="#6b4820" strokeWidth="6" fill="none" strokeLinecap="round" />
          <g style={{ animation: 'td-palm 4s ease-in-out infinite 2.2s', transformOrigin: '1270px 258px' }}>
            <path d="M1270 262 Q1242 246 1220 258" stroke="#3a8828" strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.9" />
            <path d="M1270 267 Q1298 253 1318 264" stroke="#48a030" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.9" />
            <path d="M1270 264 Q1275 240 1287 233" stroke="#3a8828" strokeWidth="9"  fill="none" strokeLinecap="round" opacity="0.85" />
            <path d="M1270 265 Q1256 241 1243 236" stroke="#3a8828" strokeWidth="8"  fill="none" strokeLinecap="round" opacity="0.8" />
          </g>

          {/* === DIRT PATH === */}
          <path
            d="M660 560 Q690 460 701 392 L717 392 Q738 460 780 560 Z"
            fill="#c8a870"
            opacity="0.8"
          />
          <line x1="702" y1="410" x2="716" y2="410" stroke="#b09060" strokeWidth="1.2" opacity="0.55" />
          <line x1="695" y1="445" x2="735" y2="445" stroke="#b09060" strokeWidth="1.2" opacity="0.5" />
          <line x1="680" y1="490" x2="760" y2="490" stroke="#b09060" strokeWidth="1"   opacity="0.42" />

          {/* === BEBATUAN & RUMPUN RUMPUT === */}
          <g id="rocks-and-grass">
            <ellipse cx="692" cy="435" rx="8"  ry="5" fill="#7a8278" opacity="0.9" />
            <ellipse cx="690" cy="433" rx="6"  ry="3" fill="#9ba498" opacity="0.7" />

            <ellipse cx="788" cy="442" rx="10" ry="6" fill="#6e766c" opacity="0.9" />
            <ellipse cx="786" cy="440" rx="7"  ry="4" fill="#90988a" opacity="0.75" />

            <ellipse cx="55"  cy="375" rx="9"  ry="5" fill="#70786e" opacity="0.85" />
            <ellipse cx="162" cy="375" rx="7"  ry="4" fill="#889086" opacity="0.9" />
            <ellipse cx="168" cy="377" rx="4"  ry="2.5" fill="#586056" opacity="0.8" />

            <ellipse cx="1245" cy="368" rx="10" ry="5.5" fill="#747c72" opacity="0.9" />
            <ellipse cx="1242" cy="366" rx="6"  ry="3" fill="#9aa298" opacity="0.7" />
            <ellipse cx="1355" cy="370" rx="8"  ry="4.5" fill="#626a60" opacity="0.85" />

            <path d="M682 428 Q679 421 677 418 M682 428 Q682 420 683 417 M682 428 Q685 421 688 419" stroke="#3d8525" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M796 438 Q793 430 790 427 M796 438 Q796 429 797 426 M796 438 Q799 430 802 428" stroke="#3d8525" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M165 370 Q162 363 159 360 M165 370 Q165 362 167 359 M165 370 Q168 363 171 361" stroke="#357820" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M1238 362 Q1235 355 1232 352 M1238 362 Q1238 354 1240 351 M1238 362 Q1241 355 1244 353" stroke="#357820" strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* === HOUSES === */}
          <g transform="translate(78,308)">
            <rect x="0" y="30" width="66" height="52" fill="#f5e6c2" rx="2" />
            <polygon points="33,-6 -10,30 76,30" fill="#c26838" />
            <polygon points="33,-10 26,0 40,0" fill="#8b4020" />
            <rect x="24" y="54" width="18" height="28" fill="#8b6230" rx="2" />
            <rect x="4"  y="38" width="14" height="12" fill="#a8d4ee" rx="1" opacity="0.9" />
            <rect x="47" y="38" width="14" height="12" fill="#a8d4ee" rx="1" opacity="0.9" />
            <rect x="46" y="6"  width="10" height="18" fill="#8b4020" />
          </g>

          <g transform="translate(1268,298)">
            <rect x="0" y="30" width="74" height="54" fill="#eedeca" rx="2" />
            <polygon points="37,-9 -12,30 86,30" fill="#b56235" />
            <polygon points="37,-13 30,-2 44,-2" fill="#7a3a18" />
            <rect x="27" y="57" width="20" height="27" fill="#7a5230" rx="2" />
            <rect x="5"  y="38" width="16" height="13" fill="#a8d4ee" rx="1" opacity="0.9" />
            <rect x="53" y="38" width="16" height="13" fill="#a8d4ee" rx="1" opacity="0.9" />
            <rect x="52" y="4"  width="11" height="20" fill="#7a3a18" />
          </g>

          <g transform="translate(685,336)">
            <rect x="0" y="20" width="48" height="36" fill="#f0d8a2" rx="1" />
            <polygon points="24,-6 -8,20 56,20" fill="#c87038" />
            <rect x="16" y="34" width="16" height="22" fill="#7a5230" rx="1" />
            <rect x="3"  y="26" width="10" height="9"  fill="#a8d4ee" rx="1" opacity="0.85" />
            <rect x="35" y="26" width="10" height="9"  fill="#a8d4ee" rx="1" opacity="0.85" />
          </g>

          {/* === VILLAGERS === */}
          <g transform="translate(170, 400)">
            <g style={{ animation: 'td-walk 1.1s ease-in-out infinite' }}>
              <line x1="0" y1="28" x2="-6" y2="46" stroke="#5a3010" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="28" x2="6" y2="46" stroke="#5a3010" strokeWidth="3.5" strokeLinecap="round" />
              <rect x="-8" y="12" width="16" height="18" fill="#3a6fba" rx="4" />
              <g transform="translate(-8, 14)">
                <g style={{ animation: 'td-arm-l 1.1s ease-in-out infinite' }}>
                  <line x1="0" y1="0" x2="-10" y2="14" stroke="#c8845a" strokeWidth="3" strokeLinecap="round" />
                </g>
              </g>
              <g transform="translate(8, 14)">
                <g style={{ animation: 'td-arm-r 1.1s ease-in-out infinite' }}>
                  <line x1="0" y1="0" x2="10" y2="14" stroke="#c8845a" strokeWidth="3" strokeLinecap="round" />
                </g>
              </g>
              <circle cx="0" cy="5" r="8" fill="#c8845a" />
              <ellipse cx="0" cy="-2" rx="16" ry="5" fill="#c8a240" />
              <ellipse cx="0" cy="-5" rx="8" ry="6" fill="#b89030" />
            </g>
          </g>

          <g transform="translate(610, 408)">
            <g style={{ animation: 'td-walk2 1.4s ease-in-out infinite 0.3s' }}>
              {/* Rok */}
              <ellipse cx="0" cy="34" rx="9" ry="14" fill="#e05a8a" />
              {/* Badan + kebaya */}
              <rect x="-7" y="12" width="14" height="18" fill="#e8a0c0" rx="3" />
              {/* Kepala */}
              <circle cx="0" cy="4" r="7.5" fill="#c8845a" />
              {/* Rambut sanggul */}
              <ellipse cx="0" cy="1" rx="7.5" ry="4" fill="#3a2010" />
              <circle cx="-6" cy="3" r="3" fill="#3a2010" />
              {/* Keranjang menempel tepat di atas kepala */}
              <ellipse cx="0" cy="-5" rx="9" ry="4" fill="#c8943a" />
              <ellipse cx="0" cy="-8" rx="7" ry="3" fill="#b8840a" />
              {/* Isi keranjang (sayuran/buah) */}
              <ellipse cx="-2" cy="-10" rx="3.5" ry="2" fill="#68b830" />
              <ellipse cx="3"  cy="-10" rx="3"   ry="2" fill="#e04030" />
              {/* Tangan diangkat memegang keranjang di atas kepala */}
              <path d="M-7 15 Q-12 5 -7 -3" stroke="#c8845a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M7 15 Q12 5 7 -3"   stroke="#c8845a" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          </g>

          <g transform="translate(750, 418)">
            <g style={{ animation: 'td-walk2 1.6s ease-in-out infinite 0.5s' }}>
              <line x1="-3" y1="20" x2="-5" y2="35" stroke="#6a3818" strokeWidth="3" strokeLinecap="round" />
              <line x1="3"  y1="20" x2="5"  y2="35" stroke="#6a3818" strokeWidth="3" strokeLinecap="round" />
              <rect x="-6" y="8" width="12" height="14" fill="#e03030" rx="3" />
              <line x1="-6" y1="10" x2="-12" y2="20" stroke="#c8845a" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="6"  y1="10" x2="12"  y2="20" stroke="#c8845a" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="3" r="6" fill="#c8845a" />
              <ellipse cx="0" cy="-1" rx="6" ry="3.5" fill="#2a1808" />
            </g>
          </g>

          <g transform="translate(830, 405)">
            <line x1="-3" y1="28" x2="-7" y2="46" stroke="#5a3010" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="3"  y1="28" x2="7"  y2="46" stroke="#5a3010" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="-8" y="11" width="16" height="19" fill="#2d6020" rx="4" />
            <line x1="14" y1="-8" x2="8" y2="46" stroke="#8a5a20" strokeWidth="3" strokeLinecap="round" />
            <rect x="8" y="-10" width="14" height="6" fill="#666" rx="2" transform="rotate(-20,14,-8)" />
            <line x1="8" y1="13" x2="12" y2="5" stroke="#c8845a" strokeWidth="3" strokeLinecap="round" />
            <line x1="-8" y1="16" x2="-16" y2="24" stroke="#c8845a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="4" r="8" fill="#b87848" />
            <rect x="-9" y="-4" width="18" height="5" fill="#6a4010" rx="2" />
            <rect x="-6" y="-10" width="12" height="8" fill="#7a4818" rx="2" />
          </g>

          <g transform="translate(1240, 403)">
            <g style={{ animation: 'td-walk2 2s ease-in-out infinite 1s' }}>
              <line x1="-3" y1="28" x2="-5" y2="46" stroke="#5a3010" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="3"  y1="28" x2="5"  y2="46" stroke="#5a3010" strokeWidth="3.5" strokeLinecap="round" />
              <ellipse cx="0" cy="36" rx="8" ry="12" fill="#5050d0" />
              <rect x="-7" y="11" width="14" height="18" fill="#f0f0ff" rx="3" />
              <line x1="7" y1="13" x2="14" y2="10" stroke="#c8845a" strokeWidth="3" strokeLinecap="round" />
              <rect x="14" y="5" width="6" height="9" fill="#222" rx="1" />
              <rect x="15" y="6" width="4" height="7" fill="#60b0ff" rx="0.5" />
              <line x1="-7" y1="14" x2="-14" y2="22" stroke="#c8845a" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="4" r="7.5" fill="#c0784a" />
              <path d="M-7.5 2 Q-10 10 -8 18" stroke="#2a1808" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M7.5 2 Q10 10 8 18" stroke="#2a1808" strokeWidth="4" fill="none" strokeLinecap="round" />
              <ellipse cx="0" cy="0" rx="7.5" ry="4" fill="#2a1808" />
            </g>
          </g>

          <g transform="translate(1330, 415)">
            <line x1="-6" y1="20" x2="-12" y2="36" stroke="#5a3010" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="6"  y1="20" x2="12"  y2="36" stroke="#5a3010" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="-14" y="34" width="28" height="5" fill="#8a5a28" rx="2" />
            <line x1="-10" y1="39" x2="-10" y2="48" stroke="#8a5a28" strokeWidth="2.5" />
            <line x1="10"  y1="39" x2="10"  y2="48" stroke="#8a5a28" strokeWidth="2.5" />
            <rect x="-9" y="8" width="18" height="14" fill="#8040a0" rx="3" />
            <line x1="-9" y1="12" x2="9" y2="12" stroke="#c080e0" strokeWidth="1" />
            <line x1="-9" y1="16" x2="9" y2="16" stroke="#c080e0" strokeWidth="1" />
            <line x1="-9" y1="11" x2="-14" y2="24" stroke="#b87040" strokeWidth="3" strokeLinecap="round" />
            <line x1="9"  y1="11" x2="14"  y2="24" stroke="#b87040" strokeWidth="3" strokeLinecap="round" />
            <g transform="translate(0, 6)">
              <g style={{ animation: 'td-nod 3s ease-in-out infinite' }}>
                <circle cx="0" cy="-5" r="8" fill="#b07040" />
                <ellipse cx="0" cy="-11" rx="8" ry="4" fill="#e0e0e0" />
                <line x1="-5" y1="-2" x2="-1" y2="-3" stroke="#e0e0e0" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="5"  y1="-2" x2="1"  y2="-3" stroke="#e0e0e0" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </g>
          </g>

          {/* Node AI Particles */}
          {([
            [320, 185, '0s',   '3.6s'],
            [748, 155, '1.3s', '4.1s'],
            [1108,190, '0.8s', '3.9s'],
            [498, 205, '2.1s', '4.6s'],
            [958, 172, '0.4s', '3.3s'],
            [1305,200, '1.9s', '4.3s'],
          ] as [number,number,string,string][]).map(([cx, cy, delay, dur], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="5" fill="#2F6E3F" opacity="0.5"
                style={{ animation: `td-node ${dur} ease-in-out infinite ${delay}` }} />
              <circle cx={cx} cy={cy} r="5" fill="none" stroke="#2F6E3F" strokeWidth="1.5">
                <animate attributeName="r" from="5" to="24" dur={dur} begin={delay} repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.55" to="0" dur={dur} begin={delay} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </g>

        {/* Top Hint */}
        <rect x="0" y="0" width="1440" height="560" fill="url(#top-hint)" />
      </svg>
    </div>
  )
}
