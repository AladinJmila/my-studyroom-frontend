import { useState, useEffect } from 'react';

import './SettingsMenu.css';

const SettingsMenu = ({ children, showSettingsMenu, setShowSettingsMenu }) => {
  const [showMenu, setShowMenu] = useState(showSettingsMenu);
  useEffect(() => {
    setShowMenu(showSettingsMenu);
  }, [showSettingsMenu]);

  return (
    <div className='settings-menu'>
      <i
        onClick={() => {
          setShowMenu(!showMenu);
          setShowSettingsMenu(!showMenu);
        }}
        className='fa fa-gear pointer'
        aria-hidden='true'
      ></i>
      {showMenu && (
        <div className='settings-menu-content'>
          <div className='settings-menu-item'>{children}</div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
