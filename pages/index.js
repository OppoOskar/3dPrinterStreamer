import Head from 'next/head'
import style from '../styles/index.module.sass'
import Layout from '../components/layout'


export default function Home({}) {
  return (
    <Layout>
      <div className="container">
        <Head>
          <title>Oskar Olsson's 3D printer</title>
          <link rel="icon" href="/favicon.ico" />
          <script type="text/javascript" src="/static/refreshText.js"></script>
        </Head>

        <main>
            <div className={style.content}>
              <div className={style.textContent}>

                <div id="state_background_color" className={style.state}>
                    <h2 id="state_text"></h2>
                </div>


                <div className={style.textWrapper}>
                    <h1>Currently printing: <span id="currently_printing"></span></h1>


                    <h1>Est. print time left: <span id="time_left"></span></h1>
                    <h1>Est. total print time:  <span id="total_print_time"></span></h1>

                    <h1>Completion: <span id="progress"></span> %</h1>
                </div>
            </div>
        

            <div className={style.stream}>
              <img src="https://3dprinterstream.oskarolsson.com/?action=stream" scrolling="no" frameBorder="0"></img>
            </div>
          </div>
        </main>

        <footer>
        
        </footer>
      </div>
      <script>reload(5000);</script>
    </Layout>
  )
}
