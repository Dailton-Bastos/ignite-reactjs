import React from 'react';

const RepositoryItem = (props) => {
  return (
    <li>
      <strong>{props.repository}</strong>
      <p>Forms in React</p>

      <a href="#">Acessar repositório</a>
    </li>
  );
};

export default RepositoryItem;
