import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useGenre from '../../hooks/useGenre';
import ContentCard from '../ContentCard/ContentCard';
import Genre from '../Genre/Genre';
import CustomPagination from '../Pagination/CustomPagination';
import { Button } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

import './Series.css'
const Series = () => {
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [content, setContent] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sort, setSort] = useState(false);

  const genreforURL = useGenre(selectedGenres);
  const fetchSeries = async ()=>{
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    // console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }
  useEffect(() => {
    fetchSeries();
    setSort(false);
    // eslint-disable-next-line
  }, [page,genreforURL]);
  
  const sortContent = ()=>{
    const sorted = [...content].sort((a,b)=> a.vote_average>b.vote_average ? -1:1); // cloning content array first then sorting as Sort function does inplace sorting and we cannot diretly modify state of variable
    // console.log(sorted); 
    setContent(sorted);
    // console.log(content);
  }
  useEffect(() => {
    if(sort){
      sortContent();
    }
    else{
      fetchSeries();
    }
    // eslint-disable-next-line
  }, [sort])

  return <div>
      <div className='heading'>
        <span className='pageTitle'>TV Series</span>
        <Button size='small' variant="contained" 
          color={sort ? 'primary' : "default"}
          style={{ marginLeft: 10}} 
          onClick={()=>{setSort(!sort)}}
          // onClick={()=>{sortContent()}}
        > <SortIcon/> <b>Sort By Rating</b></Button>
      </div>
      <Genre 
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        type='tv'
        setPage={setPage}
        />
      <div className='series'>
          {content && content.map((c) => (
            <ContentCard key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type="tv"
            vote_average={c.vote_average}
            vote_count={c.vote_count} />
          ))}
      </div>
      {numOfPages>1 ? 
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/> : null
      }
  </div>;
};

export default Series;
