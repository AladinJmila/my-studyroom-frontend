const Toggle = ({ toggled }) => {
  const classes = toggled
    ? 'ms-2 fa fa-toggle-on pointer'
    : 'ms-2 fa fa-toggle-off pointer';
  return <i className={classes} aria-hidden='true'></i>;
};

export default Toggle;
