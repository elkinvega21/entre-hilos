import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [precioFilter, setPrecioFilter] = useState(50000);
  const [colorFilter, setColorFilter] = useState('');
  const [bannerVisible, setBannerVisible] = useState(true);
  const navbarRef = useRef(null);
  const heroImageRef = useRef(null);
  const carouselRef = useRef(null);
  const aboutRef = useRef(null);
  const testimoniosRef = useRef(null);
  const contactRef = useRef(null);
  const [testimoniosLoaded, setTestimoniosLoaded] = useState(false);
  const [aboutLoaded, setAboutLoaded] = useState(false);
  const [contactLoaded, setContactLoaded] = useState(false);
  const [productos, setProductos] = useState([
    { name: 'Brillo Lunar', precio: 25000, description: 'Hermoso cuadro de fauna hecho en lienzo.', image: 'producto1.jpg', color: '#f0f' },
    { name: 'Vibra Cósmica', precio: 18000, description: 'Cojín suave con tono verde musgo.', image: 'producto2.jpg', color: '#0f0' },
    { name: 'Susurro de Lavanda', precio: 32000, description: 'Camino de mesa artesanal de lino.', image: 'producto3.jpg', color: '#fff' },
    { name: 'Lienzo Pastel', precio: 45000, description: 'Cuadro abstracto moderno.', image: 'producto4.jpg', color: '#00f' },
    { name: 'Eco Sereno', precio: 28000, description: 'Cojín con textura agradable.', image: 'producto5.jpg', color: '#ccc' },
    { name: 'Cálido Amanecer', precio: 35000, description: 'Cuadro de paisaje vibrante.', image: 'producto6.jpg', color: '#f00' },
    { name: 'Sueños de Algodón', precio: 20000, description: 'Cojín suave y acogedor.', image: 'producto7.jpg', color: '#000' },
    { name: 'Brillo de Estrellas', precio: 30000, description: 'Cuadro de estrellas en el cielo.', image: 'producto8.jpg', color: '#ff0' },
    { name: 'Naturaleza Viva', precio: 40000, description: 'Cuadro de naturaleza vibrante.', image: 'producto9.jpg', color: '#0ff' },
  ]);

  const comentarios = [
    " ✨ Cautivadora obra. Belleza y emoción únicas. ¡Una inversión para el alma! ✨",
    " 🌟 La calidad es excepcional. Cada detalle cuenta una historia. ¡Recomiendo al 100%! 🌟",
    " 💖 Un regalo perfecto. La sonrisa de mi amiga lo dice todo. ¡Gracias por la magia! 💖",
  ];

  useEffect(() => {

    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // Animaciones iniciales
    const tl = gsap.timeline();

    if (bannerVisible) {
      tl.from('.banner', { y: -50, opacity: 0, duration: 0.5, ease: 'power2.out' });
    }

    tl.from(navbarRef.current, { y: -80, opacity: 0, duration: 0.5, ease: 'power2.out' }, bannerVisible ? '-=0.2' : 0);

    // Animación de la imagen del héroe
    if (heroImageRef.current) {
      tl.from(heroImageRef.current, { x: '20%', opacity: 0, duration: 1.5, ease: 'power2.out' }, bannerVisible ? '-=0.5' : 0.2);
    }

    const sections = [aboutRef, testimoniosRef, contactRef];
    sections.forEach(ref => {
      if (ref.current) {
        gsap.fromTo(ref.current, { y: 50, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            onEnter: () => {
              if (ref.current) { // Añadida verificación para ref.current
                ref.current.classList.add('loaded');
                if (ref.current === testimoniosRef.current) {
                  setTestimoniosLoaded(true);
                }
                if (ref.current === aboutRef.current) {
                  setAboutLoaded(true);
                }
                if (ref.current === contactRef.current) {
                  setContactLoaded(true);
                }
              }
            },
            // markers: true,
          }
        });
      }
    });


    if (carouselRef.current) {
      const track = carouselRef.current.querySelector('.carousel-track');
      const items = Array.from(carouselRef.current.querySelectorAll('.carousel-item'));
      const itemWidth = items[0].offsetWidth;
      const trackWidth = track.scrollWidth;
      let x = 0;
      let direction = -1;
      const speed = 3.0;

      items.forEach(item => {
        const duplicate = item.cloneNode(true);
        track.appendChild(duplicate);
      });

      const duplicatedTrackWidth = track.scrollWidth;

      gsap.ticker.add(() => {
        x += direction * speed;


        if (direction === -1) {
          if (x <= -trackWidth) {
            x += trackWidth;
          }
        } else {
          if (x >= itemWidth) {
            x -= trackWidth;
          }
        }

        track.style.transform = `translateX(${x}px)`;
      });
    }


    ScrollTrigger.create({
      trigger: 'body',
      start: 'top 100',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const navbar = navbarRef.current;
        if (navbar) {
          if (self.direction === 1) {
            gsap.to(navbar, { y: -80, opacity: 0, duration: 0.3, ease: 'power2.in' });
          } else {
            gsap.to(navbar, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
          }
        }
      },
      // markers: true,
      invalidateOnRefresh: true,
    });

    // Carga las imágenes del carrusel y añade la clase 'loaded' cuando se cargan
    const carouselImages = document.querySelectorAll('.carousel-item img');
    carouselImages.forEach(img => {
      img.onload = () => img.classList.add('loaded');
      if (img.complete) img.classList.add('loaded');
    });

    const sectionImages = document.querySelectorAll('.imagen-wrapper img');
    sectionImages.forEach(img => {
      img.onload = () => img.classList.add('loaded');
      if (img.complete) img.classList.add('loaded');
    });

    return () => {
      lenis.destroy();
    };
  }, [bannerVisible]);

  const scrollToProductos = () => document.getElementById('nuestros-productos').scrollIntoView({ behavior: 'smooth' });
  const addToCart = producto => {
    setCartItems(prev => [...prev, { ...producto, quantity: 1 }]);
    setCartOpen(true);
  };
  const removeFromCart = index => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const filteredProductos = productos.filter(p => p.precio <= precioFilter && (colorFilter === '' || p.color === colorFilter));

  const handleBannerClose = () => {
    setBannerVisible(false);
  };

  return (
    <div className="App">
      {bannerVisible && (
        <div className="banner" role="banner">
          <p>¡Nuevo lanzamiento colección verano!</p>
          <button className="banner-close" onClick={handleBannerClose}>×</button>
        </div>
      )}

      <nav className="navbar main-nav" ref={navbarRef}>
        <div className="navbar-content">
          <a href="/" className="logo">MayArt</a>
          <FaBars className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} />
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#hero" onClick={() => { setMenuOpen(false); }}>Inicio</a>
            <a href="#nuestros-productos" onClick={() => { scrollToProductos(); setMenuOpen(false); }}>Productos</a>
            <a href="#about" onClick={() => { setMenuOpen(false); }}>Sobre MayArt</a>
            <a href="#contact" className="nav-contact" onClick={() => { setMenuOpen(false); }}>Contacto</a>
          </div>
          <button className="cart-icon" onClick={() => setCartOpen(true)}>
            <FaShoppingCart />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </button>
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="hero-text">
          <h1>
            Lleva contigo un <span className="highlight">cuadro</span>
            <br />
            a tu estilo hecho a mano
          </h1>
          <button className="btn-primary" onClick={scrollToProductos}>
            Ver Productos
          </button>
        </div>
        <div className="hero-image-wrapper" ref={heroImageRef}>

        </div>
      </section>

      <section id="productos" className="carousel-section">
        <h2>Productos destacados</h2>
        <div className="carousel" ref={carouselRef}>
          <div className="carousel-track">
            {[1, 2, 3, 1, 2, 3].map((n, i) => (
              <div className="carousel-item" key={i}>
                <img src={`/images/imagescuadro${n}.jpg`} alt={`Cuadro ${n}`} />
                <p></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nuestros-productos" className="productos-section">
        <div className="productos-container">
          <aside className="filtros">
            <h3>FILTRAR</h3>
            <div className="filtro-precio">
              <label>
                Precio: <span>${precioFilter}</span>
              </label>
              <input
                type="range"
                min="0"
                max="50000"
                value={precioFilter}
                onChange={e => setPrecioFilter(Number(e.target.value))}
              />
            </div>
            <div className="filtro-color">
              <label>Color</label>
              <div className="color-puntos">
                {['#fff', '#ccc', '#000', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'].map((c, i) => (
                  <span
                    key={i}
                    className={`color-dot ${colorFilter === c ? 'selected' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColorFilter(c)}
                  />
                ))}
                {colorFilter && (
                  <button className="clear-filter" onClick={() => setColorFilter('')}>
                    Limpiar Filtro
                  </button>
                )}
              </div>
            </div>
          </aside>
          <div className="productos-grid">
            {filteredProductos.map((p, i) => (
              <div className="producto-card" key={i}>
                <div className="imagen-wrapper">
                  <img src={`/images/${p.image}`} alt={p.name} />
                  <button className="add-cart-btn" onClick={() => addToCart(p)}>
                    <FaShoppingCart />
                  </button>
                </div>
                <h4>{p.name}</h4>
                <p className="precio">${p.precio}</p>
                <p className="descripcion">{p.description}</p>
              </div>
            ))}
            {filteredProductos.length === 0 && <p className="no-productos">No se encontraron productos con los filtros seleccionados.</p>}
          </div>
        </div>
      </section>

      <section id="about" className={`about ${aboutLoaded ? 'loaded' : ''}`} ref={aboutRef}>
        <h2>Sobre MayArt</h2>
        <p>
          Ser reconocidos como una marca líder en servicios integrales en diseño de interiores,
          productos de arte y regalos personalizados. Destacándonos por nuestra calidad,
          innovación y el impacto emocional que generan nuestras creaciones en las personas y sus relaciones.
          MayArt inspira y conecta emocionalmente con las personas a través del arte,
          transformando espacios que logren inmortalizar recuerdos y generen armonía.
            Contando a su vez con piezas personalizadas, con teniendo detalles únicos, creativos y significado.
        </p>
        <h2>Nuestra visión</h2>
        <p>Ser reconocidos como una marca líder en servicios integrales en diseño de interiores,
          productos de arte y regalos personalizados. Destacándonos por nuestra calidad,
          innovación y el impacto emocional que generan nuestras creaciones en las personas y sus relaciones.</p>

      </section>

      <section id="testimonios" className={`testimonios ${testimoniosLoaded ? 'loaded' : ''}`} ref={testimoniosRef}>
        <h2>Testimonios</h2>
        <div className="testimonios-grid">
          {comentarios.map((t, i) => (
            <div className="testimonio" key={i}>
              “{t}.”
              <br />
              <strong>- {['María', 'Juan', 'Laura'][i]}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className={`contact ${contactLoaded ? 'loaded' : ''}`} ref={contactRef}>
        <h2>Contacto</h2>
        <p>Visítanos en ...</p>
      </section>

      <div className={`cart-panel ${cartOpen ? 'open' : ''}`}>
        <button className="close-cart" onClick={() => setCartOpen(false)}>
          ×
        </button>
        <h3>Tu Carrito</h3>
        {cartItems.length === 0 ? (
          <p className="carrito-vacio">No hay productos en el carrito.</p>
        ) : (
          <div className="cart-items-container">
            {cartItems.map((item, i) => {
              console.log("Cart Item:", item);
              return (
                <div className="cart-item" key={i}>
                  <img src={`/images/${item.image}`} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>${item.precio}</p>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(i)}>
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <p className="total">
              Total: ${cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0)}
            </p>
            <button className="btn-primary">Finalizar Compra</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;