import { useState } from 'react';

import './SettingsMenu.css';

const SettingsMenu = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='settings-menu'>
      <i
        onClick={() => setShowMenu(!showMenu)}
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
