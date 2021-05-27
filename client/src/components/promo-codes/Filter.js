import React from 'react'

const Filter = ({ setFilter, filter }) => {
  return(
    <div style={{fontSize: '1.2rem'}} className="d-flex my-3">
      <div
        onClick={e => {
          if(filter !== ''){
            setFilter('')
          }
        }}
        className={`mx-2 bg-${!filter?'primary text-light': 'light text-info'} px-4 py-3 pointer shadow-sm`}>
        <span>All</span>
      </div>
      <div
        onClick={e =>{
          if(filter !== 'active'){
            setFilter('active')
          }
        }}
        className={`mx-2 bg-${filter === 'active'?'primary text-light': 'light text-success'} px-4 py-3 pointer shadow-sm`}>
        <span>Active</span>
      </div>
      <div
        onClick={e =>{
          if(filter !== 'unactive'){
            setFilter('unactive')
          }
        }}
        className={`mx-2 bg-${filter === 'unactive'?'primary text-light': 'light text-danger'} px-4 py-3 pointer shadow-sm`}>
        <span>Unactive</span>
      </div>
    </div>
  )
}
export default Filter
