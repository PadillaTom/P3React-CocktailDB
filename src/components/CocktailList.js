import React from 'react';
import Cocktail from '../components/Cocktail';

// Main:
// Pasamos como PROP el Cocktails (Array ya destructurado)
export default function CocktailList({ cocktails, loading }) {
  // Loading
  if (loading) {
    return <h2 className='section-title'>Loading...</h2>;
  }
  // Si el Array returns Empty:
  if (cocktails.length < 1) {
    return <h2 className='section-title'>No Cocktails Match, try again.</h2>;
  }
  // Main -->
  // Mapeamos la Array de Cocktails (filtradas por SearchTerm)
  // Creando un <Cocktail key={item.id}
  //{...items}--> Toma todas las properties del Objet y las pasa como PROP
  return (
    <section className='section'>
      <h2 className='section-title'>Cocktails</h2>
      <div className='cocktails-center'>
        {cocktails.map((item) => {
          return <Cocktail key={item.id} {...item}></Cocktail>;
        })}
      </div>
    </section>
  );
}
