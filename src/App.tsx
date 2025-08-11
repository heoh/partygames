import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import HomePage from '@/pages/HomePage';
import CreateGamePage from '@/pages/CreateGamePage';
import JoinGamePage from '@/pages/JoinGamePage';
import LoginPage from '@/pages/LoginPage';
import RequireAuth from '@/components/RequireAuth';
import { AUTH_CALLBACK_PATH, AuthCallback } from '@/hooks/useAuth';
import { supabase } from '@/shared/supabase';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('players').select().eq('is_playing', true);
      const player = data?.at(0);
      if (!error && player) {
        navigate(`/game?pin=${player.game_address}`, { replace: true });
      }
    })();
  }, []);

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
