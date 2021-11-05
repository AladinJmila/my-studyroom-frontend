const Toggle = ({ toggled, onToggle }) => {
  const classes = toggled
    ? 'ms-2 fa fa-toggle-on pointer'
    : 'ms-2 fa fa-toggle-off pointer';
  return <i onClick={onToggle} className={classes} aria-hidden='true'></i>;
};

export default Toggle;
