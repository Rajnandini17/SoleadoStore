import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  background-color: #0a1435;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
`;

const categoryForm = ({handleSubmit, value, setValue}) => {
  return (
    
    <Form onSubmit={handleSubmit}>
  <div class="form-group">
    
    <Input 
    type="text" 
    className="form-control" 
    placeholder="Enter new Category"
    value = {value}
    onChange={(event) => setValue(event.target.value)}
    />
  </div>
  
  <SubmitButton type="submit" className="btn btn-primary">SUBMIT</SubmitButton>
</Form>
    
  )
}

export default categoryForm;