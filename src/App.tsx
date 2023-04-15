import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouterComponent from './components/router/RouterComponent';
import Container from './components/Container';
import Navigation from './components/navigation/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Container>
        {params => (
          <div className='App'>
            <Navigation />
            <RouterComponent />
          </div>
        )}
      </Container>
    </BrowserRouter>
  );
}

export default App;
