import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useGenre from '../../hooks/useGenre';
import ContentCard from '../ContentCard/ContentCard';
import Genre from '../Genre/Genre';
import CustomPagination from '../Pagination/CustomPagination';
import './Series.css'
const Series = () => {
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [content, setContent] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

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
    // eslint-disable-next-line
  }, [page,genreforURL]);
  
  return <div>
      <span className='pageTitle'>TV Series</span>
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
