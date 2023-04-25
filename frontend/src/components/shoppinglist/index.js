import React, { useContext, useEffect, useState } from 'react';
import "../../custom.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import ShoppingCarousel from '../MyRecipes/ShoppingCarousel';
import { useSpring, animated } from "react-spring";
import { useNavigate } from 'react-router-dom';
import RecipeAPIContext from '../../contexts/recipeAPIcontext';

const ShoppingList = ({ url }) => {
    const navigate = useNavigate();
    const perPage = 4;
    const [deleted, setDeleted] = useState(false)
    const token = localStorage.getItem('token')

    const [hasEnded, setHasEnded] = useState(true)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const {changeServings} = useContext(RecipeAPIContext)

    var [ingredients, setIngredients] = useState([]);
    var [recipes, setRecipes] = useState([]);
    
    const dietCode = {"NONE": "N/A", "VEGAN": "Vegan", "VEG": "Vegetarian", 
    "GLUTENF": "Gluten-free", "LCARB": "Low-carb", "KT": "Keto", "LF": "Low-fat"}
    const cuisineCode = {"NONE": "N/A", "CN": "Chinese", "CR": "Creole", 
    "FR": "French", "IN": "Indian", "JP": "Japanese", "KO": "Korean", "ME": "Middle-Eastern", "WE": "Western"}

    const props = useSpring({
        config: { duration: 500 },
        to: {opacity: 1},
        from: {opacity: 0},
        reset: true,
        delay: 0,
    })

    useEffect(() => {
        console.log("fetch----")
        fetch(url,
            {
                method: "GET",
                headers: token === undefined ? {} : {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/profile')
                    }
                } else {
                    return response.json()
                }
            })
            .then((data) => {if (data.list_ingredients !== undefined) {
                console.log(data)
                setIngredients(data.list_ingredients)
            }})
    }, [url, token, deleted, changeServings])

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/profile/shopping-list?p=${page}&page_size=${perPage}`,
            {
                method: "GET",
                headers: token === undefined ? {} : {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/profile')
                    }
                } else {
                    return response.json()
                }
            })
            .then((data) => {
                setRecipes(data.results)
                setCount(data.count)
                setHasEnded(data.next === null)
            })
    }, [token, page, deleted])

    if (recipes.length === 0) {
        return (
            <>
            <div className="d-flex flex-row flex-wrap gap-3 mb-[400px]" style={{'margin-bottom': '475px'}}>
                <h2>No recipes have been added to your shopping list!</h2>
            </div>
            </>
        )
    }
    return (
        <>
            <animated.div style={props}>
                <ShoppingCarousel recipes={recipes} hasEnded={hasEnded} setPage={setPage} page={page} count={count} id={"shoppinglist"} perPage={perPage} deleted={deleted} setDeleted={setDeleted}/>
            </animated.div>
            <div className="mt-5">
                    <h1>To Buy:</h1>
                    <div className = "mt-3 d-flex d-row">
                        <ul>
                        {ingredients.map((ingredient, i) => (
                            <li className="me-5" key={i}>
                                {ingredient.quantity} {ingredient.units} {ingredient.name}
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
        </>
    );
}

export default ShoppingList;