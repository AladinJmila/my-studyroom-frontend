import Joi from 'joi-browser'
import Form from '../../common/Form'
import { connect } from 'react-redux'
import { shareSubject } from '../../store/apps/subjectsActions'

class SubjectsShareForm extends Form {
  state = {
    data: { email: '', authType: '' },
    errors: {},
  }

  schema = {
    email: Joi.string().email().required().label('Email'),
    authType: Joi.string().required().label('Permission'),
  }

  authOptions = [
    { _id: 'viewer', name: 'Viewer' },
    { _id: 'editor', name: 'Editor' },
  ]

  doSubmit = () => {
    const { toggleShowForm, shareSubject, subject } = this.props
    const { data } = this.state

    shareSubject(subject._id, data.email, data.authType)

    toggleShowForm()
    this.setState({ email: '', authType: '' })
  }

  formStyle = {
    width: '30vw',
    height: 190,
    backgroundColor: 'white',
    border: '3px solid #343A40',
    borderRadius: 5,
    color: 'black',
    padding: '1rem .5rem',
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={this.formStyle}>
        <i
          onClick={this.props.toggleShowForm}
          className='fa fa-lg fa-times float-end pointer'
          aria-hidden='true'
        ></i>
        <h5>
          Sharing "<i>{this.props.subject.name}</i>"
        </h5>
        <div className='row'>
          <div className='col-9'>
            {this.renderInput('email', 'Email', 'text', 'required')}
          </div>
          <div className='col-3'>
            {this.renderSelect(
              'authType',
              'Permission',
              this.authOptions,
              'required'
            )}
          </div>
        </div>
        <div className='d-grid gap-2'>
          {this.renderButton('Share', 'btn btn-dark mb-2')}
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  shareSubject: (id, email, authType) =>
    dispatch(shareSubject(id, email, authType)),
})

export default connect(null, mapDispatchToProps)(SubjectsShareForm)
