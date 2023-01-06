import Joi from 'joi-browser';
import { connect } from 'react-redux';
import Form from '../../common/Form';
import Toggle from '../../common/Toggle';
import {
  createInterval,
  updateInterval,
  clearSelectedInterval,
} from '../../store/apps/intervalsActions';
import { updateLoopsInterval } from '../../store/apps/loopsActions';

class IntervalsForm extends Form {
  state = {
    data: {
      name: '',
      minutes: 0,
      seconds: 0,
      numOfReps: 1,
      color: '#62a9b4',
      signalHalf: true,
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().max(100).label('Name'),
    minutes: Joi.number().integer().min(0).max(60).label('Minutes'),
    seconds: Joi.number().integer().min(0).max(60).label('Seconds'),
    numOfReps: Joi.number().integer().min(1).max(10).label('Repetitions'),
    color: Joi.string().max(50).label('Color'),
    signalHalf: Joi.boolean(),
  };

  componentDidMount() {
    const { selectedInterval } = this.props;

    if (selectedInterval) {
      this.setState({ data: this.mapToViewModel(selectedInterval) });
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
    };
  };

  handleToggleProp = property => {
    const data = { ...this.state.data };
    data[property] = !data[property];

    this.setState({ data });
  };

  doSubmit = () => {
    const data = { ...this.state.data };
    data.creatorId = this.props.user._id;

    const {
      createInterval,
      updateInterval,
      selectedInterval,
      updateLoopsInterval,
      clearSelectedInterval,
    } = this.props;

    if (selectedInterval) {
      data.starred = selectedInterval.starred;
      data.isPublic = selectedInterval.isPublic;
      updateInterval(data);
      updateLoopsInterval(selectedInterval._id);
      clearSelectedInterval();
    } else {
      createInterval(data);
    }

    this.props.toggleShowForm();
    this.setState({
      data: {
        name: '',
        minutes: 0,
        seconds: 0,
        numOfReps: 0,
        color: '#62a9b4',
        signalHalf: true,
      },
    });
  };

  render() {
    return (
      <form
        className='mt-2 mb-0 main-form'
        onSubmit={this.handleSubmit}
        style={
          {
            // backgroundColor: this.state.data.color,
          }
        }
      >
        {this.renderInput('name', 'Name', 'text', 'required')}
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
    );
  }
}

const mapStateToProps = state => ({
  selectedInterval: state.apps.intervals.selectedInterval,
});

const mapDispatchToProps = dispatch => ({
  createInterval: interval => dispatch(createInterval(interval)),
  updateInterval: interval => dispatch(updateInterval(interval)),
  updateLoopsInterval: intervalId => dispatch(updateLoopsInterval(intervalId)),
  clearSelectedInterval: () => dispatch(clearSelectedInterval()),
});

export default connect(mapStateToProps, mapDispatchToProps)(IntervalsForm);
