import React, { useState } from 'react';

interface PasswordToggleProps {
  onClick?: () => void;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({ onClick }) => {
  const [toggleClass, setToggleClass] = useState('view-toggle');

  const handleClick = (): void => {
    if (toggleClass === 'view-toggle') {
      setToggleClass('hide-toggle');
    } else {
      setToggleClass('view-toggle');
    }

    if (onClick) {
      onClick();
    }
  };

  return <div className={`password-toggle ${toggleClass}`} onClick={handleClick}></div>;
};

export default PasswordToggle;
