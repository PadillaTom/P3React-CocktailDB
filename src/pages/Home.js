import React from 'react';
import CocktailsList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';

// Main:
export default function Home() {
  // ******* Hooks ********
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('a');
  const [cocktails, setCocktails] = React.useState([]);
  // ********* APIs **********
  // URL Name : https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
  // URL Id : https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
  //
  // [] = Runs Once, when Refreshing
  React.useEffect(() => {
    // 3) Loading GIF:
    setLoading(true); // Aqui figura, corre todo el codigo------->
    // 2) Creamos un ASYNC donde pasaremos la API
    async function getDrinks() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        // Tomamos la Data y la destructuramos:
        const data = await response.json();
        const { drinks } = data;
        // Condicion:
        if (drinks) {
          // console.log(drinks); // Vemos los cocktails matcheados por SearchTerm
          // IF TRUE: Creamos New Array y destructuramos sus Properties
          const newCocktails = drinks.map((item) => {
            // Destructuramos ciertas Properties
            const {
              idDrink,
              strDrink,
              strDrinkThumb,
              strAlcoholic,
              strGlass,
            } = item;
            // Rename dichas Properties
            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass,
            };
          });
          setCocktails(newCocktails); // Pasamos el New Array , con new names para Properties
        } else {
          setCocktails([]); // IF FALSE: Empty Array
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false); // Una vez corrido el codigo: False ------>
    }
    getDrinks();
    //
    // 1) Agarramos link, THEN, JSON de la response, THEN setCocktails VER COCKTAILS LIST
    // fetch(
    //   `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    // ).then((response) =>
    //   response.json().then((data) => setCocktails(data.drinks))
    // );
  }, [searchTerm]); // Toma Data cuando Cambia el SearchTerm (input de buscar)

  // ********** Return ****************
  return (
    <main>
      <SearchForm setSearchTerm={setSearchTerm}></SearchForm>
      <CocktailsList loading={loading} cocktails={cocktails}></CocktailsList>
    </main>
  );
}
