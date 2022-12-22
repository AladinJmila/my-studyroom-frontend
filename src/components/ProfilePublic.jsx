import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubjectsCardStandalone from '../subjects-app/components/SubjectsCardStandalone';
import {
  loadOneUserPublicSubjects,
  loadOneUserUpvotedSubjects,
} from '../store/apps/subjectsActions';
import { useParams } from 'react-router-dom';
import plansAndProgress from '../../src/static/images/plansAndProgress.png';

const ProfilePublic = () => {
  const { creatorName, creatorId } = useParams();
  const usersPublicsubjects = useSelector(
    state => state.apps.subjects.usersPublic[creatorId]
  );

  const usersUpvotedSubjects = useSelector(
    state => state.apps.subjects.usersUpvoted[creatorId]
  );
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOneUserPublicSubjects(creatorId));
    dispatch(loadOneUserUpvotedSubjects(creatorId));
  }, []);

  return (
    <div
      className='full-height'
      style={{ width: '80%', position: 'absolute', left: '10%' }}
    >
      <h2 className='mt-5 text-center'>
        Progress Tracker{' '}
        <span style={{ fontSize: '1.5rem' }}>(in progress)</span>
      </h2>
      <img src={plansAndProgress} className='mt-4' style={{ width: '100%' }} />
      <h2 className='mt-5 text-center'>{creatorName}</h2>
      <div className='row'>
        <div className='col-6'>
          <h2 className='mt-5 text-center'>My Public Subjects</h2>
          <div className='pin-container' style={{ height: 1100 }}>
            {usersPublicsubjects?.map(subject => (
              <SubjectsCardStandalone
                key={subject._id}
                user={user}
                subject={subject}
                showDetails
              />
            ))}
          </div>
        </div>
        <div className='col-6'>
          <h2 className='mt-5 text-center'>Watchlist</h2>
          <div className='pin-container'>
            {usersUpvotedSubjects?.map(subject => (
              <SubjectsCardStandalone
                key={subject._id}
                user={user}
                subject={subject}
                showDetails
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePublic;
