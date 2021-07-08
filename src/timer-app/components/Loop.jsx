import Interval from './Interval'
import { useState } from 'react'

const Loop = () => {
  const [handleIntervalSubmit, setHandleIntervalSubmit] = useState()
  let formEvent

  const handleSubmit = e => {
    formEvent = e
    e.preventDefault()

    // const errors = validate()
    // setErrors(errors || {})
    // if (errors) return

    // doSubmit()
  }

  return (
    // <form
    //   onSubmit={() => {
    //     handleSubmit()
    //     handleIntervalSubmit()
    //   }}
    // >
    <div onSubmit={handleIntervalSubmit}>
      <h2>Loop</h2>
      <Interval
        setHandleSubmit={setHandleIntervalSubmit}
        formEvent={formEvent}
      />
      {/* <Interval
        setHandleSubmit={setHandleIntervalSubmit}
        formEvent={formEvent}
      />
      <Interval
        setHandleSubmit={setHandleIntervalSubmit}
        formEvent={formEvent}
      /> */}
      <button className='btn btn-primary'>Submit</button>
    </div>
  )
}

export default Loop
