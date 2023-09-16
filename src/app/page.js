"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Link from 'next/link'
import MovieCard from './components/MovieCard'
import "./globals.css"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiFillPlayCircle } from 'react-icons/ai'
import { useRouter } from "next/navigation"


const Home = () => {
  const router = useRouter();
  const [movies, setMovies ] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "612b44b2e76975e56349bbee009d0a3f";
  const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const fetchMovie = async () => {
    try {
      const res = await axios.get(BASE_URL);
      const movieData = res.data.results;
      setMovies(movieData.slice(0, 10));
      setLoading(false);

    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const [topMovies, setTopMovies] = useState([]);

  useEffect(()  => {
    const fetchTopMovies = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        const data  = res.data.results;
        setTopMovies(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTopMovies();
  }, []);

  useEffect(() => {
    fetchMovie();
  }, []);

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  return (
    <div className="main-section">
      {/* Home Page View */}
      <div className="banner-cover">
        {randomMovie && (
          <div
            className='banner-single'
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://image.tmdb.org/t/p/w1280/${randomMovie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "90vh",
                backgroundColor: "#000",
              }}
              key={randomMovie.id}
          >
            <Navbar />
            <div className="banner-details">
              <h2 className="banner-title">{randomMovie.title}</h2>
              <div className="banner-content">
                <div className="imdb">
                  <span className="imbd-btn">
                    <Image src={require("./images/imdb.png")} />
                    <p> {randomMovie.vote_average}</p>
                  </span>
                  <span className="imbd-btn-two">
                    <Image src={require("./images/tomato.png")} />
                    <p>97%</p>
                  </span>
                </div>


                <p className="banner-overview">{randomMovie.overview}</p>
              </div>

              <div className="banner-btn-section" style={{xIndex: 20}}>
                <Link href="#" className="banner-btn">
                  <AiFillPlayCircle className='icon' />
                  Watch TRAILER
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

       {/* Featured Movies */}
       <div className="featured">
        <div className="title">
          <h2>Featured Movie</h2>
          <Link href="/">See More </Link>
        </div>
        <div className="movie-grid">
          {topMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default Home;