import { useEffect, useRef, forwardRef } from 'react'
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
  ({ name, data, color, icon, show, count, setShow, setRef }, ref) => {
    const myRef = useRef()
    useEffect(() => {
      setRef(myRef)
    }, [])
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
            <div style={containerStyles} className='y-scroll'>
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
