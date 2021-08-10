const ScrollTop = ({ onClick }) => {
  const divStyle = {
    position: 'sticky',
    top: (window.innerHeight - 110) * 0.9,
    width: '100%',
    zIndex: 2000,
    height: 0,
  }

  return (
    <div className='text-center' style={divStyle}>
      <i
        onClick={onClick}
        className='fa fa-3x fa-arrow-circle-up to-top-icon'
        aria-hidden='true'
      ></i>
    </div>
  )
}

export default ScrollTop
