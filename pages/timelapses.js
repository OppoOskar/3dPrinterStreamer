import Head from 'next/head'
import style from '../styles/timelapses.module.sass'
import Layout from '../components/layout'

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/timelapses`, 
  {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7',
      'Content-Type': 'application/json',
      "X-Api-Key": "BD86451B85D3458FA21FA8291188D4B0"
    }
  })
  const data = await res.json()

  //console.log(data)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data}, // will be passed to the page component as props
  }
}



export default function text({ data }) {
  const activateVideo = (name, url) => {
    let player = document.getElementById("videoPlayer");
    let source = document.getElementById("videoSource");

    source.setAttribute("src", url);
    player.load();


    document.getElementById("videoText").innerHTML = name;
  }

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
            <div className={style.videoPlayer}>
              <h2 id="videoText">No video selected.</h2>
              <video id="videoPlayer" controls>
                <source src="" type="video/mp4" id="videoSource"></source>
                Your browser does not support the video HTML tag, sorry!
              </video>
            </div>


            <div className={style.videoList}>
              <ul id="timelapses">
                {data.map(({ name, date, url, size }) => (
                <li  id="state_background_color">
                  <div>
                    <h3>{name}</h3>
                    <p>{date}</p>
                    <button onClick={() => activateVideo(name, url)}>Select video</button>
                  </div>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        <footer>
          
        </footer>
      </div>
      <script>reload(60000);</script>
    </Layout>
  )
}
