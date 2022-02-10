import React , {useEffect , useState} from 'react';
import axios from 'axios';
import ContentCard from '../ContentCard/ContentCard';
import './Trending.css';
import CustomPagination from '../Pagination/CustomPagination';
import { Button } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';

const Trending = () => {
  const [content, setContent] = useState([]);
  const [sort, setSort] = useState(false);
  const [page,setPage] = useState(1);
  const fetchTrending = async ()=>{
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${page}`);
    // console.log(data);
    setContent(data.results);
  }
  const sortContent = ()=>{
    const sorted = [...content].sort((a,b)=> a.vote_average>b.vote_average ? -1:1); // cloning content array first then sorting as Sort function does inplace sorting and we cannot diretly modify state of variable
    // console.log(sorted); 
    setContent(sorted);
    // console.log(content);
  }
  useEffect(() => {
    fetchTrending();
    setSort(false);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if(sort){
      sortContent();
    }
    else{
      fetchTrending();
    }
  }, [sort])
  
  return <div>
      <div className='heading'>
        <span className='pageTitle'>Trending</span>
        <Button size='small' variant="contained"
          color={sort ? 'primary' : "default"}
          style={{ marginLeft: 10}} 
          onClick={()=>{setSort(!sort)}}
          // onClick={()=>{sortContent()}}
        > <SortIcon/> <b>Sort By Rating</b></Button>
      </div>
      <div className='trending'>
          {content && content.map((c) => (
            <ContentCard key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
            vote_count={c.vote_count} />
          ))}
      </div>
      <CustomPagination setPage={setPage}/>
  </div>;
};

export default Trending;