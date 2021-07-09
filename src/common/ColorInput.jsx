const ColorInput = ({ label, name, ...rest }) => {
  return (
    <div className='form-group col-4'>
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        type='color'
        className='form-control'
      />
    </div>
  )
}

export default ColorInput
