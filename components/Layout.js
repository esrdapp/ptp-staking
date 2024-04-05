/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Head from "next/head";

// import 'bootstrap/dist/css/bootstrap.min.css';

export const Flow = ({ children, style, maxWidth }) => (
  <div style={style}>
    {children}
    <style jsx>{`
      div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0 auto;
        padding: 0px;
      }
    `}</style>
  </div>
);

export const Wrapped = ({ children, style, maxWidth }) => (
  <div style={style}>
    {children}
    <style jsx>{`
      div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        max-width: ${maxWidth ? maxWidth : 1000}px;
        margin: 0 auto;
        padding: 0px;
      }
    `}</style>
  </div>
);

export const Center = ({ children, style, maxWidth }) => (
  <div style={style}>
    {children}
    <style jsx>{`
      div {
        max-width: ${maxWidth ? maxWidth : 1000}px;
        margin: 0 auto;
        padding: 0px;
      }
    `}</style>
  </div>
);

export const CenterBottom = ({ children, style, maxWidth }) => (
  <div style={style} className="center-bottom">
    {children}
    <style jsx>{`
      .center-bottom {
        display: flex; /* Make the container a flex container */
        justify-content: center; /* Center its children horizontally */
        align-items: flex-end; /* Align its children to the bottom */
        margin: 0 auto;
        padding: 0;
        max-width: ${maxWidth || "100%"};
        padding-top: 2rem;
      }
    `}</style>
  </div>
);

export const Page = ({ children }) => (
  <div>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Titan+One&display=swap"
        rel="stylesheet"
      />
    </Head>

    <main>{children}</main>

    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
      }
      body {
        /* Preserve original styles if needed */
        /* background-color: #fafaff;
        font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #222222;
        background-image: url("/image.jpg"); // Update this path
        background-size: cover;
        background-position: center center; */

        /* Updated background style with linear gradient */
        background: linear-gradient(to bottom, #db1ada, #752af3);
        font-family: "Titan One", sans-serif;
        font-weight: 400;
        font-style: normal;
        position: relative;
        min-height: 100vh; /* Set a minimum height to allow scrolling */
      }
      main {
        padding-top: 20px;
        padding-left: 0px;
        padding-right: 0px;
      }
    `}</style>
  </div>
);
