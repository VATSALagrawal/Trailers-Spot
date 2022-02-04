import './App.css';

import Header from './components/Header/Header';
import MainNavBar from './components/MainNavBar/MainNavBar';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Trending from './components/Trending/Trending';
import Movies from './components/Movies/Movies';
import Series from './components/Series/Series';
import Search from './components/Search/Search';
import { Container } from '@material-ui/core';
function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route exact path='/' element={<Trending />} />
            <Route exact path='/movies' element={<Movies />} />
            <Route exact path='/series' element={<Series />} />
            <Route exact path='/search' element={<Search />} />
          </Routes>
        </Container>
      </div>
      <MainNavBar/>
    </BrowserRouter>
    </>
  );
}

export default App;
