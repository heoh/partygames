import { useLocation } from 'react-router';

export function useBasename() {
  const location = useLocation();
  const basename = window.location.pathname.replace(location.pathname, '');
  return basename;
}
