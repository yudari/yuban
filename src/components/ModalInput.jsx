import React from 'react'
import { useRef } from 'react'

const ModalInput = ({
  titleValue,
  setTitleValue,
  onActiveModalRef,
  onSubmitEvent,
  modalClose,
}) => {
  const modalViewInput = useRef()

  return (
    <div class='services__modal' ref={onActiveModalRef}>
      <div class='services__modal-content' ref={modalViewInput}>
        <i class='uil uil-times services__modal-close' onClick={modalClose}></i>

        <div action='' className='form__inputs'>
          <div className='inputs__form'>
            <div className='event__content'>
              <label htmlFor='' className='event__label'>
                Project
              </label>
              <input
                type='text'
                className='event__input'
                value={titleValue}
                onChange={setTitleValue}
                placeholder='Masukkan nama project'
              />
            </div>
          </div>
          <div className='button__container'>
            <a onClick={onSubmitEvent} class='button button--flex'>
              Buat <i class='uil uil-message button__icon'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalInput
