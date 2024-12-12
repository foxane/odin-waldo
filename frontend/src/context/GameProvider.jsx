import { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { node } from 'prop-types';

const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const { data, loading, error, setData } = useFetch('/images/1');
  const [selection, setSelection] = useState([]);

  const foundSelection = name =>
    setSelection(prev =>
      prev.map(el => (el.name === name ? { ...el, isFound: true } : el)),
    );

  const resetGame = () => {
    setSelection(prev => prev.map(el => ({ ...el, isFound: false })));
  };

  const updateData = data => {
    setData(data);
  };

  useEffect(() => {
    // Fill selection after data is fetched
    data && setSelection(data.entities.map(el => ({ ...el, isFound: false })));
  }, [data]);

  return (
    <GameContext.Provider
      value={{
        data,
        selection,
        foundSelection,
        resetGame,
        updateData,
        loading,
        error,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };

GameProvider.propTypes = {
  children: node,
};
