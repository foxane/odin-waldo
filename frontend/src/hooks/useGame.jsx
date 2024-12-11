import { useContext } from 'react';
import { GameContext } from '../context/GameProvider';

export default function useGame() {
  return useContext(GameContext);
}
