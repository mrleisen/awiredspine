// Full-bleed hypnotic background: rotating concentric rings + radial bars + subtle moiré.
// Canvas painted in black/white only so the acid accent in CSS pops on top.
(function(){
  const canvas = document.getElementById('bg');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W=0, H=0, cx=0, cy=0, DPR = Math.min(2, window.devicePixelRatio || 1);

  function resize(){
    W = canvas.clientWidth = window.innerWidth;
    H = canvas.clientHeight = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
    cx = W/2; cy = H/2;
  }
  window.addEventListener('resize', resize);
  resize();

  let t0 = performance.now();
  let mx = 0.5, my = 0.5;
  window.addEventListener('pointermove', e=>{
    mx = e.clientX / window.innerWidth;
    my = e.clientY / window.innerHeight;
  });

  function draw(now){
    const t = (now - t0) / 1000;

    // black base
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,W,H);

    // --- RING FIELD: concentric circles offset by mouse-ish drift ---
    const offX = (mx - 0.5) * 40;
    const offY = (my - 0.5) * 40;
    const rad = Math.hypot(W, H);
    const step = 18;
    const phase = (t * 22) % (step * 2); // scrolling inward

    ctx.save();
    ctx.translate(cx + offX, cy + offY);
    ctx.strokeStyle = 'rgba(242,239,230,0.55)';
    ctx.lineWidth = 1.1;
    for(let r = -phase; r < rad; r += step){
      if(r <= 0) continue;
      ctx.beginPath();
      ctx.arc(0,0,r,0,Math.PI*2);
      ctx.stroke();
    }
    ctx.restore();

    // --- RADIAL SPOKES (moiré with the rings) ---
    const spokes = 36;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.06);
    ctx.strokeStyle = 'rgba(242,239,230,0.14)';
    ctx.lineWidth = 1;
    for(let i=0;i<spokes;i++){
      const a = (i/spokes) * Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(Math.cos(a)*rad, Math.sin(a)*rad);
      ctx.stroke();
    }
    ctx.restore();

    // --- SECOND RING SET, counter-rotating, offset: creates breathing moiré ---
    ctx.save();
    ctx.translate(cx - offX*0.6, cy - offY*0.6);
    ctx.strokeStyle = 'rgba(242,239,230,0.18)';
    ctx.lineWidth = 1;
    const step2 = 24;
    const phase2 = (-t * 14) % (step2 * 2);
    for(let r = -phase2; r < rad; r += step2){
      if(r <= 0) continue;
      ctx.beginPath();
      ctx.arc(0,0,r,0,Math.PI*2);
      ctx.stroke();
    }
    ctx.restore();

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
