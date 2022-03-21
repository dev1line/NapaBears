import React from 'react';

function TelegramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-10 sm:w-10 w-5 h-5" viewBox="0 0 23.022 19.307">
      <path
        d="M48.957,64.869,45.482,81.253c-.262,1.156-.946,1.444-1.917.9l-5.293-3.9-2.554,2.457a1.329,1.329,0,0,1-1.064.519l.38-5.391,9.811-8.865c.427-.38-.092-.591-.663-.211L32.054,74.4l-5.221-1.634c-1.136-.355-1.156-1.136.236-1.681l20.423-7.868C48.437,62.86,49.265,63.425,48.957,64.869Z"
        transform="translate(-26.001 -63.112)"
        fill="#ddd"
      />
    </svg>
  );
}

export default React.memo(TelegramIcon);
