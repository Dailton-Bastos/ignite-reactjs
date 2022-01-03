import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

const Dashboard = () => {
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>
    </div>
  );
};

export default Dashboard;
