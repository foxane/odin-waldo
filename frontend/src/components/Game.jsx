import { useRef, useState } from 'react';

import Modal from './Modal';
import useGame from '../hooks/useGame';
import verifyCoordinate from '../utils/verifyCoordinate';

export default function Game() {
  const imgRef = useRef(null);
  const { selection, foundSelection, data } = useGame();
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleImageClick = e => {
    if (imgRef.current) {
      const rect = e.target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Verify clicked area is entity
      const foundEntity = verifyCoordinate(
        clickX,
        clickY,
        imgRef.current,
        selection,
      );

      /*
      TODO: Add state for foundEntity, this then will be compared
            to selected entity by user in selector component

            Current idea is using useEffect with foundEntity deps
            Or directly compare it inside handleSelect
            
            latter is simpler
      */
      console.log(foundEntity);

      openSelector();
    }
  };

  const openSelector = () => setIsSelectorOpen(true);
  const closeSelector = () => setIsSelectorOpen(false);
  const handleSelect = e => {
    const entityName = e.currentTarget.getAttribute('name');
    foundSelection(entityName);
    closeSelector();
  };
  return (
    <div>
      <img
        ref={imgRef}
        src={data && data.url}
        alt="Main"
        onClick={handleImageClick}
        style={{ width: '1280', height: '720' }}
        width={1280}
      />
      <Modal isOpen={isSelectorOpen} onClose={closeSelector}>
        <div className="flex gap-5">
          {selection &&
            selection.map(el => (
              <button
                disabled={el.isFound}
                onClick={handleSelect}
                name={el.name}
                key={el.id}
                className={`${
                  el.isFound && 'opacity-50 '
                }flex flex-col items-center gap-2 border-2 rounded-md border-gray-400 hover:bg-gray-300 cursor-pointer`}>
                <img src={el.url} alt={el.image} className="rounded-t" />
                <p>{el.name}</p>
              </button>
            ))}
        </div>
      </Modal>
    </div>
  );
}
