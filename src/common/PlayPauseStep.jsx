const PlayPauseStep = ({
  user,
  play,
  onToggle,
  onStepBackward,
  onStepForward,
}) => {
  let classes = 'fa fa-play'
  if (play) classes = 'fa fa-pause'
  const iconStyle = user
    ? { cursor: 'pointer', color: 'inherit' }
    : { color: 'inherit' }
  return (
    <div>
      <i
        onClick={onStepBackward}
        className='fa fa-step-backward pe-3'
        style={iconStyle}
        aria-hidden='true'
      ></i>
      &nbsp;
      <i
        onClick={onToggle}
        className={classes}
        style={iconStyle}
        aria-hidden='true'
      ></i>
      &nbsp;
      <i
        onClick={onStepForward}
        className='fa fa-step-forward ps-3'
        style={iconStyle}
        aria-hidden='true'
      ></i>
    </div>
  )
}

export default PlayPauseStep
