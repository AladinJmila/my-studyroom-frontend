const Select = ({ name, label, required, options, error, ...rest }) => {
  return (
    <div className='form-group mb-3'>
      <label htmlFor={name}>
        {required && <span className='required'>*</span>} {label}
      </label>
      <select name={name} id={name} {...rest} className='form-select'>
        <option value=''></option>
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
