import React, { useCallback, useState } from 'react'
import AddEventButton from './AddEventButton'

const EventBar = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
  const [titleProject, setTitleProject] = useState('')
  const [showInput, setShowInput] = useState(false)
  const handleAdd = useCallback(() => {
    // const title = prompt('Masukkan nama project Todo anda')
    setShowInput(!showInput)
  }, [showInput])
  const saveProject = useCallback(() => {
    // if (
    //   events.find(
    //     (event) => event.title.toLowerCase() === titleProject.toLowerCase()
    //   )
    // ) {
    //   alert('Event Already Existed')
    //   return
    // }
    // Add new event
    if (titleProject) {
      setEvents((prev) => [
        ...prev,
        {
          title: titleProject,
          ['To do']: [],
          ['In progress']: [],
          ['Completed']: [],
        },
      ])
      setShowInput(!showInput)
      setTitleProject('')
    }
  }, [titleProject])

  const cancelProject = useCallback(() => {
    setShowInput(!showInput)
  }, [showInput])
  console.log(events)
  return (
    <div className='event-bar'>
      <h1 className='event-bar-title'>Yuban</h1>
      <AddEventButton handleClick={handleAdd} />
      {showInput && (
        <div className='form__input__project'>
          <input
            type='text'
            className='input__project'
            value={titleProject}
            onChange={(e) => setTitleProject(e.target.value)}
            placeholder='Masukkan judul project'
          />
          <div className='button-container-project'>
            <button onClick={cancelProject} className='btn btn-cancel'>
              Cancel
            </button>
            <button onClick={saveProject} className='btn btn-save'>
              Save
            </button>
          </div>
        </div>
      )}

      <div className='event-container'>
        {events.map((item) => (
          <div
            key={item.title}
            className={`event over-hide ${
              currentEvent.title === item.title ? 'selected-event' : ''
            }`}
            onClick={() => setCurrentEvent(item)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventBar
