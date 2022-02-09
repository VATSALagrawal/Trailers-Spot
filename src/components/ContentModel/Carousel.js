import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({media_type , id}) => {
    const [credits, setCredits] = useState([]);
    const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
        );
        if(data.cast.length<6){ // keeping minimum length of credits array as 6 to maintain image consistancy
            while(data.cast.length<6){
                data.cast.push({dummy:true})
            }
        }
        // console.log(data.cast);
        setCredits(data.cast);
    };
    const responsive = {
        0: { items: 3 },
        512: { items: 5 },
        1024: { items: 6 },
    };
    const items = credits.map((c)=>(
        <div className="carouselItem">
            <img
                src={c.dummy? null : c.profile_path ? `${img_300}/${c.profile_path}` : noPicture }
                alt={c?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
            />
            <b className="carouselItem__txt">{c?.name}</b>
        </div>
    ));
    useEffect(() => {
      fetchCredits();
    }, []);
    
  return <>
      <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
      />
  </>;
};

export default Carousel;