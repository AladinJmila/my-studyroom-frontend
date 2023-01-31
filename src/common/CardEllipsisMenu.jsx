import { useState } from 'react';
import Toggle from './Toggle';
import Star from './Star';
import './CardEllipsisMenu.css';

const CardEllipsisMenu = ({
  item,
  onEdit,
  onToggleProp,
  onDelete,
  vertical,
  share,
  onShareForm,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const iconClass = vertical
    ? 'fa fa-ellipsis-v pointer'
    : 'fa fa-lg fa-ellipsis-h pointer';

  return (
    <>
      <i onClick={handleShowMenu} className={iconClass} aria-hidden='true'></i>
      {showMenu && (
        <div className='ellipsis-menu'>
          {onEdit && (
            <div
              className='ellipsis-menu-item'
              onClick={() => {
                onEdit(item);
                handleShowMenu();
              }}
            >
              <h6>Edit</h6>
              <i className='fa fa-pencil' aria-hidden='true'></i>
            </div>
          )}

          {onToggleProp && (
            <div
              className='ellipsis-menu-item'
              onClick={() => {
                onToggleProp(item, 'starred');
                handleShowMenu();
              }}
            >
              <h6>Star</h6>
              <Star starred />
            </div>
          )}

          {onToggleProp && (
            <div
              className='ellipsis-menu-item'
              onClick={() => {
                onToggleProp(item, 'isPublic');
                handleShowMenu();
              }}
            >
              <h6>Public</h6>
              <Toggle toggled={item.isPublic} />
            </div>
          )}

          {share && (
            <div
              className='ellipsis-menu-item'
              onClick={() => {
                onShareForm();
                handleShowMenu();
              }}
            >
              <h6>Share</h6>
              <i className='fa fa-share-alt' aria-hidden='true'></i>
            </div>
          )}

          {onDelete && (
            <div className='ellipsis-menu-item' onClick={() => onDelete(item)}>
              <h6>Delete</h6>
              <i className='fa fa-trash-o' aria-hidden='true'></i>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardEllipsisMenu;
