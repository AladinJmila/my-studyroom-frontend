const SideBar = ({ name, icon, show, setShow }) => {
  const handleToggleColumn = () => {
    show = show ? false : true
    setShow(show)
  }
  const minWidth = show ? 30 : 110

  return (
    <div
      className='float-left side-bar mr-2'
      style={{
        minWidth: minWidth,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      }}
    >
      <i
        className={
          show ? `fa fa-${icon} fa-2x mt-2` : `fa fa-${icon} fa-4x mt-2 ml-4`
        }
        aria-hidden='true'
      ></i>
      <br />
      <i
        style={{ cursor: 'pointer' }}
        onClick={handleToggleColumn}
        className={
          show
            ? 'fa fa-angle-double-left fa-2x mt-4 ml-1'
            : 'fa fa-angle-double-right fa-2x mt-1 ml-5'
        }
        aria-hidden='true'
      ></i>
      {!show && <h2 className='rotate-90'>{name}</h2>}
    </div>
  )
}

export default SideBar
