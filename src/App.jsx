import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';
import Quiz from './components/Quiz';
import SlidingPuzzle from './components/SolvePuzzle';
import ScrambleGame from './components/ScrambleGame';

const AppContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const Navbar = styled.nav`
  background-color: #007bff;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: 500;
  &:hover {
    color: #e0e0e0;
  }
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/puzzle" element={<SlidingPuzzle />} />
            <Route path="/scramble-game" element={<ScrambleGame/>} />
            <Route path="*" element={<h2>404: Page Not Found</h2>} />

          </Routes>
        </Main>
      </AppContainer>
    </Router>
  );
}

export default App;