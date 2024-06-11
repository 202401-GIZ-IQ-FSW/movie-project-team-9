// "use client";
// src\pages\index.js
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Index() {
  const l = console.log;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const url =
    "https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc";
  // "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";
  const assetsUrl = "https://image.tmdb.org/t/p/original";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + apiKey,
    },
  };
  function getMovieRequest() {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        // console.log(options.headers);
        // console.log(apiKey);
        if (json) {
          setMovies(json.results);
        }
        // console.log(JSON.stringify(json));
      })
      .catch((err) => console.error("error:" + err));
  }
  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  return (
    <div className="s">
      <Head>
        <title>Home Page </title>
      </Head>
      <div>
        {/* <Image
          src={assetsUrl+item.backdrop_path}
          alt="dvf"
          className="w-20"
          width={100}
          height={100}
        /> */}
        {/* <div className="w-52 h-28">
                  <img
                    src={assetsUrl + item.backdrop_path}
                    alt="backdrop_path"
                    className="w-52 h-auto"
                  />
                </div> */}
        <div className="flex  flex-wrap">
          {movies.map((item, index) => {
            const path = "/movies/" + item.id;
            return (
              <div
                className="card w-52 h-[700px] bg-gray-100 m-4 text-black overflow-hidden"
                key={item.id}
              >
                <div className="w-52 h-[312px]">
                  <img
                    src={
                      item.poster_path ? assetsUrl + item.poster_path : "/imgs/placeholder.jpg"
                    }
                    alt="backdrop_path"
                    className="w-52 h-auto"
                  />
                </div>

                <div className="h-3">{item.adult && <span> +18</span>}</div>

                <Link
                  className="text-left p-1 text-blue-500"
                  href={path}
                  key={index}
                >
                  {item.title}
                </Link>
                <div>genre ids:{item.genre_ids} </div>
                <div> id :{item.id} </div>
                <div>original_language:{item.original_language} </div>
                <div>original_title:{item.original_title} </div>
                <div>popularity:{item.popularity} </div>
                <div>release date:{item.release_date} </div>
                <div>overview </div>
                <div className="overflow-hidden "> {item.overview} </div>
                <div>release date:{item.release_date} </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
