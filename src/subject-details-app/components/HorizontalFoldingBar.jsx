import { useEffect } from 'react'
import iconTB from '../../static/images/icons/T-M.png'
import iconTS from '../../static/images/icons/T-S.png'
import iconRB from '../../static/images/icons/R-M.png'
import iconRS from '../../static/images/icons/R-S.png'
import iconNB from '../../static/images/icons/N-M.png'
import iconNS from '../../static/images/icons/N-S.png'
import iconPB from '../../static/images/icons/P-M.png'
import iconPS from '../../static/images/icons/P-S.png'
import iconAB from '../../static/images/icons/A-M.png'
import iconAS from '../../static/images/icons/A-S.png'
import iconVB from '../../static/images/icons/V-M.png'
import iconVS from '../../static/images/icons/V-S.png'
import iconSB from '../../static/images/icons/S-M.png'
import iconSS from '../../static/images/icons/S-S.png'

const VerticalFoldingBar = ({ name, show, count, setShow, itemRef }) => {
  const handleToggleColumn = () => {
    show = show ? false : true
    setShow(show)
  }

  const navigateToItem = () => {
    // console.log(itemRef)
    itemRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      // inline: 'start',
      // inline: 'end',
    })
  }

  let bigIcon
  let smallIcon

  switch (name) {
    case 'Tasks':
      bigIcon = iconTB
      smallIcon = iconTS
      break
    case 'Resources':
      bigIcon = iconRB
      smallIcon = iconRS
      break
    case 'StudyNotes':
      bigIcon = iconNB
      smallIcon = iconNS
      break
    case 'PracticeNotes':
      bigIcon = iconPB
      smallIcon = iconPS
      break
    case 'AudioNotes (planned)':
      bigIcon = iconAB
      smallIcon = iconAS
      break
    case 'VisualNotes (planned)':
      bigIcon = iconVB
      smallIcon = iconVS
      break
    case 'Timer (inProgress)':
      bigIcon = iconSB
      smallIcon = iconSS
      break
  }

  let minHeight
  let maxHeight

  const styles = {
    minHeight: minHeight,
    maxHeight: maxHeight,
    width: '100%',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    margin: '16px 0',
    padding: 20,
    positon: 'relative',
  }

  if (window.innerWidth < 500 && count) {
    styles.margin = 0
    styles.display = 'none'
  } else {
    styles.minHeight = show ? 50 : 130
    styles.maxHeight = show ? 50 : 130
  }

  useEffect(() => {
    if (window.innerWidth < 500 && count) {
      setShow(!count ? false : true)
    }
  }, [count])

  return (
    <div
      className='folding-bar d-flex  align-items-center'
      style={styles}
      onClick={() => {
        handleToggleColumn()
        if (show) {
          setTimeout(() => {
            navigateToItem()
          }, 200)
        }
      }}
    >
      {show ? (
        <img className='folding-bar-small-icon float-end' src={smallIcon} />
      ) : (
        <img className='folding-bar-medium-icon float-end me-4' src={bigIcon} />
      )}
      <br />
      <i
        className={
          show
            ? 'fa fa-angle-double-up fa-2x ms-4 me-4'
            : 'fa fa-angle-double-down fa-2x ms-4 me-4'
        }
        aria-hidden='true'
      ></i>
      {!show && (
        <div className='grow-1 d-flex align-items-center'>
          <div className='mt-0 ms-4 me-4 total-items-folding-bar'>{count}</div>

          <h2
            // className='rotate-title-90'
            style={
              {
                // textAlign: 'left',
                // whiteSpace: 'nowrap',
              }
            }
          >
            {name}
          </h2>
        </div>
      )}
    </div>
  )
}

export default VerticalFoldingBar
