/* eslint-disable react/jsx-no-constructed-context-values */
import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import fetcher from '../axios';
import { TOKEN, USER } from '../constants/local-storage';
import User from '../types/user';
import { readFromLocalStorage, writeToLocalStorage } from '../utils/local-storage';

const publicRoutes: string[] = [
  '/sign-in',
  '/sign-up',
];

type UserContextProps = {
  user: User | null;
  token: string | null;
  signIn: ({ email, password }) => Promise<void>;
  signUp: ({ email, password }) => Promise<void>;
  signOut: () => void;
  showOnboardingModal: boolean;

  setUser: (user : User) => void;
};

type Props = {
  children: PropsWithChildren<React.ReactNode>;
};

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null | undefined>(readFromLocalStorage(USER));
  const [token, setToken] = useState<string | null>(readFromLocalStorage<string>(TOKEN));
  const [showOnboardingModal, setShowOnboardingModal] =
   useState<boolean>(!(user?.firstName && user?.lastName));

  const { asPath, replace, push } = useRouter();

  useEffect(() => {
    if (asPath === '/') {
      if (!user) {
        replace('/sign-in');
      }
    } else if (!user && !publicRoutes.some((route: string) => asPath.startsWith(route))) {
      replace('/sign-in');
    }
  }, [asPath]);

  useEffect(() => {
    if (user){
      setShowOnboardingModal(!(user.firstName && user.lastName));
    }
  }, [user]);

  const signIn = async (values) => {
    const { email, password } = values;

    const { data: { token: loggedInUserToken, user: loggedInUser } } = await fetcher.post('/auth/sign-in', {
      email,
      password,
    });

    writeToLocalStorage(TOKEN, token);
    writeToLocalStorage(USER, loggedInUser);

    setToken(loggedInUserToken);
    setUser(loggedInUser);

    push('/');
  };

  const signUp = async (values) => {
    const { email, password } = values;

    await fetcher.post('/auth/sign-up', {
      email,
      password,
    });

    setInterval(() => {
      push({ pathname: '/sign-in', query: { email } });
    }, 1000);
  };

  const signOut = () => {
    localStorage.clear();
    sessionStorage.clear();

    setUser(null);
    setToken(null);
    replace('/sign-in');
  };

  return (
    <UserContext.Provider
      value={{ user, token, signOut, signIn, signUp, showOnboardingModal, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export default UserProvider;
