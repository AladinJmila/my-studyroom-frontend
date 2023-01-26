import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import { loadAudioNotesGroups } from '../store/apps/audioNotesActions';
import AudioNotesForm from './AudioNotesForm';
import AudioNotesGroup from './AudioNotesGroup';

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false);
  const { user } = useSelector(state => state.auth);
  const groups = useSelector(state => state.apps.audioNotes.groups);
  const dispatch = useDispatch();

  const handleShowForm = () => {
    setShowFrom(showForm ? false : true);
  };

  useEffect(() => {
    dispatch(loadAudioNotesGroups());
  }, []);

  return (
    <>
      <HeaderCard
        user={user}
        count={0}
        item='AudioNotes'
        onClick={handleShowForm}
        showForm={showForm}
      />
      <SortCard sortTarget={null} onSort={null} checkedName='Checked' />
      {showForm && (
        <AudioNotesForm user={user} handleShowForm={handleShowForm} />
      )}
      {groups &&
        groups.map(group => (
          <AudioNotesGroup key={group._id} user={user} group={group} />
        ))}
    </>
  );
};

export default AudioNotes;
