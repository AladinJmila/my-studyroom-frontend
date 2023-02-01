import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import iconTB from '../../static/images/icons/T-M.png';
import iconTS from '../../static/images/icons/T-S.png';
import iconRB from '../../static/images/icons/R-M.png';
import iconRS from '../../static/images/icons/R-S.png';
import iconNB from '../../static/images/icons/N-M.png';
import iconNS from '../../static/images/icons/N-S.png';
import iconPB from '../../static/images/icons/P-M.png';
import iconPS from '../../static/images/icons/P-S.png';
import iconAB from '../../static/images/icons/A-M.png';
import iconAS from '../../static/images/icons/A-S.png';
import iconVB from '../../static/images/icons/V-M.png';
import iconVS from '../../static/images/icons/V-S.png';
import iconSB from '../../static/images/icons/S-M.png';
import iconSS from '../../static/images/icons/S-S.png';
import { appName } from '../servecies/appsInfo';

const VerticalFoldingBar = ({ name, show, count, setShow, itemRef }) => {
  const handleToggleColumn = () => {
    show = show ? false : true;
    setShow(show);
  };

  const { selectedSubject } = useSelector(state => state.apps.subjects);

  useEffect(() => {
    !Boolean(count) && setShow(false);
  }, [selectedSubject]);

  useEffect(() => {
    if (window.innerWidth < 500 && count) {
      setShow(!Boolean(count) ? false : true);
    }
  }, [count]);

  const navigateToItem = () => {
    itemRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
  };

  let bigIcon;
  let smallIcon;

  switch (name) {
    case appName.sessionsAndTimer:
      bigIcon = iconSB;
      smallIcon = iconSS;
      break;
    case appName.tasks:
      bigIcon = iconTB;
      smallIcon = iconTS;
      break;
    case appName.resources:
      bigIcon = iconRB;
      smallIcon = iconRS;
      break;
    case appName.studyNotes:
      bigIcon = iconNB;
      smallIcon = iconNS;
      break;
    case appName.practiceNotes:
      bigIcon = iconPB;
      smallIcon = iconPS;
      break;
    case appName.audioNotes:
      bigIcon = iconAB;
      smallIcon = iconAS;
      break;
    case appName.visualNotes:
      bigIcon = iconVB;
      smallIcon = iconVS;
      break;
  }

  return (
    <div
      className={`vertical-folding-bar ${show && 'unfold'}`}
      onClick={() => {
        handleToggleColumn();
        if (show) {
          setTimeout(() => {
            navigateToItem();
          }, 200);
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
        <>
          {name === appName.sessionsAndTimer || name === appName.visualNotes ? (
            <div
              className='folding-bar-items-count'
              style={{ visibility: 'hidden' }}
            ></div>
          ) : (
            <div className='folding-bar-items-count'>{count}</div>
          )}
          <h2>{name}</h2>
        </>
      )}
    </div>
  );
};

export default VerticalFoldingBar;
