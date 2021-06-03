import Joi from 'joi-browser'
import Form from '../../common/Form'
import { getSubjects } from '../../services/subjectsService'
import { getResource, saveResource } from '../../services/resourcesService'

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
    const { data: subjects } = await getSubjects()
    this.setState({ subjects })

    const { selectedResource, setSelectedResource } = this.props
    if (selectedResource) {
      const { data: resource } = await getResource(selectedResource._id)
      this.setState({ data: this.mapToViewModel(resource) })
      setSelectedResource(null)
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

    let updatedResources = [...this.props.resources]
    const tempResource = updatedResources.find(r => r._id === data._id)
    const index = updatedResources.indexOf(tempResource)

    if (tempResource) {
      data.status = tempResource.status
      data.isPublic = tempResource.isPublic
    }

    const { data: resource } = await saveResource(data)

    tempResource
      ? (updatedResources[index] = resource)
      : (updatedResources = [resource, ...this.props.resources])

    this.props.setResources(updatedResources)
    this.props.setAllResources(updatedResources)
    this.setState({
      data: {
        subjectId: '',
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
        {this.renderInput('content', 'Resource')}
        {this.renderInput('url', 'URL')}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
      </form>
    )
  }
}

export default ResourcesForm
