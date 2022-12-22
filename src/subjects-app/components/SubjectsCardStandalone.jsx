import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import 'react-circular-progressbar/dist/styles.css';
import Star from '../../common/Star';
import {
  backgroundOpacity,
  mainContentStyle,
} from '../../services/stylesService';
import {
  upvoteSubject,
  toggleSubjectUpvote,
} from '../../store/apps/subjectsActions';
import ProgressStats from './ProgressStats';
import ItemsCount from './ItemsCount';
import SubjectsCardFooter from './SubjectsCardFooter';
import { setSelectedSubject } from './../../store/apps/subjectsActions';

const SubjectsCardStandalone = ({
  user,
  subject,
  showProgress,
  showDetails,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tasksPercentage =
    Math.round((subject.numberOfCheckedTasks / subject.numberOfTasks) * 100) ||
    0;

  const resourcesPercentage =
    Math.round(
      (subject.numberOfCheckedResources / subject.numberOfResources) * 100
    ) || 0;

  const showPrivateInfo = user && user._id === subject.creatorId;

  const handleToggleUpvote = (subject, status) => {
    const update = { upvote: status };

    dispatch(upvoteSubject(subject._id, update));
    dispatch(toggleSubjectUpvote(subject._id, user._id));
  };

  const itemsToDisplay = showPrivateInfo
    ? [
        subject.numberOfTasks,
        subject.numberOfResources,
        subject.numberOfNotes,
        subject.numberOfPracticals,
      ]
    : [
        subject.numberOfPublicTasks,
        subject.numberOfPublicResources,
        subject.numberOfPublicNotes,
        subject.numberOfPublicPracticals,
      ];

  let countOfZeros = 0;
  let gridRowEnd;
  itemsToDisplay.forEach(item => {
    if (item === 0) countOfZeros++;
  });

  switch (countOfZeros) {
    case 0:
      gridRowEnd = 'span 22';
      break;
    case 1:
      gridRowEnd = 'span 20';
      break;
    case 2:
      gridRowEnd = 'span 18';
      break;
    case 3:
      gridRowEnd = 'span 16';
      break;
    case 4:
      gridRowEnd = 'span 13';
      break;

    default:
      gridRowEnd = 'span 39';
      break;
  }

  const handleShowSubjectDetails = () => {
    history.push(`/subjects/${subject._id}`);
    dispatch(setSelectedSubject(subject));
  };

  const cardStyle = {
    ...backgroundOpacity,
    gridRowEnd,
    margin: '15px 10px',
  };

  return (
    <div style={cardStyle} className='card m-2'>
      <div className='card-body'>
        <div className='d-flex flex-row justify-content-between'>
          <h5 className='card-title text-truncate'>
            {subject.name}{' '}
            {showPrivateInfo && subject.starred && (
              <Star className='yellow' starred />
            )}
          </h5>
          <i
            onClick={() => handleShowSubjectDetails(subject)}
            className='fa fa-lg fa-info-circle mt-1 pointer'
            aria-hidden='true'
          ></i>
        </div>

        {showProgress && (
          <ProgressStats
            condition={showPrivateInfo}
            tasksPercentage={tasksPercentage}
            resourcesPercentage={resourcesPercentage}
          />
        )}

        {showDetails && (
          <div className='font-weight-bold' style={mainContentStyle}>
            <ItemsCount
              name='Tasks'
              condition={showPrivateInfo}
              itemsCount={subject.numberOfTasks}
              checkedItemsCount={subject.numberOfCheckedTasks}
              publicItemsCount={subject.numberOfPublicTasks}
            />

            <ItemsCount
              name='Resources'
              condition={showPrivateInfo}
              itemsCount={subject.numberOfResources}
              checkedItemsCount={subject.numberOfCheckedResources}
              publicItemsCount={subject.numberOfPublicResources}
            />

            <ItemsCount
              name='Study Notes'
              condition={showPrivateInfo}
              itemsCount={subject.numberOfNotes}
              checkedItemsCount={subject.numberOfCheckedNotes}
              publicItemsCount={subject.numberOfPublicNotes}
            />

            <ItemsCount
              name='Practice Notes'
              condition={showPrivateInfo}
              itemsCount={subject.numberOfPracticals}
              checkedItemsCount={subject.numberOfCheckedPracticals}
              publicItemsCount={subject.numberOfPublicPracticals}
            />
          </div>
        )}

        <SubjectsCardFooter
          user={user}
          subject={subject}
          onToggleUpvote={handleToggleUpvote}
        />
      </div>
    </div>
  );
};

export default SubjectsCardStandalone;
