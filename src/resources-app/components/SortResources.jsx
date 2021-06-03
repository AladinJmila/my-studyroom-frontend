import { backgroundOpacity } from './../../services/stylesService'

const SortResources = ({ sortTarget, onSort }) => {
  const targets = [
    {
      path: 'subject.name',
      label: (
        <div style={{ cursor: 'pointer' }}>
          <i className='fa fa-sort' aria-hidden='true'></i> Subject
        </div>
      ),
    },
    { key: 'hollow1' },
    { key: 'hollow2' },
    { key: 'hollow3' },
    {
      path: 'status.cardStatus',
      label: (
        <div style={{ cursor: 'pointer' }}>
          <i className='fa fa-sort' aria-hidden='true'></i> Status
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
    <thead style={backgroundOpacity}>
      <tr>
        {targets.map(target => (
          <th
            key={target.path || target.key}
            onClick={() => handleSort(target.path)}
          >
            {target.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default SortResources
