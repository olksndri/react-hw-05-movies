import css from "../styles/MovieDetails.module.css";
import { useEffect, useState, Suspense } from "react";
import { Outlet, useParams, Link, useLocation } from "react-router-dom";
import { getFromDB } from "js/getFromDB";
import { StyledLink } from "./App";

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [ error, setError ] = useState(null); 


    const location = useLocation();
    const backLink = location.state?.from ?? "/";

    useEffect(() => { 
            getFromDB(`movie/${movieId}`)
            .then(({data}) => {
                setMovieDetails(
                    <div className={css['details-wrapper']}>
                        <StyledLink to={backLink}>Go back</StyledLink>
                        <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt=''></img>
                        <h2 className={css.title}>
                            <span className={css['sub-title']}>Movie title:</span> {data.title}
                        </h2>
                        <p className={css['pre-title']}>
                            <span className={css['sub-title']}>Genres: </span>
                            {data.genres.map((el, i) => {
                            return ((i !== data.genres.length - 1) ? `${el.name}, ` : `${el.name}.`); 
                            })}
                        </p>
                        <p className={css.overview}>
                            <span className={css['sub-title']}>Overview:</span> { data.overview }
                        </p>
                        <p className={css['release_date']}>
                            <span className={css['sub-title']}>Release date:</span> { data['release_date'] }
                        </p>
                        <p className={css['vote_average']}>
                            <span className={css['sub-title']}>Vote average:</span> { data['vote_average'] }
                        </p>
                        <Link to='reviews' className={css['reviews-link']} state={{from: backLink}}>Reviews</Link>
                        <Link to='cast' className={css['cast-link']} state={{from: backLink}}>Cast</Link>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet/>
                        </Suspense>
                    </div>
                )
            })
                .catch(err => {
                    console.log(err);
                    setError(Number(err.response.status));
                });
    }, [backLink, movieId])

    return (
        <>
            {error === null ? movieDetails : <div>{error === 404 && 'We cant found info about this movie, sorry'}</div>}
        </>
    )
    
}

export default MovieDetails; 