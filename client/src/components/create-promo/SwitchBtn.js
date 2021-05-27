import React from 'react'

const SwitchBtn = ({ setPublished, published }) => (
  <div>
    <p>Published</p>
    <label className="switch_btn">
      <input id="published" onChange={e => setPublished(!published)} type="checkbox" checked={published} />
      <span className="slider round"></span>
    </label>
  </div>
)
export default SwitchBtn
