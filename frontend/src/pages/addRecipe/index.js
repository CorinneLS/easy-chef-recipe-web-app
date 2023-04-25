/* eslint-disable no-restricted-globals */
import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import RecipeForm from '../../components/form/recipe';
import RecipeAPIContext, { useRecipeAPIContext } from '../../contexts/recipeAPIcontext';


function AddRecipe() {

    return (
        <>
            <div className="container-1000 ms-auto me-auto">
            <h1 className="mt-8">Create New Recipe</h1>
                <RecipeAPIContext.Provider value={useRecipeAPIContext()}>
                <RecipeForm/>
                </RecipeAPIContext.Provider>
            </div>
            
        </>
    );
   
  }
  
  export default AddRecipe;
  