"use client";
// src\app\components\navBar.jsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  const [movies, setMovies] = useState([]);
  const [moviesMenuOpen, setMoviesMenuOpen] = useState(false);
  const [genresMenuOpen, setGenresMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [genres, setGenres] = useState([]); // 1

  const url = "https://api.themoviedb.org/3/genre/movie/list"; //2
  
  
  const options = {  //3
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiKey,
    },
  };


  function getGenresRequest() {
    const Movies = {
      now_playing: "Now playing",
      popular: "Popular",
      top_rated: "Top Rate",
      discover: "Latest",
      upcoming: "Upcoming",
    };

    setMovies(Movies);

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          setGenres(json.genres);
          console.log(json)
        }
      })
      .catch((err) => console.error("error:" + err));
  }


  useEffect(() => {
    getGenresRequest();
  }, []);

  

  const handleMoviesMenuSelect = (option) => {
    setMoviesMenuOpen(!moviesMenuOpen)
  };
  const handleGenresMenuSelect = (option) => {

    setGenresMenuOpen(!genresMenuOpen)
  };

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className=" navbar flex items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center space-x-4">
        <Image
          src="/imgs/team9.jpg"
          alt="logo"
          className="w-24"
          width={64}
          height={64}
        />
        

        <Link href="/" className="text-white text-xl font-semibold">
        <span className="logo text-green-200">Movies|TV</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setGenresMenuOpen(!genresMenuOpen)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            Genres
          </button>
          {genresMenuOpen && (
            <div className="flex flex-col justify-start absolute top-full bg-gray-800 rounded-lg py-2 mt-1 w-48">
              {genres.map((item, index) => {
                
                return (
                  <Link
                    className="text-left p-1"
                    href={"/movies?id=" + item.id}
                    key={index}
                    onClick={() => handleGenresMenuSelect(item.id)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setMoviesMenuOpen(!moviesMenuOpen)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            Movies
          </button>
          {moviesMenuOpen && (
            <div className="flex flex-col  absolute top-full bg-gray-800 rounded-lg py-2 mt-1 w-48">
              {Object.entries(movies).map(([key, value], index) => {
                const path = "/movies?id=" + key;
                return (
                  <Link
                    className="text-left p-1"
                    href={path}
                    key={index}
                    onClick={() => handleMoviesMenuSelect(key)}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="relative">
          <button className="text-white hover:text-gray-300 focus:outline-none">
            <Link href="/actors">Actors</Link>
          </button>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="bg-gray-700 text-white px-3 py-1 rounded-md focus:outline-none"
        />
      </div>
    </nav>
  );
}
