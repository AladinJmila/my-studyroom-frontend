const ScrollTop = ({ onClick }) => {
  return (
    <div
      className='text-center'
      style={{
        position: 'sticky',
        top: window.innerHeight * 0.8,
        width: '100%',
        // border: 'black 3px solid',
        zIndex: 2000,
        height: 0,
      }}
    >
      <i
        onClick={onClick}
        className='fa fa-3x fa-arrow-circle-up'
        aria-hidden='true'
      ></i>
    </div>
  )
}

export default ScrollTop
