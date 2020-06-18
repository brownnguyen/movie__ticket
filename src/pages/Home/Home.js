import React, { useEffect } from 'react'
import CarouselMovie from '../../component/CarouselMovie/CarouselMovie'
import MovieList from '../../component/MovieList/MovieList'
import SystemTheater from '../../component/SystemTheater/SystemTheater'
export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div>
            <CarouselMovie />
            <MovieList />
            <SystemTheater />
        </div>
    )
}
