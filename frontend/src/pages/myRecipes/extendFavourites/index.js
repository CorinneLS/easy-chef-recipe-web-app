import '../../../custom.css'
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import SearchPage from '../../../components/search/searchPage';

function ExtendFavourites(){
    const token = localStorage.getItem('token')

    return(
        <>
        <div className="container container-1400 container-min-1000 mt-8">
            <div className="extendheader mb-3">
                <h1>My Favourite Recipes</h1>
            </div>

            <div className="d-flex flex-row">
                <SearchPage url={'http://localhost:8000/accounts/my-recipes/favourites'} token={token}/>
            </div>
        </div>
        </>
    );
}

export default ExtendFavourites;