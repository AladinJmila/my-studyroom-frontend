const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className='form-control'>
        <option value=''></option>
        {options.map(option => (
          <option
            key={option.id || option._id || option.key}
            value={option.id || option._id || option.name || option.content}
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
