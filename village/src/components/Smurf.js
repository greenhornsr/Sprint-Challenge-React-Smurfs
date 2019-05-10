import React from 'react';

const Smurf = props => {

  const deleteSmurf = (event) => {
    event.preventDefault()
    console.log(props.id)
    props.deleteSmurf(props.id)
  }

  return (
    <div onClick={deleteSmurf} className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

