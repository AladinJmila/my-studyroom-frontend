import { useEffect } from 'react'
import { useSelector } from 'react-redux'
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

  const { selectedSubject } = useSelector(state => state.apps.subjects)

  useEffect(() => {
    !Boolean(count) && setShow(false)
  }, [selectedSubject])

  useEffect(() => {
    if (window.innerWidth < 500 && count) {
      setShow(!Boolean(count) ? false : true)
    }
  }, [count])

  const navigateToItem = () => {
    itemRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
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
    case 'Timer':
      bigIcon = iconSB
      smallIcon = iconSS
      break
  }

  let minWidth
  let maxWidth

  const styles = {
    minWidth: minWidth,
    maxWidth: maxWidth,
    height: '100%',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    margin: '0 5px',
    padding: '10px 5px',
    positon: 'relative',
  }

  if (window.innerWidth < 500 && count) {
    styles.margin = 0
    styles.display = 'none'
  } else {
    styles.minWidth = show ? 50 : 140
    styles.maxWidth = show ? 50 : 140
  }

  return (
    <div
      className='float-start folding-bar center relative'
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
        <img className='folding-bar-small-icon' src={smallIcon} />
      ) : (
        <img className='folding-bar-big-icon' src={bigIcon} />
      )}
      <br />
      <i
        className={
          show
            ? 'fa fa-angle-double-left fa-2x mt-4 '
            : 'fa fa-angle-double-right fa-2x mt-4 '
        }
        aria-hidden='true'
      ></i>
      {!show && (
        <div>
          {name === 'Timer' ||
          name === 'AudioNotes (planned)' ||
          name === 'VisualNotes (planned)' ? (
            <div
              className='total-items-folding-bar'
              style={{ visibility: 'hidden' }}
            ></div>
          ) : (
            <div className='total-items-folding-bar'>{count}</div>
          )}
          <h2
            className='rotate-title-90'
            style={{
              textAlign: 'left',
              // whiteSpace: 'nowrap',
            }}
          >
            {name}
          </h2>
        </div>
      )}
    </div>
  )
}

export default VerticalFoldingBar
