import { Badge } from '@material-ui/core';
import React from 'react';
import { img_300 , unavailable } from "../../config/config";
import './ContentCard.css'
const ContentCard = ({id , poster , title , date , media_type , vote_average , vote_count}) => {
  return <div>
      <div className="media">
          <Badge badgeContent={vote_count>0 ? vote_average : 'New'} color={vote_average>7 ? 'primary' : 'secondary'}/>
          <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} className="poster" />
          <b className="title">{title}</b>
          <span className="subTitle">
            {media_type==="movie" ? "Movie" : "TV Series"}
            <span className="subTitle">{date}</span>
          </span>
      </div>
  </div>;
};

export default ContentCard;
