import Joi from 'joi-browser'
import Form from '../../common/Form'
import { getSubject, saveSubject } from './../../services/subjectsService'

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
    const { selectedSubject, setSelectedSubject } = this.props
    if (selectedSubject) {
      const { data: subject } = await getSubject(selectedSubject._id)
      this.setState({ data: this.mapToViewModel(subject) })
      setSelectedSubject(null)
    }
  }

  mapToViewModel = subject => {
    return { name: subject.name }
  }

  doSubmit = async () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const { data: subject } = await saveSubject(data)

    let updatedSubjects = [...this.props.subjects]
    updatedSubjects.shift()
    updatedSubjects.push(subject)

    this.props.setSubjects(updatedSubjects)
    this.props.updateSubjects()
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

export default SubjectsForm
