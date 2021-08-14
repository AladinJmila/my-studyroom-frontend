import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import { appsFormStyle } from '../../services/stylesService'
import {
  createResource,
  updateResource,
  clearSelectedResource,
} from '../../store/apps/resourcesActions'
import {
  updateSubjectItemsCount,
  updateSubjectOnEdit,
} from '../../store/apps/subjectsActions'

class ResourcesForm extends Form {
  state = {
    data: {
      subjectId: '',
      content: '',
      url: '',
    },
    subjects: [],
    errors: {},
  }

  schema = {
    _id: Joi.string(),
    subjectId: Joi.string().required().label('Subject'),
    content: Joi.string().required().max(500).label('Title'),
    url: Joi.string().required().max(500).label('URL'),
  }

  setFormHeight() {
    this.newAppsFormStyle = { ...appsFormStyle }
    this.newAppsFormStyle.maxHeight = window.innerHeight - 250
  }

  componentDidMount() {
    this.setFormHeight()

    const { subjects, selectedResource, selectedSubject } = this.props
    this.setState({ subjects })

    if (selectedSubject) this.setStateOnSubjectSelect(selectedSubject)

    if (selectedResource) {
      this.setState({ data: this.mapToViewModel(selectedResource) })
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
        content: '',
        url: '',
      },
    })
  }

  mapToViewModel = resource => {
    return {
      _id: resource._id,
      subjectId: resource.subject._id,
      content: resource.content,
      url: resource.url,
    }
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.creatorId = this.props.user._id

    const {
      createResource,
      updateResource,
      selectedResource,
      clearSelectedResource,
      updateSubjectOnEdit,
      updateSubjectItemsCount,
    } = this.props

    if (selectedResource) {
      data.isChecked = selectedResource.isChecked
      data.starred = selectedResource.starred
      data.isPublic = selectedResource.isPublic
      updateResource(data)
      updateSubjectOnEdit(selectedResource, data, 'Resources')
      clearSelectedResource()
    } else {
      createResource(data)
      updateSubjectItemsCount(data, 'Resources', 'create')
    }

    this.props.toggleShowForm()
    this.setState({
      data: {
        subjectId: '',
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
        {this.renderInput('content', 'Title', 'text', 'required')}
        {this.renderInput('url', 'URL', 'text', 'required')}
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
  selectedResource: state.apps.resources.selectedResource,
})

const mapDispatchToProps = dispatch => ({
  createResource: resource => dispatch(createResource(resource)),
  updateResource: resource => dispatch(updateResource(resource)),
  clearSelectedResource: () => dispatch(clearSelectedResource()),
  updateSubjectOnEdit: (itemInDb, item, itemName) =>
    dispatch(updateSubjectOnEdit(itemInDb, item, itemName)),
  updateSubjectItemsCount: (item, itemName, operation) =>
    dispatch(updateSubjectItemsCount(item, itemName, operation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesForm)
