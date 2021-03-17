import './App.css';
import { Route } from 'react-router';
import { TitleSearch } from './components/TitleSearch';
import { Container } from 'reactstrap';
import TitleDetails  from './components/TitleDetails';

function App() {
  return (
    <div className="App">
      <header style={{backgroundImage: "linear-gradient(to bottom, #003366, #ffffff)"}}>
        <h3>Warner Media Title Search</h3>
      </header>
      <Container>
        {/*Routes defined here. Components loaded based on route will load within container */}
        <Route exact path='/' component={TitleSearch} />
        <Route path='/title-details' component={TitleDetails} />
      </Container>
    </div>
  );
}

export default App;
