import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import "../../styles/Colors.css";

export default function Card({ name, image, types, id }) {
  return (
    <Link to={`/pokemons/${id}`} className={styles.contCard}>

      <div className={styles.name} >{name[0].toUpperCase() + name.slice(1)}</div>

      <img src={image} alt="img card" className={styles.image}/>

      <div className={styles.types}>
        {types.map((type) => (
          <div key={id + type} className={type}>
            {type.toUpperCase()}
          </div>
        ))}
      </div>
      
    </Link>
  );
}