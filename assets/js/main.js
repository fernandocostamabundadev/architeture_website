const projectSlides = [
  {
    image: "assets/img/home-2.jpg",
    place: "Região dos Lagos, Noruega · 2024",
    title: "Casa do Lago",
    description: "Um refúgio sereno onde a madeira, a água e a floresta se encontram em equilíbrio."
  },
  {
    image: "assets/img/home-1.jpg",
    place: "Västerbotten, Suécia · 2023",
    title: "Entre Pinheiros",
    description: "Uma casa de impacto reduzido, desenhada para acompanhar o ritmo da floresta e do lago."
  },
  {
    image: "assets/img/home-3.jpg",
    place: "Aarhus, Dinamarca · 2022",
    title: "Casa sobre a Rocha",
    description: "Uma casa familiar onde a luz, a paisagem e a vida quotidiana encontram o seu lugar."
  },
  {
    image: "assets/img/home-4.jpg",
    place: "Zelândia do Norte, Dinamarca · 2025",
    title: "Casa Curva",
    description: "Uma forma escultural, suavizada por materiais naturais e por um jardim que a envolve."
  }
];

const backdrop = document.querySelector(".home__backdrop");
const title = document.getElementById("slide-title");
const locationLabel = document.getElementById("slide-location");
const description = document.getElementById("slide-description");
const current = document.getElementById("slide-current");
const total = document.getElementById("slide-total");
const status = document.getElementById("slide-status");
const dots = [...document.querySelectorAll(".home__dot")];
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + projectSlides.length) % projectSlides.length;
  const slide = projectSlides[activeSlide];

  backdrop.style.backgroundImage = `url("${slide.image}")`;
  title.textContent = slide.title;
  locationLabel.textContent = slide.place;
  description.textContent = slide.description;
  current.textContent = String(activeSlide + 1).padStart(2, "0");
  status.textContent = `Projeto ${activeSlide + 1} de ${projectSlides.length}: ${slide.title}, ${slide.place}.`;

  dots.forEach((dot, dotIndex) => {
    const selected = dotIndex === activeSlide;
    dot.classList.toggle("is-active", selected);
    if (selected) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

total.textContent = String(projectSlides.length).padStart(2, "0");
document.querySelectorAll(".slider-button").forEach((button) => {
  button.addEventListener("click", () => showSlide(activeSlide + Number(button.dataset.direction)));
});
dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));

const menu = document.getElementById("nav-menu");
const toggle = document.getElementById("nav-toggle");

function setMenuOpen(isOpen) {
  menu.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Fechar navegação" : "Abrir navegação");
}

toggle.addEventListener("click", () => {
  setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
document.addEventListener("click", (event) => {
  if (menu.classList.contains("is-open") && !event.target.closest(".nav")) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("is-open")) {
    setMenuOpen(false);
    toggle.focus();
  }
});
const desktopQuery = window.matchMedia("(min-width: 761px)");
if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", () => setMenuOpen(false));
else desktopQuery.addListener(() => setMenuOpen(false));

document.getElementById("current-year").textContent = String(new Date().getFullYear());
showSlide(0);
