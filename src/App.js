import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Datos de productos
  const productos = [
    { name: 'Cuadro Floral', price: '$25.000', image: 'producto1.jpg' },
    { name: 'Cojín Verde Musgo', price: '$18.000', image: 'producto2.jpg' },
    { name: 'Camino de Mesa', price: '$32.000', image: 'producto3.jpg' },
    { name: 'Set de Servilletas', price: '$12.000', image: 'producto4.jpg' },
    { name: 'Portavasos de Lino', price: '$8.000', image: 'producto5.jpg' },
    { name: 'Cortina de Baño', price: '$45.000', image: 'producto6.jpg' },
    { name: 'Toalla de Cocina', price: '$14.000', image: 'producto7.jpg' },
    { name: 'Almohadón Decorativo', price: '$28.000', image: 'producto8.jpg' },
    { name: 'Mantel Rústico', price: '$40.000', image: 'producto9.jpg' },
  ];

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Animaciones iniciales
    gsap.from('.navbar', { y: -100, opacity: 0, duration: 0.8, ease: 'power2.out' });
    const sections = ['.hero', '.carousel-section', '.about', '.testimonios', '.productos-section'];
    sections.forEach(sel => {
      gsap.fromTo(
        sel,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sel, start: 'top 80%' }
        }
      );
    });
    gsap.to('.carousel-track', { xPercent: -50, ease: 'none', duration: 20, repeat: -1 });
  }, []);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <a href="https://www.instagram.com/entre.hilos.co/" className="logo" target="_blank" rel="noopener noreferrer">
            Entre Hilos
          </a>
          <FaBars className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} />
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>  
            <a href="#hero" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="#productos" onClick={() => setMenuOpen(false)}>Productos</a>
            <a href="#nuestros-productos" onClick={() => setMenuOpen(false)}>Nuestros Productos</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Sobre Nosotros</a>
            <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-text">
          <h1>
            Lleva contigo un <span className="highlight">cuadro</span><br />
            a tu estilo hecho a mano
          </h1>
          <button className="btn-primary">Ver Productos</button>
        </div>
      </section>

      {/* Carousel Destacados */}
      <section id="productos" className="carousel-section">
        <h2>Productos destacados</h2>
        <div className="carousel">
          <div className="carousel-track">
            {[1,2,3,1,2,3].map((n,i) => (
              <div className="carousel-item" key={i}>
                <img src={`/images/imagescuadro${n}.jpg`} alt={`Cuadro ${n}`} />
                <p>Cuadro {n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestros Productos */}
      <section id="nuestros-productos" className="productos-section">
        <div className="productos-container">
          <aside className="filtros">
            <h3>FILTER</h3>
            <div className="filtro-precio">
              <label>Price</label>
              <input type="range" min="0" max="50000" />
            </div>
            <div className="filtro-color">
              <label>Color</label>
              <div className="color-puntos">
                {['#fff','#ccc','#000','#f00','#0f0','#00f','#ff0','#f0f','#0ff'].map((c,i)=>(
                  <span key={i} className="color-dot" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </aside>
          <div className="productos-grid">
            {productos.map((p,i) => (
              <div className="producto-card" key={i}>
                <div className="imagen-wrapper">
                  <img src={`/images/${p.image}`} alt={p.name} />
                  <button className="add-cart-btn"><FaShoppingCart /></button>
                </div>
                <h4>{p.name}</h4>
                <p className="precio">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="load-more">
          <button>Load More</button>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section id="about" className="about section-dark">
        <h2>Sobre Nosotros</h2>
        <p>Somos una tienda familiar dedicada a la confección de textiles de lino, algodón y materiales sostenibles. Inspirados por la tradición de nuestros padres en la fábrica textil, creamos diseños atemporales para un hogar acogedor.</p>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="testimonios">
        <h2>Testimonios</h2>
        <div className="testimonios-grid">
          {['Los cojines son espectaculares','Mis sábanas nunca habían sido tan suaves','Excelente atención y envío rápido'].map((t,i)=>(
            <div className="testimonio" key={i}>
              “{t}.”<br/><strong>- {['María','Juan','Laura'][i]}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="section-dark contact">
        <h2>Contacto</h2>
        <p>Visítanos en Nuestra Señora del Carmen 1330, Esquina San Martín, o escríbenos a info@entre.hilos.co</p>
      </section>
    </div>
  );
}

export default App;