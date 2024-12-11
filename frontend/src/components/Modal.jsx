import { bool, func, node } from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClickOutside = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg min-w-96 p-6">
        {children}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: bool,
  onClose: func,
  children: node,
};
