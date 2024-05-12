// src\pages\Actors\[id].js

import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Movie() {
  const l = console.log;
  const router = useRouter();
  const { id } = router.query;
  const assetsUrl = "https://image.tmdb.org/t/p/original";

  const [actor, setActor] = useState([]);
  const [movie_credits, setCridets] = useState([]);

  useEffect(() => {
    if (!id) return;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = "https://api.themoviedb.org/3/person/" + id;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + apiKey,
      },
    };
    function getMovie() {
      if (!id) return "";
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setActor(json);
            l(json);
            // director
          }
        })
        .catch((err) => console.error("error:" + err));
        //movie_credits
      fetch(url+"/movie_credits", options)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setCridets(json.cast);
            l(json);
            // director
          }
        })
        .catch((err) => console.error("error:" + err));

        
    }

    getMovie();
  }, [id]);

  return (
    <div className="h-[100%]">
      <Head>
        <title> {actor.name} </title>
      </Head>

      <div className="flex flex-col justify-around items-left">
        <div className="flex flex-row ">
          <div className=" flex-1 w-[20%]">
            <div className="poster_card border border-amber-50 rounded-xl border-solid overflow-hidden m-2">
              <img src={assetsUrl + actor.profile_path} alt={actor.name} />
            </div>
          </div>
          <div className=" flex-5 w-[80%] m-2">
            <h1 className="font-bold">{actor.name}</h1>
            <h1 className=" ">
          
              {actor.gender == 1
                ? "Actoress"
                : actor.gender == 2
                ? "Actor"
                : "Rainbow"}
            </h1>
            <h1 className=" ">Popularity: {actor.popularity}</h1>
            <h1 className=" ">Birthday: {actor.birthday}</h1>
            <h1 className=" ">Biography: {actor.vote_count}</h1> 
            <h1 className=" ">{actor.biography}</h1>
          </div>
        </div>
        <div className="flex flex-col items-start">



          <h1>Related Movies</h1>
          <div className="flex m-3 ">
            {movie_credits.slice(0, 6).map((item) => {
              const href = "/movies/" + item.id;
              return (
                <div key={item.id} className="m-2 max-w-[70px]">
                  <Link href={href} className=" ">
                    {item.poster_path ? (
                      <img
                        src={assetsUrl + item.poster_path}
                        width="70"
                        title={"AS: "+item.character}
                      />
                    ) : (
                      <img src="/imgs/ph.jpg" width="70" title={"AS: "+item.character} />
                    )}
                    <h1>{item.title}</h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
    </div>
  );
}
