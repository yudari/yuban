import React, { useCallback } from 'react'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {
  const [eventHeader, setEventHeader] = useState(currentEvent)
  const [showHeaderEvent, setShowHeaderEvent] = useState(false)
  const btnConfirm = useRef()
  const inputHeaderEventRef = useRef()
  const handleRemove = useCallback(() => {
    btnConfirm.current.classList.add('active')

    // if (confirm('You really want to remove it?')) {
    //   // update events
    //   setEvents((prev) => {
    //     const result = prev.filter((item) => item.title != currentEvent.title)
    //     // if event is empty
    //     if (!result.length) {
    //       // init the event
    //       const initEvent = [
    //         {
    //           title: 'Add a new Event',
    //           ['To do']: [],
    //           ['In progress']: [],
    //           ['Completed']: [],
    //         },
    //       ]
    //       setEvents(initEvent)
    //     } else {
    //       // set the first event as current
    //       setCurrentEvent(result[0])
    //     }
    //     return result
    //   })
    // }
  }, [])

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return
      const { source, destination } = result
      const curEvent = events.find((item) => item.title === currentEvent.title)
      const taskCopy = curEvent[source.droppableId][source.index]
      setEvents((prev) =>
        prev.map((event) => {
          if (event.title === currentEvent.title) {
            let eventCopy = { ...event }
            // Remove from source
            const taskListSource = event[source.droppableId]
            taskListSource.splice(source.index, 1)
            eventCopy = { ...event, [source.droppableId]: taskListSource }
            // Add to destination

            const taskListDes = event[destination.droppableId]
            taskListDes.splice(destination.index, 0, taskCopy)
            eventCopy = { ...event, [destination.droppableId]: taskListDes }

            return eventCopy
          } else {
            return event
          }
        })
      )
    },
    [events, setEvents, currentEvent]
  )
  const onCancelRemove = () => {
    btnConfirm.current.classList.remove('active')
  }
  const onRemoveProject = useCallback(() => {
    setEvents((prev) => {
      const result = prev.filter((item) => item.title != currentEvent.title)
      // if event is empty
      if (!result.length) {
        // init the event
        const initEvent = [
          {
            title: 'Buat project baru',
            ['To do']: [],
            ['In progress']: [],
            ['Completed']: [],
          },
        ]
        setEvents(initEvent)
      } else {
        // set the first event as current
        setCurrentEvent(result[0])
      }
      return result
    })
    btnConfirm.current.classList.remove('active')
  }, [events, setEvents, currentEvent, setCurrentEvent])

  useEffect(() => {
    setEventHeader(currentEvent)
  }, [currentEvent])
  console.log(eventHeader)
  return (
    <div className='task-box'>
      <header className='task-box-header'>
        <input
          ref={inputHeaderEventRef}
          type='text'
          className='task-box-title'
          value={eventHeader.title}
          onChange={(e) => setEventHeader(e.target.value)}
          disabled={showHeaderEvent ? false : true}
        />

        <button className='remove-button' onClick={handleRemove}>
          <i class='uil uil-trash-alt'></i>
        </button>
        <div className='button-remove-container' ref={btnConfirm}>
          <button className='btn btn-cancel' onClick={onCancelRemove}>
            Cancel
          </button>
          <button className='btn btn-remove' onClick={onRemoveProject}>
            Remove
          </button>
        </div>

        <div className='edit-button'>
          {!showHeaderEvent && (
            <i
              class='uil uil-pen btn-edit-project'
              onClick={(e) => {
                setShowHeaderEvent(!showHeaderEvent)
              }}
            ></i>
          )}
          {showHeaderEvent && (
            <i
              class='uil uil-check  btn-edit-project'
              onClick={(e) => {
                // setEvents((prev) => {
                //   const filterData = prev.filter(
                //     (value, index) => value.title !== currentEvent.title
                //   )
                //   return [
                //     ...filterData,
                //     {
                //       title: eventHeader.title,
                //       ...currentEvent,
                //     },
                //   ]
                // })

                setEvents((prev) => {
                  const filterData = prev.findIndex((value, index) => {
                    return value.title === currentEvent.title
                  })
                  const finalEvent = prev.map((value, index) => {
                    if (index === filterData) {
                      value.title = inputHeaderEventRef.current.value
                      setEventHeader(value.title)
                    }
                    return value
                  })

                  return finalEvent
                })

                setShowHeaderEvent(!showHeaderEvent)
              }}
            ></i>
          )}
        </div>
      </header>

      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className='task-box-body'>
          {['To do', 'In progress', 'Completed'].map((tag) => (
            <Column
              key={tag}
              tag={tag}
              events={events}
              setEvents={setEvents}
              currentEvent={currentEvent}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default TaskBox
