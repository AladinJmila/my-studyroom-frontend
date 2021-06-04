import SideBar from './SideBar'

const DataColumn = ({
  name,
  data,
  color,
  icon,
  show,
  sortedCount,
  setSortedCount,
  setShow,
}) => {
  // if (sortedCount) {
  //   setShow(true)
  // } else {
  //   setShow(false)
  //   // setSortedCount(1)
  // }
  // sortedCount ? setShow(true) : setShow(false)
  // console.log(sortedCount)
  return (
    <div style={{ padding: '0 0 0 0' }} className='data-column col'>
      <SideBar
        name={name}
        color={color}
        icon={icon}
        show={show}
        setShow={setShow}
      />
      {show && (
        <div className='cell y-scroll'>
          <h2>{name}</h2>
          {data}
        </div>
      )}
    </div>
  )
}

export default DataColumn
