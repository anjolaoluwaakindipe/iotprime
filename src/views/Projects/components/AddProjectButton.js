import React from 'react';

// react icons
import { GrAdd } from 'react-icons/gr';

function AddProjectButton() {
  return (
    <div className='Projects__addnewproject-button'>
      <GrAdd className='Projects__add-icon' />
      Click to add a new project
    </div>
  );
}

export default AddProjectButton;
