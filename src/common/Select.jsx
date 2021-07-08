const Select = ({ name, label, options, defaultSelected, error, ...rest }) => {
  return (
    <div className='form-group mb-3'>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className='form-control'>
        <option
          value={
            defaultSelected?.name === 'All Subjects'
              ? ''
              : defaultSelected?._id || defaultSelected?.key
          }
        >
          {defaultSelected?.name === 'All Subjects'
            ? ''
            : defaultSelected?.name || defaultSelected?.content}
        </option>
        {options.map(option => (
          <option
            key={option._id || option.key}
            value={option._id || option.name || option.content}
          >
            {option.name || option.content}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  )
}

export default Select
