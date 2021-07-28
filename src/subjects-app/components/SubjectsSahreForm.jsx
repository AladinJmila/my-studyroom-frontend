import { thisExpression } from '@babel/types'
import Joi from 'joi-browser'
import Form from '../../common/Form'

class SubjectsShareForm extends Form {
  state = {
    data: {
      subjectId: '',
      authType: '',
      email: '',
    },
    errors: {},
  }

  shcema = {
    subjectId: Joi.string().required(),
    authType: Joi.string().required(),
    email: Joi.string().email().required().label('Email'),
  }

  doSubmit = () => {}

  formStyle = {
    width: '30vw',
    height: 200,
    backgroundColor: 'white',
    border: '3px solid #343A40',
    borderRadius: 5,
    color: 'black',
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={this.formStyle}>
        <h2>Subjects Share Form</h2>
      </form>
    )
  }
}

export default SubjectsShareForm
