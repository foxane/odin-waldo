import { useContext } from 'react';
import { GameContext } from '../components/GameProvider';

export default function useGame() {
  return useContext(GameContext);
}
