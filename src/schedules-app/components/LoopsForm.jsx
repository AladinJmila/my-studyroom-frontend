import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { produce } from 'immer';
import Form from '../../common/Form';
import {
  createLoop,
  updateLoop,
  clearSelectedLoop,
} from './../../store/apps/loopsActions';

class LoopsFrom extends Form {
  state = {
    data: {
      name: '',
      intervalsIds: [{ intervalId: '' }],
    },
    intervals: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().max(100).label('Name'),
    intervalsIds: Joi.array(),
  };

  componentDidMount() {
    const { intervals, selectedLoop } = this.props;
    this.setState({ intervals });

    if (selectedLoop) {
      this.setState({ data: this.mapToViewModel(selectedLoop) });
    }
  }

  mapToViewModel = loop => {
    const intervalsIds = loop.intervals.map(interval => {
      return { intervalId: interval._id };
    });

    return {
      _id: loop._id,
      name: loop.name,
      intervalsIds,
    };
  };

  handleToggleProp = property => {
    const data = { ...this.state.data };
    data[property] = !data[property];

    this.setState({ data });
  };

  handleIntervalAdd = (e, index) => {
    const { name, value } = e.target;
    const data = produce(this.state.data, data => {
      data.intervalsIds[index][name] = value;
    });
    this.setState({ data });
  };

  handleAddInput = () => {
    const data = produce(this.state.data, data => {
      data.intervalsIds.push({ intervalId: '' });
    });
    this.setState({ data });
  };

  handleRemoveInput = index => {
    const data = produce(this.state.data, data => {
      data.intervalsIds.splice(index, 1);
    });
    this.setState({ data });
  };

  doSubmit = () => {
    const data = { ...this.state.data };
    data.creatorId = this.props.user._id;

    const { createLoop, updateLoop, selectedLoop, clearSelectedLoop } =
      this.props;

    if (selectedLoop) {
      data.starred = selectedLoop.starred;
      data.isPublic = selectedLoop.isPublic;
      updateLoop(data);
      clearSelectedLoop();
    } else {
      createLoop(data);
    }

    this.props.toggleShowForm();
    this.setState({
      data: {
        name: '',
        intervalsIds: [],
      },
    });
  };

  render() {
    return (
      <form className='mt-2 mb-0 main-form' onSubmit={this.handleSubmit}>
        {this.renderInput('name', 'Name', 'text', 'required')}
        <label htmlFor='intervalId'>
          <span className='required'>*</span>Intervals
        </label>
        {this.state.data.intervalsIds.map((item, index) => (
          <div key={index} className='row'>
            <div className='col-9'>
              <select
                name='intervalId'
                id='intervalId'
                value={item.intervalId}
                className='form-select'
                onChange={e => this.handleIntervalAdd(e, index)}
              >
                <option value=''></option>
                {this.state.intervals.map(option => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            {this.state.data.intervalsIds.length > 1 && (
              <button
                type='button'
                className='btn btn-outline-dark ms-2 mt-0 mb-3 me-2 col-1'
                onClick={() => this.handleRemoveInput(index)}
              >
                <i className='fa fa-minus' aria-hidden='true'></i>
              </button>
            )}
            {this.state.data.intervalsIds.length - 1 === index && (
              <button
                type='button'
                className='btn btn-outline-dark ms-2 mt-0 mb-3 me-2 col-1'
                onClick={this.handleAddInput}
              >
                <i className='fa fa-plus' aria-hidden='true'></i>
              </button>
            )}
          </div>
        ))}

        <div className='d-grid gap-2'>
          {this.renderButton('Save', 'btn btn-dark mb-2')}
        </div>
        {/* <pre>{JSON.stringify(this.state.data.intervalsIds, null, 2)}</pre> */}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  intervals: state.apps.intervals.list,
  selectedLoop: state.apps.loops.selectedLoop,
});

const mapDispatchToProps = dispatch => ({
  createLoop: loop => dispatch(createLoop(loop)),
  updateLoop: loop => dispatch(updateLoop(loop)),
  clearSelectedLoop: () => dispatch(clearSelectedLoop()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoopsFrom);
