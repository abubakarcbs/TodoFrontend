"use client"
import React, { useState, useEffect } from 'react';
import Clock from "./clock/clock"

const TodoApp = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const updateTask = () => {
    if (editIndex !== null && editValue.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editValue;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <div className="justify-content: between; align-items: center;">
      <h1 className="text_todo">TaskMaster</h1>
      <div className='horizontal-align'>
        <h2 className="text_quote">“Don’t be pushed<br/> around by the<br/> fears in your mind.<br/> Be led by the<br/> dreams in your heart.”</h2>
        <div className="Clock">
          <Clock/>
        </div>
        <div className="alingcontent">
        <div className="addtask">
        <input
  type="text"
  value={newTask}
  onChange={(e) => setNewTask(e.target.value)}
  placeholder="Enter task"
  className="engraved-border engraved-placeholder"
/>

          <button onClick={addTask}>🖋 </button></div>
          {tasks.map((task, index) => (
            <div key={index}>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={updateTask}
                />
              ) : (
                <span className='task-text'>{task}</span>
              )}

              <div className='addtask'>
              <button onClick={() => setEditIndex(index)}>🖋Edit</button>
              <button onClick={() => deleteTask(index)}>  _🗑Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
