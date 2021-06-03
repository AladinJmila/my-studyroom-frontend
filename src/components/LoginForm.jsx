import Joi from 'joi-browser'
import Form from '../common/Form'
import { login } from '../services/authService'

class LoginForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  }

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().label('Password'),
  }

  doSubmit = async () => {
    try {
      const { data } = this.state
      await login(data.email, data.password)
      window.location = '/'
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors }
        errors.email = error.response.data
        this.setState({ errors })
      }
    }
  }

  render() {
    return (
      <div className='container'>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    )
  }
}

export default LoginForm
