import _ from 'lodash'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SortResources from './SortResources'
import HeaderCard from '../../common/HeaderCard'
import ResourcesForm from './ResourcesForm'
import ResourcesCard from './ResourcesCard'
import {
  loadResources,
  patchResource,
  deleteResource,
  setSelectedResource,
  toggleResourceProp,
  toggleResourceStatus,
} from './../../store/apps/resourcesActions'

function Resources() {
  const [showForm, setShowForm] = useState(false)
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  })

  const dispatch = useDispatch()
  const resources = useSelector(state => state.apps.resources.list)
  const selectedSubject = useSelector(
    state => state.apps.subjects.selectedSubject
  )
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(loadResources())
  }, [])

  const handleDelete = resource => {
    dispatch(deleteResource(resource._id))
  }

  const handleResourceSelect = resource => {
    dispatch(setSelectedResource(resource))
    handleShowForm()
  }

  const onSort = sortTarget => {
    setSortTarget(sortTarget)
  }

  const handleToggleStatus = (resource, status) => {
    const index = resources.indexOf(resource)
    const resourceToUpdate = { ...resources[index] }
    console.log(resourceToUpdate)
    resourceToUpdate.status = !resourceToUpdate.status ? status : ''
    const update = { status }
    console.log(resourceToUpdate)

    dispatch(patchResource(resource._id, update))
    dispatch(toggleResourceStatus(resource._id, status))
  }

  const handleToggleProp = (resource, property) => {
    const index = resources.indexOf(resource)
    const resourceToUpdate = { ...resources[index] }
    resourceToUpdate[property] = !resourceToUpdate[property]
    const update = { [property]: resourceToUpdate[property] }

    dispatch(patchResource(resource._id, update))
    dispatch(toggleResourceProp(resource._id, property))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  const filtered =
    selectedSubject && selectedSubject._id
      ? resources.filter(r => r.subject._id === selectedSubject._id)
      : resources

  const sorted = _.orderBy(filtered, [sortTarget.path], [sortTarget.order])

  return (
    <>
      <HeaderCard
        user={user}
        count={sorted.length}
        item='Resources'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <ResourcesForm
          user={user}
          resources={resources}
          toggleShowForm={handleShowForm}
        />
      )}
      <table className='table'>
        <SortResources onSort={onSort} sortTarget={sortTarget} />
      </table>
      {sorted.map(resource => (
        <ResourcesCard
          user={user}
          key={resource._id}
          resource={resource}
          onToggleProp={handleToggleProp}
          onDelete={handleDelete}
          onEdit={handleResourceSelect}
          onToggleStatus={handleToggleStatus}
        />
      ))}
    </>
  )
}

export default Resources
