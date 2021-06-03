import Joi from 'joi-browser'
import Form from '../../common/Form'
import { getSubjects } from '../../services/subjectsService'
import { getPractical, savePractical } from '../../services/practicalsService'

class PracticalForm extends Form {
  state = {
    data: {
      subjectId: '',
      about: '',
      cause: '',
      solution: '',
      lesson: '',
      url: '',
    },
    subjects: [],
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    subjectId: Joi.string().required().label('Subject'),
    about: Joi.string().allow(''),
    cause: Joi.string().allow(''),
    solution: Joi.string().allow(''),
    lesson: Joi.string().allow(''),
    url: Joi.string().allow(''),
  }

  async componentDidMount() {
    const { data: subjects } = await getSubjects()
    this.setState({ subjects })
    const { selectedPractical, setSelectedPractical } = this.props
    if (selectedPractical) {
      const { data: practical } = await getPractical(selectedPractical._id)
      this.setState({ data: this.mapToViewModel(practical) })
      setSelectedPractical(null)
    }
  }

  mapToViewModel = practical => {
    return {
      _id: practical._id,
      subjectId: practical.subject._id,
      about: practical.about,
      cause: practical.cause,
      solution: practical.solution,
      lesson: practical.lesson,
      url: practical.url,
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    let updatedPracticals = [...this.props.practicals]
    const tempPractical = updatedPracticals.find(p => p._id === data._id)
    const index = updatedPracticals.indexOf(tempPractical)

    if (tempPractical) {
      data.isPublic = tempPractical.isPublic
    }

    const { data: practical } = await savePractical(data)

    tempPractical
      ? (updatedPracticals[index] = practical)
      : (updatedPracticals = [practical, ...this.props.practicals])

    this.props.setPracticals(updatedPracticals)
    this.props.setAllPracticals(updatedPracticals)
    this.setState({
      data: {
        subjectId: '',
        about: '',
        cause: '',
        solution: '',
        lesson: '',
        url: '',
      },
    })
    this.props.showForm()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderSelect('subjectId', 'Subject', this.state.subjects)}
        {this.renderTextArea('about', 'About', 3)}
        {this.renderTextArea('cause', 'Cause', 4)}
        {this.renderTextArea('solution', 'Solution', 6)}
        {this.renderTextArea('lesson', 'Lesson', 3)}
        {this.renderInput('url', 'URL')}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
      </form>
    )
  }
}

export default PracticalForm
