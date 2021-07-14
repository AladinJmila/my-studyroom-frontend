import Joi from 'joi-browser'
import { connect } from 'react-redux'
import { produce } from 'immer'
import Form from '../../common/Form'
import Toggle from '../../common/Toggle'
import {
  createLoop,
  updateLoop,
  clearSelectedLoop,
} from './../../store/apps/loopsActions'
import {
  getLoopIntervals,
  computeLoopDuration,
} from '../services/loopsServices'

class LoopsFrom extends Form {
  state = {
    data: {
      name: '',
      intervalsIds: [{ intervalId: '' }],
      popup: false,
      isMute: false,
      autoConfirm: false,
    },
    intervals: [],
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    name: Joi.string().required().max(100),
    intervalsIds: Joi.array(),
    popup: Joi.boolean(),
    isMute: Joi.boolean(),
    autoConfirm: Joi.boolean(),
  }

  componentDidMount() {
    const { intervals, selectedLoop } = this.props
    this.setState({ intervals })

    if (selectedLoop) {
      this.setState({ data: this.mapToViewModel(selectedLoop) })
    }
  }

  mapToViewModel = loop => {
    return {
      _id: loop._id,
      name: loop.name,
      intervalsIds: loop.intervalsIds,
      popup: loop.popup,
      isMute: loop.isMute,
      autoConfirm: loop.autoConfirm,
    }
  }

  handleToggleProp = property => {
    const data = { ...this.state.data }
    data[property] = !data[property]

    this.setState({ data })
  }

  handleIntervalAdd = (e, index) => {
    const { name, value } = e.target
    const data = produce(this.state.data, data => {
      data.intervalsIds[index][name] = value
    })
    this.setState({ data })
  }

  handleAddInput = () => {
    const data = produce(this.state.data, data => {
      data.intervalsIds.push({ intervalId: '' })
    })
    this.setState({ data })
  }

  handleRemoveInput = index => {
    const data = produce(this.state.data, data => {
      data.intervalsIds.splice(index, 1)
    })
    this.setState({ data })
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const { createLoop, updateLoop, selectedLoop, clearSelectedLoop } =
      this.props

    if (selectedLoop) {
      data.starred = selectedLoop.starred
      data.isPublic = selectedLoop.isPublic
      updateLoop(data)
      clearSelectedLoop()
    } else {
      createLoop(data)
    }

    this.props.toggleShowForm()
    this.setState({
      data: {
        name: '',
        intervalsIds: [],
        popup: false,
        isMute: false,
        autoConfirm: false,
      },
    })
  }

  loopsFormStyle = {
    backgroundImage: 'linear-gradient(#678387, #62a9b4)',
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
        style={this.loopsFormStyle}
      >
        {this.renderInput('name', 'Name')}
        <label htmlFor='intervalId'>Intervals</label>
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

        <div className='d-flex flex-row justify-content-between'>
          <h6 className='p-2'>
            <Toggle
              toggled={this.state.data.popup}
              onToggle={() => this.handleToggleProp('popup')}
            />
            <label htmlFor='popup' className='ms-2'>
              PopUp
            </label>
          </h6>
          <h6 className='p-2'>
            <Toggle
              toggled={this.state.data.isMute}
              onToggle={() => this.handleToggleProp('isMute')}
            />
            <label htmlFor='isMute' className='ms-2'>
              Mute
            </label>
          </h6>
          <h6 className='p-2'>
            <Toggle
              toggled={this.state.data.autoConfirm}
              onToggle={() => this.handleToggleProp('autoConfirm')}
            />
            <label htmlFor='autoConfirm' className='ms-2'>
              Auto Confirm
            </label>
          </h6>
        </div>
        <div className='d-grid gap-2'>
          {this.renderButton('Save', 'btn btn-dark mb-2')}
        </div>
        {/* <pre>{JSON.stringify(this.state.data.intervalsIds, null, 2)}</pre> */}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  intervals: state.apps.intervals.list,
  selectedLoop: state.apps.loops.selectedLoop,
})

const mapDispatchToProps = dispatch => ({
  createLoop: loop => dispatch(createLoop(loop)),
  updateLoop: loop => dispatch(updateLoop(loop)),
  clearSelectedLoop: () => dispatch(clearSelectedLoop()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoopsFrom)
