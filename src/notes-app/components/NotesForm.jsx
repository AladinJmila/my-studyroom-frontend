import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import { appsFormStyle } from '../../services/stylesService'
import {
  createNote,
  updateNote,
  clearSelectedNote,
} from './../../store/apps/notesActions'
import {
  updateSubjectItemsCount,
  updateSubjectOnEdit,
} from '../../store/apps/subjectsActions'

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
    _id: Joi.string(),
    title: Joi.string().required().max(500).label('Title'),
    subjectId: Joi.string().required().label('Subject'),
    resourceId: Joi.string().allow(''),
    content: Joi.string().required().max(2000).label('Content'),
    url: Joi.string().max(500).allow('').label('URL'),
  }

  setFormHeight() {
    this.newAppsFormStyle = { ...appsFormStyle }
    this.newAppsFormStyle.maxHeight = window.innerHeight - 250
  }

  componentDidMount() {
    this.setFormHeight()

    const { subjects, resources, selectedNote, selectedSubject } = this.props
    this.setState({ subjects, resources })

    if (selectedSubject)
      this.setStateOnSubjectSelect(selectedSubject, resources)

    if (selectedNote) {
      this.setState({ data: this.mapToViewModel(selectedNote) })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { resources, selectedSubject } = this.props
    if (prevProps.selectedSubject !== selectedSubject)
      this.setStateOnSubjectSelect(selectedSubject, resources)
  }

  setStateOnSubjectSelect = (selectedSubject, resources) => {
    const filteredResources = resources.filter(
      r => r.subject._id === selectedSubject._id
    )

    this.setState({
      resources: filteredResources,
      data: {
        subjectId: selectedSubject._id,
        resourceId: '',
        title: '',
        content: '',
        url: '',
      },
    })
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

  doSubmit = () => {
    const data = { ...this.state.data }
    data.creatorId = this.props.user._id

    const {
      createNote,
      updateNote,
      selectedNote,
      clearSelectedNote,
      updateSubjectOnEdit,
      updateSubjectItemsCount,
    } = this.props

    if (selectedNote) {
      data.isChecked = selectedNote.isChecked
      data.starred = selectedNote.starred
      data.isPublic = selectedNote.isPublic
      // if (!data.resourceId)
      updateNote(data)
      updateSubjectOnEdit(selectedNote, data, 'Notes')
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
          this.state.subjects,
          'required'
        )}
        {this.renderInput('title', 'Title', 'text', 'required')}
        {this.renderTextArea('content', 'Content', 5, 'required')}
        {this.renderSelect('resourceId', 'Resource', this.state.resources)}
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
  resources: state.apps.resources.list,
  selectedNote: state.apps.notes.selectedNote,
})

const mapDispatchToProps = dispatch => ({
  createNote: note => dispatch(createNote(note)),
  updateNote: note => dispatch(updateNote(note)),
  clearSelectedNote: () => dispatch(clearSelectedNote()),
  updateSubjectOnEdit: (itemInDb, item, itemName) =>
    dispatch(updateSubjectOnEdit(itemInDb, item, itemName)),
  updateSubjectItemsCount: (item, itemName, operation) =>
    dispatch(updateSubjectItemsCount(item, itemName, operation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm)
