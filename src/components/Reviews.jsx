import css from '../styles/Reviews.module.css'; 
import { getFromDB } from 'js/getFromDB';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


const Reviews = () => { 
    const [ reviews, setReviews ] = useState([]); 
    const { movieId } = useParams(); 

    useEffect(() => {
        getFromDB(`movie/${movieId}/reviews`)
            .then(({ data: { results } }) => {
                setReviews(results.map(el => {
                    return ( 
                        <li key={el.id} className={css['review-item']}>
                            <h3 className={css['review-author']}>
                                <span className={css['sub-title']}>Author: </span>
                                {el.author}
                            </h3>
                            <p>
                                <span className={css['sub-title']}>Review: </span>
                                {el.content}
                            </p>
                        </li>
                    )
                })) 
            })
            .catch(err => console.log(err)); 
    })

    return ( 
        <ol className={css['review-list']}>  
            {reviews.length > 0 ? reviews : <li>Ooops, we haven't reviews for this movie</li>}
        </ol>
    )
}

export default Reviews; 