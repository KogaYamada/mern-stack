import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = ({ path }) => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push(path);
    return () => clearInterval(interval);
  }, [count]);
  return <div>Redirect you in {count} seconds</div>;
};
export default LoadingToRedirect;
