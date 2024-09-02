import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList'; // Correct import path
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.reminder) {
        const reminderTime = new Date(task.reminder).getTime();
        const now = new Date().getTime();
        const timeUntilReminder = reminderTime - now;

        if (timeUntilReminder > 0) {
          setTimeout(() => {
            alert(`Reminder: ${task.title} is due soon!`);
          }, timeUntilReminder);
        }
      }
    });
  }, [tasks]);

  const addTask = (title, dueDate, dueTime, priority, reminder) => {
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    setError('');
    const newTask = {
      id: uuidv4(),
      title,
      dueDate,
      dueTime,
      priority,
      reminder,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditing(true);
    setCurrentTask(taskToEdit);
  };

  const updateTask = (title, dueDate, dueTime, priority, reminder) => {
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    setError('');
    setTasks(
      tasks.map((task) =>
        task.id === currentTask.id
          ? { ...task, title, dueDate, dueTime, priority, reminder }
          : task
      )
    );
    setEditing(false);
    setCurrentTask({});
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TodoForm
        addTask={editing ? updateTask : addTask}
        editing={editing}
        currentTask={currentTask}
      />
      {error && <p className="error">{error}</p>}
      <TodoList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
