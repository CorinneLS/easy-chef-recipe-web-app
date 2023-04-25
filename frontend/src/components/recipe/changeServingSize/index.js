import { useContext } from "react"
import { useParams } from "react-router"
import RecipeAPIContext from "../../../contexts/recipeAPIcontext"
import $ from 'jquery'

const ChangeServingButton = (props) =>{
  const {servings, sid} = props
  let {id} = useParams()
  const {data, setData, changeServings, setChangeServings} = useContext(RecipeAPIContext)
  const token = localStorage.getItem('token')

  const handleClick = (e) => {
    e.preventDefault()
    let num = $('#serving-input').val()
    // if (num == 0){
    //   alert('serving size cannot be 0!')
    //   return
    // }
    if (!id){
      id = sid
    }
    fetch(`http://localhost:8000/recipes/recipe/${id}/edit-serving-size/`, {
      method: 'PATCH', 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({'serving_size': num})
    }).then(response =>{
      console.log("response", response)
      if (!response.ok){
        throw new Error(`HTTP error status: ${response.status}`)
      }
      return response.json()
    }).then(dat => {
        setData(dat)
        setChangeServings(!changeServings)
      })
    .catch(err=> console.error(err))
  }

  return(
    <>
    <form className="bg-light-50">
        <input type="number" id="serving-input" className="me-2 rounded p-1" style={{width: "70px"}} placeholder={data.serving_size? data.serving_size : servings}/>
        <button onClick={handleClick} className="btn btn-brown">Change</button>
      </form>
    </>
  )
}

export default ChangeServingButton