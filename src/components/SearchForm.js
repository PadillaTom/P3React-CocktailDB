import React from 'react';

export default function SearchForm({ setSearchTerm }) {
  // UseRef HOOK --> Mostly used in Inputs
  const searchValue = React.useRef('');
  // console.log(searchValue); // Vemos el Object con CURRENT
  //
  //
  // Focus on INPUT al entrar al web:
  React.useEffect(() => {
    searchValue.current.focus();
  }, []); // Que Refreshee una sola Vez al cargar la Web.
  //
  // Para prevenir el Refresh de la Web:
  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  const searchCocktail = () => {
    // console.log(searchValue.current.value);
    // Usariamos el CURRENT.VALUE para obtener lo typed por el usuario
    setSearchTerm(searchValue.current.value);
    // Con cada TYPE--> hacemos un new HTTP Request
  };
  //
  //
  return (
    <section className='section'>
      <h2 className='section-title'>search cocktails</h2>
      <form className='form search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Search </label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={searchCocktail}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
}
