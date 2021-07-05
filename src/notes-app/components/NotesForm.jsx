import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import { appsFormStyle } from '../../services/stylesService'
import {
  createNote,
  updateNote,
  clearSelectedNote,
} from './../../store/apps/notesActions'
import { updateSubjectItemsCount } from '../../store/apps/subjectsActions'

class NotesForm extends Form {
  state = {
    data: {
      subjectId: '',
      resourceId: '',
      title: '',
      content: '',
      url: '',
    },
    subjects: [],
    resources: [],
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    title: Joi.string(),
    subjectId: Joi.string().required().label('Subject'),
    resourceId: Joi.string().allow(''),
    content: Joi.string().required().label('Content'),
    url: Joi.string().label('URL').allow(''),
  }

  newAppsFormStyle
  setFormHeight() {
    this.newAppsFormStyle = { ...appsFormStyle }
    this.newAppsFormStyle.maxHeight = window.innerHeight - 250
  }

  async componentDidMount() {
    this.setFormHeight()

    const { subjects, resources, selectedNote } = this.props
    this.setState({ subjects, resources })

    if (selectedNote) {
      this.setState({ data: this.mapToViewModel(selectedNote) })
    }
  }

  mapToViewModel = note => {
    if (note.resource)
      return {
        _id: note._id,
        subjectId: note.subject._id,
        resourceId: note.resource._id,
        title: note.title,
        content: note.content,
        url: note.url,
      }

    return {
      _id: note._id,
      subjectId: note.subject._id,
      title: note.title,
      content: note.content,
      url: note.url,
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const {
      createNote,
      updateNote,
      selectedNote,
      clearSelectedNote,
      updateSubjectItemsCount,
    } = this.props

    if (selectedNote) {
      data.starred = selectedNote.starred
      data.isPublic = selectedNote.isPublic
      // if (!data.resourceId)
      updateNote(data)
      console.log(data)
      clearSelectedNote()
    } else {
      createNote(data)
      updateSubjectItemsCount(data, 'Notes', 'create')
    }

    this.props.toggleShowForm()
    this.setState({
      data: {
        subjectId: '',
        resourceId: '',
        title: '',
        content: '',
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
          this.state.subjects
          // this.props.selectedSubject
        )}
        {this.renderSelect('resourceId', 'Resource', this.state.resources)}
        {this.renderInput('title', 'Title')}
        {this.renderTextArea('content', 'Content', 5)}
        {this.renderInput('url', 'URL')}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
  selectedSubject: state.apps.subjects.selectedSubject,
  resources: state.apps.resources.list,
  selectedNote: state.apps.notes.selectedNote,
})

const mapDispatchToProps = dispatch => ({
  createNote: note => dispatch(createNote(note)),
  updateNote: note => dispatch(updateNote(note)),
  clearSelectedNote: () => dispatch(clearSelectedNote()),
  updateSubjectItemsCount: (id, property, operation) =>
    dispatch(updateSubjectItemsCount(id, property, operation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm)
