import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import SubjectsCardStandalone from '../subjects-app/components/SubjectsCardStandalone';
import {
  loadSubjects,
  loadUpvotedSubjects,
} from '../store/apps/subjectsActions';
import plansAndProgress from '../../src/static/images/plansAndProgress.png';
import dailyStatus from '../../src/static/images/dailyStatus.png';
import Calendar from '../stats-app/components/Calendar';
import { loadVizData } from './../store/apps/timerRecordsActions';
import DailyActivity from '../stats-app/components/DailyActivity';
import YearlyActivityBar from '../stats-app/components/YearlyActivityBar';
import YearlyActivityPie from '../stats-app/components/YearlyActivityPie';
import YearlyActivity from '../stats-app/components/YearlyActivity';
import Activities from '../stats-app/components/Activities';

const Profile = () => {
  const subjects = useSelector(state => state.apps.subjects.list);
  const upvotedSubjects = useSelector(state => state.apps.subjects.upvoted);
  const { loading } = useSelector(state => state.apps.subjects);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSubjects());
    dispatch(loadUpvotedSubjects());
    dispatch(loadVizData());
  }, []);

  // console.log(plansAndProgress)

  return (
    <div
      className='full-height'
      style={{ width: '80%', position: 'absolute', left: '10%' }}
    >
      <h2 className='mt-5 text-center'>Progress Tracker</h2>
      <Calendar />
      <h2 className='mt-5 text-center'>Daily Stats</h2>
      <DailyActivity />
      <Activities />
      <h2 className='mt-5 text-center'>Yearly Stats</h2>
      <YearlyActivity />

      <div className='row'>
        <div className='col-6'>
          <h2 className='mt-5 text-center'>My Subjects</h2>
          {loading ? (
            <div className='center'>
              <BeatLoader size={50} color={'#6A7475'} loading={loading} />
            </div>
          ) : (
            <div className='pin-container' style={{ height: 1100 }}>
              {subjects.map(subject => (
                <SubjectsCardStandalone
                  key={subject._id}
                  user={user}
                  subject={subject}
                  showDetails
                />
              ))}
            </div>
          )}
        </div>
        <div className='col-6'>
          <h2 className='mt-5 text-center'>Watchlist</h2>
          {loading ? (
            <div className='center'>
              <BeatLoader size={50} color={'#6A7475'} loading={loading} />
            </div>
          ) : (
            <div className='pin-container'>
              {upvotedSubjects.map(subject => (
                <SubjectsCardStandalone
                  key={subject._id}
                  user={user}
                  subject={subject}
                  showDetails
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
