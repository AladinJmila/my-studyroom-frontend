import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import { createSubject } from '../../store/apps/subjectsActions'

class SubjectsForm extends Form {
  state = {
    data: { name: '', userId: '' },
    errors: {},
  }

  schema = {
    name: Joi.string().required().label('Subject'),
    userId: Joi.string().allow(''),
  }

  async componentDidMount() {
    const { subjects, selectedSubject, setSelectedSubject } = this.props
    if (selectedSubject) {
      const subject = subjects.find(
        subject => subject._id === selectedSubject._id
      )
      // const { data: subject } = await getSubject(selectedSubject._id)
      this.setState({ data: this.mapToViewModel(subject) })
      setSelectedSubject(null)
    }
  }

  mapToViewModel = subject => {
    return { name: subject.name }
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    this.props.createSubject(data)
    this.props.toggleShowForm()
    this.setState({ data: { name: '', userId: '' } })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('name', 'Subject')}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
})

const mapDispatchToProps = dispatch => ({
  createSubject: subject => dispatch(createSubject(subject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsForm)
