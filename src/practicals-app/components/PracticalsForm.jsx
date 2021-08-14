import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import { appsFormStyle } from '../../services/stylesService'
import {
  createPractical,
  updatePractical,
  clearSelectedPractical,
} from './../../store/apps/practicalsActions'
import {
  updateSubjectItemsCount,
  updateSubjectOnEdit,
} from '../../store/apps/subjectsActions'

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
    _id: Joi.string(),
    subjectId: Joi.string().required().label('Subject'),
    about: Joi.string().max(500).allow('').label('About'),
    cause: Joi.string().max(500).allow('').label('Cause'),
    solution: Joi.string().max(500).allow('').label('Solution'),
    lesson: Joi.string().max(500).allow('').label('Lesson'),
    url: Joi.string().max(500).allow('').label('URL'),
  }

  setFormHeight() {
    this.newAppsFormStyle = { ...appsFormStyle }
    this.newAppsFormStyle.maxHeight = window.innerHeight - 250
  }

  componentDidMount() {
    this.setFormHeight()

    const { subjects, selectedPractical, selectedSubject } = this.props
    this.setState({ subjects })

    if (selectedSubject) this.setStateOnSubjectSelect(selectedSubject)

    if (selectedPractical) {
      this.setState({ data: this.mapToViewModel(selectedPractical) })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedSubject !== this.props.selectedSubject)
      this.setStateOnSubjectSelect(this.props.selectedSubject)
  }

  setStateOnSubjectSelect = selectedSubject => {
    this.setState({
      data: {
        subjectId: selectedSubject._id,
        about: '',
        cause: '',
        solution: '',
        lesson: '',
        url: '',
      },
    })
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

  doSubmit = () => {
    const data = { ...this.state.data }
    data.creatorId = this.props.user._id

    const {
      createPractical,
      updatePractical,
      selectedPractical,
      clearSelectedPractical,
      updateSubjectOnEdit,
      updateSubjectItemsCount,
    } = this.props

    if (selectedPractical) {
      data.isChecked = selectedPractical.isChecked
      data.starred = selectedPractical.starred
      data.isPublic = selectedPractical.isPublic
      updatePractical(data)
      updateSubjectOnEdit(selectedPractical, data, 'Practicals')
      clearSelectedPractical()
    } else {
      createPractical(data)
      updateSubjectItemsCount(data, 'Practicals', 'create')
    }

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
      <form onSubmit={this.handleSubmit} style={this.newAppsFormStyle}>
        {this.renderSelect(
          'subjectId',
          'Subject',
          this.state.subjects,
          'required'
        )}
        {this.renderTextArea('about', 'About', 3)}
        {this.renderTextArea('cause', 'Cause', 4)}
        {this.renderTextArea('solution', 'Solution', 6)}
        {this.renderTextArea('lesson', 'Lesson', 3)}
        {this.renderInput('url', 'URL')}
        <div className='d-grid gap-2'>
          {this.renderButton('Save', 'btn btn-dark mb-2')}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
  selectedSubject: state.apps.subjects.selectedSubject,
  selectedPractical: state.apps.practicals.selectedPractical,
})

const mapDispatchToProps = dispatch => ({
  createPractical: practical => dispatch(createPractical(practical)),
  updatePractical: practical => dispatch(updatePractical(practical)),
  clearSelectedPractical: () => dispatch(clearSelectedPractical),
  updateSubjectOnEdit: (itemInDb, item, itemName) =>
    dispatch(updateSubjectOnEdit(itemInDb, item, itemName)),
  updateSubjectItemsCount: (item, itemName, operation) =>
    dispatch(updateSubjectItemsCount(item, itemName, operation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PracticalForm)
