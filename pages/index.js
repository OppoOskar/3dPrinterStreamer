import Head from 'next/head'
import style from '../styles/index.module.sass'

export default function Home({ data }) {
  return (
    <div className="container">
      <Head>
        <title>Oskar Olsson's 3D printer</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="/static/refresh.js"></script>
      </Head>

      <main>
        <div className={style.content}>
          <iframe className={style.textIframe} id="textIframe" src="/text" scrolling="no" frameBorder="0"></iframe>

          <div className={style.stream}>
            <iframe src="https://3dprinterstream.oskarolsson.com/?action=stream" scrolling="no" frameBorder="0"></iframe>
          </div>
        </div>
      </main>

      <footer>
      
      </footer>
    </div>
  )
}
