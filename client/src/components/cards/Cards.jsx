import React from "react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {getAllPokemons }from "../../redux/actions.js"
import Card from "../card/Card.jsx";
import styles from "./Cards.module.css";
import pokeball from "../../assets/gifs/pokebola.gif";


export default function AllPokemons( { allPokemons }){

    const dispatch = useDispatch();
    // const allPokemons = useSelector((state) => state.pokemons)

    useEffect(()=>{
        dispatch(getAllPokemons());
    },[dispatch]);

    return(
        <div className={styles.contCards}>
            { allPokemons ? allPokemons.map( (p) =>{
            return (
                <div id="card">
                    <Link to={"/pokemons/" + p.id} >
                    <Card 
                    id={p.id}
                    name={p.name} 
                    image={p.image} 
                    types={p.types} />
                    </Link>
                </div>
            )} 
        ) : 
      
            (
                <div className={styles.poke}>
                  <img src={pokeball} alt="pokeball" className={styles.pokeball} />
                </div>
              )
        
        } 
        </div>
    )
}