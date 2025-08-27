document.addEventListener('DOMContentLoaded', () => {
  const banners = document.querySelectorAll('.banner');

  const options = {
    threshold: 0.3 // 30% видимости элемента
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target); // убираем из наблюдения, чтобы анимация сработала 1 раз
      }
    });
  }, options);

  banners.forEach(banner => observer.observe(banner));
});
