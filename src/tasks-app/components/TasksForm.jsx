import Joi from 'joi-browser'
import Form from './../../common/Form'
import { getSubjects } from './../../services/subjectsService'
import { getTask, saveTask } from './../../services/tasksService'
import { getResources } from './../../services/resourcesService'

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
    const { data: subjects } = await getSubjects()
    const { data: resources } = await getResources()
    this.setState({ subjects, resources })
    const { selectedTask, setSelectedTask } = this.props
    if (selectedTask) {
      const { data: task } = await getTask(selectedTask._id)
      this.setState({ data: this.mapToViewModel(task) })
      setSelectedTask(null)
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

  doSubmit = async () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    let updatedTasks = [...this.props.tasks]
    const tempTask = updatedTasks.find(t => t._id === data._id)
    const index = updatedTasks.indexOf(tempTask)

    if (tempTask) {
      data.isChecked = tempTask.isChecked
      data.isPublic = tempTask.isPublic
    }

    const { data: task } = await saveTask(data)

    tempTask
      ? (updatedTasks[index] = task)
      : (updatedTasks = [task, ...this.props.tasks])

    this.props.setTasks(updatedTasks)
    this.props.setAllTasks(updatedTasks)
    this.setState({
      data: {
        subjectId: '',
        resourceId: '',
        content: '',
        url: '',
        repeat: '',
      },
    })
    this.props.showForm()
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

export default TasksForm
