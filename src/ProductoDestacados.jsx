import React from 'react';
import './ProductosDestacados.css'; // si tienes estilos separados

const productos = [
  {
    id: 1,
    imagen: '/images/imagescuadro1.jpg',
    descripcion: 'Cuadro personalizado de pareja',
  },
  {
    id: 2,
    imagen: '/images/imagescuadro2.jpg',
    descripcion: 'Cuadro minimalista con fondo celeste',
  },
  {
    id: 3,
    imagen: '/images/imagescuadro3.jpg',
    descripcion: 'Cuadro familiar con luces doradas',
  },
];

const ProductosDestacados = () => {
  return (
    <section className="productos-destacados">
      <h2>Productos Destacados</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto">
            <img src={producto.imagen} alt={`Producto ${producto.id}`} />
            <p>{producto.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductosDestacados;
