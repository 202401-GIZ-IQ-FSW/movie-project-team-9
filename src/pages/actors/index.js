// src\pages\Actors\index.js
//https://api.themoviedb.org/3/person/popular

import  { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Index() {
  const l = console.log;
  const assetsUrl = "https://image.tmdb.org/t/p/original";
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = "https://api.themoviedb.org/3/person/popular";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    function getActors() {
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setActors(json.results);
            l(json);
          }
        })
        .catch((err) => console.error("error:" + err));
    }

    getActors();
  }, []);

  return (
    <div>
      <Head>
        <title>Actors Page </title>
      </Head>
      <div>
        <div className="flex  flex-wrap">
          {actors.map((item, index) => {
            const path = "/actors/" + item.id;
            return (
              <div
                className="card w-52 h-[350px] bg-gray-100 m-4 text-black"
                key={item.id}
              >
                <Link
                  className="text-left  text-blue-500"
                  href={path}
                  key={index}
                >
                  <div className="w-52 h-[312px]">
                    <img
                      src={assetsUrl + item.profile_path}
                      alt="backdrop_path"
                      className="w-52 h-auto"
                    />
                  </div>
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
