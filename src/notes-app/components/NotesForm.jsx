import Joi from 'joi-browser'
import Form from '../../common/Form'
import { getSubjects } from '../../services/subjectsService'
import { getResources } from '../../services/resourcesService'
import { getNote, saveNote } from '../../services/notesService'

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

  async componentDidMount() {
    const { data: subjects } = await getSubjects()
    this.setState({ subjects })

    const { data: resources } = await getResources()
    this.setState({ resources })

    const { selectedNote, setSelectedNote } = this.props
    if (selectedNote) {
      const { data: note } = await getNote(selectedNote._id)
      this.setState({ data: this.mapToViewModel(note) })
      setSelectedNote(null)
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
        // starred: note.starred,
        // isPublic: note.isPublic,
      }

    return {
      _id: note._id,
      subjectId: note.subject._id,
      title: note.title,
      content: note.content,
      url: note.url,
      // starred: note.starred,
      // isPublic: note.isPublic,
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    let updatedNotes = [...this.props.notes]
    const tempNote = updatedNotes.find(n => n._id === data._id)
    const index = updatedNotes.indexOf(tempNote)

    if (tempNote) {
      data.starred = tempNote.starred
      data.isPublic = tempNote.isPublic
    }

    const { data: note } = await saveNote(data)

    tempNote
      ? (updatedNotes[index] = note)
      : (updatedNotes = [note, ...updatedNotes])

    this.props.setNotes(updatedNotes)
    this.props.setAllNotes(updatedNotes)
    this.setState({
      data: {
        subjectId: '',
        resourceId: '',
        title: '',
        content: '',
        url: '',
      },
    })
    this.props.showForm()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderSelect('subjectId', 'Subject', this.state.subjects)}
        {this.renderSelect('resourceId', 'Resource', this.state.resources)}
        {this.renderInput('title', 'Title')}
        {this.renderTextArea('content', 'Content', 5)}
        {this.renderInput('url', 'URL')}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
      </form>
    )
  }
}

export default NotesForm
