import React from 'react';

import type { GetServerSideProps, NextPage } from 'next';

import { AuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

import styles from '../styles/home.module.css';

const Home: NextPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
};

export default Home;

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
