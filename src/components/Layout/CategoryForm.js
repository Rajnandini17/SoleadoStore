import React from 'react';

const categoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
  <div class="form-group">
    
    <input 
    type="text" 
    className="form-control" 
    placeholder="Enter new Category"
    value = {value}
    onChange={(event) => setValue(event.target.value)}
    />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default categoryForm;