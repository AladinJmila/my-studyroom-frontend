import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import {
  createSchedule,
  updateSchedule,
  clearSelectedSchedule,
} from '../../store/apps/schedulesActions'

class SchedulesForm extends Form {
  state = {
    data: {
      name: '',
      subjectId: '',
      loopId: '',
      numOfReps: 1,
      index: 0,
    },
    subjects: [],
    loops: [],
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    name: Joi.string().required().max(100).label('Name'),
    subjectId: Joi.string().required().label('Subject'),
    loopId: Joi.string().required().label('Loop'),
    numOfReps: Joi.number().integer().min(1).max(10),
    index: Joi.number().integer().min(0).max(10),
  }

  componentDidMount() {
    const { subjects, loops, selectedSchedule } = this.props
    this.setState({ subjects, loops })

    if (selectedSchedule) {
      this.setState({ data: this.mapToViewModel(selectedSchedule) })
    }
  }

  mapToViewModel = schedule => {
    return {
      _id: schedule._id,
      name: schedule.name,
      subjectId: schedule.subject._id,
      loopId: schedule.loopId,
      numOfReps: schedule.numOfReps,
      index: schedule.index,
    }
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const {
      createSchedule,
      updateSchedule,
      selectedSchedule,
      clearSelectedSchedule,
    } = this.props

    if (selectedSchedule) {
      data.play = selectedSchedule.play
      data.starred = selectedSchedule.starred
      data.isPublic = selectedSchedule.isPublic
      updateSchedule(data)
      clearSelectedSchedule()
    } else {
      createSchedule(data)
    }

    this.props.toggleShowForm()
    this.setState({
      data: {
        name: '',
        subjectId: '',
        loopId: '',
        numOfReps: 1,
        index: 0,
      },
    })
  }

  schedulesFormStyle = {
    padding: 10,
    margin: '12px 0',
    border: '3px solid #343A40',
    borderRadius: 5,
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={this.schedulesFormStyle}>
        {this.renderInput('name', 'Name')}
        {this.renderSelect('subjectId', 'Subject', this.state.subjects)}
        {this.renderSelect('loopId', 'Loop', this.state.loops)}
        <div className='row mb-2'>
          {this.renderRange('numOfReps', 'Repetitions:', '1', '10')}
          {this.renderRange('index', 'Index:', '0', '10')}
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
  selectedSchedule: state.apps.schedules.selectedSchedule,
})

const mapDispatchToProps = dispatch => ({
  createSchedule: schedule => dispatch(createSchedule(schedule)),
  updateSchedule: schedule => dispatch(updateSchedule(schedule)),
  clearSelectedSchedule: () => dispatch(clearSelectedSchedule()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesForm)
