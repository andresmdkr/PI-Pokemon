import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterCreated , filterByName , filterByAttack , resetPokemons, getTypes, filterByTypes, getAllPokemons}from "../../redux/actions.js";
import Cards from "../../components/cards/Cards.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import Paginate from "../../components/paginate/Paginate.jsx";

import styles from "./Home.module.css";

import logo from "../../assets/logo.png";
import agregar from "../../assets/agregar.png";
import recargar from "../../assets/recargar.png";
import pokeball from "../../assets/gifs/pokebola.gif";


export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons)
    const allTypes = useSelector(state => state.types);

    useEffect(()=>{
        dispatch(getAllPokemons());
        dispatch(getTypes());
    },[dispatch]);

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    function handleOrder(e){
        if(e.target.value === "asc" || e.target.value === "desc"){
            e.preventDefault();
            dispatch(filterByName(e.target.value))
        }
        if(e.target.value === "strong" || e.target.value === "weak"){
            e.preventDefault();
            dispatch(filterByAttack(e.target.value))
        }
        if(e.target.value === "all"){
            e.preventDefault();
            dispatch(resetPokemons(e.target.value))
        }
    }
    function handleFilterByType(e){
     e.preventDefault();
     dispatch(filterByTypes(e.target.value))
    }
    function handleClick(e){
      e.preventDefault();
      dispatch(getAllPokemons())
    }
    ////// Paginado
    const [currentPage, setCurrentPage] = useState(1); 
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); 
    const indexOfLastPokemon = currentPage * pokemonsPerPage; 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; 
    const currentCharacter = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
   
   
    function paginate(pageNumber){
        setCurrentPage(pageNumber)
    }

    return(
        <div className={styles.contHome}>
          <div>
            <div className={styles.navBar}>
              <div className={styles.contIzq}>
                <Link to="/">
                <img src={logo} alt="logo" className={styles.logo}></img>
                </Link>
              </div>

              <SearchBar/>
              
              <div className={styles.navDer}>
                <Link to="/create"><img src={agregar} alt="agregar" className={styles.agregar}></img></Link>
                <button onClick={(e) => {handleClick(e);}} className={styles.butRec}>
                <img src={recargar} alt="recargar" className={styles.recargar}></img>
                </button>
              </div>
              </div>
            
           
        <div className={styles.filtros}>

          <select
            onChange={(e) => handleFilterCreated(e)}
            className={styles.created}
            >
            <option value="all">All</option>
            <option value="existing">Existing</option>
            <option value="created">Created</option>
          </select>

          <select
            onChange={(e) => handleOrder(e)}
            className={styles.order}
            >
            <option value="all">All</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
            <option value="strong">Strong</option>
            <option value="weak">Weak</option>
          </select>

          <select
            onChange={(e) => handleFilterByType(e)}
            className={styles.types}
          >
            <option value="all">All</option>
            {allTypes.map((t) => {
              return (
                <option value={t.name} key={t.name}>
                  {t.name[0].toUpperCase() + t.name.slice(1)}
                </option>
              );
            })}
          </select>
         
         
        <Paginate 
          paginate={paginate}
          allPokemons={allPokemons.length}
          pokemonsPerPage={pokemonsPerPage}
          />
        {currentCharacter.length? <Cards allPokemons={ currentCharacter } /> : <img src={pokeball} alt="pokeball" className={styles.pokeball} />}
        
        </div>

        
        </div>
        </div>
    )
}