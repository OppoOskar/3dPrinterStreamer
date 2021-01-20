import Head from 'next/head'
import style from '../styles/index.module.sass'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}



export default function text({ }) {
  return (
    <div className="container">
      <Head>
        <title>Oskar Olsson's 3D printer</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="/static/refresh.js"></script>
      </Head>

      <main>
        <div id="state_border_color" className={style.textContent}>

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
    </main>

    <footer>
      
    </footer>
    </div>
  )
}
