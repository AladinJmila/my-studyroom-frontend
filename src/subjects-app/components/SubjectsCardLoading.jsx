import 'react-circular-progressbar/dist/styles.css'
import {
  backgroundOpacity,
  mainContentStyle,
} from '../../services/stylesService'
import Spinner from './../../common/Spinner'

const SubjectsCardLoading = ({}) => {
  return (
    <div style={backgroundOpacity} className='card mb-1 opacity'>
      <div className='card-body'>
        <div style={{ ...mainContentStyle, height: 200 }}>
          <Spinner />
        </div>
      </div>
    </div>
  )
}

export default SubjectsCardLoading
