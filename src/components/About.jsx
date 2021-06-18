import image from '../static/images/AlaeddineJmila.jpg'

const About = () => {
  return (
    <div className='container full-height'>
      <h2>About</h2>
      <div>
        <img className='image-cropper' src={image} />
      </div>
    </div>
  )
}

export default About
