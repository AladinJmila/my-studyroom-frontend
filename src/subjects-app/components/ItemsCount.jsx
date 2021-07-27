const ItemsCount = ({
  name,
  condition,
  itemsCount,
  checkedItemsCount,
  publicItemsCount,
}) => {
  return (
    <>
      {condition
        ? Boolean(itemsCount) && (
            <p style={{ margin: 2 }}>
              {name}:
              <span className='float-end'>
                {Boolean(checkedItemsCount) && checkedItemsCount + '/'}
                {itemsCount}
              </span>
            </p>
          )
        : Boolean(publicItemsCount) && (
            <p style={{ margin: 2 }}>
              {name}:<span className='float-end'>{publicItemsCount}</span>
            </p>
          )}{' '}
    </>
  )
}

export default ItemsCount
