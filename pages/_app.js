/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Head from "next/head";
import Script from "next/script"; // Import the Script component
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure this path is correct
import "../styles/customcss.css"; // Your custom CSS comes after Bootstrap's CSS

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Move the Bootstrap CSS import to either a direct import or a custom _document.js */}
      </Head>
      {/* Use next/script for loading external JavaScript files */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
        defer
      ></Script>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
