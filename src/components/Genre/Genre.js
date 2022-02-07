import { Chip } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';

const Genre = ({
    genres,
    setGenres,
    selectedGenres,
    setSelectedGenres,
    type,
    setPage,
}) => {
    
    const handleAdd = (genre)=>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g) => g.id!==genre.id));
        setPage(1);
    }
    const handleDelete = (genre)=>{
        setGenres([...genres,genre]);
        setSelectedGenres(selectedGenres.filter((selected) => selected.id!==genre.id));
        setPage(1);
    }
    const fetchGenres = async ()=>{
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
        );
        // console.log(data.genres);
        setGenres(data.genres);
    }
    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres([]); // unmounting
        };

    }, []);
    
  return <div style={{padding:'3px'}}>
      {selectedGenres && selectedGenres.map((genre)=>(
        <Chip key={genre.id} label={genre.name} color='primary' clickable style={{margin:'3px'}} onDelete={()=>handleDelete(genre)}/>
      ))}
      {genres && genres.map((genre)=>(
        <Chip key={genre.id} label={genre.name} clickable style={{margin:'3px'}} onClick={()=>handleAdd(genre)}/>
      ))}
  </div>;
};

export default Genre;
