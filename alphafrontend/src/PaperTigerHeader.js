import React, { Component } from 'react';
import paperTigerlogofinal from './paperTigerlogofinal.png'
import './paperTigerHeader.css'

export default class PaperTigerHeader extends Component {
    render() {
        console.log(paperTigerlogofinal);
    return (
    <div class="header">
        <img src={paperTigerlogofinal} height="142" width="200"/>
      {/* <h1>Paper Tiger</h1> */}
    </div>);
    
    }
}