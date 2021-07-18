const Input = ({ name, label, required, error, ...rest }) => {
  return (
    <div className='form-group mb-3'>
      <label htmlFor={name}>
        {required && <span className='required'>*</span>} {label}
      </label>
      <input {...rest} id={name} name={name} className='form-control' />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  )
}

export default Input
