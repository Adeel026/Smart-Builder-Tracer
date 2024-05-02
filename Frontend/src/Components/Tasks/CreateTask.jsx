import React, { useState } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useInject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const CreateTask = () => {
  const { tasksStore } = useInject('tasksStore');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    errorMessage: null,
  });

  const { title, description, errorMessage } = formData;

  const handleSubmitTask = async () => {
    try {
      await tasksStore.createTask(title, description);
      window.location.hash = '/tasks';
    } catch (error) {
      const errorMessage = error.response.data.message;
      setFormData({ ...formData, errorMessage });
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h1>Create a new task</h1>
        <p>Provide information about the task you wish to complete.</p>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <FormControl fullWidth>
          <TextField
            label="Title"
            placeholder="Title"
            margin="normal"
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Description"
            placeholder="Description"
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </FormControl>

        <Button
          style={{ marginTop: '10px' }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmitTask}
        >
          CREATE TASK
        </Button>
      </FormContainer>
    </FormWrapper>
  );
};

export default CreateTask;
