import image from '../static/images/AlaeddineJmila.jpg'

const About = () => {
  return (
    <div className='container full-height'>
      <h2>About</h2>
      <div className='center'>
        <h5>
          Created by: <b>Alaeddine Jmila</b>
        </h5>
        <div className='center'>
          <a
            href='https://github.com/AladinJmila'
            target='_blank'
            rel='noreferrer'
            style={{ color: 'inherit' }}
          >
            <i
              className='fa fa-github-square fa-2x mr-2'
              aria-hidden='true'
            ></i>
          </a>

          <a
            href='https://www.linkedin.com/in/alaeddine-jmila/'
            target='_blank'
            rel='noreferrer'
            style={{ color: 'inherit' }}
          >
            <i
              className='fa fa-linkedin-square fa-2x ml-2'
              aria-hidden='true'
            ></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
