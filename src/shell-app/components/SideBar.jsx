import { useEffect } from 'react'

const SideBar = ({ name, icon, show, count, setShow }) => {
  const handleToggleColumn = () => {
    show = show ? false : true
    setShow(show)
  }
  const minWidth = show ? 40 : 120

  useEffect(() => {
    // if (!count) setShow(false)
    !count ? setShow(false) : setShow(true)
  }, [count])

  return (
    <div
      className='float-left side-bar mr-2'
      style={{
        minWidth: minWidth,
        maxWidth: 120,
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
      }}
      onClick={handleToggleColumn}
    >
      <i
        className={
          show ? `fa fa-${icon} fa-2x mt-2` : `fa fa-${icon} fa-4x mt-2 ml-4`
        }
        aria-hidden='true'
      ></i>
      <br />
      <i
        className={
          show
            ? 'fa fa-angle-double-left fa-2x mt-4 ml-1'
            : 'fa fa-angle-double-right fa-2x mt-1 ml-5'
        }
        aria-hidden='true'
      ></i>
      {!show && (
        <div>
          <h2 className='rotate-90' style={{ textAlign: 'left' }}>
            {name}
          </h2>
          <h3 style={{ textAlign: 'center', marginTop: 70 }}>{count}</h3>
        </div>
      )}
    </div>
  )
}

export default SideBar
