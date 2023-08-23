import React, { useState } from 'react';

interface PasswordToggleProps {
  onClick?: () => void;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({ onClick }) => {
  const [toggleClass, setToggleClass] = useState('hide-toggle');

  const handleClick = (): void => {
    if (toggleClass === 'hide-toggle') {
      setToggleClass('view-toggle');
    } else {
      setToggleClass('hide-toggle');
    }

    if (onClick) {
      onClick();
    }
  };

  return <div className={`password-toggle ${toggleClass}`} onClick={handleClick}></div>;
};

export default PasswordToggle;
