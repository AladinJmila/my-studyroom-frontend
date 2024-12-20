import React from 'react'
import './ConfirmationModal.css'

const ConfirmationModal = ({
  message,
  setShowConfimationModal,
  setProceedWithOperation,
}) => {
  return (
    <div className="confiramtion-modal">
      <h6 className="text-truncate px-3">{message}</h6>
      <hr className="mb-2 mx-3" />
      <div className="d-flex justify-content-around">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setProceedWithOperation(true)
            setShowConfimationModal(false)
          }}
        >
          Yes
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            setProceedWithOperation(false)
            setShowConfimationModal(false)
          }}
        >
          No
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal
