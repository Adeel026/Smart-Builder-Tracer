import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';

function ProjectProgress() {
    const [allTodos, setAllTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [inProgressTodos, setInProgressTodos] = useState([]);
    const [screenType, setScreenType] = useState("All");
    const { projectId } = useParams()
    const navigate = useNavigate();

    const location = useLocation();
    const { user, project } = location.state || {};

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:8000/project-progress/' + projectId);
            if (!response.ok) {
                throw new Error('Error fetching todos');
            }

            const todos = await response.json();
            // console.log(todos)
            setAllTodos(todos || []);
            // console.log(allTodos)

            const responseCompleted = await fetch('http://localhost:8000/project-progress/completed/' + projectId);
            if (!responseCompleted.ok) {
                throw new Error('Error fetching completed todos');
            }

            const completed = await responseCompleted.json();
            setCompletedTodos(completed || []);

            const responseInProgress = await fetch('http://localhost:8000/project-progress/in-progress/' + projectId);
            if (!responseInProgress.ok) {
                throw new Error('Error fetching in-progress todos');
            }

            const inProgress = await responseInProgress.json();
            setInProgressTodos(inProgress || []);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="App">
            <div className="right-side">
                <div className="btn-area">
                    <button
                        className={`secondaryBtn ${screenType === "All" && 'active'}`}
                        onClick={() => {
                            setScreenType("All");
                        }}
                    >
                        To Do
                    </button>
                    <button
                        className={`secondaryBtn ${screenType === "inProgress" && 'active'}`}
                        onClick={() => {
                            setScreenType("inProgress");
                        }}
                    >
                        In Progress
                    </button>
                    <button
                        className={`secondaryBtn ${screenType === "completed" && 'active'}`}
                        onClick={() => {
                            setScreenType("completed");
                        }}
                    >
                        Completed
                    </button>
                </div>

                <div className="todo-list">
                    {screenType === "inProgress" &&
                        inProgressTodos.map((item, index) => (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>Type: {item.type}</p>
                                    <p>Due Date: {item.dueDate}</p>
                                    <p>Moved to In Progress at: {item.inProgressOn}</p>
                                </div>
                            </div>
                        ))}
                    {screenType === "All" &&
                        allTodos.map((item, index) => (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>Type: {item.type}</p>
                                    <p>Due Date: {item.dueDate}</p>
                                </div>
                            </div>
                        ))}
                    {screenType === "completed" &&
                        completedTodos.map((item, index) => (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>Type: {item.type}</p>
                                    <p>Due Date: {item.dueDate}</p>
                                    <p>Completed at: {item.completedOn}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div onClick={() => navigate(`/customer/projectprogress/chat/${user._id}`, { state: { sender: project.createdBy, receiver: project.selectedSupervisor, project } })} className='chat-icon'>
                    <ChatIcon />
                </div>
                <div
                    onClick={() => {
                        console.log("Clicked, projectId._id is:", projectId);
                        navigate("/supervisor/projectwork/details/" + projectId);
                    }}
                    className="proof-icon"
                >
                    See Proof
                </div>
            </div>
        </div >
    );
}

export default ProjectProgress;
