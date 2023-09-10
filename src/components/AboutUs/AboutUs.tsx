import './AboutUs.css';
import React from 'react';
import { Card, CardActionArea, CardContent } from '@mui/material';
import userIcon from '../../assets/icons/user_icn.svg';
import maksim from '../../assets/images/maksim.jpeg';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="main-about-us">
      <Card sx={{ width: [300, 300, 364], minHeight: [480, 480, 560], borderRadius: 3, margin: 5 }}>
        <CardActionArea>
          <Link to="https://github.com/Zhiznevski">
            <div className="card-image_block">
              <img className="card-image" src={userIcon} alt="User Icon" />
            </div>
            <CardContent>
              <h2 className="card-title card-title-about">Artem</h2>
              <p className="card-description card-about">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ut illo iusto
                quae unde. Ab provident vitae facilis maiores voluptate quod voluptatibus, nesciunt
                cumque aliquid adipisci laboriosam, dignissimos quo aperiam.
              </p>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      <Card sx={{ width: [300, 300, 364], minHeight: [480, 480, 560], borderRadius: 3, margin: 5 }}>
        <CardActionArea>
          <Link to="https://github.com/akatimer">
            <div className="card-image_block">
              <img className="card-image" src={userIcon} alt="User Icon" />
            </div>
            <CardContent>
              <h2 className="card-title card-title-about">Timur</h2>
              <p className="card-description card-about">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ut illo iusto
                quae unde. Ab provident vitae facilis maiores voluptate quod voluptatibus, nesciunt
                cumque aliquid adipisci laboriosam, dignissimos quo aperiam.
              </p>
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
              <h2 className="card-title card-title-about">Maksim</h2>
              <p className="card-description card-about">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ut illo iusto
                quae unde. Ab provident vitae facilis maiores voluptate quod voluptatibus, nesciunt
                cumque aliquid adipisci laboriosam, dignissimos quo aperiam.
              </p>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
      <div className="introduction">
        <h3 className="title-intro">Introduction</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in odio assumenda consequatur,
          nisi maiores neque deserunt enim repellendus culpa deleniti expedita hic totam iure eum ad
          ipsum aliquid debitis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in odio
          assumenda consequatur, nisi maiores neque deserunt enim repellendus culpa deleniti
          expedita hic totam iure eum ad ipsum aliquid debitis! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ex in odio assumenda consequatur, nisi maiores neque
          deserunt enim repellendus culpa deleniti expedita hic totam iure eum ad ipsum aliquid
          debitis!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
