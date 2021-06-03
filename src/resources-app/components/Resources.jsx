import _ from 'lodash'
import { useState, useEffect } from 'react'
import {
  deleteResource,
  getResources,
  saveResource,
} from './../../services/resourcesService'
import SortResources from './SortResources'
import HeaderCard from '../../common/HeaderCard'
import ResourcesForm from './ResourcesForm'
import ResourcesCard from './ResourcesCard'

function Resources({ user, selectedSubject, setAllResources }) {
  const [resources, setResources] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedResource, setSelectedResource] = useState()
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  })

  useEffect(async () => {
    const { data: resources } = await getResources()
    setResources(resources)
    setAllResources(resources)
  }, [])

  const handleDelete = async resource => {
    const updatedResources = resources.filter(r => r._id !== resource._id)
    setResources(updatedResources)
    setAllResources(updatedResources)

    await deleteResource(resource._id)
  }

  const handleResourceSelect = resource => {
    setSelectedResource(resource)
    handleShowForm()
  }

  const onSort = sortTarget => {
    setSortTarget(sortTarget)
  }

  const handleStatus = (resource, status) => {
    const newResources = [...resources]

    let cardStatus = ''
    let cardClass = ''
    let bodyClass = ''

    switch (status) {
      case 'initialize': {
        cardStatus = 'initialize'
        cardClass = 'card mb-1'
        bodyClass = 'card-body'
        break
      }
      case 'inProgress': {
        cardStatus = 'inProgress'
        cardClass = 'card border-primary mb-1'
        bodyClass = 'card-body text-primary'
        break
      }
      case 'completed': {
        cardStatus = 'completed'
        cardClass = 'card border-success mb-1'
        bodyClass = 'card-body text-success'
      }
    }
    const index = newResources.indexOf(resource)
    newResources[index].status = { cardStatus, cardClass, bodyClass }
    setResources(newResources)
  }

  const handleToggleProp = async (resource, property) => {
    const newResources = [...resources]
    const index = newResources.indexOf(resource)
    newResources[index][property] = !newResources[index][property]

    const updatedResource = { ...newResources[index] }
    updatedResource.subjectId = updatedResource.subject._id
    delete updatedResource.subject
    delete updatedResource.__v

    await saveResource(updatedResource)

    setResources(newResources)
    setAllResources(newResources)
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
          setResources={setResources}
          showForm={handleShowForm}
          selectedResource={selectedResource}
          setSelectedResource={setSelectedResource}
          setAllResources={setAllResources}
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
          onSetStatus={handleStatus}
        />
      ))}
    </>
  )
}

export default Resources
