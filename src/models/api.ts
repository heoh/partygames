import type { User } from '@supabase/supabase-js';
import { supabase } from '@/shared/supabase';
import type { GameType } from './GameType';

export async function getPlayingPlayer(user: User) {
  const { data: players, error } = await supabase
    .from('players')
    .select()
    .eq('uid', user.id)
    .eq('is_playing', true)
    .limit(1);
  if (error) {
    throw error;
  }
  return players.at(0);
}

export async function createGame(name: string, gameType: GameType, host: User) {
  const pin = await generatePinNumber(6);
  const { data: game, error } = await supabase
    .from('games')
    .insert({
      name,
      address: pin,
      host: host.id,
      is_playing: false,
      state: { gameType: gameType.id },
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return game;
}

async function generatePinNumber(length: number) {
  let pin = null;
  while (!pin || (await supabase.from('games').select().eq('address', pin)).count) {
    pin = Math.random()
      .toString()
      .substring(2, 2 + length);
  }
  return pin;
}

export async function getGameByPin(pin: string) {
  const { data: game, error: gameError } = await supabase.from('games').select().eq('address', pin).limit(1).single();
  if (gameError) {
    throw gameError;
  }
  if (!game) {
    throw new Error('게임을 찾을 수 없습니다.');
  }
  return game;
}

export async function joinGame(user: User, pin: string, nickname: string) {
  let game;
  try {
    game = await getGameByPin(pin);
  }
  catch (e) {
    throw e;
  }

  if (await getPlayingPlayer(user)) {
    throw new Error('이미 플레이 중인 사용자입니다.');
  }
  if (await checkNicknameExists(game.id, nickname)) {
    throw new Error('이미 사용 중인 닉네임입니다.');
  }

  const { data: player, error } = await supabase.from('players').insert({
    uid: user.id,
    nickname,
    game_id: game.id,
    game_address: pin,
    is_playing: true,
    state: {},
  }).select().single();
  if (error) {
    throw error;
  }

  return player;
}

export async function checkNicknameExists(gameId: string, nickname: string) {
  const { data, error } = await supabase.from('players').select().eq('game_id', gameId).eq('nickname', nickname);
  if (error) {
    throw error;
  }
  return data.length > 0;
}
