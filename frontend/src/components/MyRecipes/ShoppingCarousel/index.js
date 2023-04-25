import Pagination from "../../pagination";
import ShoppingCard from "../ShoppingCard";

const ShoppingCarousel = ({ recipes, hasEnded, setPage, page, count, id, deleted, setDeleted, perPage }) => {

    return (
        <div id={id} className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="d-flex flex-row flex-nowrap justify-content-start gap-3">
                        {recipes.map((recipe) => (
                            <ShoppingCard recipe={recipe} id={id} deleted={deleted} setDeleted={setDeleted}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3 gap-2">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn btn btn-outline-brown mx-3" type="button">
                    <span>PREV</span>
                </button>
                <button disabled={page === 1} onClick={() => setPage(1)} className="btn rounded-pill btn-outline-brown" type="button">
                    <span>1</span>
                </button>
                <Pagination count={count} page={page} setPage={setPage} perPage={perPage}/>
                {Math.ceil(count / perPage) <= 5 ?
                    Math.ceil(count / perPage) !== 1 ?
                        <button disabled={page === Math.ceil(count / perPage)} onClick={() => setPage(Math.ceil(count / perPage))} className="btn rounded-pill btn-outline-brown" type="button">
                            <span>{Math.ceil(count / perPage)}</span>
                        </button>
                        :
                        undefined
                    :
                    ((Math.ceil(count / perPage) + 1) % 3 === 0 ? page >= Math.ceil(count / perPage) - 3 : (Math.ceil(count / perPage) - 1) % 3 === 0 ? page >= Math.ceil(count / perPage) - 2 : page >= Math.ceil(count / perPage) - 1) ?
                        <>
                            <button disabled={page === Math.ceil(count / 3)} onClick={() => setPage(Math.ceil(count / 3))} className="btn rounded-pill btn-outline-brown" type="button">
                                <span>{Math.ceil(count / perPage)}</span>
                            </button>
                        </> :
                        <>
                            <span>. . .</span>
                            <button disabled={page === Math.ceil(count / perPage)} onClick={() => setPage(Math.ceil(count / perPage))} className="btn rounded-pill btn-outline-brown" type="button">
                                <span>{Math.ceil(count / perPage)}</span>
                            </button>
                        </>}
                <button disabled={hasEnded} onClick={() => setPage(page + 1)} className="btn btn-outline-brown mx-3" type="button">
                    <span>NEXT</span>
                </button>
            </div>
        </div>
    )
}

export default ShoppingCarousel;