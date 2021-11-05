import { useState } from 'react';
import Toggle from './Toggle';
import Star from './Star';

const CardEllipsisMenu = ({
  item,
  onEdit,
  onToggleProp,
  onDelete,
  vertical,
  share,
  onToggleShareForm,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const iconClass = vertical
    ? 'fa fa-ellipsis-v align-top pointer'
    : 'fa fa-lg fa-ellipsis-h align-top pointer';

  return (
    <>
      <i onClick={handleShowMenu} className={iconClass} aria-hidden='true'></i>
      {showMenu && (
        <div
          className='list-group float-end'
          style={{
            right: 10,
            minWidth: 100,
            position: 'absolute',
            float: 'right',
            zIndex: 2000,
          }}
        >
          <div
            className='list-group-item list-group-item-action pointer'
            onClick={() => {
              onEdit(item);
              handleShowMenu();
            }}
          >
            <h6 style={{ margin: 0 }}>
              Edit
              <i className='fa fa-pencil float-end' aria-hidden='true'></i>
            </h6>
          </div>

          <div
            className='list-group-item list-group-item-action pointer'
            onClick={() => {
              onToggleProp(item, 'starred');
              handleShowMenu();
            }}
          >
            <h6 style={{ margin: 0 }}>
              Star
              <div className='float-end'>
                <Star className='yellow' starred={item.starred} />
              </div>
            </h6>
          </div>

          <div
            className='list-group-item list-group-item-action pointer'
            onClick={() => {
              onToggleProp(item, 'isPublic');
              handleShowMenu();
            }}
          >
            <h6 style={{ margin: 0 }}>
              Public
              <div className='float-end'>
                <Toggle toggled={item.isPublic} />
              </div>
            </h6>
          </div>

          {share && (
            <div
              className='list-group-item list-group-item-action pointer'
              onClick={() => {
                onToggleShareForm();
                handleShowMenu();
              }}
            >
              <h6 style={{ margin: 0 }}>
                Share
                <i
                  className='fa fa-share-alt float-end'
                  aria-hidden='true'
                  style={{ marginTop: 2 }}
                ></i>
              </h6>
            </div>
          )}

          <div
            className='list-group-item list-group-item-action pointer'
            onClick={() => onDelete(item)}
          >
            <h6 style={{ margin: 0, color: 'red' }}>
              Delete
              <i
                className='fa fa-trash-o float-end'
                aria-hidden='true'
                style={{ marginTop: 2 }}
              ></i>
            </h6>
          </div>
        </div>
      )}
    </>
  );
};

export default CardEllipsisMenu;
