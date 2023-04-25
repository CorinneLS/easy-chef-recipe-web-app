import '../../custom.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import ShoppingListComp from '../../components/shoppinglist';
import RecipeAPIContext, { useRecipeAPIContext } from '../../contexts/recipeAPIcontext';

function ShoppingList() {
    return (
      <>
      <div className="container-1000 mt-8 ms-auto me-auto">
        <h1>My Shopping List</h1>
        <RecipeAPIContext.Provider value={useRecipeAPIContext()}>
          <ShoppingListComp url={'http://localhost:8000/recipes/shoppinglist'}/>
        </RecipeAPIContext.Provider>
      </div>
      </>   
    )
  }
  
  export default ShoppingList;
  