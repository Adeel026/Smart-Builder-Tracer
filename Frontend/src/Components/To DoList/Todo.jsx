import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './Todo.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa';
import ChatIcon from '@material-ui/icons/Chat';
import TodoForm from './TodoForm';
function Todo() {
    const [allTodos, setAllTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [inProgressTodos, setInProgressTodos] = useState([]);
    const [screenType, setScreenType] = useState("All");
    const { projectId } = useParams()
    const location = useLocation();
    const { user, project } = location.state || {};
    const navigate = useNavigate();

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:8000/project-progress/' + projectId);
            if (!response.ok) {
                throw new Error('Error fetching todos');
            }

            const todos = await response.json();
            // console.log(todos)
            setAllTodos(todos || []);

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

    const handleAddNewToDo = async (newTodo) => {
        try {
            const response = await fetch('http://localhost:8000/project-progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });
            // console.log(newTodo)

            if (!response.ok) {
                throw new Error('Failed to add new todo');
            }

            const savedTodo = await response.json();
            setAllTodos((prevTodos) => [...prevTodos, savedTodo]);
        } catch (error) {
            console.error('Error adding new todo:', error);
        }
    };

    const handleToDoDelete = async (index, todoType) => {
        try {
            let deletedTodoId;
            if (todoType === 'inProgress') {
                deletedTodoId = inProgressTodos[index]._id;
            } else if (todoType === 'completed') {
                deletedTodoId = completedTodos[index]._id;
            } else {
                deletedTodoId = allTodos[index]._id;
            }


            const response = await fetch(`http://localhost:8000/project-progress/${deletedTodoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                if (todoType === 'inProgress') {
                    let reducedTodos = [...inProgressTodos];
                    reducedTodos.splice(index, 1);
                    setInProgressTodos(reducedTodos);
                } else if (todoType === 'completed') {
                    let reducedTodos = [...completedTodos];
                    reducedTodos.splice(index, 1);
                    setCompletedTodos(reducedTodos);
                } else {
                    let reducedTodos = [...allTodos];
                    reducedTodos.splice(index, 1);
                    setAllTodos(reducedTodos);
                }
            } else {
                console.error('Error deleting todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };

    const handleInProgressTodoDelete = (index) => {
        let reducedInProgressTodos = [...inProgressTodos];
        reducedInProgressTodos.splice(index, 1);
        setInProgressTodos(reducedInProgressTodos);
    };

    const handleComplete = async (index, todoType) => {
        try {
            const date = new Date();
            const finalDate = date.toLocaleString();
            let updatedTodo;
            if (todoType === "inProgress") {
                updatedTodo = {
                    ...inProgressTodos[index],
                    completedOn: finalDate,
                };
                handleInProgressTodoDelete(index);
            } else {
                updatedTodo = {
                    ...allTodos[index],
                    completedOn: finalDate,
                };
                handleToDoDelete(index, "all");
            }

            const response = await fetch(`http://localhost:8000/project-progress/${updatedTodo._id}/complete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });

            if (!response.ok) {
                throw new Error('Failed to mark todo as completed');
            }
            setCompletedTodos([...completedTodos, updatedTodo]);
            const uploadImageConfirmation = window.confirm(
                "Task Moving to Complete,do you want toUpload a Capture for Proof?"
            );
            if (uploadImageConfirmation) {
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";

                fileInput.addEventListener("change", async (event) => {
                    const selectedFile = event.target.files[0];
                    if (selectedFile) {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const uploadResponse = await fetch(
                            `http://localhost:8000/project-progress/${updatedTodo._id}/complete`,
                            {
                                method: "PUT",
                                body: formData,
                            }
                        );

                        if (uploadResponse.ok) {
                            alert("Proof to complete uploaded successfully!");
                        } else {
                            alert("Failed to upload file.");
                        }
                    } else {
                        alert("No file selected.");
                    }
                });

                fileInput.click();
            }

        } catch (error) {
            console.error('Error marking todo as completed:', error);
        }
    };

    const handleMoveToInProgress = async (index) => {
        try {
            const date = new Date();
            const finalDate = date.toLocaleString();

            const updatedTodo = {
                ...allTodos[index],
                inProgressOn: finalDate,
            };

            const response = await fetch(`http://localhost:8000/project-progress/${updatedTodo._id}/move-to-in-progress`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });

            if (!response.ok) {
                throw new Error('Failed to move todo to in-progress');
            }
            setInProgressTodos([...inProgressTodos, updatedTodo]);
            let reducedTodos = [...allTodos];
            reducedTodos.splice(index, 1);
            setAllTodos(reducedTodos);

            const uploadImageConfirmation = window.confirm(
                "Task Moving to In Progress,do you want to Upload a Capture for Proof?"
            );
            if (uploadImageConfirmation) {
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";

                fileInput.addEventListener("change", async (event) => {
                    const selectedFile = event.target.files[0];
                    if (selectedFile) {
                        const formData = new FormData();
                        formData.append("image", selectedFile);
                        const uploadResponse = await fetch(
                            `http://localhost:8000/project-progress/${updatedTodo._id}/move-to-in-progress`,
                            {
                                method: "PUT",
                                body: formData,
                            }
                        );

                        if (uploadResponse.ok) {
                            alert("Proof To In Progress uploaded successfully!");
                        } else {
                            alert("Failed to upload file.");
                        }
                    } else {
                        alert("No file selected.");
                    }
                });

                fileInput.click();
            }
        } catch (error) {
            console.error('Error moving todo to in-progress:', error);
        }
    };


    return (
        <div className="App">
            <div className="left-side">
                <h1>Assign Task in Project!</h1>
                <TodoForm onAddTodo={handleAddNewToDo} projectId={projectId} />
            </div>

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

                                <div style={{ display: "flex", fontSize: "12px" }}>
                                    <AiOutlineDelete
                                        className="icon"
                                        onClick={() => handleToDoDelete(index, "inProgress")}
                                    />
                                    <BsCheckLg
                                        title="Completed?"
                                        className="check-icon"
                                        onClick={() => handleComplete(index, "inProgress")}
                                    />
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
                                <div style={{ display: "flex" }}>
                                    <AiOutlineDelete
                                        title="Delete?"
                                        className="icon"
                                        onClick={() => handleToDoDelete(index, "all")}
                                    />
                                    <BsCheckLg
                                        title="Completed?"
                                        className="check-icon"
                                        onClick={() => handleComplete(index)}
                                    />
                                    <FaArrowRight
                                        title="Move to In Progress"
                                        className="arrow-icon"
                                        onClick={() => handleMoveToInProgress(index)}
                                    />
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
                                <div style={{ display: "flex" }}>
                                    <AiOutlineDelete
                                        className="icon"
                                        onClick={() => handleToDoDelete(index, "completed")}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
                <div onClick={() => navigate("/supervisor/projectwork/chat/" + user._id, { state: { sender: project.selectedSupervisor, receiver: project.createdBy, project } })} className='chat-icon'>
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
        </div>
    );
}

export default Todo;
