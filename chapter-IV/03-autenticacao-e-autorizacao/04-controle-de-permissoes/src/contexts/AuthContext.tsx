import React from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { HeadersDefaults } from 'axios';
import Router from 'next/router';

import { api } from '../services/apiClient';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const AuthContext = React.createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User>();
  const isAuthenticated = !!user;

  React.useEffect(() => {
    authChannel = new BroadcastChannel('auth');
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          authChannel.close();
          break;

        case 'signIn':
          window.location.replace(`${window.location.origin}/dashboard`);
          break;

        default:
          break;
      }
    };
  }, []);

  React.useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({
        email,
        permissions,
        roles,
      });

      // api.defaults.headers['Authorization'] = `Bearer ${token}`;

      api.defaults.headers = {
        Authorization: `Bearer ${token}`,
      } as CommonHeaderProperties;

      Router.push('/dashboard');

      authChannel.postMessage('signIn');
    } catch (error) {}
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
