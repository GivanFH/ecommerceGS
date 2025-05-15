import { useEffect, useState } from 'react';

type Props = {
    message : string,
    duration ?: number
}

const Toast = ({ message, duration = 3000 } : Props ) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [message, duration]);

  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
