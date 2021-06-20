import SideBar from './SideBar'

const containerStyles = {
  margin: '5px 10px',
  minWidth: 500,
  maxWidth: 600,
  display: 'inline-block',
}

if (window.innerWidth < 500) {
  containerStyles.minWidth = window.innerWidth - 35
  containerStyles.maxWidth = window.innerWidth
}

const DataColumn = ({ name, data, color, icon, show, count, setShow }) => {
  return (
    <div style={{ padding: '0 0 0 0' }} className='data-column col'>
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
