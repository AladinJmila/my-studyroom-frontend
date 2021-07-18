import { Component } from 'react'
import Joi from 'joi-browser'
import Input from './Input'
import Select from './Select'
import TextArea from './TextArea'
import Checkbox from './Checkbox'
import Range from './Range'
import ColorInput from './ColorInput'

class Form extends Component {
  state = {
    data: {},
    errors: {},
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, options)

    if (!error) return null

    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const subSchema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, subSchema)

    return error ? error.details[0].message : null
  }

  handleSubmit = e => {
    e.preventDefault()

    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return

    this.doSubmit()
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]
    // console.log(input.value)
    const data = { ...this.state.data }
    data[input.name] = input.value
    this.setState({ data, errors })
  }

  renderButton(label, className = 'btn btn-primary') {
    return (
      <button disabled={this.validate()} className={className}>
        {label}
      </button>
    )
  }

  renderInput(name, label, type = 'text', required) {
    const { data, errors } = this.state

    return (
      <Input
        type={type}
        label={label}
        required={required}
        name={name}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />
    )
  }

  renderSelect(name, label, options, required) {
    const { data, errors } = this.state

    return (
      <Select
        name={name}
        label={label}
        required={required}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }

  renderTextArea(name, label, rows, required) {
    const { data, errors } = this.state

    return (
      <TextArea
        name={name}
        label={label}
        required={required}
        rows={rows}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />
    )
  }

  renderCheckbox(name, label) {
    const { data } = this.state

    return (
      <Checkbox
        label={label}
        name={name}
        onChange={this.handleChange}
        value={data[name]}
      />
    )
  }

  renderRange(name, label, min, max) {
    const { data } = this.state

    return (
      <Range
        label={label}
        name={name}
        min={min}
        max={max}
        onChange={this.handleChange}
        value={data[name]}
      />
    )
  }

  renderColorInput(name, label) {
    const { data } = this.state

    return (
      <ColorInput
        label={label}
        name={name}
        onChange={this.handleChange}
        value={data[name]}
      />
    )
  }
}

export default Form
