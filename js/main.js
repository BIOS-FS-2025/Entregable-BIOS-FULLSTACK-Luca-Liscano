// Selección de elementos del menú móvil
const OpenButton = document.querySelector("#open-button");
const CloseButton = document.querySelector("#close-button");
const menu = document.querySelector("#nav-mobile");
const links = menu.querySelectorAll("a");

// Datos de los gatos
const gatos = [
  {
    nombre: "Tom",
    imagen: "tom.jpg",
    descripcion: "Tom es un gato juguetón, le encanta comer y es muy cariñoso.",
    edad: "5 años",
    enfermedades: "",
    id: 1,
    sexo: "Macho",
  },
  {
    nombre: "Patroclo",
    imagen: "Patroclo.jfif",
    descripcion: "Patroclo es tranquilo y le encanta dormir y comer.",
    edad: "2 años",
    enfermedades: "",
    id: 2,
    sexo: "Macho",
  },
  {
    nombre: "Pelusa",
    imagen: "Pelusa.jfif",
    descripcion:
      "Pelusa es curiosa y amigable, pero no le gusta la compania de otros gatos.",
    edad: "5 años",
    enfermedades: "",
    id: 3,
    sexo: "Hembra",
  },
  {
    nombre: "Nala",
    imagen: "Nala.jfif",
    descripcion:
      "Nala es una gata muy mimosa y que le encanta la compania, no le molesta la compania de otros gatos pero a veces necesita su espacio.",
    edad: "8 años",
    enfermedades: "",
    id: 4,
    sexo: "Hembra",
  },
  {
    nombre: "Manolo",
    imagen: "Manolo.jfif",
    descripcion:
      "Manolo es un gato muy jugueton y cariñoso, le encanta jugar y dormir.",
    edad: "5 años",
    enfermedades: "Alergrico a las pulgas",
    id: 5,
    sexo: "Macho",
  },
];

// Contenedor donde se mostrarán los gatos
const container = document.getElementById("box-cats");

// Evento para abrir el menú móvil
OpenButton.addEventListener("click", () => {
  // Mostrar menú con animación
  menu.classList.add("opacity-100", "translate-x-0", "pointer-events-auto");
  menu.classList.remove("opacity-0", "translate-x-full", "pointer-events-none");
  OpenButton.classList.add("hidden");
  CloseButton.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
});

// Evento para cerrar el menú móvil
CloseButton.addEventListener("click", () => {
  // Ocultar menú con animación
  menu.classList.remove("opacity-100", "translate-x-0", "pointer-events-auto");
  menu.classList.add("opacity-0", "translate-x-full", "pointer-events-none");
  OpenButton.classList.remove("hidden");
  CloseButton.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
});

// Evento para cerrar el menú al hacer click en un enlace
links.forEach((link) => {
  link.addEventListener("click", () => {
    // Ocultar menú con animación
    menu.classList.remove("opacity-100", "translate-x-0", "pointer-events-auto");
    menu.classList.add("opacity-0", "translate-x-full", "pointer-events-none");
    OpenButton.classList.remove("hidden");
    CloseButton.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  });
});

// Renderizado dinámico de los gatos en el contenedor
container.innerHTML = gatos
  .map(
    (gato) => `
  <div class="cat-card flex flex-col items-center justify-start gap-4 rounded-lg mt-8 w-full max-w-lg pb-6 mx-auto shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-[#F9F4ED]">
  <div class="w-full h-[300px] md:h-[500px] overflow-hidden">
    <img src="/assets/${gato.imagen}" alt="${gato.nombre}" class="w-full h-full object-cover rounded-t-lg" />
  </div>
  <h2 class="text-black md:text-xl"><strong>${gato.nombre}</strong></h2>
  <button onclick="CrearModal(${gato.id})" class="bg-[#E53935] text-black px-4 py-2 rounded-lg hover:bg-[#D32F2F] transition duration-300 md:text-xl cursor-pointer">
    Ver más
  </button>
</div>
`
  )
  .join("");

// Crear el modal para mostrar la información del gato
const modal = document.createElement("div");
modal.id = "cat-modal";
modal.style.display = "none"; // Oculto por defecto
modal.innerHTML = `
<div id="modal-bg" class="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[1000] opacity-0 transition-opacity duration-300">
  <div id="modal-content" class="bg-white rounded-lg md:p-8 pb-8 md:pb-0 w-8/10 md:w-7/10 md:h-7/10 lg:w-8/10 lg:h-8/10 relative opacity-0 transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-6 scale-95">
    <button id="close-cat-modal" class="absolute top-2 right-2 text-black text-5xl cursor-pointer">&times;</button>

    <!-- Imagen -->
    <div class="w-full md:w-1/2 flex justify-center h-[400px] md:h-full">
      <img id="modal-cat-img" src="" alt="" class="object-cover md:rounded-lg mb-4 rounded-t-lg w-full h-full md:h-auto" />
    </div>

    <!-- Texto -->
    <div class="flex flex-col items-start p-4 md:p-0 md:w-1/2">
      <h2 id="modal-cat-name" class="text-2xl md:text-3xl font-bold mb-2"></h2>
      <p id="modal-cat-desc" class="mb-4"></p>
      <h3 class="text-lg font-semibold mb-2">Información adicional:</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>Edad: <span id="modal-cat-age"></span></li>
        <li>Sexo: <span id="modal-cat-sex"></span></li>
        <li>Enfermedades o problemas: <span id="modal-cat-sicks"></span></li>
      </ul>
      <a href="#" class="bg-[#E53935] text-black px-4 py-2 rounded-lg mt-4 md:mt-0 hover:bg-[#D32F2F] transition duration-300 md:text-lg text-sm">
        Contactar con el cuidador
      </a>
    </div>
  </div>
</div>

`;
document.body.appendChild(modal);

// Referencias a los elementos del modal para animaciones
const modalBg = modal.querySelector("#modal-bg");
const modalContent = modal.querySelector("#modal-content");

// Evento para abrir el modal con animación y mostrar la info del gato
function CrearModal(id) {
  // Buscar el gato por id
  const gato = gatos.find((g) => g.id === id);

  if (!gato) return;

  //agregar preventDefault para evitar el comportamiento por defecto del enlace

  // Actualizar contenido del modal
  document.getElementById("modal-cat-img").src = `/assets/${gato.imagen}`;
  document.getElementById("modal-cat-img").alt = gato.nombre;
  document.getElementById("modal-cat-name").textContent = gato.nombre;
  document.getElementById("modal-cat-desc").textContent = gato.descripcion;
  document.getElementById("modal-cat-age").textContent = gato.edad;
  document.getElementById("modal-cat-sex").textContent =
    gato.sexo || "Desconocido";
  document.getElementById("modal-cat-sicks").textContent =
    gato.enfermedades || "Ninguna";
  modal.style.display = "flex";
  // Animación: fade-in y scale-in
  setTimeout(() => {
    modalBg.classList.add("opacity-100");
    modalBg.classList.remove("opacity-0");
    modalContent.classList.add("opacity-100", "scale-100");
    modalContent.classList.remove("opacity-0", "scale-95");
  }, 300);
  // Deshabilitar el scroll del body
  document.body.classList.add("overflow-hidden");
}

// Función para cerrar el modal con animación
function closeModal() {
  // Animación: fade-out y scale-out
  modalBg.classList.remove("opacity-100");
  modalBg.classList.add("opacity-0");
  modalContent.classList.remove("opacity-100", "scale-100");
  modalContent.classList.add("opacity-0", "scale-95");
  setTimeout(() => {
    modal.style.display = "none";
    document.body.classList.remove("overflow-hidden");
  }, 300);
}

// Evento para cerrar el modal al hacer click en la X
modal.querySelector("#close-cat-modal").addEventListener("click", closeModal);

// Evento para cerrar el modal al hacer click fuera del contenido
modalBg.addEventListener("click", function (e) {
  if (e.target === modalBg) closeModal();
});
