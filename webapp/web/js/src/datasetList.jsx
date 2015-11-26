import React, { PropTypes } from 'react'

import _ from 'lodash';
import {Link} from 'react-router';
import {Button, ListGroup, ButtonGroup} from 'react-bootstrap';


export default class DatasetList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      const datasets = this.props.datasets;
      const onLaunchClick =  this.props.onLaunchClick;
      const onEditClick =  this.props.onEditClick;
      if (_.isEmpty(datasets)) return <div></div>
      return (
          <div>
              <h3>Available Datasets</h3>
              <ListGroup>
                  {datasets.map( (dataset, i) => {
                      console.log(dataset);
                      return (
                          <li key={"k"+i} className="list-group-item">
                              <ButtonGroup>
                                  <Button bsStyle="primary" bsSixe="small" onClick={() => onLaunchClick(dataset)}> Launch </Button>
                                  <Button bsSixe="small" onClick={() => onEditClick(dataset)}> Edit </Button>
                              </ButtonGroup>
                              <span className="h4" style={{marginLeft: 10}}> {dataset} </span>
                          </li>
                      )
                  })}
              </ListGroup>
          </div>
      );
  }
}
