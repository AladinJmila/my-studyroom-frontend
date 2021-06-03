const ListGroup = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className='list-group'>
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item.id || item.key}
          className={
            selectedItem === item ? 'list-group-item active' : 'list-group-item'
          }
          style={{ height: 100 }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}

export default ListGroup
