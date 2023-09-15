"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import MovieDetails from "@/app/components/MovieDetails"
import { useRouter } from "next/navigation"


const MovieDetailsPage = ({ params }) => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState(null);

    const MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
    const router = useRouter();
    const {id } = params;


    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_KEY}&language=en-US`
                );

                const movieData = res.data;
                setMovie(movieData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };
        fetchMovieDetails();

    }, [id, MOVIE_API_KEY]);

    if (id === undefined) {
        return <p>Loading...</p>;
    }
  return (
    <div>
      {isLoading && (
        <div className="loading">
            <p>Loading...</p>
        </div>
      )}
      {isError && <p>Error Fetching data</p>}
      {movie && <MovieDetails movie={movie} />}
    </div>
  )
}

export default MovieDetailsPage;