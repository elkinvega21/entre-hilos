// App.js
import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import './App.css';

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

  const productos = [
    { id: 1, name: 'Brillo Lunar', precio: 25000, description: 'Hermoso cuadro de fauna hecho en lienzo.', image: 'producto1.jpg', color: '#f0f' },
    { id: 2, name: 'Vibra Cósmica', precio: 18000, description: 'Cojín suave con tono verde musgo.', image: 'producto2.jpg', color: '#0f0' },
    { id: 3, name: 'Susurro de Lavanda', precio: 32000, description: 'Camino de mesa artesanal de lino.', image: 'producto3.jpg', color: '#fff' },
    { id: 4, name: 'Lienzo Pastel', precio: 45000, description: 'Cuadro abstracto moderno.', image: 'producto4.jpg', color: '#00f' },
    { id: 5, name: 'Eco Sereno', precio: 28000, description: 'Cojín con textura agradable.', image: 'producto5.jpg', color: '#ccc' },
    { id: 6, name: 'Cálido Amanecer', precio: 35000, description: 'Cuadro de paisaje vibrante.', image: 'producto6.jpg', color: '#f00' },
    { id: 7, name: 'Sueños de Algodón', precio: 20000, description: 'Cojín suave y acogedor.', image: 'producto7.jpg', color: '#000' },
    { id: 8, name: 'Brillo de Estrellas', precio: 30000, description: 'Cuadro de estrellas en el cielo.', image: 'producto8.jpg', color: '#ff0' },
    { id: 9, name: 'Naturaleza Viva', precio: 40000, description: 'Cuadro de naturaleza vibrante.', image: 'producto9.jpg', color: '#0ff' },
  ];

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const tl = gsap.timeline();
    if (bannerVisible) tl.from('.banner', { y: -50, opacity: 0, duration: 0.5 });
    tl.from(navbarRef.current, { y: -80, opacity: 0, duration: 0.5 }, bannerVisible ? '-=0.2' : 0);
    if (heroImageRef.current) tl.from(heroImageRef.current, { x: '20%', opacity: 0, duration: 1.5 }, bannerVisible ? '-=0.5' : 0.2);

    if (aboutRef.current) {
      gsap.fromTo(aboutRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' }
      });
    }

    if (carouselRef.current) {
      const track = carouselRef.current.querySelector('.carousel-track');
      const items = Array.from(track.children);
      const trackWidth = track.scrollWidth;
      let x = 0;
      const speed = 3;
      items.forEach(item => track.appendChild(item.cloneNode(true)));
      gsap.ticker.add(() => {
        x -= speed;
        if (x <= -trackWidth) x += trackWidth;
        track.style.transform = `translateX(${x}px)`;
      });
    }

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        const nav = navbarRef.current;
        if (self.direction === 1) gsap.to(nav, { y: -80, opacity: 0, duration: 0.3 });
        else gsap.to(nav, { y: 0, opacity: 1, duration: 0.3 });
      },
      invalidateOnRefresh: true,
    });

    return () => lenis.destroy();
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
          <p>¡Nuevo lanzamiento colección verano!</p>
          <button className="banner-close" onClick={handleBannerClose}>×</button>
        </div>
      )}

      <nav className="navbar" ref={navbarRef}>
        <div className="navbar-content">
          <a href="/" className="logo">MayArt</a>
          <FaBars className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} />
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#hero" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="#nuestros-productos" onClick={() => { scrollToProductos(); setMenuOpen(false); }}>Productos</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Sobre MayArt</a>
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
            Lleva contigo un <span className="highlight">cuadro</span><br />
            a tu estilo hecho a mano
          </h1>
          <button className="btn-primary" onClick={scrollToProductos}>Ver Productos</button>
        </div>
      </section>

      <section className="carousel-section" ref={carouselRef}>
        <h2>Productos destacados</h2>
        <div className="carousel-track">
          {[1, 2, 3, 1, 2, 3].map((n, i) => (
            <div className="carousel-item" key={i}>
              <img src={`/images/imagescuadro${n}.jpg`} alt={`Destacado ${n}`} />
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
        <h2>Sobre MayArt</h2>
        <p>Ser reconocidos como una marca líder en servicios integrales en diseño de interiores, productos de arte y regalos personalizados...</p>
      </section>

      <section id="testimonios" className="testimonios">
        <h2>Testimonios</h2>
        <div className="testimonios-grid">
          {[
            "✨ Cautivadora obra. Belleza y emoción únicas. ¡Una inversión para el alma! ✨",
            "🌟 La calidad es excepcional. Cada detalle cuenta una historia. ¡Recomiendo al 100%! 🌟",
            "💖 Un regalo perfecto. La sonrisa de mi amiga lo dice todo. ¡Gracias por la magia! 💖"
          ].map((t,i) => (
            <div className="testimonio" key={i}>
              “{t}”<br/><strong>- {['María','Juan','Laura'][i]}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contacto</h2>
        <p>Visítanos en ...</p>
      </section>

      {/* Carrito */}
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

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Datos de envío y pago</h2>
            <form>
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
