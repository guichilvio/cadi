document.addEventListener('DOMContentLoaded', function () {
    // Navbar - Cambio de color al hacer scroll
    window.addEventListener('scroll', function () {
25
        var menu = document.querySelector('.menu');
        if (window.scrollY > 100) {
            menu.classList.add('scrolled');
        } else {
            menu.classList.remove('scrolled');
        }
    });

    // Menú responsive
    function toggleMenu() {
        let menuList = document.querySelector('.menu ul');
        let hamburger = document.querySelector('.hamburger');
        menuList.classList.toggle('show');
        hamburger.classList.toggle('active');
    }
    
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);

    document.addEventListener('click', function (event) {
        let menuList = document.querySelector('.menu ul');
        let hamburger = document.querySelector('.hamburger');
        
        // Evita que se cierre si se hace clic dentro del menú o en el botón de hamburguesa
        if (!menuList.contains(event.target) && !hamburger.contains(event.target)) {
            menuList.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });

   
    // Slider
    let index = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function updateSliderPosition() {
        const slider = document.querySelector('.slider');
        slider.style.transform = `translateX(-${index * 100}%)`;
        slider.style.transition = 'transform 0.6s ease-in-out';
    }

    function moveSlide(step) {
        index = (index + step + totalSlides) % totalSlides;
        updateSliderPosition();
    }

    document.querySelector('.prev').addEventListener('click', function () {
        moveSlide(-1);
    });

    document.querySelector('.next').addEventListener('click', function () {
        moveSlide(1);
    });

    // Auto-slide cada 5 segundos
    setInterval(() => moveSlide(1), 5000);

    // Animaciones en el footer
    const footer = document.querySelector(".footer");
    if (footer) {
        footer.addEventListener("mouseover", function (event) {
            if (event.target.tagName === "IMG") {
                event.target.style.transform = "scale(1.2)";
                event.target.style.transition = "transform 0.3s";
            }
        });

        footer.addEventListener("mouseout", function (event) {
            if (event.target.tagName === "IMG") {
                event.target.style.transform = "scale(1)";
            }
        });

        const phoneLink = document.querySelector(".footer-column ul li a[href^='tel']");
        if (phoneLink) {
            phoneLink.addEventListener("click", function (event) {
                if (!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
                    event.preventDefault();
                    alert("Para llamar, usa un dispositivo móvil.");
                }
            });
          }
         }
    });

    /*beneficios*/
    document.addEventListener('DOMContentLoaded', function () {
        const beneficios = document.querySelectorAll('.beneficio-cadico');
        let index = 0;
    
        function actualizarCarrusel() {
            beneficios.forEach((beneficio, i) => {
                beneficio.classList.remove('active', 'prev', 'next');
            });
    
            const prevIndex = (index - 1 + beneficios.length) % beneficios.length;
            const nextIndex = (index + 1) % beneficios.length;
    
            beneficios[index].classList.add('active');
            beneficios[prevIndex].classList.add('prev');
            beneficios[nextIndex].classList.add('next');
        }
    
        function cambiarBeneficio() {
            index = (index + 1) % beneficios.length;
            actualizarCarrusel();
        }
    
        actualizarCarrusel();
        setInterval(cambiarBeneficio, 4000);
    });
    

    /* Quienes somos */
document.addEventListener("DOMContentLoaded", function () {
    const imagenes = ["images/quienes-somos.jpg", "images/S5.jpg"];
    let indice = 0;
    const imagen = document.getElementById("imagen-cambio");

    setInterval(() => {
        imagen.style.opacity = 0;
        setTimeout(() => {
            indice = (indice + 1) % imagenes.length;
            imagen.src = imagenes[indice];
            imagen.style.opacity = 1;
        }, 1000);
    }, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
    const servicios = document.querySelectorAll(".servicio");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const swiperWrapper = document.getElementById("swiper-wrapper");
    const closePopup = document.querySelector(".close");
    const body = document.body;
    const mapContainer = document.getElementById("map");
    let map;
    let marker;
    let swiper;
    
    servicios.forEach(servicio => {
        servicio.addEventListener("click", function () {
            const titulo = this.querySelector("h3").innerText;
            const imagenes = JSON.parse(this.getAttribute("data-imagenes"));
            const ubicacion = JSON.parse(this.getAttribute("data-ubicacion"));
            
            popupTitle.innerText = titulo;
            swiperWrapper.innerHTML = "";
            
            imagenes.forEach(img => {
                let slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                let imgElement = document.createElement("img");
                imgElement.src = img;
                imgElement.alt = titulo;
                slide.appendChild(imgElement);
                swiperWrapper.appendChild(slide);
            });
            
            setTimeout(() => {
                swiper = new Swiper(".swiper-container", {
                    loop: true,
                    autoplay: { delay: 2000, disableOnInteraction: false },
                    effect: 'slide',
                    centeredSlides: true,
                    slidesPerView: 1,
                    pagination: { el: ".swiper-pagination", clickable: true }
                });
            }, 500);
            
            if (!map) {
                map = new google.maps.Map(mapContainer, { center: ubicacion, zoom: 15 });
                marker = new google.maps.Marker({ position: ubicacion, map: map });
            } else {
                map.setCenter(ubicacion);
                marker.setPosition(ubicacion);
            }
            
            popup.style.display = "flex";
            body.classList.add("noscroll");
        });
    });
    
    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        body.classList.remove("noscroll");
    });
});
