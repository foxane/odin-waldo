import { useRef, useState, useEffect } from 'react';
import Modal from './Modal';
import useGame from '../hooks/useGame';
import verifyCoordinate from '../utils/verifyCoordinate';
import { func } from 'prop-types';

export default function Game({ onWin }) {
  const imgRef = useRef(null);
  const { selection, foundSelection, data } = useGame();
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [foundEntity, setFoundEntity] = useState('');

  useEffect(() => {
    if (selection.length === 0) return; // Wait selection to be populated

    const allFound = selection.every(el => el.isFound);
    if (allFound) {
      console.log('Win condition reached!');
      onWin();
    }
  }, [selection, onWin]);

  const handleImageClick = e => {
    if (imgRef.current) {
      const rect = e.target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Verify clicked area is entity
      const entityName = verifyCoordinate(
        clickX,
        clickY,
        imgRef.current,
        selection,
      );

      setFoundEntity(entityName || '');
      openSelector();
    }
  };

  const openSelector = () => setIsSelectorOpen(true);
  const closeSelector = () => setIsSelectorOpen(false);
  const handleSelect = e => {
    const entityName = e.currentTarget.getAttribute('name');
    if (entityName !== foundEntity) {
      closeSelector();
      return;
    }

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
      <div>
        <h3 className="text-xl font-semibold">Find them!</h3>
        <div className="flex gap-2">
          {selection.length > 0 &&
            selection.map(el => (
              <div key={el.name} className={`${el.isFound && 'opacity-50 '}`}>
                <img src={el.url} alt={el.name} />
              </div>
            ))}
        </div>
      </div>

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
                <img src={el.url} alt={el.name} className="rounded-t" />
                <p>{el.name}</p>
              </button>
            ))}
        </div>
      </Modal>
    </div>
  );
}

Game.propTypes = {
  onWin: func,
};
