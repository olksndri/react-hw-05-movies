import css from '../styles/Cast.module.css'; 
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFromDB } from 'js/getFromDB';

const Cast = () => { 
    const { movieId } = useParams(); 
    const [ actors, setActors ] = useState(null); 

    useEffect(() => {
        getFromDB(`movie/${movieId}/credits`)
            .then(({ data: { cast } }) => {
                console.log(cast.slice(0, 20));
                setActors(cast.slice(0, 20).map(el => { 
                    return ( 
                        <li key={el['credit_id']} className={css['cast_item']}>
                            <img src={`https://image.tmdb.org/t/p/original${el['profile_path']}`} className={css['actor-img']} />
                            <p>{el.name}</p>
                            <p>Character: {el.character}</p>
                        </li>
                    )
                }))
            })
            .catch(err => console.log(err)); 
    }, [])

    return (
        <ol className={css['cast-list']}>
            {actors}
        </ol>
    )
}

export default Cast; 