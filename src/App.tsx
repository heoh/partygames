import { Route, Routes } from 'react-router';
import HomePage from '@/pages/HomePage';
import CreateGamePage from '@/pages/CreateGamePage';
import JoinGamePage from '@/pages/JoinGamePage';
import LoginPage from '@/pages/LoginPage';
import RequireAuth from '@/components/RequireAuth';
import { AUTH_CALLBACK_PATH, AuthCallback } from '@/hooks/useAuth';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={AUTH_CALLBACK_PATH} element={<AuthCallback />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create" element={<RequireAuth><CreateGamePage /></RequireAuth>} />
      <Route path="/join" element={<RequireAuth><JoinGamePage /></RequireAuth>} />
    </Routes>
  );
}

export default App;
