const Range = ({ label, name, min, max, value, ...rest }) => {
  return (
    <div className='col'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <b className='float-end'>{value}</b>
      <input
        {...rest}
        id={name}
        name={name}
        min={min}
        max={max}
        value={value}
        type='range'
        className='form-range'
      />
    </div>
  )
}

export default Range
