import React from 'react';
import { dotStream } from 'ldrs';

const LoadingDotStream = () => {
  React.useEffect(() => {
    dotStream.register();
  }, []);

  return (
    <div>
      <l-dot-stream size="60" speed="2.5" color="white"></l-dot-stream>
    </div>
  );
};

export default LoadingDotStream;


