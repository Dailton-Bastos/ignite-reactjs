import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {},
  };
});
