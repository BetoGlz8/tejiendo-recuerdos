
const galeria = document.getElementById('galeria');
const totalImagenes = 299;
const imagenesPorCarga = 30; // cuántas imágenes se cargan por "página"
let imagenesCargadas = 0;

function cargarImagenes() {
  const fragmento = document.createDocumentFragment();

  for (let i = imagenesCargadas + 1; i <= imagenesCargadas + imagenesPorCarga && i <= totalImagenes; i++) {
    const contenedor = document.createElement('div');
    contenedor.className = 'item';

    const img = document.createElement('img');
    img.src = `./assets/imagen${i}.webp`;
    img.alt = `Imagen ${i}`;
    img.loading = 'lazy'; // Lazy loading activado
    img.dataset.caption = `Cojin ${i}`; //Aqui se agrega el texto que se vera al agrandar la imagen 

    const titulo = document.createElement('p');
    titulo.textContent = `Cojin ${i}`; // Aquí puedes cambiar el texto que se verá debajo de la imagen

    contenedor.appendChild(img);
    contenedor.appendChild(titulo);
    fragmento.appendChild(contenedor);
  }

  galeria.appendChild(fragmento);
  imagenesCargadas += imagenesPorCarga;
}

// Cargar las primeras imágenes
cargarImagenes();

// Scroll infinito
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight;
  const galeriaBottom = galeria.offsetTop + galeria.offsetHeight;

  // Si estamos cerca del final de la galería y aún quedan imágenes por cargar
  if (scrollPos >= galeriaBottom - 299 && imagenesCargadas < totalImagenes) {
    cargarImagenes();
  }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const cerrar = document.querySelector('.cerrar');

galeria.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    lightboxImg.src = e.target.src;
    lightboxCaption.textContent = e.target.dataset.caption;
    lightbox.classList.add('visible');
  }
});

cerrar.addEventListener('click', () => {
  lightbox.classList.remove('visible');
});

// Cerrar al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxCaption) {
    lightbox.classList.remove('visible');
  }
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
    lightbox.classList.remove('visible');
  }
});