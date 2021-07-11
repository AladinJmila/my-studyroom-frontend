import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import Toggle from '../../common/Toggle'
import {
  createInterval,
  updateInterval,
  clearSelectedInterval,
} from '../../store/apps/intervalsActions'

class IntervalsForm extends Form {
  state = {
    data: {
      name: '',
      minutes: 0,
      seconds: 0,
      numOfReps: 1,
      color: '#62a9b4',
      signalHalf: false,
    },
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    name: Joi.string().required().max(100),
    minutes: Joi.number().integer().min(0).max(60),
    seconds: Joi.number().integer().min(0).max(60),
    numOfReps: Joi.number().integer().min(1).max(10),
    color: Joi.string().max(50),
    signalHalf: Joi.boolean(),
  }

  componentDidMount() {
    const { selectedInterval } = this.props

    if (selectedInterval) {
      this.setState({ data: this.mapToViewModel(selectedInterval) })
    }
  }

  mapToViewModel = interval => {
    return {
      _id: interval._id,
      name: interval.name,
      minutes: interval.minutes,
      seconds: interval.seconds,
      numOfReps: interval.numOfReps,
      color: interval.color,
      signalHalf: interval.signalHalf,
    }
  }

  handleToggleProp = property => {
    const data = { ...this.state.data }
    data[property] = !data[property]

    this.setState({ data })
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const {
      createInterval,
      updateInterval,
      selectedInterval,
      clearSelectedInterval,
    } = this.props

    if (selectedInterval) {
      data.starred = selectedInterval.starred
      data.isPublic = selectedInterval.isPublic
      updateInterval(data)
      clearSelectedInterval()
    } else {
      createInterval(data)
    }

    this.props.toggleShowForm()
    this.setState({
      data: {
        name: '',
        minutes: 0,
        seconds: 0,
        numOfReps: 0,
        color: '#62a9b4',
        signalHalf: false,
      },
    })
  }

  intervalsFormStyle = {
    padding: 10,
    margin: '12px 0',
    border: '3px solid #343A40',
    borderRadius: 5,
  }

  render() {
    return (
      <form
        className='mt-2 mb-0'
        onSubmit={this.handleSubmit}
        style={{
          ...this.intervalsFormStyle,
          backgroundColor: this.state.data.color,
        }}
      >
        {this.renderInput('name', 'Name')}
        <div className='row mb-2'>
          {this.renderRange('minutes', 'Minutes:', '0', '60')}
          {this.renderRange('seconds', 'Seconds:', '0', '60')}
          {this.renderRange('numOfReps', 'Repetitions:', '1', '10')}
        </div>
        <div className='row mb-2'>
          {this.renderColorInput('color', 'Color')}
          <div className='col center'>
            <h6 className='float-end pt-2'>
              <Toggle
                toggled={this.state.data.signalHalf}
                onToggle={() => this.handleToggleProp('signalHalf')}
              />
              <label htmlFor='signalHalf' className='ms-2'>
                Signal Half
              </label>
            </h6>
          </div>
        </div>
        <div className='d-grid gap-2'>
          {this.renderButton('Save', 'btn btn-dark mb-2')}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  selectedInterval: state.apps.intervals.selectedInterval,
})

const mapDispatchToProps = dispatch => ({
  createInterval: interval => dispatch(createInterval(interval)),
  updateInterval: interval => dispatch(updateInterval(interval)),
  clearSelectedInterval: () => dispatch(clearSelectedInterval()),
})

export default connect(mapStateToProps, mapDispatchToProps)(IntervalsForm)
