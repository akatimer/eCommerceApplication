import './AboutUs.css';
import React from 'react';
import { Card, CardActionArea, CardContent } from '@mui/material';
// import userIcon from '../../assets/icons/user_icn.svg';
import maksim from '../../assets/images/maksim.jpeg';
import artem from '../../assets/images/artem.jpg';
import timur from '../../assets/images/timur.jpg';
import { Link } from 'react-router-dom';
import RsLogo from '../RsLogo/RsLogo';

const AboutUs: React.FC = () => {
  const maximText = `I used to play the accordion, so my fingers are quick. It's magic when notes on paper become something hearable and beautiful. Now I play JS, my fingers are still as fast. The code is a new instance of music to me. But instead of a melody, what I hear when I press the keys is something like this: \n const myMusic = () => console.log("Heare me, world!"); \n
  myMusic();`;

  const artemText = `Thousands of sleepless nights spent in Dota and anime series have helped me become
  extraordinarily diligent and purposeful in reaching this stage of my software
  engineering career. \n P.S. (for H.R.'s): I'm not a nerd anymore.`;

  const timurText = `In my life, I've assumed various roles. These roles have always represented some new world full of mysteries and discoveries. Each of them has had a unique and compelling story behind it. Now, my world is programming, and I believe this story can accompany me for a very long time...`;

  const pageText = `We are the Code-Witchers team.
  
  In this project, we've transformed our knowledge and skills into a product we're excited to showcase. Let's get to know the team better.
  Starting from left to right:
  
  Artem - is our lead developer. He's the person who tirelessly wrote the code blocks of this application, tackling even the most complex issues without hesitation. His expertise in React application development significantly contributed to ensuring the project was executed accurately and on schedule. Pages like the catalog, shopping cart, and many others result from his ideas and solutions.
  
  Timur - is our team leader. With his attention to detail and a personal approach to every team member, he helped us achieve our set goals. His logical thinking and problem-solving skills assisted us in configuring and working with the SDK and providing numerous solutions related to working with commerce tools. He's also responsible for organizing task management and distribution processes.
  
  Maxim - is our business analyst, designer, developer, and the person who ideologically inspired this project. Many teams spend considerable time searching for project ideas initially, but in our case, Maxim could replace an entire team. His work with products, design, development of product cards, routing, and contexts has enormously contributed to our overall work.
  
  We would also like to highlight our mentor:
  
  Aliaksander - is our mentor. He was always ready to come to our aid when we felt stuck. His advice was always precise and helped us overcome difficulties that seemed impossible to us. It was he who inspired us to use React. It was one of the best decisions that allowed us to reach the project's conclusion.\n
  
  We organized our work using tools such as:
  
  Google Meet / Discord - for conferences and live coding sessions.
  Miro boards - for visualizing processes and actions that required visual representation.
  Trello - for task distribution and tracking status updates.
  
  And there you have it; we've introduced our team to you. 
  Now, all you need to do is to relax and enjoy our product because it's made just for you!`;

  return (
    <div className="main-about-us">
      <Card sx={{ width: [300, 300, 364], minHeight: [480, 480, 560], borderRadius: 3, margin: 5 }}>
        <CardActionArea>
          <Link to="https://github.com/Zhiznevski">
            <div className="card-image_block">
              <img className="card-image" src={artem} alt="User Icon" />
            </div>
            <CardContent>
              <h2 className="card-title card-title-about">
                Artem <br /> Main Developer
              </h2>
              <p className="card-description card-about">{artemText}</p>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      <Card sx={{ width: [300, 300, 364], minHeight: [480, 480, 560], borderRadius: 3, margin: 5 }}>
        <CardActionArea>
          <Link to="https://github.com/akatimer">
            <div className="card-image_block">
              <img className="card-image" src={timur} alt="User Icon" />
            </div>
            <CardContent>
              <h2 className="card-title card-title-about">
                Timur <br /> Team-Lead
              </h2>
              <p className="card-description card-about">{timurText}</p>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      <Card sx={{ width: [300, 300, 364], minHeight: [480, 480, 560], borderRadius: 3, margin: 5 }}>
        <CardActionArea>
          <Link to="https://github.com/MaxFralou">
            <div className="card-image_block">
              <img className="card-image" src={maksim} alt="User Icon" />
            </div>
            <CardContent>
              <h2 className="card-title card-title-about">
                Maksim <br />
                Solution engineer
              </h2>
              <p className="card-description card-about">{maximText}</p>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      <div className="introduction">
        <h3 className="title-intro">Introduction</h3>
        <p className="about-us__page-text">{pageText}</p>
      </div>
      <RsLogo />
    </div>
  );
};

export default AboutUs;
