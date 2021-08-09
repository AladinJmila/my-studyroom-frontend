import { useEffect, useState, useRef, forwardRef } from 'react'
import ScrollTop from '../../common/ScrollTop'
import SideBar from './SideBar'

const containerStyles = {
  margin: '5px 10px',
  minWidth: 500,
  maxWidth: 500,
  display: 'inline-block',
  height: '90vh',
}

if (window.innerWidth < 500) {
  containerStyles.minWidth = window.innerWidth - 55
  containerStyles.maxWidth = window.innerWidth - 55
}
const DataColumn = forwardRef(
  ({ name, data, color, icon, show, count, setShow }, ref) => {
    const [showScrollTop, setShowScrollTop] = useState(false)
    const myRef = useRef()
    const topRef = useRef()
    const divRef = useRef()

    const handleScrollTop = () => {
      topRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const toggleShowScrollTop = () => {
      const div = divRef.current
      const scrolled = div.scrollTop
      setShowScrollTop(scrolled > 300 ? true : false)
    }

    return (
      <div ref={myRef}>
        <div
          ref={ref}
          style={{ padding: 0, height: '100%' }}
          className='data-column'
        >
          <SideBar
            name={name}
            color={color}
            icon={icon}
            show={show}
            count={count}
            setShow={setShow}
            itemRef={myRef}
          />
          {show && (
            <div
              ref={divRef}
              onScroll={toggleShowScrollTop}
              style={containerStyles}
              className='y-scroll'
            >
              <div ref={topRef}></div>
              {showScrollTop && <ScrollTop onClick={handleScrollTop} />}
              <h2>{name}</h2>
              {data}
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default DataColumn
