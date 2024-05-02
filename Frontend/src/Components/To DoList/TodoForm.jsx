import React, { useState } from 'react';

const TodoForm = ({ onAddTodo, projectId }) => {
    const [newTodo, setNewTodo] = useState({
        project: projectId,
        title: '',
        description: '',
        type: '',
        dueDate: '',
    });
    // console.log(newTodo)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTodo(newTodo);
        setNewTodo({
            project: projectId,
            title: '',
            description: '',
            type: '',
            dueDate: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="todo-input">
                <div className="todo-input-item">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name='title'
                        value={newTodo.title}
                        onChange={(e) => handleChange(e)}
                        placeholder="What's the title of your To Do?"
                    />
                </div>
                <div className="todo-input-item">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name='description'
                        value={newTodo.description}
                        onChange={(e) => handleChange(e)}
                        placeholder="What's the description of your To Do?"
                    />
                </div>
                <div className="todo-input-item">
                    <label htmlFor="type">Type:</label>
                    <input
                        type="text"
                        id="type"
                        name='type'
                        value={newTodo.type}
                        onChange={(e) => handleChange(e)}
                        placeholder="Type of Task"
                    />
                </div>
                <div className="todo-input-item">
                    <label htmlFor="date">Due Date:</label>
                    <input
                        type="date"
                        id="date"
                        name='dueDate'
                        value={newTodo.dueDate}
                        onChange={(e) => handleChange(e)}
                        placeholder="Date"
                    />
                </div>
                <br />
                <div className="todo-input-item">
                    <button className="primary-btn" type="submit">
                        Add
                    </button>
                </div>
            </div>

        </form>
    );
};

export default TodoForm;
