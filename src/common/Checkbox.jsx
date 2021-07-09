const Checkbox = ({ label, name, ...rest }) => {
  return (
    <div className='form-check mb-2'>
      <input
        {...rest}
        id={name}
        name={name}
        className='form-check-input'
        type='checkbox'
      />
      <label className='form-check-label' htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
