import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createTheme({
    palette:{
        type:'dark',
    },
});
const CustomPagination = ({setPage,numOfPages=100}) => {
    const handlePageChange = (event, value) => {
        setPage(value);
        window.scroll(0,0);
    };
    
  return <div style={{
    width:"100%",
    display:"flex",
    justifyContent:"center",
    marginTop:"10px"
}}>
    <ThemeProvider theme={darkTheme}>
      <Pagination count={numOfPages} onChange={handlePageChange} color="primary" />
    </ThemeProvider>
  </div>;
};

export default CustomPagination;
