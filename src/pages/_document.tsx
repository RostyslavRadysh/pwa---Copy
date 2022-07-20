import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />

          <link rel='manifest' href='/manifest.webmanifest' />
          <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <body id="main">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument