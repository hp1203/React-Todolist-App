import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';
import loadingGif from './loader.gif';
import './App.css';
import ListItem from './ListItems'

class App extends Component {

  constructor(){
    super();

    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      err: null,
      todos: [],
      loading: true
    }

    //mockapi.io is used
    this.apiUrl = 'https://5cb811731551570014da3b1a.mockapi.io';
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.alert = this.alert.bind(this);
  }

   async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);
    //console.log(response);
    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 2000);
  }


  async addTodo() {
    if(this.state.newTodo !== ''){

      const response = await axios.post(`${this.apiUrl}/todos`, {

        name: this.state.newTodo

      });
      console.log(response);

      //state is IMMUTABLE
      const todos = this.state.todos;
      todos.push(response.data);

      this.setState({
        todos: todos,
        newTodo: '',
        err: null
      });
      this.alert('Todo Added Successfully.');
    }else{
      this.setState({
        err: 'Todo name cannot be empty' ,
      });
      setTimeout(() => {
        this.setState({
          err: null
        });
      }, 2000);
    }
  }
  handleChange(event) {
    //console.log(event.target.name, event.target.value);
    this.setState({
      newTodo: event.target.value
    });
  }
  async deleteTodo(index) {
    //console.log(index);
    const todos = this.state.todos;
    const todo = this.state.todos[index];

    const response = await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    delete todos[index];
    this.setState({
      todos: todos
    });
    this.alert('Todo Deleted Successfully.');
  }
  editTodo(index) {

    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  async updateTodo() {
    if(this.state.newTodo !== ''){
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    todo.name = this.state.newTodo;

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    //console.log(this.state.newTodo);
    this.setState({
      todos: todos,
      newTodo: '',
      editing: false,
      editingIndex: null,
      err: null,
      notification: null
    });
    this.alert('Todo Updated Successfully.');
    }else{
      this.setState({
        err: 'Todo name cannot be empty' ,
      });
      setTimeout(() => {
        this.setState({
          err: null
        });
      }, 2000);
    } 
  }

  alert(notification) {
    this.setState({
      notification: notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);
  }

  render() {
    const Clock = function(props) {
      const date = new Date();
      const thisYear = date.getFullYear();
      return <p style={{ color: props.color, fontSize: props.size }}>Copyright {thisYear}</p>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Todo App</h1>
        </header>

        <div className="container col-md-6">
        <h2 className="text-center p-4">Create new todo list</h2>

        {
          this.state.notification &&
          <div className="alert mt-3 alert-success">
            <p className="text-center"> {this.state.notification} </p>
          </div>
        }
        {
          this.state.err &&
          <div className="alert mt-3 alert-danger">
            <p className="text-center"> {this.state.err} </p>
          </div>
        }
        <input 
          name="todo"
          type="text" 
          className="my-4 form-control" 
          placeholder="Add New TODO"
          onChange={this.handleChange}
          value={this.state.newTodo}
        />
        
        <button 
          onClick={ this.state.editing ? this.updateTodo : this.addTodo}
          className="mb-4 btn btn-info form-control"
          disabled={this.state.newTodo.length < 1}
        >
          {this.state.editing ? 'Update Todo' : 'Add Todo'}
        </button>

        {
          this.state.loading &&
          <img src={loadingGif} alt=""/>
        }

        {
        
        (!this.state.editing || this.state.loading) &&
        <ul className="list-group">
          {this.state.todos.map((item, index) => {
            // return <li key={item.id} className="list-group-item">
            //     {item.name}
                
            //     <button 
            //       type="button" 
            //       className="right-btn btn btn-default" 
            //       aria-label="Close"
            //       onClick={() => {this.deleteTodo(index); }}
            //     >
            //       <span aria-hidden="true"><i className="fas fa-trash"></i></span>
            //     </button>
            //     <button 
            //       type="button" 
            //       className="right-btn btn btn-default" 
            //       aria-label="Close"
            //       onClick={() => {this.editTodo(index); }}
            //     >
            //       <span aria-hidden="true"><i className="fas fa-edit"></i></span>
            //     </button>
            // </li>
            return <ListItem 
              key={item.id}
              item = {item}
              editTodo = {() => {this.editTodo(index); }}
              deleteTodo = {() => {this.deleteTodo(index); }}
            />

          })}
          
        </ul>
        }
        </div>
        
        <footer className="App-footer">
          <h6>Design and Developed By <b><a href="https://www.linkedin.com/in/himanshu-purohit-b127656a/" target="_blank">Himanshu Purohit</a></b></h6>
          <Clock color="#484848" size="18px"/>
        </footer>
      </div>
    );
  }
}

export default App;
