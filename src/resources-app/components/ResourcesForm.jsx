import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import {
  createResource,
  updateResource,
  clearSelectedResource,
} from '../../store/apps/resourcesActions'

class ResourcesForm extends Form {
  state = {
    data: {
      subjectId: '',
      content: '',
      url: '',
      status: '',
    },
    subjects: [],
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    subjectId: Joi.string().required().label('Subject'),
    resourceId: Joi.string().allow(''),
    content: Joi.string().required().label('Resource'),
    url: Joi.string().required().label('URL'),
    status: Joi.string().allow(''),
  }

  async componentDidMount() {
    const { subjects, selectedResource } = this.props
    this.setState({ subjects })

    if (selectedResource) {
      this.setState({ data: this.mapToViewModel(selectedResource) })
    }
  }

  mapToViewModel = resource => {
    return {
      _id: resource._id,
      subjectId: resource.subject._id,
      content: resource.content,
      url: resource.url,
      status: resource.status,
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const {
      createResource,
      updateResource,
      selectedResource,
      clearSelectedResource,
    } = this.props

    if (selectedResource) {
      data.status = selectedResource.status
      data.isPublic = selectedResource.isPublic
      updateResource(data)
      clearSelectedResource()
    } else {
      createResource(data)
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
      <form onSubmit={this.handleSubmit}>
        {this.renderSelect(
          'subjectId',
          'Subject',
          this.state.subjects
          // this.props.selectedSubject
        )}
        {this.renderInput('content', 'Resource')}
        {this.renderInput('url', 'URL')}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesForm)
