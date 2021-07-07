import { useEffect, useRef } from 'react'
import SideBar from './SideBar'

const containerStyles = {
  margin: '5px 10px',
  minWidth: 500,
  maxWidth: 600,
  display: 'inline-block',
  height: '90vh',
}

if (window.innerWidth < 500) {
  containerStyles.minWidth = window.innerWidth - 50
  containerStyles.maxWidth = window.innerWidth
}

const DataColumn = ({
  name,
  data,
  color,
  icon,
  show,
  count,
  setShow,
  setRef,
}) => {
  const ref = useRef()
  useEffect(() => {
    setRef(ref)
  }, [])

  return (
    <div ref={ref} id={name} style={{ padding: 0 }} className='data-column'>
      <SideBar
        name={name}
        color={color}
        icon={icon}
        show={show}
        count={count}
        setShow={setShow}
      />
      {show && (
        <div style={containerStyles} className='y-scroll'>
          <h2>{name}</h2>
          {data}
        </div>
      )}
    </div>
  )
}

export default DataColumn
