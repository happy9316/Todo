import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faStar, faTrashAlt, faPlus, faBell, faCalendarAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Todofile.css'; 

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', completed: false, important: false },
    { id: 2, text: 'Finish project report', completed: false, important: false },
    { id: 3, text: 'Call the bank', completed: false, important: false },
    { id: 4, text: 'Schedule dentist appointment', completed: false, important: true },
    { id: 5, text: 'Plan weekend trip', completed: false, important: false },
    { id: 6, text: 'Read a book', completed: true, important: false },
    { id: 7, text: 'Clean the house', completed: true, important: false },
    { id: 8, text: 'Prepare presentation', completed: true, important: false },
    { id: 9, text: 'Update blog', completed: true, important: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeView, setActiveView] = useState('All Tasks');
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [isRightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [isReminderVisible, setReminderVisible] = useState(false);
  const [reminder, setReminder] = useState('');
  
  const addTask = () => {
    if (newTask.trim() !== '') {
       setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false, important: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    
  };

  const toggleImportant = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, important: !task.important } : task)));
  };

  const selectTask = (task) => {
    setSelectedTask(task);
    setRightSidebarVisible(true); // Show the right sidebar when a task is selected
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask(null);
      setRightSidebarVisible(false); // Hide the right sidebar when task is deleted
    }
  };

  const setTaskReminder = (id, reminderValue) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: reminderValue } : task)));
  };

  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.length - pendingTasks;

  const filteredTasks = tasks.filter((task) => {
    if (activeView === 'All Tasks') return true;
    if (activeView === 'Today') return !task.completed;
    if (activeView === 'Important') return task.important;
    if (activeView === 'Planned') return task.text.toLowerCase().includes('plan');
    if (activeView === 'Assigned to me') return task.text.toLowerCase().includes('me');
    return false;
  });

  return (
    <div className="container">
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setNavbarVisible(!isNavbarVisible)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Sidebar (Left) */}
      <aside className={`sidebar ${isNavbarVisible ? 'visible' : ''}`}>
        <div className="header">
          <a href="/" className="logo-container">
            <div className="logo"><img className='img_logo' src='/Images/quadbtech_logo.png' alt='img_logo'></img></div>
          </a>
          <h1>ToDo</h1>
        </div>
        <div className="user">
          <div className="avatar"><img className='avtar_img' src='/Images/profile1.png' alt='logo_img'></img></div>
          <h2>Hey, Happy</h2>
        </div>
        <nav className="nav">
          <button className={`nav-button ${activeView === 'All Tasks' ? 'active' : ''}`} onClick={() => setActiveView('All Tasks')}>All Tasks</button>
          <button className={`nav-button ${activeView === 'Today' ? 'active' : ''}`} onClick={() => setActiveView('Today')}>Today</button>
          <button className={`nav-button ${activeView === 'Important' ? 'active' : ''}`} onClick={() => setActiveView('Important')}>Important</button>
          <button className={`nav-button ${activeView === 'Planned' ? 'active' : ''}`} onClick={() => setActiveView('Planned')}>Planned</button>
          <button className={`nav-button ${activeView === 'Assigned to me' ? 'active' : ''}`} onClick={() => setActiveView('Assigned to me')}>Assigned to me</button>
        </nav>
        <button className="add-list-button">Add list</button>
        <div className="task-summary">
          <h3>Today's Tasks</h3>
          <div className="task-count">{tasks.length}</div>
          <progress value={(completedTasks / tasks.length) * 100} max="100"></progress>
          <div className="task-status">
            <span>Pending ({pendingTasks})</span>
            <span>Done ({completedTasks})</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="main-header">
          <h2>{activeView}</h2>
        </div>
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>ADD TASK</button>
        </div>
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span
                className={`task-text ${task.completed ? 'completed' : ''}`}
                onClick={() => selectTask(task)}
              >
                {task.text}
              </span>
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => toggleImportant(task.id)}
                className={`star-icon ${task.important ? 'important' : ''}`}
              />
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <div className={`right-sidebar ${isRightSidebarVisible ? 'visible' : ''}`}>
        {selectedTask && (
          <>
            <h3>{selectedTask.text}</h3> {/* Task name displayed as header */}

           

            {/* Add Step */}
            <div className="task-actions">
              <div className="action-item" onClick={() => console.log('Step added')}>
                <FontAwesomeIcon icon={faPlus} /> Add Step
              </div>
               {/* Add Step, Reminder, Due Date */}
            <div className="task-actions">
              <div className="action-item" onClick={() => setReminderVisible(!isReminderVisible)}>
                <FontAwesomeIcon icon={faBell} /> Set Reminder
              </div>

              {/* Show Date & Time Picker if Reminder option is selected */}
              {isReminderVisible && (
                <div className="reminder-picker">
                  <input
                    type="datetime-local"
                    value={reminder}
                    onChange={(e) => {
                      setReminder(e.target.value);
                      setTaskReminder(selectedTask.id, e.target.value);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Display selected reminder */}
            {selectedTask.reminder && (
              <div className="reminder-display">
                <strong>Reminder:</strong> {new Date(selectedTask.reminder).toLocaleString()}
              </div>
            )}
              <div className="action-item" onClick={() => console.log('Due date added')}>
                <FontAwesomeIcon icon={faCalendarAlt} /> Add Due Date
              </div>
            </div>

            {/* Repeat Section */}
            <div className="repeat-section">
              <FontAwesomeIcon icon={faSyncAlt} /> Repeat
            </div>

            {/* Add Notes */}
            <div className="add-notes">
              <input type="text" placeholder="Add Notes" />
            </div>

            {/* Delete Task Button at the Bottom */}
            <button className="delete-task" onClick={() => deleteTask(selectedTask.id)}>
              <FontAwesomeIcon icon={faTrashAlt} /> Delete Task
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;