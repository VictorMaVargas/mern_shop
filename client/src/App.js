import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Home from '../../client/src/pages/Home'
import Search from '../../client/src/pages/Search'
import './App.css';

function App() {
  

  return (
    <div className="App">
      <Grid item xs={12}>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/search' component={Search}/>
            <Route path='/providers' component={Search}/>
          </Switch>
        </BrowserRouter>
      </Grid>
    </div>
  );
}

export default App;
