import { useState } from 'react';
import Game from './components/Game';
import useGame from './hooks/useGame';
import useTimer from './hooks/useTimer';
import { sortScores } from './utils/util';

function App() {
  const { data, loading, resetGame, updateData } = useGame();
  const { formattedTime, handleStart, handleReset } = useTimer();
  const [isRunning, setIsRunning] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [currentScore, setCurrentScore] = useState('');
  const [name, setName] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const startGame = () => {
    setIsRunning(true);
    setIsWin(false);
    handleStart();
  };

  const stopGame = () => {
    setIsRunning(false);
    setIsWin(true);
    resetGame();
    handleReset();
    setCurrentScore(formattedTime);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setSubmitLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/images/1/scores`, {
      method: 'POST',
      body: JSON.stringify({ name, time: currentScore }),
      headers: {
        'Content-Type': 'Application/json',
        Authorization: import.meta.env.VITE_SECRET,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => updateData(data))
      .catch(err => console.log(err))
      .finally(() => {
        setSubmitLoading(false);
        setIsWin(false);
        setName('');
      });
  };

  return (
    <div className="flex justify-center items-start gap-5 p-5">
      <Game onWin={stopGame} />
      <div>
        <p className="text-xl font-bold p-3 border border-gray-600">
          {formattedTime}
        </p>
        <div className="mt-10">
          <h4 className="text-lg font-semibold text-center">High scores</h4>
          {data &&
            data.scores &&
            sortScores(data.scores).map(el => (
              <p
                key={el.id}
                className="flex justify-between items-center border-b mt-5 border-gray-600">
                {el.name} <span className="font-semibold">{el.time}</span>
              </p>
            ))}
        </div>
      </div>

      {/* Starting menu */}
      {!isRunning && !isWin && (
        <div className="fixed inset-0 bg-gray-500 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg min-w-96 p-6 flex flex-col gap-5">
            {loading ? (
              <p>Loading..</p>
            ) : (
              <>
                <button
                  onClick={startGame}
                  className="py-2 px-7 text-white bg-blue-500 shadow-md shadow-gray-600 transition-colors hover:bg-green-400 hover:text-black">
                  Start Game
                </button>
                <div>
                  <h4 className="text-lg font-semibold text-center">
                    High scores
                  </h4>
                  {data &&
                    data.scores &&
                    sortScores(data.scores).map(el => (
                      <p
                        key={el.id}
                        className="flex justify-between border-b mb-1 border-gray-400">
                        {el.name}{' '}
                        <span className="font-semibold">{el.time}</span>
                      </p>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Win form */}
      {isWin && (
        <form
          onSubmit={handleSubmit}
          className="fixed inset-0 bg-gray-500 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg min-w-96 p-6 flex flex-col">
            <h4 className="font-semibold text-xl text-center mb-5">You win!</h4>
            <h4 className="font-semibold mb-1">Your score: {currentScore}</h4>
            <p className="mb-2 font-semibold">
              Name:
              <span className="italic font-normal text-sm"> (optional)</span>
            </p>
            <input
              className="border rounded border-gray-500 p-1 text-md"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={({ target }) => setName(target.value)}
            />
            <button
              className="py-2 px-7 mt-4 mx-auto text-white bg-blue-500 shadow-md shadow-gray-600 transition-colors hover:bg-green-400 hover:text-black"
              type="submit">
              Submit
            </button>
            {submitLoading && (
              <div className="absolute top-0 right-0 rounded flex justify-center items-center w-full h-full bg-gray-400 bg-opacity-70">
                <p className="font-semibold text-xl">Loading...</p>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
