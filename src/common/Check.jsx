const Check = ({ isChecked, onCheck }) => {
  let classes = 'fa fa-lg fa-circle-thin mt-2'
  if (isChecked) classes = 'fa fa-lg fa-check-circle mt-2'
  return (
    <i
      onClick={onCheck}
      className={classes}
      style={{ cursor: 'pointer' }}
      aria-hidden='true'
    ></i>
  )
}

export default Check
