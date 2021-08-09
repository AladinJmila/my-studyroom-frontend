import Subjects from './Subjects'
import { useState, useRef } from 'react'
import ScrollTop from '../../common/ScrollTop'

const SubjectsWrapper = ({ showSubjects }) => {
  const [showScrollTop, setShowScrollTop] = useState()
  const topRef = useRef()
  const divRef = useRef()

  const handleScrollTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleShowScrollTop = () => {
    const div = divRef.current
    const scrolled = div.scrollTop
    setShowScrollTop(scrolled > 500 ? true : false)
  }

  const subjectsStyle = {
    paddingRight: 0,
    minWidth: 330,
    display: 'block',
    height: '92vh',
  }

  subjectsStyle.display = showSubjects ? 'block' : 'none'
  return (
    <div
      ref={divRef}
      onScroll={toggleShowScrollTop}
      style={subjectsStyle}
      className='col-2 y-scroll subjects'
    >
      <div ref={topRef}></div>
      {showScrollTop && <ScrollTop onClick={handleScrollTop} />}
      <h2>Subjects</h2>
      <div>
        <Subjects />
      </div>
    </div>
  )
}

export default SubjectsWrapper
