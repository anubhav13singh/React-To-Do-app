import React, { useState } from 'react';
import './form.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function Form() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null); // Renamed 'editid' to 'editId' for consistency

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      // Handle task editing
      const updatedList = list.map((task) => {
        if (task.id === editId) {
          return { ...task, name: input };
        }
        return task;
      });
      setList(updatedList);
      setEditId(null); // Clear the editId after editing
    } else if (input.trim() !== '') { // Check if the input is not empty
      // Add a new task
      setList([...list, { id: new Date().getTime().toString(), name: input }]);
    }

    setInput('');
  };

  const handleDlt = (id) => {
    const updatedList = list.filter((task) => task.id !== id);
    setList(updatedList);
  };

  const handleEdit = (id) => {
    const taskToEdit = list.find((task) => task.id === id);
    if (taskToEdit) {
      setInput(taskToEdit.name);
      setEditId(id);
    }
  };

  const handleRemoveAll = () => {
    setList([]); // Clear the list to remove all tasks
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="addBtn" type="submit">
          {editId !== null ? 'Edit' : 'Add'}
        </button>
      </form>

      <div>
        {list.map((task) => (
          <div key={task.id} className="list">
            <li>{task.name}</li>
            <button className="dlt" onClick={() => handleDlt(task.id)}>
              <DeleteOutlinedIcon/>
            </button>
            <button className="dlt" onClick={() => handleEdit(task.id)}>
              <EditOutlinedIcon/>
            </button>
          </div>
        ))}
      </div>

      <button className="remove" onClick={handleRemoveAll}>
        Remove All
      </button>
    </div>
  );
}

export default Form;
