import React from 'react';
import Option from './Option';
const Options = (props) => (
  <div>
  <button onClick={props.handleDeleteOptions}> Remove All</button>
  <p>Options Are</p>
  {
    props.options.map((option) => (
      <Option 
      key={option}
      optionText={option} 
      handleDeleteOption={props.handleDeleteOption}
      />
    ))
  }
  </div>
);


export default Options;