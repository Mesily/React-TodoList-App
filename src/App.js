import React, { useState } from 'react';

function TodoListApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updateValue, setUpdateValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      if (updateIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[updateIndex] = updateValue;
        setTodos(updatedTodos);
        setUpdateIndex(null);
        setUpdateValue('');
      } else {
        setTodos([...todos, inputValue]);
      }
      setInputValue('');
    }
  };

  const handleUpdateTodo = (index) => {
    const newTask = window.prompt('Enter a new task:', todos[index]);
    if (newTask !== null) {
      const updatedTodos = [...todos];
      updatedTodos[index] = newTask;
      setTodos(updatedTodos);
    }
  };

  const handleDeleteTodo = (index) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={updateIndex !== null ? updateValue : inputValue}
        onChange={handleInputChange}
        placeholder="Add a new todo"
      />
      <button onClick={() => {
        if (updateIndex !== null) {
          handleAddTodo();
          setUpdateIndex(null);
          setUpdateValue('');
        } else {
          handleAddTodo();
        }
      }}>
        {updateIndex !== null ? 'Update' : 'Add'}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleUpdateTodo(index)}>Update</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListApp;