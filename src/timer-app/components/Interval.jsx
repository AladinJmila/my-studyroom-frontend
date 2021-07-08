import Joi from 'joi-browser'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createInterval } from '../../store/apps/intervalsActions'

const Interval = ({ setHandleSubmit, formEvent }) => {
  const [data, setData] = useState({
    name: '',
    minutes: 0,
    seconds: 0,
    numOfReps: 0,
    popup: false,
    color: '#F192AD',
    isMute: false,
    autoConfirm: false,
  })
  const [errors, setErrors] = useState({})
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    setHandleSubmit(handleSubmit)
  }, [])

  const schema = {
    _id: [Joi.number(), Joi.string()],
    name: Joi.string().required().max(100).label('Name'),
    minutes: Joi.number().integer().min(0).max(90),
    seconds: Joi.number().integer().min(0).max(60),
    numOfReps: Joi.number().integer().min(0).max(100),
    color: Joi.string().max(50).allow(''),
    popup: Joi.boolean(),
    isMute: Joi.boolean(),
    autoConfirm: Joi.boolean(),
  }

  const validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(data, schema, options)
    if (!error) return null

    const newErrors = {}
    for (let item of error.details) newErrors[item.path[0]] = item.message
    return newErrors
  }

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const subSchema = { [name]: schema[name] }
    const { error } = Joi.validate(obj, subSchema)

    return error ? error.details[0].message : null
  }

  const handleSubmit = formEvent => {
    formEvent?.preventDefault()

    const errors = validate()
    setErrors(errors || {})
    if (errors) return

    doSubmit()
  }

  const doSubmit = () => {
    const newData = { ...data }
    newData.userId = user._id

    console.log(newData)
    dispatch(createInterval(newData))
  }

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors }
    const errorMessage = validateProperty(input)
    if (errorMessage) newErrors[input.name] = errorMessage
    else delete newErrors[input.name]

    const newData = { ...data }
    newData[input.name] = input.value
    setData(newData)
    setErrors(newErrors)
  }

  const Input = ({ type, name, label }) => {
    return (
      <div className='form-group col'>
        <label htmlFor={name}>{label}</label>
        <input
          style={{ backgroundColor: data.color, border: 'none' }}
          type={type}
          id={name}
          name={name}
          value={data[name]}
          onChange={handleChange}
          className='form-control'
        />
      </div>
    )
  }

  const intervalStyle = {
    backgroundColor: data.color,
    padding: 10,
    marginBottom: 12,
    border: '3px solid #343A40',
    borderRadius: 5,
  }

  return (
    <form onSubmit={handleSubmit} style={intervalStyle}>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          value={data['name']}
          onChange={handleChange}
          className='form-control'
        />
        {errors['name'] && (
          <div className='alert alert-danger'>{errors['name']}</div>
        )}
      </div>
      <div className='row'>
        <div className='form-group col'>
          <lable htmFor='minutes'>
            Minutes: <b>{data.minutes}</b>
          </lable>
          <input
            className='form-range'
            type='range'
            value={data['minutes']}
            onChange={handleChange}
            id='minutes'
            name='minutes'
            min='0'
            max='60'
          />
          {/* <Input type='range' name='minutes' label='Minutes' /> */}
        </div>
        <Input type='number' name='seconds' label='Seconds' />
        <Input type='number' name='numOfReps' label='Repeat' />
      </div>
      <div className='row'>
        <Input type='color' name='color' label='Color' />
        <Input type='checkbox' name='popup' label='Popup' />
        <Input type='checkbox' name='isMute' label='Mute' />
        <Input type='checkbox' name='autoConfirm' label='Auto Confrim' />
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  )
}

export default Interval
