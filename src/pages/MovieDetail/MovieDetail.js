import React, { useEffect } from 'react'
import MovieItem from '../../component/MovieItem/MovieItem'

export default function MovieDetail(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <MovieItem movieId={props.match.params.movieId} />
        </div>
    )
}
