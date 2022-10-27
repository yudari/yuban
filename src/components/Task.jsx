import { useState } from 'react'

const Task = ({
  name,
  details,
  id,
  provided,
  handleUpdate,
  handleRemove,
  show,
  inputTitleRef,
  showEditTodo,
  exitEditTodo,
  handleAdd,
  setInputTitleFinal,
  setInputDescFinal,
  inputDescRef,
  exitInputDesc,
  exitInputTitle,
  snapshot,
  btnEditTodo,
  index,
  btnExitEditTodo,
  btnUpdateTodo,
}) => {
  const [inputTitle, setInputTitle] = useState(name)
  const [inputDesc, setInputDesc] = useState(details)
  return (
    <div
      className='task'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <input
        name='titleTodo'
        ref={inputTitleRef}
        type='text'
        placeholder='Judul todo'
        className='task-name-input-title'
        value={inputTitle}
        disabled
        onBlur={(e) => exitInputTitle()}
        onChange={(e) => {
          setInputTitle(e.target.value)
          setInputTitleFinal(e.target.value)
        }}
      />

      <textarea
        ref={inputDescRef}
        name='descTodo'
        type='text'
        placeholder='Deskripsi todo'
        className='task-name-input-desc'
        rows={5}
        value={inputDesc}
        onBlur={(e) => exitInputDesc()}
        onChange={(e) => {
          setInputDesc(e.target.value)
          setInputDescFinal(e.target.value)
        }}
        disabled
      />
      {/* <h2 className='task-name over-hide'>{name}</h2>
      <p className='task-details'>{details}</p> */}

      <div className='control-submit-bar hidden-bar'>
        <span>
          <i
            ref={btnExitEditTodo}
            class='uil uil-minus remove-bar'
            onClick={() => exitEditTodo(id, index)}
          ></i>
        </span>
        <span>
          <i
            ref={btnUpdateTodo}
            class='uil uil-check submit-bar'
            onClick={(e) => handleUpdate(e, id, index)}
          ></i>
        </span>
      </div>

      <div className='control-submit-bar show-bar'>
        <span>
          <i
            ref={btnEditTodo}
            class='uil uil-edit edit-bar'
            onClick={(e) => showEditTodo(provided, id, index)}
          ></i>
        </span>
        <span>
          <i
            class='uil uil-times-square edit-bar'
            onClick={(e) => handleRemove(id, e)}
          ></i>
        </span>
      </div>
    </div>
  )
}

export default Task
