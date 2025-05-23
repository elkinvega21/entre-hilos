// App.js
import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import './App.css'; // Asegúrate de que este archivo CSS tenga los estilos correctos

gsap.registerPlugin(ScrollTrigger);

function formatCOP(value) {
  return value.toLocaleString('es-CO');
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [precioFilter, setPrecioFilter] = useState(50000);
  const [colorFilter, setColorFilter] = useState('');
  const [bannerVisible, setBannerVisible] = useState(true);

  const navbarRef = useRef(null);
  const heroImageRef = useRef(null);
  const carouselRef = useRef(null);
  const aboutRef = useRef(null);
  const manualidadesRef = useRef(null);
  const comidasRef = useRef(null);
  const testimoniosRef = useRef(null);
  const contactRef = useRef(null);
  
  const lenisRef = useRef(null); // Ref para la instancia de Lenis
  const rafIdRef = useRef(null); // Ref para el ID de requestAnimationFrame

  const productosManualidades = [
    { id: 1, name: 'Brillo Lunar', precio: 25000, description: 'Pequeño bolso o neceser tejido en verde intenso con una rica textura trenzada, ideal para llevar tus esenciales con estilo', image: 'producto1.jpg', color: '#f0f', type: 'manualidad' },
    { id: 2, name: 'Vibra Cósmica', precio: 18000, description: 'Llamativo bolso de mano en combinación de rosa y negro, con asas cortas y un coqueto detalle de borla, perfecto para destacar.', image: 'producto2.jpg', color: '#0f0', type: 'manualidad' },
    { id: 3, name: 'Susurro de Lavanda', precio: 32000, description: 'Práctico bolso tejido tipo bandolera en tonos neutros (beige y crudo), con cuerpo cilíndrico, ideal para un estilo relajado y natural.', image: 'producto3.jpg', color: '#fff', type: 'manualidad' },
    { id: 4, name: 'Lienzo Pastel', precio: 45000, description: 'Encantador mini bolso de mano tejido en delicados tonos rosa, con asa corta, un accesorio dulce y artesanal para tus salidas.', image: 'producto4.jpg', color: '#00f', type: 'manualidad' },
    { id: 5, name: 'Eco Sereno', precio: 28000, description: 'Pieza rectangular tejida en un sereno color verde oliva, con textura de punto, perfecta como individual, paño decorativo o pequeño camino de mesa.', image: 'producto5.jpg', color: '#ccc', type: 'manualidad' },
    { id: 6, name: 'Cálido Amanecer', precio: 35000, description: 'Círculo tejido en un profundo azul marino, con textura en relieve, ideal como posavasos grande, tapete individual o centro decorativo.', image: 'producto6.jpg', color: '#f00', type: 'manualidad' },
  ];

  const productosComidas = [
    { id: 7, name: 'Almuerzo tipico', precio: 15000, description: 'Arroz blanco, lentejas, carne molida, tajadas maduras, ensalada', image: 'comida1.jpg', color: '#ff0', type: 'comida' },
    { id: 8, name: 'Arroz trifasico', precio: 20000, description: 'Arroz tres carnes, pollo, carne, cerdo', image: 'comida2.jpg', color: '#0ff', type: 'comida' },
  ];

  useEffect(() => {
    console.log("App.js: useEffect triggered. bannerVisible:", bannerVisible);

    // 1. Inicialización de Lenis
    lenisRef.current = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
        if (lenisRef.current) {
            lenisRef.current.raf(time);
        }
        rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);
    console.log("App.js: Lenis initialized and raf started.");

    // 2. Timeline principal de GSAP para animaciones iniciales
    const tl = gsap.timeline({
        onStart: () => console.log("App.js: Initial timeline STARTED"),
        onComplete: () => console.log("App.js: Initial timeline COMPLETED SUCCESSFULLY"),
    });

    // Animación del Banner
    if (bannerVisible) {
        const bannerEl = document.querySelector('.banner');
        if (bannerEl) {
            console.log("App.js: Adding BANNER animation.");
            tl.fromTo(bannerEl,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', onComplete: () => console.log("App.js: -> BANNER animation complete.") }
            );
        } else { console.warn("App.js: .banner element not found."); }
    } else { console.log("App.js: Banner not visible, skipping animation."); }

    // Animación de la Navbar
    if (navbarRef.current) {
        console.log("App.js: Adding NAVBAR animation.");
        tl.fromTo(navbarRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', onComplete: () => console.log("App.js: -> NAVBAR animation complete.") },
            (bannerVisible && document.querySelector('.banner')) ? "-=0.4" : (tl.getChildren().length > 0 ? ">" : "0.1") // Delay si es el primer elemento
        );
    } else { console.warn("App.js: navbarRef.current is null."); }

    // Animación de la Sección Hero Text
    if (heroImageRef.current) {
        const heroTextEl = heroImageRef.current.querySelector('.hero-text');
        if (heroTextEl) {
            console.log("App.js: Adding HERO TEXT animation.");
            tl.fromTo(heroTextEl,
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', onComplete: () => console.log("App.js: -> HERO TEXT animation complete.") },
                ">-0.3" 
            );
        } else { console.warn("App.js: .hero-text not found in heroImageRef."); }
    } else { console.warn("App.js: heroImageRef.current is null."); }

    if (tl.getChildren().length === 0) { // Si no se añadió ninguna animación a la timeline principal
        console.warn("App.js: No animations added to the initial timeline. Content might appear abruptly or not at all if styled with opacity 0 initially.");
    }
    console.log("App.js: Initial timeline configured with " + tl.getChildren().length + " main tweens.");


    // 3. Animaciones para otras secciones con ScrollTrigger
    const sectionsToAnimate = [
        { ref: carouselRef, name: "Carousel" },
        { ref: manualidadesRef, name: "Manualidades" },
        { ref: comidasRef, name: "Comidas" },
        { ref: aboutRef, name: "About" },
        { ref: testimoniosRef, name: "Testimonios" },
        { ref: contactRef, name: "Contact" }
    ];

    sectionsToAnimate.forEach((section) => {
        if (section.ref.current) {
            gsap.fromTo(
                section.ref.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: 'circ.out',
                    scrollTrigger: {
                        trigger: section.ref.current,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                         // markers: true, // Descomentar para depuración visual
                        onEnter: () => console.log(`App.js: Section ${section.name} animation triggered.`),
                    },
                }
            );
        } else {
             console.warn(`App.js: Ref for section ${section.name} is null (ScrollTrigger animation not set).`);
        }
    });
    console.log("App.js: ScrollTrigger animations for sections configured.");

    // 4. ScrollTrigger para la animación de la Navbar al hacer scroll
    if (navbarRef.current) {
        ScrollTrigger.create({
            trigger: 'body', 
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: self => {
                const nav = navbarRef.current;
                if (!nav) return;
                const scrollThreshold = nav.offsetHeight * 1.5; 
                if (self.direction === 1 && self.scroll() > scrollThreshold) {
                    gsap.to(nav, { y: -(nav.offsetHeight + 5), autoAlpha: 0, duration: 0.35, ease: 'power2.inOut', overwrite: 'auto' });
                } else if (self.direction === -1 || self.scroll() <= scrollThreshold) {
                    gsap.to(nav, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.inOut', overwrite: 'auto' });
                }
            },
        });
        console.log("App.js: ScrollTrigger for navbar hiding/showing created.");
    } else {
        console.warn("App.js: navbarRef.current is null, cannot create ScrollTrigger for navbar hiding.");
    }
    
    // 5. Función de limpieza
    return () => {
        console.log("App.js: useEffect cleanup START");
        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            console.log("App.js: requestAnimationFrame cancelled.");
        }
        if (lenisRef.current) {
            lenisRef.current.destroy();
            lenisRef.current = null;
            console.log("App.js: Lenis destroyed.");
        }
        
        tl.kill();
        console.log("App.js: Main timeline killed.");
        
        ScrollTrigger.getAll().forEach(st => st.kill());
        console.log("App.js: All ScrollTriggers killed.");
        
        // Limpieza adicional de tweens de GSAP para evitar fugas
        gsap.killTweensOf([
            document.querySelector('.banner'),
            navbarRef.current,
            heroImageRef.current ? heroImageRef.current.querySelector('.hero-text') : null,
            carouselRef.current,
            manualidadesRef.current,
            comidasRef.current,
            aboutRef.current,
            testimoniosRef.current,
            contactRef.current
        ].filter(Boolean)); // Filtra elementos nulos antes de pasarlos a killTweensOf
        console.log("App.js: Specific GSAP tweens killed.");
        console.log("App.js: useEffect cleanup COMPLETE");
    };
}, [bannerVisible]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (lenisRef.current) { 
        let offsetValue = 0;
        if (navbarRef.current) {
            // Calcula el offset solo si la navbar no está oculta (o en proceso de ocultarse)
            // Esta es una lógica simplificada; podría necesitar ser más robusta
            // verificando el estilo 'transform' o 'opacity' de la navbar.
            const navStyle = window.getComputedStyle(navbarRef.current);
            if (parseFloat(navStyle.opacity) > 0.5) { // Si la navbar es visible
                 offsetValue = -navbarRef.current.offsetHeight - 10; // 10px de espacio extra
            }
        }
        lenisRef.current.scrollTo(element, { 
            duration: 1.5, 
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            offset: offsetValue 
        });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMenuOpen(false);
  };

  const addToCart = producto => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === producto.id && p.type === producto.type);
      if (exists) {
        return prev.map(p =>
          (p.id === producto.id && p.type === producto.type) ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id, type, delta) => {
    setCartItems(prev =>
      prev
        .map(p => (p.id === id && p.type === type) ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p)
        .filter(p => p.quantity > 0)
    );
  };

  const removeFromCart = (id, type) => {
    setCartItems(prev => prev.filter(p => !(p.id === id && p.type === type)));
  };

  const subtotal = cartItems.reduce((sum, p) => sum + p.precio * p.quantity, 0);
  const iva = subtotal * 0.19;
  const envio = 5000;
  const total = subtotal + iva + envio;

  const handleBannerClose = () => setBannerVisible(false);

  return (
    <div className="App">
      {bannerVisible && (
        <div className="banner">
          <p>!Apoya a miles de mujeres emprendedoras!</p>
          <button className="banner-close" onClick={handleBannerClose}>×</button>
        </div>
      )}

      <nav className="navbar" ref={navbarRef}>
        <div className="navbar-content">
          <a href="/" className="logo">Woman Tech</a>
          <FaBars className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} />
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Inicio</a>
            <a href="#manualidades" onClick={(e) => { e.preventDefault(); scrollToSection('manualidades'); }}>Manualidades</a>
            <a href="#comidas" onClick={(e) => { e.preventDefault(); scrollToSection('comidas'); }}>Comida</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Sobre Woman Tech</a>
            <a href="#testimonios" onClick={(e) => { e.preventDefault(); scrollToSection('testimonios'); }}>Testimonios</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contacto</a>
          </div>
          <button className="cart-icon" onClick={() => setCartOpen(true)}>
            <FaShoppingCart />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>}
          </button>
        </div>
      </nav>

      <section id="hero" className="hero" ref={heroImageRef}>
        <div className="hero-text">
          <h1>
            Woman Tech innovación con esencia <span className="highlight">femenina</span><br />
          </h1>
          <button className="btn-primary" onClick={() => scrollToSection('manualidades')}>Descubre nuestros productos</button>
        </div>
      </section>

      <section id="carousel-unique-experiences" className="carousel-section" ref={carouselRef}>
        <h2>Experiencias Únicas</h2>
        <div className="collage-grid">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
            <div className="collage-item" key={n}>
              <img src={`/images/imagescuadro${n}.jpeg`} alt={`Destacado ${n}`} />
            </div>
          ))}
        </div>
      </section>

      <section id="manualidades" className="productos-section" ref={manualidadesRef}>
        <div className="productos-container">
          <aside className="filtros">
            <h3>FILTRAR MANUALIDADES</h3>
            <div className="filtro-precio">
              <label>Precio: <span>{formatCOP(precioFilter)}</span></label>
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
                {colorFilter && <button className="clear-filter" onClick={() => setColorFilter('')}>Limpiar Filtro</button>}
              </div>
            </div>
          </aside>
          <div className="productos-grid">
            <h2>Nuestras Manualidades</h2>
            {productosManualidades
              .filter(p => p.precio <= precioFilter && (!colorFilter || p.color === colorFilter))
              .map(p => (
                <div className="producto-card" key={`manualidad-${p.id}`}> 
                  <div className="imagen-wrapper">
                    <img src={`/images/${p.image}`} alt={p.name} />
                    <button className="add-cart-btn" onClick={() => addToCart(p)}>
                      <FaShoppingCart />
                    </button>
                  </div>
                  <h4>{p.name}</h4>
                  <p className="precio">{formatCOP(p.precio)}</p>
                  <p className="descripcion">{p.description}</p>
                </div>
              ))
            }
            {productosManualidades.filter(p => p.precio <= precioFilter && (!colorFilter || p.color === colorFilter)).length === 0 && (
              <p>No hay manualidades que coincidan con los filtros actuales.</p>
            )}
          </div>
        </div>
      </section>

      <section id="comidas" className="productos-section" ref={comidasRef}>
        <div className="productos-container">
          <div className="productos-grid full-width"> 
            <h2>Delicias Caseras</h2>
            {productosComidas.map(p => (
              <div className="producto-card" key={`comida-${p.id}`}> 
                <div className="imagen-wrapper">
                  <img src={`/images/${p.image}`} alt={p.name} />
                  <button className="add-cart-btn" onClick={() => addToCart(p)}>
                    <FaShoppingCart />
                  </button>
                </div>
                <h4>{p.name}</h4>
                <p className="precio">{formatCOP(p.precio)}</p>
                <p className="descripcion">{p.description}</p>
              </div>
            ))}
            {productosComidas.length === 0 && (
              <p>No hay productos de comida disponibles en este momento.</p>
            )}
          </div>
        </div>
      </section>


      <section id="about" className="about" ref={aboutRef}>
        <h2>Objetivo</h2>
        <p>
          Woman Tech busca empoderar económicamente a mujeres en comunidades rurales mediante una plataforma digital que visibiliza y potencia sus talentos, conocimientos ancestrales y habilidades productivas. El objetivo es facilitar su acceso a herramientas tecnológicas, mercados digitales y redes de colaboración para generar oportunidades sostenibles, promover su integración comunitaria, valorizar sus saberes tradicionales y reducir la brecha de género en el acceso a la tecnología y el emprendimiento digital.
        </p>
      </section>

      <section id="testimonios" className="testimonios" ref={testimoniosRef}>
        <h2>Testimonios</h2>
        <div className="testimonios-grid">
          {[
            { quote: "✨ Woman Tech ha transformado mi manera de ver el emprendimiento. Ahora mis creaciones llegan a más personas. ✨", author: "Artesana de Manzanares" },
            { quote: "🌟 Gracias a la plataforma, he aprendido a usar herramientas digitales que antes desconocía. ¡Me siento empoderada! 🌟", author: "Emprendedora local" },
            { quote: "💖 Es maravilloso ver cómo se valora nuestro saber ancestral. Woman Tech es un puente al mundo. 💖", author: "Mujer de la comunidad" }
          ].map((t, i) => (
            <div className="testimonio" key={i}>
              “{t.quote}”<br /><strong>- {t.author}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact" ref={contactRef}>
        <h2>Contacto</h2>
        <p>Visítanos en ...</p>
      </section>

      <div className={`cart-panel ${cartOpen ? 'open' : ''}`}>
        <button className="close-cart" onClick={() => setCartOpen(false)}>×</button>
        <h3>Tu Carrito</h3>
        {cartItems.length === 0
          ? <p className="carrito-vacio">No hay productos en el carrito.</p>
          : (
            <div className="cart-items-container">
              {cartItems.map(item => (
                <div className="cart-item" key={`${item.type}-${item.id}`}>
                  <img src={`/images/${item.image}`} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-price">Precio: {formatCOP(item.precio)}</p>
                    <div className="qty-controls">
                      <button onClick={() => changeQty(item.id, item.type, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQty(item.id, item.type, +1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(item.id, item.type)}>×</button>
                </div>
              ))}
            </div>
          )
        }
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <p><span>Subtotal:</span> <span>{formatCOP(subtotal)}</span></p>
            <p><span>IVA (19%):</span> <span>{formatCOP(iva)}</span></p>
            <p><span>Envío:</span> <span>{formatCOP(envio)}</span></p>
            <p className="total"><span>Total:</span> <span>{formatCOP(total)}</span></p>
            <button className="btn-primary continuar" onClick={() => {setModalOpen(true); setCartOpen(false); } }>
              Continuar con la compra
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Datos de envío y pago</h2>
            <form onSubmit={e => { e.preventDefault(); alert('Pedido enviado (simulación)'); setModalOpen(false); setCartItems([]); }}>
              <label>Nombre completo<input type="text" required /></label>
              <label>Correo electrónico<input type="email" required /></label>
              <label>Dirección<input type="text" required /></label>
              <label>Método de pago
                <select required>
                  <option value="">Selecciona...</option>
                  <option>Tarjeta de crédito</option>
                  <option>PSE</option>
                  <option>Nequi</option>
                </select>
              </label>
              <button type="submit" className="btn-primary finalizar">Enviar orden</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;