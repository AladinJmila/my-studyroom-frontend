const PlayPauseStep = ({
  user,
  play,
  onToggle,
  onStepBackward,
  onStepForward,
}) => {
  let classes = 'fa fa-play'
  if (play) classes = 'fa fa-pause'
  return (
    <div>
      <i
        onClick={onStepBackward}
        className='fa fa-step-backward pe-4'
        style={
          user ? { cursor: 'pointer', color: 'inherit' } : { color: 'inherit' }
        }
        aria-hidden='true'
      ></i>
      <i
        onClick={onToggle}
        className={classes}
        style={
          user ? { cursor: 'pointer', color: 'inherit' } : { color: 'inherit' }
        }
        aria-hidden='true'
      ></i>
      <i
        onClick={onStepForward}
        className='fa fa-step-forward ps-4'
        style={
          user ? { cursor: 'pointer', color: 'inherit' } : { color: 'inherit' }
        }
        aria-hidden='true'
      ></i>
    </div>
  )
}

export default PlayPauseStep
