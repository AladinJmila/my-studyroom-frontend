import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import HeaderCard from '../common/HeaderCard';
import NotesForm from './NotesForm';
import NotesCard from './NotesCard';
import SortCard from '../common/SortCard';
import { BeatLoader } from 'react-spinners';
import {
  loadNotes,
  patchNote,
  deleteNote,
  toggleNoteProp,
  setSelectedNote,
} from '../store/apps/notesActions';
import {
  updateSubjectItemsCount,
  updateSubjectCheckedItemsCount,
} from '../store/apps/subjectsActions';

const Notes = () => {
  const [showForm, setShowForm] = useState(false);
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  });

  const dispatch = useDispatch();
  const notes = useSelector(state => state.apps.notes.list);
  const { selectedSubject } = useSelector(state => state.apps.subjects);
  const numOfNotes = useSelector(
    state =>
      state.ui.notesPerSubject[`${selectedSubject?.name}`] ||
      state.ui.notesPerSubject['All Subjects']
  );
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.apps.notes);

  useEffect(() => {
    dispatch(loadNotes());
  }, []);

  const handleDelete = note => {
    dispatch(deleteNote(note._id));
    dispatch(updateSubjectItemsCount(note, 'Notes', 'delete'));
  };

  const handleNoteSelect = note => {
    dispatch(setSelectedNote(note));
    handleShowForm();
  };

  const onSort = sortTarget => {
    setSortTarget(sortTarget);
  };

  const handleToggleProp = (note, property) => {
    const index = notes.indexOf(note);
    const noteToUpdate = { ...notes[index] };
    noteToUpdate[property] = !noteToUpdate[property];
    const update = { [property]: noteToUpdate[property] };

    dispatch(patchNote(note._id, update));
    dispatch(toggleNoteProp(note._id, property));
    if (property === 'isChecked')
      dispatch(
        updateSubjectCheckedItemsCount(note.subject._id, 'Notes', update)
      );
  };

  const handleShowForm = () => {
    setShowForm(showForm ? false : true);
  };

  const filtered =
    selectedSubject && selectedSubject._id
      ? notes.filter(n => n.subject._id === selectedSubject._id)
      : notes;

  const sorted = _.orderBy(filtered, [sortTarget.path], [sortTarget.order]);

  return (
    <>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={numOfNotes}
          item='Notes'
          onClick={handleShowForm}
          showForm={showForm}
        />
        <SortCard sortTarget={sortTarget} onSort={onSort} checkedName='Noted' />
        {showForm && <NotesForm user={user} toggleShowForm={handleShowForm} />}
        {/* deleted from from in case an error coccurs later notes={notes} */}
      </div>

      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {sorted &&
            sorted.map(note => (
              <NotesCard
                user={user}
                key={note._id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleNoteSelect}
                onToggleProp={handleToggleProp}
              />
            ))}
        </>
      )}
    </>
  );
};

export default Notes;
