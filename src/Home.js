import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css'
import ReactPlayer from "react-player";
import playimg from './media/play.svg'
import Footer from "./Footer";

const Movies = () => {
    const [movielist, movieupdate] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("Усі жанри"); // Додайте стан для вибору жанру
    const navigate = useNavigate();
    const popupRef = useRef(null);

    useEffect(() => {
        loadmovie();
    }, []);

    const loadmovie = () => {
        fetch("http://localhost:8000/movie")
            .then(res => res.json())
            .then(res => movieupdate(res));
    }

    const handleMovieClick = (item) => {
        setSelectedMovie(item);
        document.body.style.overflowY = "hidden";
    }

    const closeSelectedMovie = (e) => {
        // Check if the click target is inside the popup
        if (popupRef.current && popupRef.current.contains(e.target)) {
            return;
        }

        setSelectedMovie(null);
        document.body.style.overflowY = "auto";
    }

    const genres = ["Усі жанри", "Сімейний", "Бойовик", "Історичний", "Драма", "Комедія", "Фентезі", "Пригоди", "Детектив"];

    return (
        <div className="movies_container">
               <div className="genres_selector">    
                <div className="genre_buttons">
                    {genres.map(genre => (
                        <button
                            key={genre}
                            className={`genre_button ${selectedGenre === genre ? 'active' : ''}`}
                            onClick={() => setSelectedGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            <div className="movies_grid">
                {movielist &&
                    movielist
                        .filter(item => selectedGenre === "Усі жанри" || item.genre.includes(selectedGenre))
                        .map(item => (
                            <div
                                className="movie_card"
                                key={item.code}
                                onClick={() => handleMovieClick(item)}
                            >
                                <img className="card_img" src={item.image} alt="poster" />
                                <div className="play_button">
                                    <img src={playimg} alt="play" />
                                </div>
                                <h2 className="card_name">{item.name}</h2>
                                <p className="card_genres">{item.genre}</p>
                            </div>
                        ))
                }
            </div>

            {selectedMovie && (
                <div className="selected_movie" onClick={closeSelectedMovie}>
                    <div className="movie_popup"  ref={popupRef}>
                        <div style={{height:'100%',display:'flex'}}><img src={selectedMovie.image}/></div>
                        <div style={{margin:'5vh auto auto auto'}}><h2>{selectedMovie.name}</h2>
                        <p className="popup_genres">Жанр: {selectedMovie.genre}</p>
                        <p className="popup_date">Дата виходу: {selectedMovie.date}</p>
                        <h5 className="popup_director">Продюсер: {selectedMovie.director}</h5>
                        <h5 className="popup_slogan">{selectedMovie.slogan}</h5>
                        <p className="popup_about">Опис: {selectedMovie.about}</p>
                        <ReactPlayer url={selectedMovie.link} 
                        width='100%'
                        /></div>
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default Movies;
