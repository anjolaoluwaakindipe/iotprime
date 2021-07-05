import React from 'react';

// react-router
import { useHistory } from 'react-router-dom';

// css
import './Error.scss';

export default function ErrorPage() {
  const history = useHistory();
  return (
    <div className='ErrorPage__container'>
      <div class='face'>
        <div class='band'>
          <div class='red'></div>
          <div class='white'></div>
          <div class='blue'></div>
        </div>
        <div class='eyes'></div>
        <div class='dimples'></div>
        <div class='mouth'></div>
      </div>

      <h1>Oops! Something went wrong!</h1>
      <div
        class='btn'
        onClick={() => {
          history.goBack();
        }}
      >
        Go back
      </div>
    </div>
  );
}
