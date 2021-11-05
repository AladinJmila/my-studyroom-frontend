import Joi from 'joi-browser';
import { connect } from 'react-redux';
import Form from './../../common/Form';
import { appsFormStyle } from '../../services/stylesService';
import {
  createTask,
  updateTask,
  clearSelectedTask,
} from '../../store/apps/tasksActions';
import {
  updateSubjectItemsCount,
  // updateSubjectOnEdit,
} from '../../store/apps/subjectsActions';

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
  };

  schema = {
    _id: Joi.string(),
    subjectId: Joi.string().required().label('Subject'),
    resourceId: Joi.string().allow(''),
    content: Joi.string().required().max(500).label('Task'),
    url: Joi.string().max(500).allow('').label('URL'),
  };

  setFormHeight() {
    this.newAppsFormStyle = { ...appsFormStyle };
    this.newAppsFormStyle.maxHeight = window.innerHeight - 250;
  }

  componentDidMount() {
    this.setFormHeight();

    const { subjects, resources, selectedTask, selectedSubject } = this.props;
    this.setState({ subjects, resources });

    if (selectedSubject)
      this.setStateOnSubjectSelect(selectedSubject, resources);

    if (selectedTask)
      this.setState({ data: this.mapToViewModel(selectedTask) });
  }

  componentDidUpdate(prevProps, prevState) {
    const { resources, selectedSubject } = this.props;
    if (prevProps.selectedSubject !== selectedSubject)
      this.setStateOnSubjectSelect(selectedSubject, resources);
  }

  setStateOnSubjectSelect = (selectedSubject, resources) => {
    const filteredResources = resources.filter(
      r => r.subject._id === selectedSubject._id
    );

    this.setState({
      resources: filteredResources,
      data: {
        subjectId: selectedSubject._id,
        resourceId: '',
        content: '',
        url: '',
      },
    });
  };

  mapToViewModel = task => {
    if (task.resource)
      return {
        _id: task._id,
        subjectId: task.subject._id,
        resourceId: task.resource._id,
        content: task.content,
        url: task.url || '',
      };

    return {
      _id: task._id,
      subjectId: task.subject._id,
      content: task.content,
      url: task.url || '',
    };
  };

  doSubmit = () => {
    const data = { ...this.state.data };
    data.creatorId = this.props.user._id;

    const {
      createTask,
      updateTask,
      selectedTask,
      clearSelectedTask,
      updateSubjectOnEdit,
      updateSubjectItemsCount,
    } = this.props;

    if (selectedTask) {
      data.isChecked = selectedTask.isChecked;
      data.starred = selectedTask.starred;
      data.isPublic = selectedTask.isPublic;
      updateTask(data);
      // updateSubjectOnEdit(selectedTask, data, 'Tasks');
      clearSelectedTask();
    } else {
      createTask(data);
      updateSubjectItemsCount(data, 'Tasks', 'create');
    }

    this.props.toggleShowForm();
    this.setState({
      data: {
        subjectId: '',
        resourceId: '',
        content: '',
        url: '',
      },
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={this.newAppsFormStyle}>
        {this.renderSelect(
          'subjectId',
          'Subject',
          this.state.subjects,
          'required'
        )}
        {this.renderInput('content', 'Task', 'text', 'required')}
        {this.renderSelect('resourceId', 'Resource', this.state.resources)}
        {this.renderInput('url', 'URL')}
        <div className='d-grid gap-2'>
          {this.renderButton('Save', 'btn btn-dark mb-2')}
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
  selectedSubject: state.apps.subjects.selectedSubject,
  resources: state.apps.resources.list,
  selectedTask: state.apps.tasks.selectedTask,
});

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task)),
  updateTask: task => dispatch(updateTask(task)),
  clearSelectedTask: () => dispatch(clearSelectedTask()),
  // updateSubjectOnEdit: (itemInDb, item, itemName) =>
  //   dispatch(updateSubjectOnEdit(itemInDb, item, itemName)),
  updateSubjectItemsCount: (item, itemName, operation) =>
    dispatch(updateSubjectItemsCount(item, itemName, operation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksForm);
