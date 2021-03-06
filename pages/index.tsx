import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Howl, Howler } from "howler";

// import index from '../pages/index.module.scss'

// export async function getServerSideProps() {
//   const res = await fetch('https://api.jokes.one/knock-knock/random')
//   const joke = await res.json()
//   return {
//     props: {
//       joke
//     }
//   }
// }
const Home: NextPage = () => {
  // const { results = [] } = joke
  // console.log(joke);
  // console.log(results);

  const sound = new Howl({
    src: ["intro-sound.mp3"],
    onplayerror: function () {
      sound.on("unlock", function () {
        sound.play();
      });
    },
  });
  var stop = false;
  function stopSound() {
    stop = true;
    sound.stop();
  }
  function introSound() {
    if (navigator.userAgent.match(/chrome/i)) {
      if (!stop) {
        sound.once("unlock", function () {
          sound.play();
        });
      } else {
        sound.stop();
      }
    } else {
      sound.once("load", function () {
        sound.play();
      });
    }
  }
  useEffect(() => {
    if (!navigator.userAgent.match(/chrome|chromium|crios/i)) {
      // works in all browsers except chromium based browsers
      // this line won't run in chromium based browsers
      introSound();
    }
  }, []);
  return (
    <div className={styles.dark} onClick={introSound}>
      {/* <button onClick={introSound}>sound</button>      */}
      {/* for the chromium based browsers ^^^^^^^^^^^^^^^^^^ */}
      <Head>
        <title>Flashlight</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/flashlight.svg" />
      </Head>

      <div className={styles.main}>
        <div onMouseDown={stopSound}>
          <Link href="./flashlight">
            <a>
              {/* 
          possible fixes:
           https://github.com/vercel/next.js/issues/7915
          then:
           https://nextjs.org/docs/messages/react-hydration-error
          ------------------------------------------------------------
          make it load on the same page:
           https://flaviocopes.com/react-show-different-component-on-click */}
              <Image
                src="/flashlight.svg"
                alt="flashlight"
                height={120}
                width={90}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
