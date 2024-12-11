import useTimer from '../hooks/useTimer';

export default function Timer() {
  const { isRunning, elapsedTime, formattedTime, handleStart, handlePause } =
    useTimer();

  return (
    <div>
      <p>Elapsed: {elapsedTime && formattedTime}</p>
      {!isRunning ? (
        <button className="p-2 border rounded" onClick={handleStart}>
          Start
        </button>
      ) : (
        <button
          className="p-2 border rounded"
          onClick={() => {
            handlePause();
          }}>
          Stop
        </button>
      )}
    </div>
  );
}
