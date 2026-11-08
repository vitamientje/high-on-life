/* High on Life · animated map: Nederland → Madeira → Campanário */
(function () {
  const C = { sea: "#5ecac9", sea2: "#4bb8b7", land: "#f7f3ea", teal: "#2b9e9b", orange: "#df5a1d",
    yellow: "#f8c444", olive: "#6b7a3d", green: "#9db25a", ink: "#1f3433", white: "#ffffff" };
  const SANS = "Manrope, 'Helvetica Neue', Arial, sans-serif";
  const RETRO = "Retro, " + SANS;

  // simplified coastlines [lon, lat]
  const EUROPE = [[-5.6,36],[-6.4,36.8],[-7.4,37.2],[-9,37],[-8.8,38.7],[-9.5,39.4],[-8.7,41.2],[-8.9,42.9],[-8,43.7],[-1.8,43.4],[-1.2,46],[-2.5,47.3],[-4.7,48.4],[-1.6,48.7],[-1.3,49.7],[0.2,49.5],[1.6,50.9],[3,51.3],[4.1,52],[4.7,52.9],[6,53.4],[8.5,53.6],[8.1,55.5],[8.6,57.1],[10.6,57.7],[10.5,56],[12.5,54.5],[14,54],[20,54.5],[25,55],[25,40],[19.5,40],[18.5,40.1],[17,39],[16,38],[15.7,40],[12,41.8],[10.5,43],[8.8,44.4],[7,43.6],[4,43.5],[3.2,42.3],[0.5,40.5],[-0.3,39.4],[0,38.7],[-2,36.7]];
  const UK = [[-5.7,50],[-3,50.6],[1.4,51.2],[1.7,52.7],[0,53.5],[-0.2,54.5],[-1.6,55.6],[-2,57.6],[-3.5,58.6],[-5,58.6],[-6.2,57.2],[-5.5,56],[-4.8,54.8],[-3.2,54.2],[-3,53.3],[-4.6,52.8],[-4.9,51.7],[-3,51.4],[-4.5,51.2]];
  const IRL = [[-6,52.2],[-6,53.9],[-5.5,55.2],[-7.3,55.4],[-8.5,54.4],[-10,54],[-9.5,52.2],[-10.3,51.8],[-8,51.6]];
  const AFRICA = [[-18,18],[-16.5,21],[-16,24],[-13,27.7],[-10,29.5],[-9.8,31.5],[-8.5,33.3],[-6.8,34],[-5.9,35.8],[-2,35.1],[3,36.8],[10,37],[11,33],[25,31],[25,18]];
  const MADEIRA = [[-17.265,32.81],[-17.22,32.85],[-17.17,32.868],[-17.11,32.83],[-17.04,32.805],[-16.99,32.83],[-16.94,32.82],[-16.88,32.81],[-16.85,32.79],[-16.83,32.775],[-16.73,32.75],[-16.655,32.745],[-16.735,32.735],[-16.765,32.715],[-16.775,32.69],[-16.79,32.685],[-16.84,32.64],[-16.91,32.643],[-16.975,32.645],[-17.0,32.653],[-17.035,32.662],[-17.065,32.67],[-17.1,32.678],[-17.13,32.69],[-17.17,32.718],[-17.21,32.735],[-17.22,32.755]];
  const PORTO_SANTO = [[-16.40,33.03],[-16.33,33.10],[-16.28,33.09],[-16.30,33.04],[-16.36,33.01]];
  const DESERTAS = [[-16.53,32.55],[-16.50,32.53],[-16.49,32.43],[-16.52,32.45]];
  const CANARIES = [[-15.6,28.0],[-16.6,28.3],[-13.9,28.5],[-13.6,29.0],[-17.9,28.7],[-17.2,28.1]];

  const NL = [4.9, 52.37];
  const MAD = [-16.95, 32.75];
  const PLACES = {
    airport: { p: [-16.776, 32.694], label: "Vliegveld", t: 7.7 },
    funchal: { p: [-16.91, 32.648], label: "Funchal", t: 8.0 },
    campanario: { p: [-17.035, 32.668], label: "Campanário", t: 8.4 }
  };
  // highlights: icon + label, d = label side
  const HL = [
    { p: [-17.17, 32.866], i: "🌊", l: "Porto Moniz", s: "lavazwembaden", d: "up" },
    { p: [-17.13, 32.808], i: "🌳", l: "Fanal", s: "sprookjesbos", d: "up" },
    { p: [-17.04, 32.806], i: "🏘️", l: "São Vicente", s: "lavagrotten", d: "up" },
    { p: [-16.882, 32.80], i: "🏡", l: "Santana", s: "rieten huisjes", d: "up" },
    { p: [-16.943, 32.759], i: "⛰️", l: "Pico Ruivo", s: "hoogste top", d: "left" },
    { p: [-16.928, 32.735], i: "🌄", l: "Pico do Arieiro", s: "boven de wolken", d: "right" },
    { p: [-17.13, 32.757], i: "💧", l: "25 Fontes", s: "watervallen", d: "left" },
    { p: [-17.263, 32.813], i: "🌅", l: "Ponta do Pargo", s: "zonsondergang", d: "down" },
    { p: [-17.17, 32.718], i: "🏖️", l: "Calheta", s: "strand", d: "down" },
    { p: [-16.68, 32.746], i: "🥾", l: "São Lourenço", s: "kliffenwandeling", d: "up" }
  ];
  const TRAILS = [
    [[-16.928,32.735],[-16.932,32.745],[-16.94,32.75],[-16.943,32.759]],
    [[-17.10,32.765],[-17.115,32.76],[-17.13,32.757]],
    [[-16.905,32.783],[-16.915,32.775],[-16.925,32.772]],
    [[-16.735,32.741],[-16.71,32.745],[-16.69,32.746]]
  ];
  const DOLPHINS = [
    { p: [-16.86, 32.585], ph: 0 }, { p: [-16.82, 32.60], ph: .35 },
    { p: [-17.17, 32.635], ph: .6 }, { p: [-16.98, 32.91], ph: .2 }, { p: [-16.62, 32.66], ph: .8 }
  ];
  // road along the south coast airport → Campanário
  const ROAD = [[-16.776,32.694],[-16.80,32.682],[-16.845,32.655],[-16.91,32.66],[-16.975,32.658],[-17.005,32.664],[-17.035,32.672]];

  const WORLD = { lon: -6, lat: 42, span: 48 };
  const ISLAND = { lon: -16.96, lat: 32.70, span: 0.80 };
  const T = 16;

  const ease = x => x < 0 ? 0 : x > 1 ? 1 : x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3)/2;
  const clamp = x => Math.max(0, Math.min(1, x));
  const back = x => { x = clamp(x); const c = 1.9; return 1 + (c+1)*Math.pow(x-1,3) + c*Math.pow(x-1,2); };
  const merc = lat => Math.log(Math.tan(Math.PI/4 + lat*Math.PI/360)) * 180/Math.PI;

  function HOLMap(canvas, opts = {}) {
    const ctx = canvas.getContext("2d");
    const logo = new Image(); logo.src = opts.logo || "img/logo.png";
    let W = canvas.width, H = canvas.height, S = 1, cam;

    function camAt(t) {
      const z = ease((t - 4.4) / 3.2);
      const s = Math.exp(Math.log(WORLD.span) * (1 - z) + Math.log(ISLAND.span) * z);
      const u = (Math.log(WORLD.span) - Math.log(s)) / (Math.log(WORLD.span) - Math.log(ISLAND.span));
      // portrait screens: show a bit more width at world level
      return { lon: WORLD.lon + (ISLAND.lon - WORLD.lon) * u, lat: WORLD.lat + (ISLAND.lat - WORLD.lat) * u, span: s, z };
    }
    const P = ([lon, lat]) => {
      const k = W / cam.span;
      return [W/2 + (lon - cam.lon) * k, H/2 - (merc(lat) - merc(cam.lat)) * k];
    };
    function poly(pts, close = true) {
      ctx.beginPath();
      pts.forEach((q, i) => { const [x, y] = P(q); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      if (close) ctx.closePath();
    }
    function scaled(pts, f) {
      const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
      return pts.map(([x, y]) => [cx + (x - cx) * f, cy + (y - cy) * f + (1 - f) * 0.012]);
    }
    function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
    function pill(text, x, y, o = {}) {
      const fs = (o.fs || 26) * S;
      ctx.font = `${o.retro ? "" : "700 "}${fs}px ${o.retro ? RETRO : SANS}`;
      const w = ctx.measureText(text).width + fs * 1.3, h = fs * 1.75;
      const a = o.alpha ?? 1; if (a <= 0) return;
      ctx.save(); ctx.globalAlpha = a;
      const bx = o.align === "left" ? x : o.align === "right" ? x - w : x - w/2;
      ctx.translate(0, (1 - a) * 10 * S);
      ctx.fillStyle = "rgba(0,0,0,.12)"; rr(bx, y - h/2 + 4*S, w, h, h/2); ctx.fill();
      ctx.fillStyle = o.bg || C.white; rr(bx, y - h/2, w, h, h/2); ctx.fill();
      ctx.fillStyle = o.fg || C.ink; ctx.textBaseline = "middle"; ctx.textAlign = "center";
      ctx.fillText(text, bx + w/2, y + (o.retro ? fs*.06 : 0));
      ctx.restore();
    }
    function pin(x, y, a, color, r) {
      if (a <= 0) return;
      const s = back(a) * r * S;
      ctx.save(); ctx.translate(x, y);
      ctx.fillStyle = "rgba(0,0,0,.15)"; ctx.beginPath(); ctx.ellipse(0, 2*S, s*.55, s*.2, 0, 0, 7); ctx.fill();
      ctx.translate(0, -s*1.35);
      ctx.fillStyle = color; ctx.beginPath();
      ctx.arc(0, 0, s, Math.PI*0.8, Math.PI*0.2); ctx.lineTo(0, s*1.35); ctx.closePath(); ctx.fill();
      ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(0, 0, s*.42, 0, 7); ctx.fill();
      ctx.restore();
    }

    function draw(t) {
      W = canvas.width; H = canvas.height; S = W / 1080;
      cam = camAt(t);
      // sea
      ctx.fillStyle = C.sea; ctx.fillRect(0, 0, W, H);
      // waves (screen space, drifting)
      ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 4*S; ctx.lineCap = "round";
      for (let i = 0; i < 38; i++) {
        const gx = ((i * 337) % 1000) / 1000, gy = ((i * 613) % 1000) / 1000;
        const x = ((gx * W + t * 18 * S) % (W + 80*S)) - 40*S, y = gy * H + Math.sin(t*1.6 + i) * 5*S;
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + 12*S, y - 9*S, x + 24*S, y); ctx.quadraticCurveTo(x + 36*S, y + 9*S, x + 48*S, y); ctx.stroke();
      }
      // land at world scale
      const z = cam.z;
      ctx.lineJoin = "round";
      [EUROPE, UK, IRL, AFRICA].forEach(L => {
        poly(L); ctx.fillStyle = C.land; ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 6*S; ctx.stroke();
      });
      CANARIES.forEach(p => { const [x, y] = P(p); ctx.fillStyle = C.land; ctx.beginPath(); ctx.arc(x, y, 5*S*(1+z*20), 0, 7); ctx.fill(); });

      // islands (layered hills)
      [PORTO_SANTO, DESERTAS].forEach(L => { poly(L); ctx.fillStyle = C.land; ctx.fill(); });
      poly(MADEIRA); ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = Math.max(2, 26*S*z); ctx.stroke();
      ctx.fillStyle = C.yellow; ctx.fill();
      if (z > 0.3) {
        ctx.globalAlpha = clamp((z - .3) / .4);
        poly(scaled(MADEIRA, .72)); ctx.fillStyle = C.green; ctx.fill();
        poly(scaled(MADEIRA, .42)); ctx.fillStyle = C.olive; ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (t < 4.6) { const [x, y] = P(MAD); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(x, y, 9*S, 0, 7); ctx.fill(); }

      // flight
      const f = ease((t - 1.3) / 2.8), fadeArc = 1 - clamp((t - 5.2) / .8);
      const a = P(NL), b = P(MAD);
      const cx = (a[0] + b[0]) / 2 - (b[1] - a[1]) * .35, cy = (a[1] + b[1]) / 2 + (b[0] - a[0]) * .1;
      const qb = u => [(1-u)*(1-u)*a[0] + 2*(1-u)*u*cx + u*u*b[0], (1-u)*(1-u)*a[1] + 2*(1-u)*u*cy + u*u*b[1]];
      if (f > 0 && fadeArc > 0) {
        ctx.save(); ctx.globalAlpha = fadeArc;
        ctx.setLineDash([2*S, 18*S]); ctx.lineWidth = 9*S; ctx.strokeStyle = C.orange;
        ctx.beginPath(); for (let i = 0; i <= 60; i++) { const q = qb(f * i / 60); i ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.stroke();
        ctx.setLineDash([]);
        const p = qb(f), p2 = qb(Math.min(1, f + .01));
        ctx.translate(p[0], p[1]); ctx.rotate(Math.atan2(p2[1] - p[1], p2[0] - p[0]));
        ctx.font = `${64*S}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.rotate(Math.PI/4); ctx.fillText("✈️", 0, 0);
        ctx.restore();
      }
      // NL pin + labels
      const nlA = clamp((t - .4) / .5) * (1 - clamp((t - 4.6) / .5));
      pin(a[0], a[1], nlA, C.orange, 26);
      pill("Nederland", a[0], a[1] + 50*S, { alpha: nlA, retro: true, fs: 30 });
      const fl = clamp((t - 2.2) / .5) * (1 - clamp((t - 4.4) / .4));
      const mid = qb(.5); pill("± 4 uur vliegen", mid[0] - 40*S, mid[1], { alpha: fl, bg: C.orange, fg: C.white, fs: 26 });
      const madA = clamp((t - 3.9) / .4) * (1 - clamp((t - 5) / .4));
      pill("Madeira", b[0], b[1] + 70*S, { alpha: madA, retro: true, fs: 30, bg: C.yellow });

      // island detail
      if (t > 7) {
        // dolphins
        DOLPHINS.forEach((d, i) => {
          const a0 = clamp((t - 8.2 - i * .15) / .5); if (a0 <= 0) return;
          const [x, y] = P(d.p), c = ((t * .45 + d.ph) % 1);
          ctx.save(); ctx.globalAlpha = a0;
          if (c < .45) {
            const u = c / .45, jx = (u - .5) * 90 * S, jy = -Math.sin(u * Math.PI) * 55 * S;
            ctx.translate(x + jx, y + jy); ctx.rotate((u - .5) * 1.6);
            ctx.font = `${44*S}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.scale(-1, 1); ctx.fillText("🐬", 0, 0);
          } else if (c < .6) {
            const u = (c - .45) / .15; ctx.strokeStyle = `rgba(255,255,255,${1 - u})`; ctx.lineWidth = 4*S;
            ctx.beginPath(); ctx.ellipse(x + 45*S, y + 6*S, (10 + u * 30) * S, (4 + u * 9) * S, 0, 0, 7); ctx.stroke();
          }
          ctx.restore();
        });
        const dA = clamp((t - 9) / .5);
        { const [x, y] = P(DOLPHINS[0].p); pill("🐬 dolfijnen spotten", x + 20*S, y + 62*S, { alpha: dA, fs: 21, bg: C.white }); }
        // trails
        const tr = ease((t - 10.8) / 1);
        if (tr > 0) TRAILS.forEach(L => {
          ctx.save(); ctx.globalAlpha = tr; ctx.setLineDash([2*S, 11*S]); ctx.lineWidth = 6*S; ctx.lineCap = "round"; ctx.strokeStyle = C.white;
          poly(L, false); ctx.stroke(); ctx.restore();
        });
        // highlights
        HL.forEach((h, i) => {
          const aa = clamp((t - 9.4 - i * .17) / .4); if (aa <= 0) return;
          const [x, y] = P(h.p), r = back(aa) * 24 * S;
          ctx.save(); ctx.globalAlpha = Math.min(1, aa * 1.5);
          ctx.fillStyle = "rgba(0,0,0,.15)"; ctx.beginPath(); ctx.arc(x, y + 3*S, r, 0, 7); ctx.fill();
          ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
          ctx.font = `${r*1.15}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(h.i, x, y + 1*S);
          const off = 34 * S; let lx = x, ly = y, al = "center";
          if (h.d === "up") ly = y - off - 26*S; else if (h.d === "down") ly = y + off + 4*S;
          else if (h.d === "left") { lx = x - off; al = "right"; ly = y - 12*S; } else { lx = x + off; al = "left"; ly = y - 12*S; }
          ctx.textAlign = al; ctx.textBaseline = "top"; ctx.lineJoin = "round";
          ctx.font = `${23*S}px ${RETRO}`; ctx.lineWidth = 7*S; ctx.strokeStyle = C.white; ctx.fillStyle = C.teal;
          ctx.strokeText(h.l.toUpperCase(), lx, ly); ctx.fillText(h.l.toUpperCase(), lx, ly);
          ctx.font = `600 ${16*S}px ${SANS}`; ctx.fillStyle = C.ink; ctx.lineWidth = 5*S;
          ctx.strokeText(h.s, lx, ly + 24*S); ctx.fillText(h.s, lx, ly + 24*S);
          ctx.restore();
        });
        // road
        const r = ease((t - 11.8) / 1.4);
        if (r > 0) {
          ctx.save(); ctx.setLineDash([3*S, 16*S]); ctx.lineWidth = 9*S; ctx.lineCap = "round"; ctx.strokeStyle = C.white;
          const pts = ROAD.map(P); let total = 0; const seg = [];
          for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]); seg.push(d); total += d; }
          let left = total * r; ctx.beginPath(); ctx.moveTo(...pts[0]);
          for (let i = 1; i < pts.length && left > 0; i++) {
            const k = Math.min(1, left / seg[i-1]); ctx.lineTo(pts[i-1][0] + (pts[i][0]-pts[i-1][0])*k, pts[i-1][1] + (pts[i][1]-pts[i-1][1])*k); left -= seg[i-1];
          }
          ctx.stroke(); ctx.restore();
        }
        for (const [key, pl] of Object.entries(PLACES)) {
          const [x, y] = P(pl.p), aa = clamp((t - pl.t) / .45);
          if (key === "campanario") {
            // pulsing rings + logo marker
            if (aa > 0) {
              for (let i = 0; i < 3; i++) {
                const ph = ((t * .7 + i / 3) % 1);
                ctx.strokeStyle = `rgba(223,90,29,${(1 - ph) * .8 * aa})`; ctx.lineWidth = 6*S;
                ctx.beginPath(); ctx.arc(x, y, (40 + ph * 110) * S, 0, 7); ctx.stroke();
              }
              const s = back(aa) * 62 * S;
              ctx.save(); ctx.beginPath(); ctx.arc(x, y, s + 6*S, 0, 7); ctx.fillStyle = C.white; ctx.fill();
              if (logo.complete && logo.naturalWidth) ctx.drawImage(logo, x - s, y - s, s*2, s*2);
              ctx.restore();
              pill("Campanário", x, y + 115*S, { alpha: aa, retro: true, fs: 36, bg: C.orange, fg: C.white });
            }
          } else {
            pin(x, y, aa, pl.small ? C.teal : C.orange, pl.small ? 17 : 22);
            const above = key === "moniz" || key === "lourenco";
            pill(pl.label, x, y + (above ? -78 : 48) * S, { alpha: aa, retro: !pl.small, fs: pl.small ? 22 : 28 });
          }
        }
        // travel times
        const tt = clamp((t - 13.2) / .5), [ax, ay] = P(PLACES.airport.p), [fx, fy] = P(PLACES.funchal.p);
        pill("30 min van het vliegveld", W/2, H - 205*S, { alpha: tt, bg: C.teal, fg: C.white, fs: 26 });
        pill("15 min naar Funchal", W/2, H - 140*S, { alpha: clamp((t - 13.5) / .5), bg: C.teal, fg: C.white, fs: 26 });
        pill("10 min naar zee", W/2, H - 75*S, { alpha: clamp((t - 13.8) / .5), bg: C.teal, fg: C.white, fs: 26 });
      }

      // titles
      const t1 = clamp(t / .6) * (1 - clamp((t - 4.2) / .5));
      if (opts.titles !== false) {
        title("Kom je buiten spelen?", t1);
        title("Hier speelt het zich af", clamp((t - 7.2) / .6));
      }
    }
    function title(txt, a) {
      if (a <= 0) return;
      ctx.save(); ctx.globalAlpha = a;
      const fs = 58 * S; ctx.font = `${fs}px ${RETRO}`; ctx.textAlign = "center"; ctx.textBaseline = "top";
      const w = ctx.measureText(txt.toUpperCase()).width + 70*S, y = 70*S + (1 - a) * -20*S;
      ctx.fillStyle = C.orange; rr(W/2 - w/2, y, w, fs*1.5, 18*S); ctx.fill();
      ctx.fillStyle = C.yellow; ctx.fillText(txt.toUpperCase(), W/2, y + fs*.3);
      ctx.restore();
    }
    return { draw, duration: T };
  }
  window.HOLMap = HOLMap;
})();
