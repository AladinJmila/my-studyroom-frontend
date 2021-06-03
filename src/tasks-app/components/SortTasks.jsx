import { backgroundOpacity } from './../../services/stylesService'

const columns = [
  {
    path: 'checked',
    label: (
      <div style={{ cursor: 'pointer' }}>
        <i className='fa fa-sort' aria-hidden='true'></i> Checked
      </div>
    ),
  },
  {
    path: 'subject.name',
    label: (
      <div style={{ cursor: 'pointer' }}>
        <i className='fa fa-sort' aria-hidden='true'></i> Subject
      </div>
    ),
  },
  {
    path: 'repeat',
    label: (
      <div style={{ cursor: 'pointer' }}>
        <i className='fa fa-sort' aria-hidden='true'></i>{' '}
        <i className='fa fa-repeat' aria-hidden='true'></i>
      </div>
    ),
  },
]

const SortTasks = ({ onSort, sortTarget }) => {
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
    <thead style={backgroundOpacity}>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            onClick={() => handleSort(column.path)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default SortTasks
