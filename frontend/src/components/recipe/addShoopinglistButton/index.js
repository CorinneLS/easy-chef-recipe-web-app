import { useContext, useEffect, useState } from "react"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import './style.css'
import { useParams } from "react-router"
import $ from 'jquery'
import './style.css'
const AddShoplistButton = () => {
  const{id} = useParams()
  const [hasClicked, setHasClicked] = useState(true);
  const token = localStorage.getItem('token')

  useEffect(()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/user-interact/`,{headers: {'Authorization': `Bearer ${token}`}})
    .then(response => {
      if (!response.ok){
        throw new Error(`HTTP error status: ${response.status}`)
      }
      return response.json()
    }).then(dat => {
      if (dat.shoppinglist){
        setHasClicked(false)
        $('#add-btn').addClass('clicked')
        $('#add-btn').removeClass('not-clicked')
      }})
  }, [id])

  const handleLike = ()=>{
    setHasClicked(!hasClicked);
    if (hasClicked){
      console.log("add to shoppinglist: ", hasClicked)
      fetch(`http://localhost:8000/recipes/recipe/${id}/shopping-list/add/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (!response.ok){
          if (response.status === 401){
            alert('You have been logged out.\n Please log in again')
          }else{
            throw new Error(`HTTP error status: ${response.status}`)
          }
        }
        return response.json()})
        .then(dat => {
          $('#add-btn').addClass('clicked')
          $('#add-btn').removeClass('not-clicked')
        })
        .catch(error => console.error(error))
        
    }
    else{
      fetch(`http://localhost:8000/recipes/recipe/${id}/shopping-list/remove/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (!response.ok){
          throw new Error(`HTTP error status: ${response.status}`)
        }
        return response.json()})
        .then(dat =>{
          $('#add-btn').addClass('not-clicked')
          $('#add-btn').removeClass('clicked')
        }
        ).catch(err => console.error(err))
        
      }
    
  }
  return(
    <>
    <button type="button" id="add-btn" className={'not-clicked btn me-2'} onClick={handleLike}><i className="fa-solid fa-cart-shopping"></i> Add</button>
    </>
  )
}

export default AddShoplistButton