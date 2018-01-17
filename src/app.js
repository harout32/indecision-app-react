class IndecisionApp extends React.Component {
  constructor(props){
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: ['thing one', 'thing #2', 'thing #3']
    }
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      }
    });
  }
  handlePick() {
    const optionsNumber = this.state.options.length
    const index = Math.floor(Math.random() * optionsNumber);
    alert(this.state.options[index]);
  }
  handleAddOption(option){
    //even '' empty string is falsy value 
    if(!option){
      return 'Enter Valid Value to Add Item';
      //if there is no same value int the options
    }else if(this.state.options.indexOf(option)> -1){
      return 'This Option Already exist';
    }
    this.setState((prevState) => {
      return {
        //concat joins to arrays [] [] and returns a new array doesn't effect the originals
        options: prevState.options.concat(option) //[option] = option
      }
    })
  }
  render() {
    const title = 'Indesicion App';
    const subtitle = 'Put your life in hands of computer';
    return (
      <div>
      <Header title={title} subtitle={subtitle} />
      <Action handlePick={this.handlePick} hasOptions={this.state.options.length} />
      <Options 
      options={this.state.options} 
      handleDeleteOptions={this.handleDeleteOptions}
      />
      <AddOption 
        handleAddOption={this.handleAddOption}
      />
      </div>
    );
  }
}

class Header extends React.Component {
   render() {
     return (
      <div>
      <h1>{this.props.title}</h1>
      <h2>{this.props.subtitle}</h2>
      </div>
     );
   }
 };

class Action extends React.Component {

   render() {
     return (
       <div>
       <button 
       onClick={this.props.handlePick}
       disabled={!this.props.hasOptions}
       >
       What Should I do
       </button>
       
       </div>
     );
   }
};


class Options extends React.Component {
  render() {
    console.log(this);
    return (
      <div>
      <button onClick={this.props.handleDeleteOptions}> Remove All</button>
      <p>Options Are</p>
      {
        this.props.options.map((option) => <Option optionText={option} key={option} />)
      }
      </div>
    );
  }
};

 class Option extends React.Component {
   render () {
     return (
      <p>
        {this.props.optionText}
      </p>
     );
   }
 };

class AddOption extends React.Component {
  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error:undefined
    }
  }
  handleAddOption(e){
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(()=> {return{error}});
    e.target.elements.option.value = '';
  }
  render() {
    //if the first value is falsy it will not look for the secoond
    // otherwise it will return the second value
    return (
      <div>
      {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleAddOption}>
      <input type="text" name="option" />
      <button>Add Option</button>
      </form>
      </div>
    );
  }
};


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));