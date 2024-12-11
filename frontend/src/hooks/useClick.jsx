import { useEffect } from 'react';
import verifyCoordinate from '../utils/verifyCoordinate';
import useGame from './useGame';

// This will simulate entity selection
const isCorrect = str => str === str;

// This will handle what happen when user clicked
export default function useClick() {
  const { selection, foundSelection } = useGame();

  // Debug
  useEffect(() => {
    console.log(selection);
  }, [selection]);

  // 1. On click, this will show popup to choose entity,
  // 2. When chosen entity is the same with foundEntity, the selection will be
  //    disabled
  const handleClick = (e, image) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const foundEntity = verifyCoordinate(clickX, clickY, image, selection);
    if (
      foundEntity &&
      selection.find(el => el.name === foundEntity) &&
      isCorrect(foundEntity)
    ) {
      foundSelection(foundEntity);
    } else {
      console.log('You clicked outside of any object.');
    }
  };

  return { handleClick };
}
