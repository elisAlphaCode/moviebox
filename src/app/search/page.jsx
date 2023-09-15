"use client"
import {useState, useEffect, Fragment } from "react"
import MovieCard from "../components/MovieCard"
import Image from "next/image"
import Link from "next/link"
import Footer from "../components/Footer"
import { FiSearch } from "react-icons/fi"
import axios from "axios"


const Search = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent ] = useState([]);
    const [page, setPage ] = useState(1);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const savedText = localStorage.getItem("searchText");
        if (savedText) {
            setSearchText(savedText);
        }
    }, []);

    const fetchSearch = async () => {
        if (searchText.trim() === "") {
            return
        }

        setIsLoading(true);
        try {
            const data = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchText}`
            );

            const {results} = await data.json();
            setContent(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSearch();
    }, [searchText]);

    const Input = (e) => {
        setSearchText(e.target.value);
    }

    const Search = (e) => {
        e.preventDefault();
        fetchSearch();
    }
  return (
    <div>
        <nav className="navbar search">
            <div className="logo">
                <Link href="/">
                    <Image
                    src={require("../images/Logo.png")}
                    alt="logo"
                    width={50}
                    height={50}
                    />
                    <h2>MovieBox</h2>
                </Link>
            </div>
            <form onSubmit={Search}>
                <input
                    type="text"
                    placeholder="What do you want to watch?"
                    onChange={Input}
                    value={searchText}
                />
                <button type="submit" onClick={Search}>
                    <FiSearch color="#fff" size={20} />
                </button>
            </form>
            <div className="signin">
                <h2>Sign in</h2>
                <Image
                    src={require("../images/Menu.png")}
                    alt="sign in"
                    width={40}
                    height={40}
                />
            </div>
      </nav>

      {isLoading ? (
        <div className="loading">Loading..</div>
      ) : (
        <Fragment>
            <h2 className="searchText">
                Search Results for {" "}
                <span style={{ color: "red" }}>{searchText}</span>
            </h2>
            <div className="search-results">
                {content.map((movie) => (
                    <div className="search-page" key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </Fragment>
      )}
      <Footer />
    </div>
  )
}

export default Search;
