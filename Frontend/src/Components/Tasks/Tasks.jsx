import React, { useState } from 'react';
import './Tasks.css'
import ProgressBar from '@ramonak/react-progress-bar';
const Task = ({ task }) => (
  <tr>
    <td>{task.name}</td>
    <td>{task.status}</td>
    <td>{task.dueDate}</td>
    <td>{task.actualEffort}</td>
    <td><ProgressBar completed={60}/></td>
  </tr>
);

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      name: 'Search Enhancement "Black Shirt"',
      status: 'Off Track',
      dueDate: '02/02/21',
      actualEffort: '',
      complete: '50%',
    },
    {
      name: 'Demo of XYZ',
      status: 'Off Track',
      dueDate: '02/08/21',
      actualEffort: '17.78 Hours',
      complete: '10%',
    },
  ]);

  return (
    <div>
      <h1>My tasks</h1>
      <input type="text" placeholder="Search by name" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actual Effort</th>
            <th>% Complete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <Task key={index} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
