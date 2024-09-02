import React, { useState, useEffect } from 'react';

const TodoForm = ({ addTask, editing, currentTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('Low'); // Default priority
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    if (editing) {
      setTitle(currentTask.title || '');
      setDueDate(currentTask.dueDate || '');
      setDueTime(currentTask.dueTime || '');
      setPriority(currentTask.priority || 'Low');
      setReminder(currentTask.reminder || '');
    }
  }, [editing, currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      addTask(title, dueDate, dueTime, priority, reminder);
    } else {
      addTask(title, dueDate, dueTime, priority, reminder);
    }
    setTitle('');
    setDueDate('');
    setDueTime('');
    setPriority('Low'); // Reset priority
    setReminder('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        type="time"
        placeholder="Due Time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="datetime-local"
        placeholder="Reminder"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />
      <button type="submit">{editing ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TodoForm;
