import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from './../../common/Form'
import { appsFormStyle } from '../../services/stylesService'
import {
  createTask,
  updateTask,
  clearSelectedTask,
} from '../../store/apps/tasksActions'
import {
  updateSubjectItemsCount,
  updateSubjectOnEdit,
} from '../../store/apps/subjectsActions'

class TasksForm extends Form {
  state = {
    data: {
      subjectId: '',
      resourceId: '',
      content: '',
      url: '',
    },
    subjects: [],
    resources: [],
    errors: {},
  }

  schema = {
    _id: [Joi.number(), Joi.string()],
    subjectId: Joi.string().label('Subject'),
    resourceId: Joi.string().allow(''),
    content: Joi.string().required().label('Task'),
    url: Joi.string().label('URL').allow(''),
    sessions: Joi.number().label('Sessions').allow(''),
  }

  newAppsFormStyle
  setFormHeight() {
    this.newAppsFormStyle = { ...appsFormStyle }
    this.newAppsFormStyle.maxHeight = window.innerHeight - 250
  }

  componentDidMount() {
    this.setFormHeight()

    const { subjects, resources, selectedTask } = this.props
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
      }

    return {
      _id: task._id,
      subjectId: task.subject._id,
      content: task.content,
      url: task.url,
    }
  }

  doSubmit = () => {
    const data = { ...this.state.data }
    data.userId = this.props.user._id

    const {
      createTask,
      updateTask,
      selectedTask,
      clearSelectedTask,
      updateSubjectOnEdit,
      updateSubjectItemsCount,
    } = this.props

    if (selectedTask) {
      data.isChecked = selectedTask.isChecked
      data.starred = selectedTask.starred
      data.isPublic = selectedTask.isPublic
      updateTask(data)
      updateSubjectOnEdit(selectedTask, data, 'Tasks')
      clearSelectedTask()
    } else {
      createTask(data)
      updateSubjectItemsCount(data, 'Tasks', 'create')
    }

    this.props.toggleShowForm()
    this.setState({
      data: {
        subjectId: '',
        resourceId: '',
        content: '',
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
          this.state.subjects
          // this.props.selectedSubject
        )}
        {this.renderSelect('resourceId', 'Resource', this.state.resources)}
        {this.renderInput('content', 'Task')}
        {this.renderInput('url', 'URL')}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
  selectedSubject: state.apps.subjects.selectedSubject,
  resources: state.apps.resources.list,
  selectedTask: state.apps.tasks.selectedTask,
})

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task)),
  updateTask: task => dispatch(updateTask(task)),
  clearSelectedTask: () => dispatch(clearSelectedTask()),
  updateSubjectOnEdit: (itemInDb, item, itemName) =>
    dispatch(updateSubjectOnEdit(itemInDb, item, itemName)),
  updateSubjectItemsCount: (item, itemName, operation) =>
    dispatch(updateSubjectItemsCount(item, itemName, operation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksForm)
