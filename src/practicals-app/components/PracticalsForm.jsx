import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import {
  createPractical,
  loadPracticals,
  updatePractical,
  clearSelectedPractical,
} from './../../store/apps/practicalsActions'

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
    const { subjects, selectedPractical } = this.props
    this.setState({ subjects })

    if (selectedPractical) {
      this.setState({ data: this.mapToViewModel(selectedPractical) })
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

    const {
      loadPracticals,
      createPractical,
      updatePractical,
      selectedPractical,
      clearSelectedPractical,
    } = this.props

    if (selectedPractical) {
      data.isPublic = selectedPractical.isPublic
      updatePractical(data)
      clearSelectedPractical()
    } else {
      createPractical(data)
    }

    loadPracticals()

    this.props.toggleShowForm()
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

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
  selectedPractical: state.apps.practicals.selectedPractical,
})

const mapDispatchToProps = dispatch => ({
  loadPracticals: () => dispatch(loadPracticals()),
  createPractical: practical => dispatch(createPractical(practical)),
  updatePractical: practical => dispatch(updatePractical(practical)),
  clearSelectedPractical: () => dispatch(clearSelectedPractical),
})

export default connect(mapStateToProps, mapDispatchToProps)(PracticalForm)
