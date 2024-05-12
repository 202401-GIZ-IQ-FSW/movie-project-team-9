// src\pages\Movies\[id].js

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
  const [movie, setMovie] = useState({});
  const [directors, setDirectors] = useState([]);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const Movie = {
      id: 216527,
      original_language: "en",
      overview: "",
      poster_path: "/xGcd3ob2DWC3TmlVhnJg1RLyTGi.jpg",
      release_date: "2029-12-20",
      runtime: 0,
      title: "Avatar 4",
      vote_average: 0,
      vote_count: 0,
    };

    setMovie(Movie);
    if (!id) return;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url =
      "https://api.themoviedb.org/3/movie/" +
      id +
      "?append_to_response=credits";
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
            setMovie(json);
            l(json);
            // director
            const getDirectorsFromCrew = (crew) => {
              return crew
                .filter((member) => {
                  return member.job == "Director";
                })
                .map((director) => {
                  return { name: director.name, id: director.id };
                });
            };
            const directors = getDirectorsFromCrew(json.credits.crew);
            setDirectors(directors);
            // Cast
            const getCast = (cast) => {
              return cast.filter((actor) => {
                return actor.order < 5;
              });
            };
            const Casts = getCast(json.credits.cast);
            setCast(Casts);
          }
        })
        .catch((err) => console.error("error:" + err));
      // Related
      fetch(
        "https://api.themoviedb.org/3/movie/" + id + "/recommendations",
        options
      )
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setSimilar(json.results);
            // l(json);
          }
        })
        .catch((err) => console.error("error:" + err));
      //Trailers
      fetch("https://api.themoviedb.org/3/movie/" + id + "/videos", options)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setTrailers(
              json.results.filter((item) => item.type == "Trailer").slice(0, 6)
            );
            // l(json);
            l(trailers);
            // json.results.map(item=>l(  item.type+item.size))
          }
        })
        .catch((err) => console.error("error:" + err));
    }

    getMovie();
  }, [id]);

  return (
    <div className="h-[100%]">
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div className="flex flex-col justify-start items-left">
        <div className="flex flex-row ">
          <div className=" flex-1 w-[20%]">
            <div className="poster_card border border-amber-50 rounded-xl border-solid overflow-hidden m-2">
              <img src={assetsUrl + movie.poster_path} alt={movie.title} />
            </div>
          </div>
          <div className=" flex-5 w-[80%] m-2">
            <h1 className="font-bold">{movie.title}</h1>
            <h1 className=" ">Release date: {movie.release_date}</h1>
            <h1 className=" ">Runtime: {movie.runtime}</h1>
            <h1 className=" ">Language: {movie.original_language}</h1>
            <h1 className=" ">Movie rating: {movie.vote_count}</h1>
            <h1 className=" ">
              Director&apos;s :
              {directors
                ? directors.map((director) => {
                    const href = "/actors/" + director.id;
                    return (
                      <Link key={director.id} href={href}>
                        {director.name}
                      </Link>
                    );
                  })
                : ""}
            </h1>

            <h1 className=" ">Overview : </h1>
            <h1 className=" ">
              {movie.overview
                ? movie.overview
                : "the Movie don't have overview yet"}{" "}
            </h1>
            <h1 className=" ">Cast : </h1>

            <h3 className="flex ">
              {cast.map((actor) => {
                const href = "/actors/" + actor.id;
                return (
                  <div
                    className="flex flex-col m-1 min-w-[140px]  w-[140px]"
                    key={actor.cast_id}
                  >
                    <Link href={href} className=" ">
                      {actor.name}
                    </Link>
                    {actor.profile_path ? (
                      <img
                        src={assetsUrl + actor.profile_path}
                        width="70"
                        title={"As: " + actor.character}
                        className="inline"
                      />
                    ) : (
                      <img
                        width="70"
                        src="/imgs/ph.jpg"
                        title={"As: " + actor.character}
                      />
                    )}
                  </div>
                );
              })}
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h1>Related Movies</h1>
          <div className="flex ">
            {similar.slice(0, 6).map((item) => {
              const href = "/movies/" + item.id;
              return (
                <div key={item.id}>
                  <Link href={href} className=" ">
                    {item.poster_path ? (
                      <img
                        src={assetsUrl + item.poster_path}
                        width="70"
                        title={item.name}
                      />
                    ) : (
                      <img src="/imgs/ph.jpg" width="70" title={item.name} />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1>Trailer</h1>
          <iframe
            width="560"
            height="315"
            src={
              trailers[0]
                ? "https://www.youtube.com/embed/" + trailers[0].key
                : ""
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            autoPlay
          ></iframe>
        </div>
        <div>
          <h1>Production</h1>
          <div className="flex items-center bg-slate-900 ">
            {movie.production_companies
              ? movie.production_companies.map((item) => {
                  const bg = item.logo_path
                    ? assetsUrl + item.logo_path
                    : "/imgs/ph2.jpg";
                  return (
                    // <div
                    //   className={   " bg-contain bg-no-repeat w-[100px] h-[50px] " + bg   }
                    //

                    //   key={item.id}
                    // />
                    <img
                      key={item.id}
                      className="w-[100px] h-min m-4 bg-slate-400 "
                      src={bg}
                      title={item.name}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
