import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import HeaderCard from '../common/HeaderCard';
import PracticalsForm from './PracticalsForm';
import SortCard from '../common/SortCard';
import PracticalsCard from './PracticalsCard';
import { BeatLoader } from 'react-spinners';
import {
  loadPracticals,
  patchPractical,
  deletePractical,
  togglePracticalProp,
  setSelectedPractical,
} from '../store/apps/practicalsActions';
import {
  updateSubjectItemsCount,
  updateSubjectCheckedItemsCount,
} from '../store/apps/subjectsActions';

const Practicals = () => {
  const [showForm, setShowForm] = useState(false);
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  });

  const dispatch = useDispatch();
  const practicals = useSelector(state => state.apps.practicals.list);
  const { selectedSubject } = useSelector(state => state.apps.subjects);
  const numOfPracticals = useSelector(
    state =>
      state.ui.general.practicalsPerSubject[`${selectedSubject?.name}`] ||
      state.ui.general.practicalsPerSubject['All Subjects']
  );
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.apps.practicals);

  useEffect(() => {
    dispatch(loadPracticals());
  }, []);

  const handleDelete = practical => {
    dispatch(deletePractical(practical._id));
    dispatch(updateSubjectItemsCount(practical, 'Practicals', 'delete'));
  };

  const handlePracticalSelect = practical => {
    dispatch(setSelectedPractical(practical));
    handleShowForm();
  };

  const onSort = sortTarget => {
    setSortTarget(sortTarget);
  };

  const handleToggleProp = (practical, property) => {
    const index = practicals.indexOf(practical);
    const practicalToUpdate = { ...practicals[index] };
    practicalToUpdate[property] = !practicalToUpdate[property];
    const update = { [property]: practicalToUpdate[property] };

    dispatch(patchPractical(practical._id, update));
    dispatch(togglePracticalProp(practical._id, property));
    if (property === 'isChecked')
      dispatch(
        updateSubjectCheckedItemsCount(
          practical.subject._id,
          'Practicals',
          update
        )
      );
  };

  const handleShowForm = () => {
    setShowForm(showForm ? false : true);
  };

  const filtered =
    selectedSubject && selectedSubject._id
      ? practicals.filter(m => m.subject._id === selectedSubject._id)
      : practicals;

  const sorted = _.orderBy(filtered, [sortTarget.path], [sortTarget.order]);

  return (
    <>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={numOfPracticals}
          item='Practicals'
          onClick={handleShowForm}
          showForm={showForm}
        />
        <SortCard
          sortTarget={sortTarget}
          onSort={onSort}
          checkedName='Practiced'
        />
        {showForm && (
          <PracticalsForm
            user={user}
            practicals={practicals}
            toggleShowForm={handleShowForm}
          />
        )}
      </div>
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {sorted &&
            sorted.map(practical => (
              <PracticalsCard
                user={user}
                key={practical._id}
                practical={practical}
                onDelete={handleDelete}
                onEdit={handlePracticalSelect}
                onToggleProp={handleToggleProp}
              />
            ))}
        </>
      )}
    </>
  );
};

export default Practicals;
