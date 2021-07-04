import { useState } from 'react'
import Toggle from './Toggle'
import Star from './Star'

const CardEllipsisMenu = ({ item, onEdit, onToggleProp, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)

  const handleShowMenu = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true)
  }

  return (
    <>
      <i
        className='fa fa-lg fa-ellipsis-h'
        style={{ cursor: 'pointer', verticalAlign: 'top' }}
        aria-hidden='true'
        onClick={handleShowMenu}
      ></i>
      {showMenu && (
        <div
          className='list-group float-right'
          style={{
            right: 10,
            minWidth: 100,
            position: 'absolute',
            float: 'right',
            zIndex: 10,
          }}
        >
          <div
            className='list-group-item list-group-item-action pointer'
            onClick={() => {
              onEdit(item)
              handleShowMenu()
            }}
          >
            <h6 style={{ margin: 0 }}>
              Edit
              <i
                className='fa fa-pencil float-right'
                style={{ cursor: 'pointer' }}
                aria-hidden='true'
              ></i>
            </h6>
          </div>
          {item.url && (
            <div className='list-group-item list-group-item-action pointer'>
              <h6 style={{ margin: 0, color: '#007BFF' }}>
                Link
                <a
                  href={item.url}
                  rel='noreferrer'
                  target='_blank'
                  className='card-link float-right'
                >
                  <i className='fa fa-external-link' aria-hidden='true'></i>
                </a>
              </h6>
            </div>
          )}
          <div
            className='list-group-item list-group-item-action pointer'
            onClick={() => {
              onToggleProp(item, 'isPublic')
              handleShowMenu()
            }}
          >
            <h6 style={{ margin: 0 }}>
              Public
              <div className='float-right'>
                <Toggle toggled={item.isPublic} />
              </div>
            </h6>
          </div>
          <div
            className='list-group-item list-group-item-action pointer'
            onClick={() => {
              onToggleProp(item, 'starred')
              handleShowMenu()
            }}
          >
            <h6 style={{ margin: 0 }}>
              Star
              <div className='float-right'>
                <Star className='yellow' starred={item.starred} />
              </div>
            </h6>
          </div>

          <div
            className='list-group-item list-group-item-action pointer'
            onClick={() => onDelete(item)}
          >
            <h6 style={{ margin: 0, color: 'red' }}>
              Delete
              <i
                className='fa fa-trash-o float-right'
                aria-hidden='true'
                style={{ marginTop: 2 }}
              ></i>
            </h6>
          </div>
        </div>
      )}
    </>
  )
}

export default CardEllipsisMenu
