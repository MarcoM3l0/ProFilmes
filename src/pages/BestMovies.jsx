import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import './MovieGrid.css'

const moviesURL = import.meta.env.VITE_API;
const apiKEY = import.meta.env.VITE_API_KEY;

const BestMovies = () => {

    const [topMovies, setTopMovies] = useState([])

    const getTopMovies = async (url) => {

        const res = await fetch(url)
        const data = await res.json()

        setTopMovies(data.results)
    };

    useEffect(() => {
        const topRatedUrl = `${moviesURL}top_rated?${apiKEY}`;

        getTopMovies(topRatedUrl)
    }, [])

    return (
        <div className="container">
            <h2 className="title">Melhores Filmes:</h2>
            <div className="movies-container">
                {topMovies === 0 && <p>Carregando...</p>}
                {topMovies.length > 0 &&
                    topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
}

export default BestMovies;