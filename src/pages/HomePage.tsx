import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  const handleEnterButton = () => {
    navigate('/join');
  };

  return (
    <div className="hero bg-base-200 min-h-svh">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Partygames</h1>
          <p className="py-6">
            <input type="text" placeholder="게임 PIN" className="input input-lg text-center" />
          </p>
          <button className="btn btn-primary" onClick={handleEnterButton}>입장하기</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
