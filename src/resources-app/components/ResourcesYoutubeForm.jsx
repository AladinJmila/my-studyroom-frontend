import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import { appsFormStyle } from '../../services/stylesService'
import { createYoutubeResources } from '../../store/apps/resourcesActions'

class ResourcesYoutubeForm extends Form {
  state = {
    data: {
      subjectId: '',
      url: '',
    },
    subjects: [],
    errors: {},
  }

  schema = {
    _id: Joi.string(),
    subjectId: Joi.string().required().label('Subject'),
    url: Joi.string().required().max(500).regex(/list/).label('URL'),
  }

  setFormHeight() {
    this.newAppsFormStyle = { ...appsFormStyle }
    this.newAppsFormStyle.maxHeight = window.innerHeight - 250
  }

  componentDidMount() {
    this.setFormHeight()

    const { subjects, selectedSubject } = this.props
    this.setState({ subjects })

    if (selectedSubject) this.setStateOnSubjectSelect(selectedSubject)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedSubject !== this.props.selectedSubject)
      this.setStateOnSubjectSelect(this.props.selectedSubject)
  }

  setStateOnSubjectSelect = selectedSubject => {
    this.setState({
      data: {
        subjectId: selectedSubject._id,
        url: '',
      },
    })
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.creatorId = this.props.user._id

    const { createYoutubeResources } = this.props

    createYoutubeResources(data)

    this.props.toggleShowForm()
    this.setState({
      data: {
        subjectId: '',
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
  selectedSubject: state.apps.subjects.selectedSubject,
})

const mapDispatchToProps = dispatch => ({
  createYoutubeResources: data => dispatch(createYoutubeResources(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcesYoutubeForm)
