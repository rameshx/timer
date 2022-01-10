import { FC } from "react";

import './Timer.css';

export const Timer: FC = () => {
  return (
    <div className="timer">
      <header>
        <h1>Timer</h1>
        <button className="icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </header>
      <time>
        <span>
          00
          <small>h</small>
        </span>
        <span>
          01
          <small>m</small>
        </span>
        <span>
          23
          <small>s</small>
        </span>
        <button className="icon">
          <svg viewBox="0 0 24 24">
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
          </svg>
        </button>
      </time>
      <hr />
      <div className="keypad">
        <button className="numkey">1</button>
        <button className="numkey">2</button>
        <button className="numkey">3</button>
        <button className="numkey">4</button>
        <button className="numkey">5</button>
        <button className="numkey">6</button>
        <button className="numkey">7</button>
        <button className="numkey">8</button>
        <button className="numkey">9</button>
        <button className="numkey">0</button>
      </div>
      <footer>
        <button className="fab">
          <svg viewBox="0 0 24 24">
            <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
          </svg>
        </button>
      </footer>
    </div>
  );
};
