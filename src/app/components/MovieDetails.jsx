import React from 'react'
import Link from "next/link"
import Footer from "./Footer";
import Navbar from './Navbar';
import { AiFillPlayCircle } from 'react-icons/ai';


const MovieDetails = ({movie}) => {
    const formatDateToUTC = (dateString) => {
        const date = new Date(dateString);
        const utcDateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
        return utcDateString;
      };

  return (
    <div>
        <div
            className='banner-single'
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
                backgroundColor: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "60vh",
                backgroundColor: "#000"
            }}
                key={movie.id}
            >
                <Navbar />
                <div className="movie-inner" style={{ zIndex: 20 }}>
                    <Link href="#" className="banner-btn">
                        <AiFillPlayCircle className="react-icon" />
                        <p>Watch Trailer</p>
                    </Link>
                </div>
        </div>
        <div className="movie-details">
            <h2 data-testid="movie-title">{movie.title}</h2>
            <p className="release">
                <span data-testid="movie-release-date">Release Date in (UTC):</span>
                {`${formatDateToUTC(movie.release_date)} `}
            </p>

            <p data-testid="movie-runtime" className="release">
                Runtime (in minutes): {movie.runtime}
            </p>
            <p data-testid="movie-overview">{movie.overview}</p>
        </div>
        
        <Footer />
    </div>

  )
}

export default MovieDetails;
