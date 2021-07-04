import { sortHeadersStyle } from '../../services/stylesService'

const SubjectsSortCard = ({ onSort, sortTarget }) => {
  const columns = [
    {
      path: 'starred',
      label: (
        <div style={{ cursor: 'pointer' }} className='p-2'>
          <i className='fa fa-sort' aria-hidden='true'></i> Starred
        </div>
      ),
    },
    {
      path: 'isPublic',
      label: (
        <div style={{ cursor: 'pointer' }} className='p-2'>
          <i className='fa fa-sort ' aria-hidden='true'></i> Public
        </div>
      ),
    },
  ]

  const handleSort = path => {
    const newSortTarget = { ...sortTarget }
    if (newSortTarget.path === path)
      newSortTarget.order = newSortTarget.order === 'asc' ? 'desc' : 'asc'
    else {
      newSortTarget.path = path
      newSortTarget.order = 'asc'
    }
    onSort(newSortTarget)
  }

  return (
    <div
      className='d-flex flex-row justify-content-between'
      style={sortHeadersStyle}
    >
      {columns.map(column => (
        <div
          key={column.path || column.key}
          onClick={() => handleSort(column.path)}
        >
          {column.label}
        </div>
      ))}
    </div>
  )
}

export default SubjectsSortCard
