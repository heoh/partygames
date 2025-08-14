-- DROP TABLE IF EXISTS games CASCADE;
-- DROP TABLE IF EXISTS players CASCADE;
-- DROP TABLE IF EXISTS messages CASCADE;

create extension if not exists moddatetime schema extensions;


CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  address TEXT,
  name TEXT NOT NULL,
  host UUID REFERENCES AUTH.USERS ON DELETE CASCADE,
  is_playing BOOL DEFAULT FALSE,
  state JSONB
);
create trigger handle_updated_at before update on games
  for each row execute procedure moddatetime (updated_at);
-- ALTER TABLE games ENABLE ROW LEVEL SECURITY;


CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  uid UUID REFERENCES AUTH.USERS ON DELETE CASCADE,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  game_address TEXT,
  nickname TEXT NOT NULL,
  is_playing BOOL DEFAULT FALSE,
  state JSONB
);
create trigger handle_updated_at before update on players
  for each row execute procedure moddatetime (updated_at);
-- ALTER TABLE players ENABLE ROW LEVEL SECURITY;


CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  game UUID REFERENCES games(id) ON DELETE CASCADE,
  sender UUID REFERENCES players(id) ON DELETE CASCADE,
  receiver UUID REFERENCES players(id) ON DELETE CASCADE,
  data JSONB
);
create trigger handle_updated_at before update on messages
  for each row execute procedure moddatetime (updated_at);
-- ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
