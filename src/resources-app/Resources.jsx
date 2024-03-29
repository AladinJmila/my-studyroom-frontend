import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCard from '../common/HeaderCard';
import SortCard from '../common/SortCard';
import ResourcesForm from './ResourcesForm';
import ResourcesYoutubeForm from './ResourcesYoutubeForm';
import ResourcesCard from './ResourcesCard';
import { BeatLoader } from 'react-spinners';
import {
  loadResources,
  patchResource,
  deleteResource,
  setSelectedResource,
  toggleResourceProp,
} from '../store/apps/resourcesActions';
import {
  updateSubjectItemsCount,
  updateSubjectCheckedItemsCount,
} from '../store/apps/subjectsActions';

function Resources() {
  const [showForm, setShowForm] = useState(false);
  const [showYoutubeForm, setShowYoutubeForm] = useState(false);
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  });

  const dispatch = useDispatch();
  const resources = useSelector(state => state.apps.resources.list);
  const { selectedSubject } = useSelector(state => state.apps.subjects);
  const numOfResources = useSelector(
    state =>
      state.ui.general.resourcesPerSubject[`${selectedSubject?.name}`] ||
      state.ui.general.resourcesPerSubject['All Subjects']
  );
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.apps.resources);

  useEffect(() => {
    dispatch(loadResources());
  }, []);

  const handleDelete = resource => {
    dispatch(deleteResource(resource._id));
    dispatch(updateSubjectItemsCount(resource, 'Resources', 'delete'));
  };

  const handleResourceSelect = resource => {
    dispatch(setSelectedResource(resource));
    handleShowForm();
  };

  const onSort = sortTarget => {
    setSortTarget(sortTarget);
  };

  const handleToggleProp = (resource, property) => {
    const index = resources.indexOf(resource);
    const resourceToUpdate = { ...resources[index] };
    resourceToUpdate[property] = !resourceToUpdate[property];
    const update = { [property]: resourceToUpdate[property] };

    dispatch(patchResource(resource._id, update));
    dispatch(toggleResourceProp(resource._id, property));
    if (property === 'isChecked')
      dispatch(
        updateSubjectCheckedItemsCount(
          resource.subject._id,
          'Resources',
          update
        )
      );
  };

  const handleShowForm = () => {
    setShowForm(showForm ? false : true);
  };

  const handleShowYoutubeForm = () => {
    setShowYoutubeForm(showYoutubeForm ? false : true);
  };

  const filtered =
    selectedSubject && selectedSubject._id
      ? resources.filter(r => r.subject._id === selectedSubject._id)
      : resources;

  const sorted = _.orderBy(filtered, [sortTarget.path], [sortTarget.order]);

  return (
    <div className='sub-app-body'>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={numOfResources}
          item='Resources'
          onClick={handleShowForm}
          onYoutubeClick={handleShowYoutubeForm}
          showForm={showForm}
          showYoutubeForm={showYoutubeForm}
          youtube
        />
        <SortCard
          sortTarget={sortTarget}
          onSort={onSort}
          checkedName='Processed'
        />
        {showForm && (
          <ResourcesForm user={user} toggleShowForm={handleShowForm} />
        )}
        {showYoutubeForm && (
          <ResourcesYoutubeForm
            user={user}
            toggleShowForm={handleShowYoutubeForm}
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
            sorted.map(resource => (
              <ResourcesCard
                user={user}
                key={resource._id}
                resource={resource}
                onToggleProp={handleToggleProp}
                onDelete={handleDelete}
                onEdit={handleResourceSelect}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default Resources;
