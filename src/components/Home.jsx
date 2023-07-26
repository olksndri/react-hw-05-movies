import css from "../styles/Home.module.css"; 
import { getFromDB } from "js/getFromDB";
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { StyledLink } from "./App";
import { useLocation } from "react-router-dom";

const Home = () => {
    const [trending, setTrending] = useState([]); 
    const location = useLocation(); 

    useEffect(() => {
            getFromDB('trending/all/day')
            .then(({data: {results}}) => {
                setTrending(results.map(el => { 
                    return (
                        <li key={nanoid()} className={css.item}>
                            <StyledLink to={`/movies/${el.id}`} state={{from: location}}>{el.title === undefined ? el.name : el.title}</StyledLink>
                        </li>
                    )
            }))
            })
            .catch(err => console.log(err));
        console.log("hi"); 
    }, [location])

    return (
        <div className={css['home-wrapper']}>
            <h1 className={css.title}>Trending films today: </h1>
            <ol className={css.list}>
                {trending}
            </ol>
        </div>
    )
}
export default Home; 