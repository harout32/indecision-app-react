import React from 'react';
//components
import AddOption from './AddOption';
// import Option from './components/Option';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: ['thing one', 'thing #2', 'thing #3'],
    selectedOption: undefined
  }
  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  }
  handlePick = () => {
    const index = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[index];
    this.setState((prevState) => ({
      selectedOption: option
    }))
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState( prevState => (
      {options: prevState.options.filter(option => optionToRemove !== option)}
    ));
  }
  handleAddOption = (option) => {
    //even '' empty string is falsy value 
    if(!option){
      return 'Enter Valid Value to Add Item';
      //if there is no same value int the options
    }else if(this.state.options.indexOf(option)> -1){
      return 'This Option Already exist';
    }
    //concat joins to arrays [] [] and returns a new array doesn't effect the originals
    this.setState( prevState => ({
        options: prevState.options.concat(option) //[option] = option
      }));
  }
  handleClearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: null
    }))
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    
  }
  render() {
    const title = 'Indesicion App';
    const subtitle = 'put your life in the hands of computer';
    return (
      <div>
      <Header subtitle={subtitle} />
      <Action handlePick={this.handlePick} hasOptions={this.state.options.length} />
      <Options 
      options={this.state.options} 
      handleDeleteOptions={this.handleDeleteOptions}
      handleDeleteOption={this.handleDeleteOption}
      />
      <AddOption 
        handleAddOption={this.handleAddOption}
      />
      <OptionModal
        selectedOption={this.state.selectedOption}
        handleClearSelectedOption={this.handleClearSelectedOption}
      />
      </div>
    );
  }
}

