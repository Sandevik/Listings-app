import React from 'react'
import styles from "../styles/pages/About.module.css"

function About() {
    const me = "2002-10-22".split("-");
    const today = new Date().toLocaleDateString();
    let dateArr = today.split("-");
    let age;
    if (Number(me[1]) - Number(dateArr[1]) < 0 && Number(me[2]) - Number(dateArr[2]) < 0){
         age = Number(dateArr[0]) - Number(me[0]);
    }else{
         age = Number(dateArr[0]) - Number(me[0]) - 1;
    }

  return (
    <div className={styles.container}>
        <div className={styles.block}>
            <h3>Site Information</h3>
            <p>This is a demo project I made just for fun. This project was not focused the functions the site could have had, eventhough I included the functionality of adding, editing and removing listings. This project was more focused on the design and responsiveness.  </p>
            <br />
            <p>I, if I would have had the time, could have easily built this out further with an integrated chat when clicked on the &quot;Contact&quot; button along with more features. </p>
            <br />
            <p>Built with Next.js and firebase</p>
            <h3>Code can be shared if you are interested!</h3>
        </div>
        <div className={styles.me}>
            <h3>About Me</h3>
            <p>My name is Simon Sandevik, I am {age} years old and currently (2022) studying Webdevelopment at Medieinstitutet Stockholm, graduating spring of 2023.</p>
            <br />
            <p>If you would like to contact me, go through my <a href="https://www.linkedin.com/in/simon-sandevik/">LinkedIn</a> or email me: <a href="mailto:simon.sandevik@outlook.com">simon.sandevik@outlook.com</a></p>
        </div>
    </div>
  )
}

export default About