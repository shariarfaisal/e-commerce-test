import React from 'react'

const Filter = ({ setFilter, filter }) => {
  const pendingHandler = (e) => {
    if(filter !== 'pending'){
      setFilter('pending')
    }
  }

  const confirmHandler = e => {
    if(filter !== 'confirm'){
      setFilter('confirm')
    }
  }

  const cancelHandler = e => {
    if(filter !== 'cancel'){
      setFilter('cancel')
    }
  }


  return(
    <div style={{fontSize: '1.2rem'}} className="d-flex my-3">
      <div onClick={pendingHandler}
        className={`mx-2 bg-${filter === 'pending' ? 'primary text-light': 'light text-primary'} shadow-sm border px-4 py-3 pointer`}>
        Pending
      </div>
      <div
        onClick={confirmHandler}
        className={`mx-2 bg-${filter === 'confirm' ? 'primary text-light': 'light text-success'} shadow-sm border px-4 py-3 pointer`}>
        Confirm
      </div>
      <div
        onClick={cancelHandler}
        className={`mx-2 bg-${filter === 'cancel' ? 'primary text-light': 'light text-danger'} shadow-sm border px-4 py-3 pointer`}>
        Cancel
      </div>
    </div>
  )
}
export default Filter
