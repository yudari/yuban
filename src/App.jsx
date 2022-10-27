import './App.css'
import './components/event.css'
import './components/task.css'
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import EventBar from './components/EventBar'
import TaskBox from './components/TaskBox'
import ModalInput from './components/ModalInput'
import { useRef } from 'react'

function App() {
  const initEvent = useMemo(
    () => [
      {
        title: 'Tambahkan Rencana Todo',
        ['To do']: [],
        ['In progress']: [],
        ['Completed']: [],
      },
    ],
    []
  )

  const [events, setEvents] = useState(() => {
    return localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : initEvent
  })

  const [currentEvent, setCurrentEvent] = useState(events[0])
  const modalActiveRef = useRef()
  const [title, setTitle] = useState('')
  const updateEvents = useCallback(async () => {
    try {
      if (!events.length) {
        await localStorage.setItem('events', JSON.stringify(initEvent))
        setEvents(JSON.parse(localStorage.getItem('events')))
      } else {
        await localStorage.setItem('events', JSON.stringify(events))
      }
    } catch (e) {
      console.error('Failed to modify events!')
    }
  }, [events])

  const onActiveEventModal = (target) => {
    target.current.classList.add('active-modal')
  }
  const onModalClose = () => {
    modalActiveRef.current.classList.remove('active-modal')
    setTitle('')
  }
  const setTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onSendNewEvent = () => {
    setTitle((prev) => prev)
  }
  // Set localStorage
  useEffect(() => {
    updateEvents()
  }, [events])

  return (
    <div className='App'>
      <EventBar
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      />
      <TaskBox
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      />

      <footer className='footer-app'>
        &#169; Yudhacode 2022. All right reserved
      </footer>

      {/* <ModalInput
        titleValue={title}
        setTitleValue={setTitleChange}
        onActiveModalRef={modalActiveRef}
        onSubmitEvent={onSendNewEvent}
        modalClose={onModalClose}
      /> */}
    </div>
  )
}

export default App
