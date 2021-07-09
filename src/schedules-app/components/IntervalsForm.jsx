import Joi from 'joi-browser'
import Form from '../../common/Form'
import { appsFormStyle } from '../../services/stylesService'

class IntervalsForm extends Form {
  state = {
    data: {
      name: '',
      minutes: 0,
      seconds: 0,
      numOfReps: 0,
      color: '#EF8FA7',
      signalHalf: false,
    },
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    name: Joi.string().required().max(100),
    minutes: Joi.number().integer().min(0).max(60),
    seconds: Joi.number().integer().min(0).max(60),
    numOfReps: Joi.number().integer().min(0).max(10),
    color: Joi.string().max(50),
    signalHalf: Joi.boolean(),
  }

  render() {
    return (
      <form action='' style={appsFormStyle}>
        <h2>Intervals Form</h2>
      </form>
    )
  }
}

export default IntervalsForm
