import SearchBar from './components/SearchBar/SearchBar'
import ProductList from './components/ProductList/ProductList'
import OrderButtons from './components/OrderButtons/OrderButtons'
import Footer from './components/Footer/Footer'
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid container spacing={5}>
        <SearchBar/>
        <OrderButtons/>
        <ProductList/>
        <Footer/>
      </Grid>
    </div>
  );
}

export default App;
