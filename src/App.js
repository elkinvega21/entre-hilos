// src/App.js
import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaBars } from 'react-icons/fa';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
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

    gsap.to('.navbar', { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });

    ['.hero', '.carousel-section', '.about', '.testimonios'].forEach(sel => {
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

    gsap.to('.carousel-track', {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1,
    });
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <a
            href="https://www.instagram.com/entre.hilos.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="logo"
          >
            ENTRE HILOS
          </a>
          <FaBars className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} />
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#hero">Inicio</a>
            <a href="#productos">Productos</a>
            <a href="#about">Sobre Nosotros</a>
            <a href="#contact" className="nav-contact">Contacto</a>
            <a href="#blog">Blog</a>
          </div>
        </div>
      </nav>

      {/* Secciones */}
      <section id="hero" className="hero">
        <div className="hero-text">
          <h1>
            Lleva contigo un<span className="highlight">cuadro</span><br />
            a tu estilo hecho a mano
          </h1>
          <p>
           
          </p>
          <button className="btn-primary">Ver Productos</button>
        </div>
      </section>

      <section id="productos" className="carousel-section">
        <h2>Productos destacados</h2>
        <div className="carousel">
          <div className="carousel-track">
            {['funda','cojin','sabanas','throw'].flatMap(img => [img, img]).map((key, i) => (
              <div className="carousel-item" key={i}>
                <img src={`/images/${key}.jpg`} alt={key} />
                <p>{key.charAt(0).toUpperCase()+key.slice(1).replace('throw','Throws')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about section-dark">
        <h2>Sobre Nosotros</h2>
        <p>
          Somos una tienda familiar dedicada a la confección de textiles de lino, algodón y materiales sostenibles.
          Inspirados por la tradición de nuestros padres en la fábrica textil, creamos diseños atemporales para un hogar acogedor.
        </p>
      </section>

      <section id="testimonios" className="testimonios">
        <h2>Testimonios</h2>
        <div className="testimonios-grid">
          {['Los cojines son espectaculares','Mis sábanas nunca habían sido tan suaves','El servicio fue rápido y muy amable'].map((text,i)=>( 
            <div className="testimonio" key={i}>
              “{text}.”<br /><strong>- {['María','Juan','Laura'][i]}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section-dark contact">
        <h2>Contacto</h2>
        <p>
          Visítanos en Nuestra Señora del Carmen 1330, Esquina San Martín, o escríbenos a info@entre.hilos.co
        </p>
      </section>
    </div>
  );
}

export default App;
