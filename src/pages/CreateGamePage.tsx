function CreateGamePage() {
  return (
    <div className="hero bg-base-200 min-h-svh">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Create Game</h1>
          <p className="py-6">
            <input type="text" placeholder="Game PIN" className="input input-lg text-center" />
          </p>
          <button className="btn btn-primary">Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateGamePage;
