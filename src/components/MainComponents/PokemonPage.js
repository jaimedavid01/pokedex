import React, { useEffect, useState } from "react";
import PokemonCollection from "../Feed/PokemonCollection";
import Pagination from './Pagination';

function PokemonPage() {
  const [fullData, setFullData] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);





  ////Fetch All Pokemons from API
  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentPage}&limit=25`);
      const items = await response.json();
      setLoading(false);
      console.log(items)
      return items;
    }
    
    fetchPosts().then(poke => {
      setFullData(poke)
      setPokemon(poke.results)
  
  })}, []);




  //// Change page
  function paginate(pageNumber) {
    setLoading(true);
    console.log("pageNumber", pageNumber)

    let offset = 0
    offset = (pageNumber - 1) * 25;

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=25`)
    .then(r => r.json())
    .then(data => {
      console.log("data", data)
      setPokemon(data.results)
      setCurrentPage(pageNumber)
    })

    setLoading(false);
  };



  return (
    <div className="App">
      <h1>Pokedex</h1>

      <PokemonCollection 
      pokemon={pokemon} 
      loading={loading} />
      
      
      <Pagination 
      itemsPerPage={itemsPerPage} 
      totalPosts={fullData.count} 
      paginate={paginate} 
      handleNextbtn={handleNextbtn}
      handlePrevbtn={handlePrevbtn}
      currentPage={currentPage}
      maxPageNumberLimit={maxPageNumberLimit}
      minPageNumberLimit={minPageNumberLimit}
      />
      
    </div>
  );
}

export default PokemonPage;