const PlayStop = ({ user, isPlaying, onToggle }) => {
  let classes = 'fa fa-2x fa-play-circle-o'
  if (isPlaying) classes = 'fa fa-2x fa-stop-circle-o'
  return (
    <i
      onClick={onToggle}
      className={classes}
      style={
        user ? { cursor: 'pointer', color: 'inherit' } : { color: 'inherit' }
      }
      aria-hidden='true'
    ></i>
  )
}

export default PlayStop
