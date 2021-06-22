import { useEffect } from 'react'

const SideBar = ({ name, icon, show, count, setShow }) => {
  const handleToggleColumn = () => {
    show = show ? false : true
    setShow(show)
  }

  let minWidth

  const styles = {
    minWidth: minWidth,
    maxWidth: 160,
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    margin: '0 5px',
    // border: '1px solid rgb(52, 58, 64)',
  }

  if (window.innerWidth < 500 && count) {
    styles.margin = 0
    styles.display = 'none'
  } else {
    styles.minWidth = show ? 40 : 160
  }

  useEffect(() => {
    !count ? setShow(false) : setShow(true)
  }, [count])

  return (
    <div
      className='float-left side-bar center'
      style={styles}
      onClick={handleToggleColumn}
    >
      <i
        className={
          show ? `fa fa-${icon} fa-2x mt-2` : `fa fa-${icon} fa-4x mt-2`
        }
        aria-hidden='true'
      ></i>
      <br />
      <i
        className={
          show
            ? 'fa fa-angle-double-left fa-2x mt-4 '
            : 'fa fa-angle-double-right fa-2x mt-5 '
        }
        aria-hidden='true'
      ></i>
      {!show && (
        <div>
          <h2
            className='rotate-title-90'
            style={{
              textAlign: 'left',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </h2>
          <h3 style={{ textAlign: 'center', marginTop: 70 }}>{count}</h3>
        </div>
      )}
    </div>
  )
}

export default SideBar
