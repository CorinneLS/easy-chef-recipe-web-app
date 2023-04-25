import { useEffect, useState } from "react"
import './style.css'
import { useParams } from "react-router"
import $ from 'jquery'

const FavouriteButton = () => {
  const{id} = useParams()
  const [hasFav, setHasFav] = useState(true)
  const [fav, setFav] = useState(0);
  const token = localStorage.getItem('token')

  useEffect( ()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/`)
    .then(response => response.json())
    .then(json => {
      setFav(json.num_fav)})
  },[hasFav, id]
  )

  useEffect(()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/user-interact/`,{headers: {'Authorization': `Bearer ${token}`}})
    .then(response => {
      if (!response.ok){
        throw new Error(`HTTP error status: ${response.status}`)
      }
      return response.json()
    }).then(dat => {
      if (dat.faved){
        setHasFav(false)
        $('#fav-btn i').addClass('fa-solid')
        $('#fav-btn i').removeClass('fa-regular')
      }})
  }, [id])

  const handleFav = ()=>{
    setHasFav(!hasFav)
    if (hasFav){
      console.log("fav add")
      fetch(`http://localhost:8000/recipes/recipe/${id}/add-favourite/`,{
        method: 'PATCH', 
        headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status === 201 || response.status === 200){
          console.log("successful request")
          return response.json()
        }
        else if (response.status === 401){
          alert('You have been logged out.\n Please log in again')
        }else{
          throw new Error(`HTTP error status: ${response.status}`)
        }
        return response.json()})
        .then(dat => {
          console.log("fav add", dat)
          setFav(dat.num_fav)
          $('#fav-btn i').addClass('fa-solid')
        $('#fav-btn i').removeClass('fa-regular')
        })
        .catch(error => console.error(error))
        
    }
    else{
      console.log("fav remove")
      fetch(`http://localhost:8000/recipes/recipe/${id}/remove-favourite/`,{
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
        .then(dat => {
          console.log("fav remove", dat)
          setFav(dat.num_fav)
          $('#fav-btn i').addClass('fa-regular')
          $('#fav-btn i').removeClass('fa-solid')
        }).catch(err => console.error(err))
      }
    
  }
  return(
    <>
    <button type="button" id="fav-btn" className={'not-clicked btn ms-2'} onClick={handleFav}>Favourite<i className="fa-regular fa-heart ms-1 me-1"></i>{fav}</button>
    </>
  )
}

export default FavouriteButton