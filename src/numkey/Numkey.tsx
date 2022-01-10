import { FC } from 'react';
import './Numkey.css';

interface Props {
  numkey: string;
  onClick: (numkey: string) => void;
}

export const Numkey: FC<Props> = ({ numkey, onClick }) => {
  return (
    <button onClick={() => onClick(numkey)} className="numkey">
      {numkey}
    </button>
  );
};
