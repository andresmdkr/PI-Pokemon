import axios from "axios";
import {GET_ALL_POKEMONS , 
        SEARCH_BY_NAME, 
        ERROR_SEARCH_BY_NAME,
        FILTER_CREATED,
        ORDER_BY_NAME,
        ORDER_BY_ATTACK,
        RESET_POKEMONS,
        GET_TYPES,
        FILTER_BY_TYPES,
        GET_DETAIL,
        DELETE_POKEMON} from "./actions-types"


export function getAllPokemons(){
    return async function(dispatch){
        let json = await axios.get("/pokemons", {});
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: json.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        let json = await axios.get("/types", {});
        return dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }
}

export function searchByName(name) {
    return async function (dispatch) {
      try {
        const response = await axios.get("/pokemons?name=" + name);
        dispatch({
          type: SEARCH_BY_NAME,
          payload: response.data,
        });
        return response.data;
      } catch (error) {
        dispatch({
          type: ERROR_SEARCH_BY_NAME,
          payload: "No se pudo encontrar el Pokémon. Intente nuevamente.",
        });
        throw error;
      }
    };
  }

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function filterByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function filterByAttack(payload){
    return{
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function resetPokemons(payload){
    return{
        type: RESET_POKEMONS,
        payload
    }
}

export function filterByTypes(payload){
    return{
        type: FILTER_BY_TYPES,
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        let json = await axios.get("/pokemons/" + id);
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        })
    }
}

export function createPokemon(payload){
    return async function(){
        let json = await axios.post("/pokemons", payload);
        return json;
    }
}

export function deletePokemon(id) {
    return async function (dispatch) {
      try {
        await axios.delete(`/pokemons/${id}`);
        return dispatch({
          type: DELETE_POKEMON,
        });
      } catch (error) {
        console.log("Error deleting pokemon", error);
      }
    };
}
  