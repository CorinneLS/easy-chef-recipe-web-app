import React from "react";
import notfound from "./local-file-not-found.png";
import { Link } from "react-router-dom";
import ChangeServingButton from "../../recipe/changeServingSize";
import './style.css'

const ShoppingCard = ({ id, recipe, deleted, setDeleted }) => {
const token = localStorage.getItem("token");

const handleDelete = ()=>{
  fetch(
    `http://localhost:8000/recipes/recipe/${recipe.id}/shopping-list/remove/`,
    { method: 'PATCH',
      headers: {Authorization: `Bearer ${token}`}
    }
    ).then(() => {
        setDeleted(!deleted);
    });
}

return (
  <>
  <div className="card card-width bg-white text-black" key={recipe.id}>
    <button type="button" class="closebtn btn btn-outline-brown" onClick={handleDelete}>
      <i className="fa-solid fa-xmark fs-4"></i>
    </button>
    <Link to={`/recipe/${recipe.id}`}>
      <img className="card-img shopcard-img"
          src={recipe.picture !== null ? recipe.picture : notfound}
          alt=""
        />
      <div className="card-title m-3 mb-0 h5">{recipe.name}</div>
    </Link>
    <div className='d-grid p-3 pt-0'>
      <span className="d-flex">Servings: </span> 
      <div className="justify-start d-flex flex-row">
        <ChangeServingButton 
        servings={recipe.serving_size}
        sid={recipe.id}
        />
      </div>
    </div>
    
  </div>
  </>
  
  );
};

export default ShoppingCard;