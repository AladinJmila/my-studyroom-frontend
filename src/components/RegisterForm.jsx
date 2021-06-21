import Joi from 'joi-browser'
import Form from '../common/Form'
import { register } from '../store/services/userService'
import { loginWithJwt } from '../store/services/authService'

class RegisterForm extends Form {
  state = {
    data: { username: '', email: '', password: '' },
    errors: {},
  }

  schema = {
    username: Joi.string().required().label('Username'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  }

  doSubmit = async () => {
    try {
      const response = await register(this.state.data)

      loginWithJwt(response.headers['x-auth-token'])
      window.location = '/'
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors }
        console.log(error.response.data)
        errors.email = error.response.data
        this.setState({ errors })
      }
    }
  }

  render() {
    return (
      <div className='container full-height'>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Register')}
        </form>
      </div>
    )
  }
}

export default RegisterForm
