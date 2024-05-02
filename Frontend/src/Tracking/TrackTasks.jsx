import React, { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import ProgressBar from "@ramonak/react-progress-bar";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CustomButton from './CustomButton ';
const TrackTasks = () => {

  const buttonTexts = [
    "Grey Structure",
    "Paint",
    "Sanitary",
    "Electricity",
    // Add more button texts as needed
  ];


  const ProgressBar = ({ completed }) => {
    return (
      <div className="bg-green-500 h-6 relative w-64" style={{ width: completed }}>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-black">
          {completed}
        </span>
      </div>
    );
  };

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const calculateProgress = () => {
    if (tasks.length === 0) {
      return 0;
    }
    const completedTasks = tasks.filter((task) => task.completed).length;
    return ((completedTasks / tasks.length) * 100).toFixed(2);
  };

  return (

    <div className="container mx-auto p-4 mb-96 text-center"> {/* Center align text */}

      <h1 className="text-2xl font-semibold mb-4">Construction Task Tracker</h1>
      
      <div>
      {buttonTexts.map((text, index) => (
        <CustomButton key={index} text={text} />
      ))}
    </div>
      

      <div className="mb-2 flex items-center mt-6">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 flex-grow"
        />
        {/* <button
          onClick={addTask}
          className="bg-blue-400 text-white px-3 py-2 rounded ml-2"
        >
          Add Task
        </button> */}
        <AddTaskIcon fontSize='large' onClick={addTask}
          className='ml-6' >
        </AddTaskIcon>
      </div>

      <ul className="list-disc pl-6">
        {tasks.map((task, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center">
              <span className={`${task.completed ? 'line-through' : ''}`}>{task.task}</span>
              <CheckIcon fontSize='medium' onClick={() => toggleComplete(index)}
                className={`mr-2 ml-2  ${task.completed ? 'hidden' : 'block'
                  }`}> </CheckIcon>



              {/* <button
                onClick={() => toggleComplete(index)}
                className={`bg-green-500 text-white px-2 py-1 rounded ml-2 ${task.completed ? 'hidden' : 'block'
                  }`}
              >
                Completed
              </button> */}
              <DeleteIcon fontSize='medium' onClick={() => removeTask(index)}>


              </DeleteIcon>
              {/* <button
                onClick={() => removeTask(index)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Remove
              </button> */}
              <AiFillCamera
                className={`text-blue-500 ml-2 cursor-pointer ${task.completed ? 'block' : 'hidden'
                  }`}
                size={20}
                title="Capture Live Picture"
              />
            </div>
          </li>
        ))}
      </ul>

      {/* <div className="flex items-center mt-4">
        <div className="bg-gray-300 h-6 flex-grow rounded"></div>
        <div
          className="bg-green-500 h-6 relative w-64 "
          style={{ width: `${calculateProgress()}%` }}
        >
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 text-sm text-black mb-10">
            {calculateProgress()}%
          </span>
        </div>
      </div> */}
      <div className="flex items-center mt-4">
        <ProgressBar completed={calculateProgress() + "%"} />
      </div>



    </div>
  );
};

export default TrackTasks;
