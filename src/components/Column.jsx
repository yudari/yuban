import AddTaskButton from './AddTaskButton'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import uuid from 'react-uuid'
import { useCallback, useRef, useState } from 'react'

const Column = ({ tag, currentEvent, events, setEvents }) => {
  const [showTodo, setShowTodo] = useState(false)
  const [inputTitle, setInputTitle] = useState('')
  const [inputDesc, setInputDesc] = useState('')

  const inputTitleRef = useRef()
  const inputDescRef = useRef()
  const btnEditTodo = useRef()
  const btnExitEditTodo = useRef()
  const btnUpdateTodo = useRef()
  const handleAdd = (e) => {
    setEvents((prev) => {
      const arrCopy = [...prev]
      const index = prev.findIndex(
        (event) => event.title === currentEvent.title
      )
      const eventCopy = arrCopy[index]
      // Remove old and add the latest data
      arrCopy.splice(index, 1, {
        ...eventCopy,
        [tag]: [{ name: '', id: uuid(), details: '' }, ...eventCopy[tag]],
      })
      return arrCopy
    })
    // const name = prompt('Enter task name:')
    // const details = prompt('Enter details:')
    // if (!(name && details)) return
    // setEvents((prev) => {
    //   const arrCopy = [...prev]
    //   const index = prev.findIndex(
    //     (event) => event.title === currentEvent.title
    //   )
    //   const eventCopy = arrCopy[index]
    //   // Remove old and add the latest data
    //   arrCopy.splice(index, 1, {
    //     ...eventCopy,
    //     [tag]: [
    //       ...eventCopy[tag],
    //       { name: name, id: uuid(), details: details },
    //     ],
    //   })
    //   return arrCopy
    // })
  }

  const handleRemove = (id, e) => {
    // 禁止冒泡到上层:修改task
    e.stopPropagation()
    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          const taskList = event[tag]
          const index = taskList.findIndex((item) => item.id === id)
          taskList.splice(index, 1)
          return { ...event, [tag]: [...taskList] }
        } else {
          return event
        }
      })
    )
  }

  const handleUpdate = (e, id, index) => {
    const name =
      e.target.parentElement.parentElement.parentElement.children[0].value
    const details =
      e.target.parentElement.parentElement.parentElement.children[1].value
    const domContainerTodoItem =
      btnEditTodo.current.parentElement.parentElement.parentElement
        .parentElement.children[index]
    if (!(name && details)) {
      return
    } else {
      setEvents((prev) =>
        prev.map((event) => {
          if (event.title === currentEvent.title) {
            const taskList = event[tag]
            const index = taskList.findIndex((item) => item.id === id)
            const updatedTask = {
              ...taskList[index],
              name,
              details,
            }
            taskList.splice(index, 1)
            return { ...event, [tag]: [...taskList, updatedTask] }
          } else {
            return event
          }
        })
      )
      if (domContainerTodoItem.attributes[2].textContent === id) {
        domContainerTodoItem.children[2].classList.remove('show-bar')
        domContainerTodoItem.children[2].classList.add('hidden-bar')
        domContainerTodoItem.children[3].classList.remove('hidden-bar')
        domContainerTodoItem.children[3].classList.add('show-bar')
        domContainerTodoItem.children[0].setAttribute('disabled', '')
        domContainerTodoItem.children[1].setAttribute('disabled', '')
      }
    }
  }

  const showEditTodo = (dragPropsId, id, index) => {
    const domContainerTodoItem =
      btnEditTodo.current.parentElement.parentElement.parentElement
        .parentElement.children[index]
    if (domContainerTodoItem.attributes[2].textContent === id) {
      console.log(domContainerTodoItem)
      domContainerTodoItem.children[2].classList.remove('hidden-bar')
      domContainerTodoItem.children[2].classList.add('show-bar')
      domContainerTodoItem.children[3].classList.remove('show-bar')
      domContainerTodoItem.children[3].classList.add('hidden-bar')

      domContainerTodoItem.children[0].removeAttribute('disabled')
      domContainerTodoItem.children[1].removeAttribute('disabled')
      domContainerTodoItem.children[0].focus()
    }
    // if (
    //   btnEditTodo.current.parentElement.parentElement.classList[1] ===
    //   'show-bar'
    // ) {
    //   btnEditTodo.current.parentElement.parentElement.parentElement.children[3].classList.remove(
    //     'show-bar'
    //   )
    //   btnEditTodo.current.parentElement.parentElement.parentElement.children[3].classList.add(
    //     'hidden-bar'
    //   )

    //   btnEditTodo.current.parentElement.parentElement.parentElement.children[2].classList.remove(
    //     'hidden-bar'
    //   )
    //   btnEditTodo.current.parentElement.parentElement.parentElement.children[2].classList.add(
    //     'show-bar'
    //   )
    // }
  }

  const exitEditTodo = (id, index) => {
    const domContainerTodoItem =
      btnExitEditTodo.current.parentElement.parentElement.parentElement
        .parentElement.children[index]
    if (domContainerTodoItem.attributes[2].textContent === id) {
      console.log(domContainerTodoItem)
      domContainerTodoItem.children[2].classList.remove('show-bar')
      domContainerTodoItem.children[2].classList.add('hidden-bar')
      domContainerTodoItem.children[3].classList.remove('hidden-bar')
      domContainerTodoItem.children[3].classList.add('show-bar')
      domContainerTodoItem.children[0].setAttribute('disabled', '')
      domContainerTodoItem.children[1].setAttribute('disabled', '')
    }
    // setShowTodo(false)
    // inputTitleRef.current.style.borderBottom = '0px'
  }

  const exitInputTitle = () => {
    inputTitleRef.current.borderBottom = '0px'
  }

  const exitInputDesc = () => {
    inputDescRef.current.borderBottom = '0px'
  }

  console.log(currentEvent)
  return (
    <div className='column'>
      {tag}
      <AddTaskButton handleClick={handleAdd} />
      <Droppable droppableId={tag}>
        {(provided, snapshot) => {
          return (
            <div
              className='task-container'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {events
                .find((event) => event.title === currentEvent.title)
                ?.[tag].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Task
                        index={index}
                        show={showTodo}
                        name={item.name}
                        details={item.details}
                        id={item.id}
                        provided={provided}
                        snapshot={snapshot}
                        handleRemove={handleRemove}
                        handleUpdate={handleUpdate}
                        inputTitleRef={inputTitleRef}
                        inputDescRef={inputDescRef}
                        showEditTodo={showEditTodo}
                        exitEditTodo={exitEditTodo}
                        handleAdd={handleAdd}
                        setInputTitleFinal={setInputTitle}
                        setInputDescFinal={setInputDesc}
                        exitInputDesc={exitInputDesc}
                        exitInputTitle={exitInputTitle}
                        btnEditTodo={btnEditTodo}
                        btnExitEditTodo={btnExitEditTodo}
                        btnUpdateTodo={btnUpdateTodo}
                      />
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}

export default Column
