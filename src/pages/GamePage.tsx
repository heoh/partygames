import { useLocation, type Location } from 'react-router';

export default function GamePage() {
  const location = useLocation();
  const { pin } = parseUrlParams(location);

  return <div>게임 화면: {pin}</div>;
}

function parseUrlParams(location: Location) {
  const params = new URLSearchParams(location.search);
  const pin = params.get('pin');
  return { pin };
}
