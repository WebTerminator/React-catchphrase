import React from 'react'

const View = props => 
  <div className={ props.isVisible ? "" : "hidden" }>
    {props.children}
  </div>

export default View