import {React, useContext, useState, useEffect} from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext';
import FormDiv from '../form input div';
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import axios from 'axios';

const RecipeForm = () => {
  let {data, setData} = useContext(RecipeAPIContext)

  const navigate = useNavigate()

  const createRecipeSubmit = (event) =>{
    console.log($('#recipe-pic')[0].files)
    event.preventDefault()
    const formData = new FormData();
    const form = {
      name: $('#recipe-name').val(),
      diet: $('#diet').val() || '',
      cuisine: $('#cuisine').val() || '',
      serving_size: parseInt($('#servings').val()) || 1,
      cooking_time: parseInt($('#cooking-time').val()) || 0,
      prep_time: parseInt($('#prep-time').val()) || 0,
      ingredients_list: $('#ingredients-list').val() || '',
      picture: $('#recipe-pic')[0].files[0] || ''
    }  
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    let hasError = false
    Object.entries(form).forEach(([key, value]) => {
      if ((!value || value === '')){
        console.log("missing",value, key)
        hasError = true
      }
    })

    if (hasError){
      $("#form-error").html("Please fill out all required fields!")
    }
    else{
      $("#form-error").html("")
      const token = localStorage.getItem('token')

        axios.post('http://localhost:8000/recipes/add/', formData,
        {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log("successful submission")
            return response.data
          })
        .then(dat =>{ 
          navigate(`/recipe/${dat.id}/add-direction`)
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            console.log("Unauthorized");
            alert('You have been logged out.\n Please log in again')
          } 
          else if(error.response && error.response.status === 400){
            $("#form-error").html('missing fields!');
          }
          else {
           
            console.error(error);
            $("#form-error").html(error.message);
          }
        })
      }
  }
  
  return(
    <>
    <form className="card bg-light-brown mt-3 p-5">
      
    <div className="d-flex mb-3">
        <label for="recipe-name" className="form-label mb-auto mt-auto me-2">Recipe Name:</label>
        <input type="text" className="form-control" id="recipe-name" placeholder="Enter recipe name"/>
    </div>
    <div className="d-flex mb-3">
        <label for="recipe-pic" className="form-label mb-auto mt-auto me-2">Pictures:</label>
        <input type="file" className="form-control" id="recipe-pic"/>
    </div>
      <div className="d-flex mb-4">
            <label className="form-label me-2">Type of Diet:</label>
            <select className="form-select-sm" id='diet' name='diet' multiple required>
                <option value="NONE">None</option>
                <option value="VEGAN">Vegan</option>
                <option value="VEG">Vegetarian</option>
                <option value="GLUTENF">Gluten-free</option>
                <option value="LCARB">Low carb</option>
                <option value="KT">Keto</option>
                <option value="LF">Low Fat</option>
            </select>
        </div>

        <div className="d-flex mb-4">
            <label className="me-2 form-label">Type of Cuisine: </label>
            <select className="form-select-sm" id='cuisine' name='cuisine' required>
                <option value="NONE">None</option>
                <option value="CN">Chinese</option>
                <option value="CR">Creole</option>
                <option value="FR">French</option>
                <option value="IN">Indian</option>
                <option value="JP">Japanese</option>
                <option value="KO">Korean</option>
                <option value="ME">Middle-East</option>
                <option value="WE">Western</option>
            </select>
        </div>

    <div className="d-flex mb-3">
        <label for="prep-time" className="form-label mb-auto mt-auto me-2">Prep time:</label>
        <input type="number" className="form-control" id="prep-time" placeholder='time in minutes'/>
    </div>

    <div className="d-flex mb-3">
        <label for="cooking-time" className="form-label mb-auto mt-auto me-2">Cooking time:</label>
        <input type="number" className="form-control" id="cooking-time" placeholder='time in minutes'/>
    </div>

    <div className="d-flex mb-3">
        <label for="servings" className="form-label mb-auto mt-auto me-2">Serving size:</label>
        <input type="number" className="form-control" id="servings" placeholder='per person'/>
    </div>

      <label className="form-label">Ingredients:</label>
        <textarea rows="8" className="form-control w-50" id="ingredients-list" name='ingredients_list' placeholder='[quantity] [cup/pound/tbsp/tsp] [ingredient name]' required></textarea>
      
        <div className='d-flex justify-content-end mt-5'>
            <button className="btn btn-brown ps-5 pe-5" onClick={createRecipeSubmit}>Next</button>
            
        </div>
        <div className='d-flex flex-row-reverse mt-2'><p id="form-error"></p></div>        
    </form>  
    </>
  )
    
}


export default RecipeForm;
