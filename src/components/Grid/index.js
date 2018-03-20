import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GridItem from './gridItem.js'

class Grid extends Component {
  renderGridItems = () => 
    this.props.gridItemsCollection.map(el =>
      <GridItem hidden={ el.hidden ? "hide" : "" } key={el.id} id={el.id}>{el.id}</GridItem>
    )
  
  render() {
    return (
      <div className="grid">
        {this.renderGridItems()}
      </div>
    );
  }
}

Grid.propTypes = {
    renderGridItems: PropTypes.func
}

export default Grid;
