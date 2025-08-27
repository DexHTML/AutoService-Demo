const workList = document.querySelector('.work-list');
const prevBtn = document.querySelector('.slide-btn.prev');
const nextBtn = document.querySelector('.slide-btn.next');

// --- Стрелки ---
nextBtn.addEventListener('click', () => {
  workList.scrollBy({ left: 220, behavior: 'smooth' });
});
prevBtn.addEventListener('click', () => {
  workList.scrollBy({ left: -220, behavior: 'smooth' });
});

// --- Свайп на мобильных ---
let startXTouch, scrollStartTouch;
workList.addEventListener('touchstart', (e) => {
  startXTouch = e.touches[0].pageX;
  scrollStartTouch = workList.scrollLeft;
}, { passive: true });
workList.addEventListener('touchmove', (e) => {
  const deltaX = e.touches[0].pageX - startXTouch;
  workList.scrollLeft = scrollStartTouch - deltaX;
}, { passive: true });

// --- Drag на ПК ---
let isDown = false;
let startX, scrollLeft;

workList.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - workList.offsetLeft;
  scrollLeft = workList.scrollLeft;
  e.preventDefault(); // запрещаем выделение текста
});
workList.addEventListener('mouseleave', () => isDown = false);
workList.addEventListener('mouseup', () => isDown = false);
workList.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const x = e.pageX - workList.offsetLeft;
  const walk = (x - startX) * 1; // множитель скорости
  workList.scrollLeft = scrollLeft - walk;
});

// --- Автопрокрутка ---
let autoScroll = setInterval(scrollNext, 3000);

function scrollNext() {
  if (workList.scrollLeft + workList.clientWidth >= workList.scrollWidth - 5) {
    workList.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    workList.scrollBy({ left: 220, behavior: 'smooth' });
  }
}

// --- Остановка автопрокрутки при взаимодействии ---
['mouseenter', 'mousedown', 'touchstart'].forEach(evt => {
  workList.addEventListener(evt, stopAutoScroll);
});
['mouseleave', 'touchend', 'mouseup'].forEach(evt => {
  workList.addEventListener(evt, startAutoScroll);
});

function stopAutoScroll() {
  clearInterval(autoScroll);
}

function startAutoScroll() {
  clearInterval(autoScroll);
  autoScroll = setInterval(scrollNext, 3000);
}
