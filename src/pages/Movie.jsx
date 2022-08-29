import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill, BsTranslate, BsFillCaretRightFill } from "react-icons/bs"


import MovieCard from "../components/MovieCard"
import CurrencyConverter from "../components/CurrencyConverter"
import Trailer from "../components/Trailer"

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKEY = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    const [translatedMovies, setTranslatedMovies] = useState(null)
    const [movieTrailer, setMovietrailer] = useState(null)

    const getMovie = async(url) => {

        const res = await fetch(url)
        const data = await res.json();

        setMovie(data)
    }

    const getMovietraile = async(url) => {

        const res = await fetch(url)
        const data = await res.json();

        setMovietrailer(data.results[0].key)
    }

    const getTranslatedMovies = async (url) => {

        const res = await fetch(url)
        const data = await res.json()

        setTranslatedMovies(data)

    }


    useEffect(() => {
        const movieUrlAll = `${moviesURL}${id}?${apiKEY}`;
        const moviesUrlTranslated = `${moviesURL}${id}?${apiKEY}&language=pt-BR`;
        const moviesUrlMovietraile = `${moviesURL}${id}/videos?${apiKEY}`;

        getMovie(movieUrlAll)
        getTranslatedMovies(moviesUrlTranslated)
        getMovietraile(moviesUrlMovietraile)
    }, [])

    const [translate, setTranslate] = useState(false)

    const translateYN = () =>{
        setTranslate(!translate)
    }

    return (
        <div >
            {movie && 
                <div className="movie-page">
                    {!translate ? ( 
                        <>
                            <MovieCard movie={movie} showLink={false} /><p className="tagline">{movie.tagline}</p>
                            <div className="info">
                            <h3>
                                <BsWallet2 /> Orçamento:
                            </h3>
                            <CurrencyConverter movirNumber={movie.budget} />
                            </div>
                            <div className="info">
                                <h3>
                                    <BsGraphUp /> Receita:
                                </h3>
                                <CurrencyConverter movirNumber={movie.revenue} />
                            </div>
                            <div className="info">
                                <h3>
                                    <BsHourglassSplit /> Duração:
                                </h3>
                                <p>{movie.runtime} minutos</p>
                            </div>
                            <div className="info_description">
                                <h3>
                                    <BsFillFileEarmarkTextFill /> Descrição:
                                </h3>
                                <p>{movie.overview}</p>
                            </div>
                            <div className="info_description">
                                <h3>
                                    <BsFillCaretRightFill /> Trailer:
                                </h3>
                                <Trailer trailer={movieTrailer} />
                            </div>
                        </>
                     ) : (
                        <>
                            <MovieCard movie={translatedMovies} showLink={false} /><p className="tagline">{translatedMovies.tagline}</p>
                            <div className="info">
                            <h3>
                                <BsWallet2 /> Orçamento:
                            </h3>
                            <CurrencyConverter movirNumber={translatedMovies.budget} />
                            </div>
                            <div className="info">
                                <h3>
                                    <BsGraphUp /> Receita:
                                </h3>
                                <CurrencyConverter movirNumber={translatedMovies.revenue} />
                            </div>
                            <div className="info">
                                <h3>
                                    <BsHourglassSplit /> Duração:
                                </h3>
                                <p>{translatedMovies.runtime} minutos</p>
                            </div>
                            <div className="info_description">
                                <h3>
                                    <BsFillFileEarmarkTextFill /> Descrição:
                                </h3>
                                <p>{translatedMovies.overview}</p>
                            </div>
                            <div className="info_description">
                                <h3>
                                    <BsFillCaretRightFill /> Trailer:
                                </h3>
                                <Trailer trailer={movieTrailer} />
                            </div>
                        </>
                     )}    
                    <p><button type="submit" onClick={translateYN} className="bnt"><BsTranslate />Traduzir</button></p>
                </div>
            }
        </div>
)
}

export default Movie