// src\pages\Movies\index.js
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
export default function Index() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const assetsUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (!id) return;

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const Movies = [
      "now_playing",
      "popular",
      "top_rated",
      "discover",
      "upcoming",
    ];
    let url;
    if (Movies.includes(id)) {
      if (id == "discover") {
        url = "https://api.themoviedb.org/3/discover/movie";
      } else {
        url = "https://api.themoviedb.org/3/movie/" + id;
      }
    } else {
      url =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=" +
        id;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    function getResult() {
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setMovies(json.results);
            console.log(json);
          }
        })
        .catch((err) => console.error("error:" + err));
    }
    getResult();
  }, [id]);

  return (
    <div>
      <Head>
        <title>Movies Page </title>
      </Head>
      <div>
        <div className="flex  flex-wrap">
          {movies.map((item, index) => {
            const path = "/movies/" + item.id;
            return (
              <div
                className="card w-52 h-[700px] bg-gray-100 m-4 text-black"
                key={item.id}
              >
                <div className="w-52 h-[312px]">
                  <img
                    src={ item.poster_path ? assetsUrl + item.poster_path:'/imgs/placeholder.jpg'}
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
                <div className="overflow-hidden ">overview </div>
                <div> {item.overview} </div>
                <div>release date:{item.release_date} </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
