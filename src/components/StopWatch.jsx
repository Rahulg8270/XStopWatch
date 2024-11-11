import { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const intervalId = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          } else {
            setSeconds(prevSeconds + 1);
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [isRunning]);

  const handleReset = () => {
    clearInterval(intervalId.current);
    setMinutes(0);
    setSeconds(`${0}`);
  };
  return (
    <div>
      <h1>Stop Watch</h1>
      <div>Timer: {`${minutes}: ${seconds < 10 ? "0" : ""}${seconds}`}</div>
      <button onClick={() => setIsRunning((prevState) => !prevState)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button
        style={{
          marginTop: "20px",
        }}
        onClick={() => handleReset()}
      >
        Reset
      </button>
    </div>
  );
};

export default StopWatch;
