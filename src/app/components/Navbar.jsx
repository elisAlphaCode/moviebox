"use client";
import React from 'react'
import Image from "next/image";
import {useState, useEffect } from "react"
import { FiSearch } from "react-icons/fi"
import Link from "next/link"
import { useRouter } from 'next/navigation';


const Navbar = () => {

    const [value, setValue] = useState("");
    const router = useRouter();


    // Call search text from localStorage when component mount

    useEffect(() => {
      const savedSearchText = localStorage.getItem("searchedText");
      if (savedSearchText) {
        setValue(savedSearchText)
      }
    }, []);


    const handleSearch = (event) => {
      e.preventDefault();
      if (value) {
        localStorage.setItem("searchedText", value);

        //Navigate to search page
        router.push("/search", {state: value, replace: true});

        //Clear the input field after each search
        setValue('')
      }
    }
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">
            <Image 
                src={require("../images/Logo.png")}
                alt="Logo"
                // width={60}
                // height={60}
            />
            <h2>MovieBox</h2>
        </Link>
      </div>

      <form onSubmit={handleSearch}>
        <input
            type="text"
            placeholder="What do you want to watch?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
        <button type='submit'>
          <FiSearch color="#ffffff" size={30} />
        </button>
      </form>

      <div className="signin">
      <h2>Sign In</h2>
          <Image
            src={require("../images/Menu.png")}
            alt="Menu Icon"
            width={40}
            height={40}
          />
      </div>
          
    </nav>
  )
}

export default Navbar;
