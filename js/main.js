/* LIVE RATIO - starts at 9.6, cycles between 7.5 and 10 */
let rv = 9.6, rt = 10.0;
(function tick(){
  rv += (rt - rv) * 0.012;
  if(rt > 9.95 && rv > 9.88) rt = 7.5;
  else if(rt < 7.6 && rv < 7.65) rt = 10.0;
  const el = document.getElementById('live-ratio');
  if(el) el.textContent = rv.toFixed(1);
  setTimeout(tick, 40);
})();

/* INTERACTIVE PIPELINE */
const slider = document.getElementById('compress-slider');
const ratioDisplay = document.getElementById('ratio-display');
const sliderVal = document.getElementById('slider-value');
const compressedSizeSpan = document.getElementById('compressed-size');
const savedPercentSpan = document.getElementById('saved-percent');
const sourceSize = 800;

function updatePipeline() {
  let ratio = parseFloat(slider.value);
  ratioDisplay.textContent = ratio.toFixed(1) + 'x';
  sliderVal.textContent = ratio.toFixed(1) + 'x';
  let compressed = sourceSize / ratio;
  let saved = ((sourceSize - compressed) / sourceSize) * 100;
  compressedSizeSpan.textContent = compressed.toFixed(1) + ' MB';
  savedPercentSpan.textContent = saved.toFixed(1) + '% saved';
}
slider.addEventListener('input', updatePipeline);
updatePipeline();

/* SCROLL REVEAL */
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 60);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* FORM */
const form = document.getElementById('accessForm');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    this.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST', body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    }).catch(() => {});
  });
}