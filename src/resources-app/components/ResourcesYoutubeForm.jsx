import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import { appsFormStyle } from '../../services/stylesService'
import { createYoutubeResources } from '../../store/apps/resourcesActions'

class ResourcesYoutubeForm extends Form {
  state = {
    data: {
      subjectId: '',
      // content: '',
      url: '',
    },
    subjects: [],
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    subjectId: Joi.string().required().label('Subject'),
    // content: Joi.string().required().max(500).label('Resource'),
    url: Joi.string().required().max(500).regex(/list/).label('URL'),
  }

  setFormHeight() {
    this.newAppsFormStyle = { ...appsFormStyle }
    this.newAppsFormStyle.maxHeight = window.innerHeight - 250
  }

  componentDidMount() {
    this.setFormHeight()

    const { subjects } = this.props
    this.setState({ subjects })
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const { createYoutubeResources } = this.props

    createYoutubeResources(data)

    this.props.toggleShowForm()
    this.setState({
      data: {
        subjectId: '',
        // content: '',
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
        {/* {this.renderInput('content', 'Title', 'text', 'required')} */}
        {this.renderInput('url', 'Playlist URL', 'text', 'required')}
        <div className='d-grid gap-2'>
          {this.renderButton('Save', 'btn btn-dark mb-2')}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
})

const mapDispatchToProps = dispatch => ({
  createYoutubeResources: data => dispatch(createYoutubeResources(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcesYoutubeForm)
