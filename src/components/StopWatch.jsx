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
        //   console.log(prevSeconds)
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes+1);
            return 0;
          } else{
            return prevSeconds+1;
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
    setSeconds(0);
    setIsRunning(false);
  };
  return (
    <div>
      <h1>Stopwatch</h1>
      <div>Time: {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</div>
      <button
        type="button"
        onClick={() => setIsRunning((prevState) => !prevState)}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      <button
        type="button"
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
