import Joi from 'joi-browser'
import { connect } from 'react-redux'
import Form from '../../common/Form'
import { createSubject } from '../../store/apps/subjectsActions'

class SubjectsForm extends Form {
  state = {
    data: { name: '' },
    errors: {},
  }

  schema = {
    name: Joi.string().required().label('Subject'),
  }

  // componentDidMount() {
  //   const { subjects, selectedSubject } = this.props
  //   if (selectedSubject) {
  //     const subject = subjects.find(
  //       subject => subject._id === selectedSubject._id
  //     )
  //     this.setState({ data: this.mapToViewModel(subject) })
  //   }
  // }

  // mapToViewModel = subject => {
  //   return { name: subject.name }
  // }

  doSubmit = () => {
    this.props.createSubject(this.state.data)
    this.props.toggleShowForm()
    this.setState({ data: { name: '' } })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('name', 'Subject')}
        {this.renderButton('Save', 'btn btn-block btn-dark mb-3')}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.apps.subjects.list,
  selectedSubject: state.apps.subjects.selectedSubject,
})

const mapDispatchToProps = dispatch => ({
  createSubject: subject => dispatch(createSubject(subject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsForm)
