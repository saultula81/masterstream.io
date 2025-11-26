// =======================================================
// MASTER STREAM - Lógica de Dinamismo (Costo Cero)
// =======================================================

// 1. Lógica del Modal de Bienvenida
function setupWelcomeModal() {
  // Comprueba si el modal ya se mostró alguna vez en este navegador
  if (localStorage.getItem("welcomeModalShown")) {
    return; // Si ya se mostró, no hagas nada y sal de la función.
  }

  const modal = document.getElementById("welcome-modal");
  const closeButton = document.querySelector(".close-button");
  const nameInput = document.getElementById("user-name");
  const submitButton = document.getElementById("submit-name");
  const welcomeContent = document.getElementById("welcome-content");
  const greetingContent = document.getElementById("greeting-content");

  // Función para mostrar el modal
  const showModal = () => (modal.style.display = "flex");

  // Función para ocultar el modal con animación
  const hideModal = () => {
    modal.classList.add("closing");
    // Espera a que la animación de cierre termine (500ms)
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("closing"); // Limpia la clase para la próxima vez
    }, 500);
  };

  // Evento para el botón de enviar nombre
  submitButton.addEventListener("click", () => {
    const nombre = nameInput.value.trim();
    if (nombre) {
      document.getElementById(
        "greeting-message"
      ).textContent = `Hola, ${nombre}. Estás a un paso de tener tu radio profesional sin costo.`;
    }
    welcomeContent.style.display = "none";
    greetingContent.style.display = "block";

    // Cierra el modal después de unos segundos
    setTimeout(hideModal, 4000);
  });

  // Cierra el modal al hacer clic en la 'X' o al presionar 'Omitir'
  closeButton.addEventListener("click", hideModal);
  document.getElementById("skip-name").addEventListener("click", hideModal);

  // Marca de forma permanente que el modal ya se ha mostrado
  localStorage.setItem("welcomeModalShown", "true");

  // Muestra el modal al cargar la página
  showModal();
}

// 2. Efecto profesional en botones de afiliado
function agregarEfectoBoton() {
  // Selecciona todos los botones con la clase 'affiliate-button'
  const botones = document.querySelectorAll(".affiliate-button");

  botones.forEach((boton) => {
    // Agrega una sombra elegante al pasar el mouse (hover)
    boton.addEventListener("mouseover", () => {
      boton.style.boxShadow = "0 0 15px rgba(231, 76, 60, 0.8)";
      boton.style.transform = "scale(1.03)";
      boton.style.transition = "all 0.3s ease-out";
    });

    // Quita la sombra al sacar el mouse
    boton.addEventListener("mouseout", () => {
      boton.style.boxShadow = "none";
      boton.style.transform = "scale(1)";
    });
  });
}

// 3. Cambiar el slogan del encabezado dinámicamente
function cambiarSloganDinamico() {
  const slogans = [
    "Tu radio profesional con el presupuesto de un novato.",
    "La única guía que necesitas para sonar como un profesional.",
    "Crea, transmite y monetiza. Todo con costo cero.",
    "De cero a radio online en menos de una hora.",
    "El sonido del éxito no tiene por qué ser caro.",
  ];

  // Selecciona el elemento del slogan
  const sloganElement = document.querySelector(".slogan");

  if (sloganElement) {
    // 1. Oculta el slogan actual y quita la clase de animación si ya existe
    sloganElement.style.opacity = 0;
    sloganElement.classList.remove("slogan-fade-in");

    // Elige un slogan al azar
    const indice = Math.floor(Math.random() * slogans.length);
    // Asigna el nuevo slogan
    sloganElement.textContent = slogans[indice];

    // 2. Vuelve a aplicar la clase para activar la animación de fade-in
    sloganElement.classList.add("slogan-fade-in");
  }
}

// 4. Lógica del menú hamburguesa para móviles
function setupMobileMenu() {
  const hamburgerButton = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".main-nav");

  if (hamburgerButton && navMenu) {
    hamburgerButton.addEventListener("click", () => {
      hamburgerButton.classList.toggle("open");
      navMenu.classList.toggle("open");
    });
  }
}

// Ejecutar las funciones cuando la página se carga
document.addEventListener("DOMContentLoaded", () => {
  // Configura el menú móvil en todas las páginas
  setupMobileMenu();

  // Solo mostramos el modal de bienvenida en la página principal
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/curso-radio/")
  ) {
    setupWelcomeModal();
    cambiarSloganDinamico();
  }
  agregarEfectoBoton();
});
