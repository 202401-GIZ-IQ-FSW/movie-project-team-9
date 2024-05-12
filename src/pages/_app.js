// src\pages\_app.js

import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../app/components/navBar";
import Footer from "../app/components/footer";
function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-black min-h-[100vh] flex flex-col justify-between">
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
