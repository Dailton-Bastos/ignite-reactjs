import React from 'react';
import RepositoryItem from './RepositoryItem';

const RepositoryList = () => {
  const [counter, setCounter] = React.useState(0);
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        <RepositoryItem repository="unform2" />
        <RepositoryItem repository="unform3" />
        <RepositoryItem />
        <RepositoryItem />
        <RepositoryItem />
      </ul>

      <h2>{counter}</h2>

      <button type="button" onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
    </section>
  );
};

export default RepositoryList;
