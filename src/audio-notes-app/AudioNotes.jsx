import { useState } from 'react';
import { useSelector } from 'react-redux';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import AudioNotesForm from './AudioNotesForm';
import AudioNotesGroup from './AudioNotesGroup';

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false);
  const { user } = useSelector(state => state.auth);

  const handleShowForm = () => {
    setShowFrom(showForm ? false : true);
  };

  const groups = [
    {
      _id: '354a3sd4f3',
      name: 'group 1',
      props: { duration: 412 },
      children: [
        {
          _id: '354a3sd4f3',
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
          _id: '354aa5d4f5f3',
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
          _id: 'adf7as8',
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
      ],
    },
    {
      _id: '7asd97hg',
      name: 'group 2',
      props: { duration: 862 },
      children: [
        {
          _id: '7jfg1h2fg4h',
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
          _id: '157sg48dghw5',
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
          _id: 'fgjh4t8yhj2f1h',
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
      ],
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
      {groups &&
        groups.map(group => <AudioNotesGroup user={user} group={group} />)}
    </>
  );
};

export default AudioNotes;
