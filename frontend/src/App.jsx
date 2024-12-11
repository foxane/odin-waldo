import { useState } from 'react';

import Game from './components/Game';
import Timer from './components/Timer';
import Modal from './components/Modal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>open modal</button>
      <Game />
      <Timer />
      <Modal onClose={closeModal} isOpen={modalOpen}></Modal>
    </div>
  );
}

export default App;
