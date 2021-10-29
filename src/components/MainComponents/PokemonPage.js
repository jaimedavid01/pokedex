import React, { useEffect, useState } from "react";
import PokemonCollection from "../Feed/PokemonCollection";
import Pagination from './Pagination';
import Search from "./Search";

function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");

  ////Fetch All Pokemons from API
  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150");
      const items = await response.json()
      setLoading(false);
      return items;

    }
    
    fetchPosts().then(poke => {
      setPokemon(poke.results)
      console.log(pokemon)
  })}, []);


 /// Get Current 25 items
 const indexOfLastPost = currentPage * itemsPerPage;
 const indexofFirstPost = indexOfLastPost - itemsPerPage;
 const currentPosts = pokemon.slice(indexofFirstPost, indexOfLastPost)

  ///// Search filter logic
  const pokemonsToDisplay = currentPosts.filter((poke) =>
  poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //// Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>Pokedex</h1>
    
      <Search
      searchTerm={searchTerm} 
      onChangeSearch={setSearchTerm} />

      <PokemonCollection 
      pokemon={pokemonsToDisplay} 
      loading={loading} />
      
      
      <Pagination 
      itemsPerPage={itemsPerPage} 
      totalPosts={pokemon.length} 
      paginate={paginate} />

    </div>
  );
}

export default PokemonPage;