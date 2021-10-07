const NavDate = ({ date, dayIndex, setDayIndex, maxIndex }) => {
  const handleDateBackward = () => {
    dayIndex > 0 && setDayIndex(--dayIndex)
    // console.log(dayIndex)
  }
  const handleDateForward = () => {
    dayIndex < maxIndex && setDayIndex(++dayIndex)
    // console.log(dayIndex)
  }

  return (
    <div
      className='d-flex justify-content-between'
      style={{ borderBottom: '1px grey solid', color: 'grey' }}
    >
      <i
        onClick={handleDateBackward}
        className='fa fa-chevron-left pointer'
        aria-hidden='true'
      ></i>
      <h5 className='text-center'>{date}</h5>
      <i
        onClick={handleDateForward}
        className='fa fa-chevron-right pointer'
        aria-hidden='true'
      ></i>
    </div>
  )
}

export default NavDate
