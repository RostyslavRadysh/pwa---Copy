import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />

          <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />

          <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />

          <link rel="manifest" href="/manifest.json" />
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