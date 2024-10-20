import React from 'react'
import httpService, { baseURL } from '../store/services/httpService'

const AudioNotesDownload = ({ group }) => {
  const handleDownload = async () => {
    for (let index = 0; index < group.children.length; index++) {
      const child = group.children[index]
      try {
        const { data } = await httpService.get(
          `${baseURL}/audioNotes/stream/${child.track.name}`,
          { responseType: 'blob' }
        )
        const blob = new Blob([data], { type: 'audio/webm' })

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${index + 1} - ${group.name}`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
        console.log('Downloaded')

        // Introduce a slight delay so it doesn't skip some audion notes
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.log('Error downloading the audio file: ', error)
      }
    }
  }

  return (
    <div className="audio-notes-download" title="Download Notes">
      <i
        onClick={handleDownload}
        className="fa fa-download pointer"
        aria-hidden="true"
      ></i>
    </div>
  )
}

export default AudioNotesDownload
