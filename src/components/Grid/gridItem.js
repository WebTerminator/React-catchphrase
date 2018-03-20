import React, { Component } from 'react';

const GridItem = props => 
  <div className={"gird-item " + props.hidden}>
    {props.children}
  </div>

export default GridItem;
