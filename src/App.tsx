import { Route, Routes } from 'react-router';
import HomePage from '@/pages/HomePage';
import CreateGamePage from '@/pages/CreateGamePage';
import JoinGamePage from '@/pages/JoinGamePage';
import LoginPage from '@/pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/create" element={<CreateGamePage />} />
      <Route path="/join" element={<JoinGamePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
