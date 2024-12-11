import { useRef } from 'react';
import useClick from '../hooks/useClick';

export default function Game() {
  const imgRef = useRef(null);
  const { handleClick } = useClick();

  // Get click location
  const handleImageClick = e => {
    if (imgRef.current) {
      handleClick(e, imgRef.current);
    }
  };

  return (
    <div>
      <img
        ref={imgRef}
        src="/main.jpg"
        alt="Main"
        onClick={handleImageClick}
        style={{ width: '1280', height: '720' }}
        width={1280}
      />
    </div>
  );
}
