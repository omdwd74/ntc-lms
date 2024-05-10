import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './SlideShow.css'

const fadeImages = [
  {
    url: 'http://www.nitra.ac.in/img/media/banners/1.jpg',
    caption: ''
  },
  {
    url: 'http://www.nitra.ac.in/img/media/banners/2.jpg',
    caption: ''
  },
  {
    url: 'http://www.nitra.ac.in/img/media/banners/3.jpg',
    caption: ''
  },
];

export const Slideshow = () => {
  return (
    <div className="slide-container">
      <Fade arrows={false}>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '100%' }} src={fadeImage.url} />
            {/* <h2>{fadeImage.caption}</h2> */}
          </div>
        ))}
      </Fade>
    </div>
  )
}