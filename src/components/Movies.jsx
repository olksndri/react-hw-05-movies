import css from '../styles/Movies.module.css'; 
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { getFromDB } from 'js/getFromDB';
import { StyledLink } from './App';
import { useSearchParams, useLocation } from "react-router-dom";

const Movies = () => {
    const [films, setFilms] = useState([]); 
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation(); 
    const query = searchParams.get("query"); 

    const onSubmit = evt => { 
        evt.preventDefault(); 
        const inputValue = evt.target.lastElementChild.firstElementChild.value; 
        setSearchParams({ query: inputValue.trim() }); 
    }

    const onInput = () => {
        setSearchParams({query: ''}); 
    }

    useEffect(() => {
        if (query !== null) { 
            getFromDB(`search/movie?query=${query}`)
                .then(({data: { results }}) => {
                    setFilms(results.map(el => { 
                        return (
                            <li key={nanoid()} className={css.item}>
                                <StyledLink to={`${el.id}`} state={{from: location}}>
                                    {el.title === undefined ? el.name : el.title}
                                </StyledLink>
                            </li>
                        )
                }))
                })
                .catch(err => console.log(err));  
       }
    }, [searchParams, location, query])

    return (
        <div className={css['Movie-wrapper']}> 
            <form action="" onSubmit={onSubmit}> 
                <label htmlFor="search" className={css.label}>Search films by name</label>
                <div className={css.wrapper}>
                    <input type="text" name='search' className={css.input} id='search' onInput={onInput}/>
                    <button type='submit' className={css.searchBtn}>
                        <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                            <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"/>
                            <path d="M15.7508 15.7498L12.4883 12.4873"/>
                        </svg>
                    </button>
                </div>
            </form>
            <ol className={css['films-list']}>
                {films}
            </ol>
        </div>
    )
}

export default Movies; 