const Toggle = ({ toggled, onToggle }) => {
  let classes = 'ms-2 fa  fa-toggle-off'
  if (toggled) classes = 'ms-2 fa  fa-toggle-on'
  return (
    <i
      onClick={onToggle}
      className={classes}
      style={{ cursor: 'pointer' }}
      aria-hidden='true'
    ></i>
  )
}

export default Toggle
