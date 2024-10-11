import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
		  <link rel="stylesheet" href="/fonts/ionicons/css/ionicons.min.css?v=1.5"/>
		  <link rel="stylesheet" href="/fonts/fontawesome/css/font-awesome.min.css"/>
		  <link rel="preconnect" href="https://fonts.googleapis.com" />
		  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
		  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"/>
		  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
	  </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
