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
  const heroImageRef = useRef(null); // Sigue presente, pero recuerda asignarlo en JSX si quieres usarlo.
  const carouselRef = useRef(null); // Ref para la sección "Productos Destacados"
  const aboutRef = useRef(null);

const productos = [
  { id: 1, name: 'Brillo Lunar', precio: 25000, description: 'Pequeño bolso o neceser tejido en verde intenso con una rica textura trenzada, ideal para llevar tus esenciales con estilo', image: 'producto1.jpg', color: '#f0f' },
  { id: 2, name: 'Vibra Cósmica', precio: 18000, description: 'Llamativo bolso de mano en combinación de rosa y negro, con asas cortas y un coqueto detalle de borla, perfecto para destacar.', image: 'producto2.jpg', color: '#0f0' },
  { id: 3, name: 'Susurro de Lavanda', precio: 32000, description: 'Práctico bolso tejido tipo bandolera en tonos neutros (beige y crudo), con cuerpo cilíndrico, ideal para un estilo relajado y natural.', image: 'producto3.jpg', color: '#fff' },
  { id: 4, name: 'Lienzo Pastel', precio: 45000, description: 'Encantador mini bolso de mano tejido en delicados tonos rosa, con asa corta, un accesorio dulce y artesanal para tus salidas.', image: 'producto4.jpg', color: '#00f' },
  { id: 5, name: 'Eco Sereno', precio: 28000, description: 'Pieza rectangular tejida en un sereno color verde oliva, con textura de punto, perfecta como individual, paño decorativo o pequeño camino de mesa.', image: 'producto5.jpg', color: '#ccc' },
  { id: 6, name: 'Cálido Amanecer', precio: 35000, description: 'Círculo tejido en un profundo azul marino, con textura en relieve, ideal como posavasos grande, tapete individual o centro decorativo.', image: 'producto6.jpg', color: '#f00' },
];

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const tl = gsap.timeline();
    if (bannerVisible) tl.from('.banner', { y: -50, opacity: 0, duration: 1.5 });
    tl.from(navbarRef.current, { y: -80, opacity: 0, duration: 0.5 }, bannerVisible ? '-=0.2' : 0);
    
    if (heroImageRef.current) tl.from(heroImageRef.current, { x: '20%', opacity: 0, duration: 1.5 }, bannerVisible ? '-=0.5' : 0.2);

    if (aboutRef.current) {
      gsap.fromTo(aboutRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' }
      });
    }

    if (carouselRef.current) {

    }

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        const nav = navbarRef.current;
        if (nav) {
          if (self.direction === 1) gsap.to(nav, { y: -80, opacity: 0, duration: 0.3 });
          else gsap.to(nav, { y: 0, opacity: 1, duration: 0.3 });
        }
      },
      invalidateOnRefresh: true,
    });

    return () => {
        lenis.destroy();
        // Considera limpiar GSAP timelines y ScrollTriggers si es necesario
        // tl.kill();
        // ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [bannerVisible]);

  const scrollToProductos = () => {
    document.getElementById('nuestros-productos').scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = producto => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === producto.id);
      if (exists) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...producto, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCartItems(prev =>
      prev
        .map(p => p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p)
        .filter(p => p.quantity > 0)
    );
  };

  const removeFromCart = id => {
    setCartItems(prev => prev.filter(p => p.id !== id));
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
            <a href="#hero" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="#nuestros-productos" onClick={e => { e.preventDefault(); scrollToProductos(); setMenuOpen(false); }}>Productos</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Sobre Woman Tech</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a>
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
            lleva un buen motivo de <span className="highlight">alegria</span><br />
            a tu hogar
          </h1>
          <button className="btn-primary" onClick={scrollToProductos}>Haz un regalo inolvidable</button>
        </div>
      </section>

      <section className="carousel-section" ref={carouselRef}>
        <h2>Experiencias unicas</h2>
        <div className="collage-grid">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
            <div className="collage-item" key={n}>
              <img src={`/images/imagescuadro${n}.jpeg`} alt={`Destacado ${n}`} />
            </div>
          ))}
        </div>
      </section>

      <section id="nuestros-productos" className="productos-section">
        <div className="productos-container">
          <aside className="filtros">
            <h3>FILTRAR</h3>
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
                {['#fff','#ccc','#000','#f00','#0f0','#00f','#ff0','#f0f','#0ff'].map((c,i) => (
                  <span
                    key={i}
                    className={`color-dot ${colorFilter===c?'selected':''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColorFilter(c)}
                  />
                ))}
                {colorFilter && <button className="clear-filter" onClick={() => setColorFilter('')}>Limpiar Filtro</button>}
              </div>
            </div>
          </aside>
          <div className="productos-grid">
            {productos
              .filter(p => p.precio <= precioFilter && (!colorFilter || p.color === colorFilter))
              .map(p => (
                <div className="producto-card" key={p.id}>
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
          </div>
        </div>
      </section>

      <section id="about" className="about" ref={aboutRef}>
        <h2>Objetivo</h2>
        <p>
          Woman Tech busca empoderar económicamente a
          mujeres en comunidades rurales mediante una plataforma digital que visibiliza y
          potencia sus talentos, conocimientos ancestrales y habilidades productivas.
          El objetivo es facilitar su acceso a herramientas tecnológicas, mercados digitales y
          redes de colaboración para generar oportunidades sostenibles, promover su integración comunitaria,
          valorizar sus saberes tradicionales
          y reducir la brecha de género en el acceso a la tecnología y el emprendimiento digital.
        </p>
      </section>

      <section id="testimonios" className="testimonios">
        <h2>Testimonios</h2>
        <div className="testimonios-grid">
          {[
            { quote: "✨ Woman Tech ha transformado mi manera de ver el emprendimiento. Ahora mis creaciones llegan a más personas. ✨", author: "Artesana de Manzanares" },
            { quote: "🌟 Gracias a la plataforma, he aprendido a usar herramientas digitales que antes desconocía. ¡Me siento empoderada! 🌟", author: "Emprendedora local" },
            { quote: "💖 Es maravilloso ver cómo se valora nuestro saber ancestral. Woman Tech es un puente al mundo. 💖", author: "Mujer de la comunidad" }
          ].map((t,i) => (
            <div className="testimonio" key={i}>
              “{t.quote}”<br/><strong>- {t.author}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
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
                <div className="cart-item" key={item.id}>
                  <img src={`/images/${item.image}`} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-desc">{item.description}</p>
                    <p className="item-price">Precio: {formatCOP(item.precio)}</p>
                    <div className="qty-controls">
                      <button onClick={() => changeQty(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQty(item.id, +1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
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
            <button className="btn-primary continuar" onClick={() => setModalOpen(true)}>
              Continuar con la compra
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Datos de envío y pago</h2>
            <form onSubmit={e => { e.preventDefault(); setModalOpen(false); }}>
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