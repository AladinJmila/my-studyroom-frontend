import { aboutStyles } from '../services/stylesService'
import image from '../static/images/AlaeddineJmila.jpg'

const About = () => {
  return (
    <div className='container full-height text-center'>
      <div style={aboutStyles} className='mt-3 mb-4 p-3'>
        <h3>Introduction</h3>
        <p>
          I spent the last year learning programming with a hope of combining
          this new skill with my previous architectural experience to bring my
          ideas to life. I was able to achieve this in a relatively short time
          thanks to the generosity of the tech community all over the internet.
          I obtained the majority of learning material for free, and when a
          course required payment, the price was miniscule compared to the value
          I got in return. The next natural step for me is to reciprocate and I
          am hoping that this app would be the first step.
        </p>
        <h3 className='mt-4'>Driving reasons for the development of the app</h3>
        <p>
          My long awaited wish is to be able to convert my ideas into practical
          solutions. Although architecture can be a great form of expression, it
          is quite expensive and it has not worked out well for me so far. I
          needed an alternative and programming was the next candidate. <br />
          Throughout my learning journey, I used various tools to keep track of
          my progress, resources, notes etc... and few others to structure my
          study. I needed a central repository where all my learning tools could
          reside. In addition to that, I needed a showcase of my programming
          skills in order to start applying for jobs. Those were the two main
          catapults for creating this app.
        </p>
        <h3 className='mt-4'>The hidden reason</h3>
        <p>
          Another main ingredient was my desire to make a successful product so
          others can build on my experience. I needed to make sure that it works
          well for me, for it to have a chance to work for others. I was already
          asked by people I know to share my learning experience, because they
          were also taking a step into the world of programming. However, the
          lack of a central resource made it impractical and I was not able to
          provide the help I desired. So, I am hoping to do that with the help
          of this app for my future learning journeys and provide the tool for
          others to do the same if they so desire.
        </p>
        <h3 className='mt-4'>Upcoming features</h3>
        <p>
          Although there are a lot of great videos and tutorials that inspired
          my current learning approach, as far as I have seen, they all lacked a
          centralized tool that would help put in practice their advice and
          techniques. I do not claim that I will be providing ”The Tool”, but
          rather a prototype that I am hoping to refine over time with the help
          of users input, and equip it with enough flexibility so it can be
          shaped to meet the unique needs of individuals.
        </p>
      </div>
      <hr />
      <footer className='text-center'>
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
      </footer>
    </div>
  )
}

export default About
