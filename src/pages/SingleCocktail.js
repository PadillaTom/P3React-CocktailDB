import React from 'react';
import { useParams, Link } from 'react-router-dom';

// URL ID: https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

export default function SingleCocktail() {
  // console.log(useParams()); // Vemos que nos devuelve un Object con ID:xxx
  const { id } = useParams(); // Alojamos el ID
  // ********** Hooks ****************
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);
  //
  // ******** Using the API **********
  React.useEffect(() => {
    // Loading:
    setLoading(true);
    async function getCocktail() {
      try {
        // HTTP Request
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.drinks) {
          //  SI TRUE: DESTRUCTURE AND NEW OBJECT:
          console.log(data.drinks);
          // Vemos el Object con su Data, Solo falta Display Dicha data en la web
          // --> Destructure: Usamos [0] porque es un Array de 1 solo Item!
          // Elegimos las Properties Necesarias:
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          // Creamos un Array para los Ingredientes, asi poder trabajar mas comodos
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          // Creamos New Object: NewCocktail para ser displayed en la web
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          // Alojamos en el STATE! --->
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]); // Reload cada vez que cambie el ID
  //
  //
  // Loading and No Match --->
  if (loading) {
    return <h2 className='section-title'>Loading...</h2>;
  }
  if (!cocktail) {
    return <h2 className='section-title'>No Such Cocktail</h2>;
  } else {
    // Ultimo Destructure: Para acceder sin usar: "cocktail.propoerty"
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail;
    // Display ---->
    // Ingredients: Iteramos, return ternary: TRUE: items, FALSE: null (no displayed)
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          Back to Home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name} />
          <div className='drink-info'>
            <p>name: {name}</p>
            <p>category: {category}</p>
            <p>info: {info}</p>
            <p>glass: {glass}</p>
            <p>instructions: {instructions}</p>
            <p>
              ingredients:
              {ingredients.map((item, index) => {
                return item ? <span key={index}>{item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
