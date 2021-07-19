import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import {
  createSession,
  updateSession,
  clearSelectedSession,
} from '../../store/apps/sessionsActions'

class SessionsForm extends Form {
  state = {
    data: {
      subjectId: '',
      loopId: '',
      name: '',
      numOfReps: 1,
      break: 0,
    },
    subjects: [],
    loops: [],
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    subjectId: Joi.string().required().label('Subject'),
    loopId: Joi.string().required().label('Loop'),
    name: Joi.string().max(100).allow('').label('Name'),
    numOfReps: Joi.number().integer().min(1).max(10),
    break: Joi.number().integer().min(0).max(60),
  }

  componentDidMount() {
    const { subjects, loops, selectedSession } = this.props
    this.setState({ subjects, loops })

    if (selectedSession) {
      this.setState({ data: this.mapToViewModel(selectedSession) })
    }
  }

  mapToViewModel = session => {
    return {
      _id: session._id,
      name: session.name,
      subjectId: session.subject._id,
      loopId: session.loop._id,
      numOfReps: session.numOfReps,
      break: session.break,
    }
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    console.log(data)

    const {
      createSession,
      updateSession,
      selectedSession,
      clearSelectedSession,
    } = this.props

    if (selectedSession) {
      data.play = selectedSession.play
      data.starred = selectedSession.starred
      data.isPublic = selectedSession.isPublic
      updateSession(data)
      clearSelectedSession()
    } else {
      createSession(data)
    }

    this.props.toggleShowForm()
    this.setState({
      data: {
        name: '',
        subjectId: '',
        loopId: '',
        numOfReps: 1,
        break: 0,
      },
    })
  }

  sessionsFormStyle = {
    padding: 10,
    margin: '12px 0',
    border: '3px solid #343A40',
    borderRadius: 5,
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={this.sessionsFormStyle}>
        {this.renderSelect(
          'subjectId',
          'Subject',
          this.state.subjects,
          'required'
        )}
        {this.renderSelect('loopId', 'Loop', this.state.loops, 'required')}
        {this.renderInput('name', 'Name')}
        <div className='row mb-2'>
          {this.renderRange('numOfReps', 'Repetitions:', '1', '10')}
          {this.renderRange('break', 'Break:', '0', '60')}
        </div>
        <div className='d-grid gap-2'>
          {this.renderButton('Save', 'btn btn-dark mb-2')}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
  loops: state.apps.loops.list,
  selectedSession: state.apps.sessions.selectedSession,
})

const mapDispatchToProps = dispatch => ({
  createSession: session => dispatch(createSession(session)),
  updateSession: session => dispatch(updateSession(session)),
  clearSelectedSession: () => dispatch(clearSelectedSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionsForm)
