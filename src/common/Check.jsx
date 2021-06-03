const Check = ({ isChecked, onCheck }) => {
  let classes = 'fa fa-lg fa-circle-thin'
  if (isChecked) classes = 'fa fa-lg fa-check-circle'
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
