// Masthead dateline
function updateClock(){
  const now = new Date();
  document.getElementById('dateline').textContent = now.toLocaleDateString([], {weekday:'long', month:'long', day:'numeric', year:'numeric'}).toUpperCase();
}
updateClock();
setInterval(updateClock, 30000);

// Day / Night edition toggle
const root = document.documentElement;
const editionSwitch = document.getElementById('editionSwitch');
const editionLabel = document.getElementById('edition-label');
const editionPrice = document.getElementById('edition-price');
editionSwitch.addEventListener('click', () => {
  const isPM = root.getAttribute('data-edition') === 'pm';
  root.setAttribute('data-edition', isPM ? 'am' : 'pm');
  editionLabel.textContent = isPM ? 'Founder Edition' : 'After-Hours Edition';
  editionPrice.textContent = isPM ? 'Founder Edition · South Africa' : 'After-Hours Edition · Writer at Work';
});

// Section tab filtering
const tabs = document.querySelectorAll('.tab-btn');
const sectioned = document.querySelectorAll('[data-section]');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    sectioned.forEach(el => {
      el.classList.toggle('hidden', filter !== 'all' && el.dataset.section !== filter);
    });
  });
});

// Classifieds flip cards
document.querySelectorAll('.ad').forEach(ad => {
  ad.addEventListener('click', () => ad.classList.toggle('flipped'));
});