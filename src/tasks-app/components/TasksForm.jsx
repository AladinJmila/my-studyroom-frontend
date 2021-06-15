import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from './../../common/Form'
import { getResources } from './../../services/resourcesService'
import {
  saveTask,
  updateTask,
  loadTasks,
  clearSelectedTask,
} from '../../store/tasksActions'

class TasksForm extends Form {
  state = {
    data: {
      subjectId: '',
      resourceId: '',
      content: '',
      url: '',
      repeat: '',
    },
    subjects: [],
    resources: [],
    errors: {},
  }

  frequency = [
    { key: 1, name: 'once' },
    { key: 2, name: 'daily' },
    { key: 3, name: 'weekly' },
    { key: 4, name: 'monthly' },
  ]

  schema = {
    _id: [Joi.number(), Joi.string()],
    subjectId: Joi.string().label('Subject'),
    resourceId: Joi.string().allow(''),
    content: Joi.string().required().label('Task'),
    url: Joi.string().label('URL').allow(''),
    sessions: Joi.number().label('Sessions').allow(''),
    repeat: Joi.string().label('Repeat').allow(''),
  }

  async componentDidMount() {
    const { subjects, selectedTask } = this.props
    const { data: resources } = await getResources()
    this.setState({ subjects, resources })
    if (selectedTask) {
      this.setState({ data: this.mapToViewModel(selectedTask) })
    }
  }

  mapToViewModel = task => {
    if (task.resource)
      return {
        _id: task._id,
        subjectId: task.subject._id,
        resourceId: task.resource._id,
        content: task.content,
        url: task.url,
        repeat: task.repeat,
      }

    return {
      _id: task._id,
      subjectId: task.subject._id,
      content: task.content,
      url: task.url,
      repeat: task.repeat,
    }
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const {
      saveTask,
      updateTask,
      loadTasks,
      tasks,
      selectedTask,
      clearSelectedTask,
    } = this.props

    if (selectedTask) {
      data.isChecked = selectedTask.isChecked
      data.isPublic = selectedTask.isPublic
      updateTask(data)
      clearSelectedTask()
    } else {
      saveTask(data)
    }

    loadTasks()

    this.props.setAllTasks(tasks)
    this.props.toggleShowForm()
    this.setState({
      data: {
        subjectId: '',
        resourceId: '',
        content: '',
        url: '',
        repeat: '',
      },
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderSelect('subjectId', 'Subject', this.state.subjects)}
        {this.renderSelect('resourceId', 'Resource', this.state.resources)}
        {this.renderInput('content', 'Task')}
        {this.renderInput('url', 'URL')}
        {this.renderSelect('repeat', 'Repeat', this.frequency)}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.entities.subjects.list,
  tasks: state.entities.tasks.list,
  selectedTask: state.entities.tasks.selectedTask,
})

const mapDispatchToProps = dispatch => ({
  saveTask: task => dispatch(saveTask(task)),
  updateTask: task => dispatch(updateTask(task)),
  loadTasks: () => dispatch(loadTasks()),
  clearSelectedTask: () => dispatch(clearSelectedTask()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksForm)
