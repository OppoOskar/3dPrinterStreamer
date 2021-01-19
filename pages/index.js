import Head from 'next/head'
import style from '../styles/index.module.sass'
import {useState} from 'react'
import classNames from "classnames/bind"

export async function getServerSideProps(context) {


  const res = await fetch(`http://192.168.0.122:8081/api/job`, 
  {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7',
      'Content-Type': 'application/json',
      "X-Api-Key": "BD86451B85D3458FA21FA8291188D4B0"
    }
  })
  const data = await res.json()

  console.log(data)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data}, // will be passed to the page component as props
  }
}



export default function Home({ data }) {
  function getColorFromState(param) {
    switch(param) {
      case 'Printing':
        return 'green';
      case 'Pausing', 'Operational':
        return 'orange';
      case 'Cancelling', 'Error', 'Offline':
        return 'red';
      default:
        return 'red';
    }
  }

  function formatTime(seconds,state) {
    if(seconds == null)
    {
      return "0 min";
    }
    let minutes = Math.floor(seconds/60);
    if(minutes >= 1)
    {
      let hours = Math.floor(minutes/60);
      if(hours >= 1)
      {
        let days = Math.floor(hours/24);
        if(days >= 1)
        {
          return (days + "d, " + hours%24 + "h, " + minutes%60 + "m")
        }
        return (hours + "h, " + minutes%60 + "m")
      }
      return (minutes + "m");
    }
    return (seconds + "s")
  }

  let isRunning = data.state == "Printing" || "Pausing";


  return (
    <div className="container">
      <Head>
        <title>Oskar Olsson's 3D printer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={style.content} style={{"border-color": getColorFromState(data.state)}}>

          <div className={style.state} style={{"background-color": getColorFromState(data.state)}}>
            <h2>{data.state}</h2>
          </div>

          <div className={style.textWrapper}>
            <h1>Currently printing: {isRunning ? "NaN" : data.job.file.name}</h1>
            

            <h1>Print time left: {formatTime(data.progress.printTimeLeft)}</h1>
            <h1>Total print time: {isRunning ? "NaN" : formatTime(data.job.estimatedPrintTime)}</h1>

            <h1>Completion: {data.progress.completion}%</h1>

          </div>

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
