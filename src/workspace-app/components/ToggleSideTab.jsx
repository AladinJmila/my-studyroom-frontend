const ToggleSideTab = ({ show, setShow, label }) => {
  let classes = 'fa fa-angle-double-right fa-2x ms-1'
  if (show) classes = 'fa fa-angle-double-left fa-2x ms-1'

  const handleToggleTab = () => {
    show = show ? false : true
    setShow(show)
  }

  return (
    <div onClick={() => handleToggleTab()} className='side-tab'>
      <i className={classes} aria-hidden='true'></i>
      <h5 className='rotate-label-90'>{label}</h5>
    </div>
  )
}

export default ToggleSideTab
