import { useState } from 'react';
import { useSelector } from 'react-redux';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import AudioNotesCard from './AudioNotesCard';
import AudioNotesForm from './AudioNotesForm';

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false);
  const { user } = useSelector(state => state.auth);

  const handleShowForm = () => {
    setShowFrom(showForm ? false : true);
  };

  const audioNotes = [
    {
      subject: { name: 'sbaladin', _id: '5434646' },
      group: { name: 'graladin', _id: '57612313' },
      title: 'taladin',
      track: { duration: 23, url: 'https://www.some.url' },
      creatorId: '60b919d916d48a00150b30fb',
      reps: 3,
      isChecked: false,
      starred: false,
      isPubplic: false,
    },
    {
      subject: { name: 'sbaladin', _id: '5434646' },
      group: { name: 'graladin', _id: '57612313' },
      title: 'taladin',
      track: { duration: 23, url: 'https://www.some.url' },
      creatorId: '60b919d916d48a00150b30fb',
      reps: 3,
      isChecked: false,
      starred: false,
      isPubplic: false,
    },
    {
      subject: { name: 'sbaladin', _id: '5434646' },
      group: { name: 'graladin', _id: '57612313' },
      title: 'taladin',
      track: { duration: 23, url: 'https://www.some.url' },
      creatorId: '60b919d916d48a00150b30fb',
      reps: 3,
      isChecked: false,
      starred: false,
      isPubplic: false,
    },
  ];

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
      {audioNotes &&
        audioNotes.map(audioNote => (
          <AudioNotesCard user={user} audioNote={audioNote} />
        ))}
    </>
  );
};

export default AudioNotes;
