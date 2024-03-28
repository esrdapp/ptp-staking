// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Move the Google Fonts link here */}
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700&display=optional"
            rel="stylesheet"
          />
          {/* You can add other global head elements here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
