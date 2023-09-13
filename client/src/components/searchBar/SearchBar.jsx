import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByName } from "../../redux/actions.js";
import buscar from "../../assets/buscar.png";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        window.alert("No se encontró el pokemon");
      });
    setName("");
  }



  return (
    <div className={styles.buscador}>
      <input
        type="text"
        placeholder="Busca tu Pokémon..."
        onChange={(e) => handleInput(e)}
        value={name}
        className={styles.input}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={styles.butBuscar}
      >
        <img src={buscar} alt="buscar" className={styles.buscar} />
      </button>
    </div>
  );
}
