
const hamburgerBtn =  document.querySelector('.hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');

//FOrmulario Validacion
const contactForm = document.getElementById('contact-form');
const submitBtn = document.querySelector('.btn-submit');
const nombre = document.getElementById('name');
const phoneNumber = document.getElementById('phone-number');
const message = document.getElementById('message');
//nombre
nombre.addEventListener('input', function() {
  const name = nombre.value.trim();
  if (name.length > 0 && name.length < 5) {
    document.getElementById('name-error').textContent = 'Muy corto (mín. 5 caracteres)';
  } else {
    document.getElementById('name-error').textContent = '';
  }
});
//phone
  phoneNumber.addEventListener('input', () => {
    const numero = phoneNumber.value.trim();
    const phoneError = document.getElementById('phone-error');
    
    phoneError.textContent = numero.length > 0 && numero.length < 10 
      ? 'Muy corto (mín. 10 caracteres)' 
      : '';
  });
//mail
contactForm.addEventListener('submit',function(e){
  e.preventDefault();
    let isValid = true;
    const email = document.getElementById('email').value;
    if (!/^[^\s@]{6,}@[^\s@]{5,}\.[^\s@]+$/.test(email)) {
      document.getElementById('email-error').textContent = 'Ingresa un email válido';
      isValid = false;
    } else {
      document.getElementById('email-error').textContent = '';
    }
    
    if (isValid) {
      // Envía el formulario
      fetch(this.action, {
        method: this.method,
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          alert('¡Mensaje enviado! Te responderé pronto.');
          submitBtn.classList.add('sending');
          this.reset();
        } else {
          throw new Error('Error en el envío');
        }
      })
      .catch(error => {
        alert('Hubo un error. Por favor, inténtalo de nuevo más tarde.');
        submitBtn.classList.remove('sending');
      });
    }
  });
//Message
message.addEventListener('input', ()=>{
  const mensaje = message.value.trim();
  const messageError = document.getElementById('message-error');
    
  messageError.textContent = mensaje.length > 0 && mensaje.length < 15 
      ? 'Muy corto (mín. 15 caracteres)' 
      : '';
})

//Boton Mobile Aparecer
hamburgerBtn.addEventListener('click', function() {
  // 3. Alternamos (toggle) la clase 'active' en el menú
  mobileMenu.classList.toggle('active');
  
  // 4. Transformamos las líneas del botón en una "X"
  hamburgerBtn.classList.toggle('active');
});


//section sobre mi
document.addEventListener('DOMContentLoaded', function() {

  //animacion de barras en progreso
  const progressBars = document.querySelectorAll('.progress-fill');

  const animateProgressBars = () => {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    });
  };

  // Intersection Observer para animar al hacer scroll
  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) {
    observer.observe(aboutSection);
  }

  //Proyectos filter
  // Filtrado de proyectos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Actualizar botón activo
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filtrar proyectos
      const filterValue = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  const projectsSection = document.querySelector('.section-proyects');
 
  if (projectsSection) {
    observer.observe(projectsSection);
    
    // Inicializar estilos para animación
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  }

  // Botón "volver arriba"
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Smooth scroll para el botón
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});