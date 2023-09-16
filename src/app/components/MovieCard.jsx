"use client";
import React from 'react'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi'
import { AiFillHeart } from "react-icons/ai"
import axios from "axios"
import Image from 'next/image'
import '../globals.css';


const MovieCard = ({movie}) => {

    const [favorite, setFavourite] = useState(false);
    const [genres, setGenres] = useState({});


    const API_KEY = '612b44b2e76975e56349bbee009d0a3f';
    const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const fetchGenres = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
          );
          const genresData = response.data.genres;
          // Convert genre IDs to their corresponding names and store in the state
          const genresMap = {};
          genresData.forEach((genre) => {
            genresMap[genre.id] = genre.name;
          });
          setGenres(genresMap);
        } catch (error) {
          console.error("Error fetching genres:", error);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const genreNames = (genreIds) => genreIds.map((genreId) => genres[genreId]).join(", ");

    const formatDateToUTC = (dateString) => {
        const date = new Date(dateString);
        const utcDateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
        return utcDateString;
      };

      const toggleFavorite = () => {
        setFavourite(!favorite);
      };

    return (
    <div data-testid="movie-card" id="movies">
        <Link href={`/movies/${movie.id}`}>
            <div className="movie-card">
                <span onClick={toggleFavorite}>
                    {favorite ? (
                        <AiFillHeart className="heart-filled" />
                    ) : (
                        <FiHeart className="heart" />
                    )}
                </span>

                <Image
                    data-testid="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={300}
                />
            </div>
            <p className="genre">{genreNames(movie.genre_ids)}</p>
            <h2 data-testid="movie-title">{movie.title}</h2>
            <div className="imbd-card">
                <span className="imbd-btn">
                <Image 
                    src={require("../images/imdb.png")}
                />
                    <p> {movie.vote_average}</p>
                </span>
                <span className="imbd-btn-two">
                    <Image 
                      src={require("../images/tomato.png")} 
                    />
                    <p>97%</p>
                </span>
            </div>
            <p className="release">
                <span data-testid="movie-release-date">Release Date in (UTC):</span>
                {`${formatDateToUTC(movie.release_date)}`}
            </p>
        </Link>
    </div>
  )
}

export default MovieCard;