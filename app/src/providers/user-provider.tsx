import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import fetcher from '../axios';
import { TOKEN, USER } from '../constants/local-storage';
import { User } from '../types/user';
import { readFromLocalStorage, writeToLocalStorage } from '../utils/local-storage';

const publicRoutes: string[] = [
  '/sign-in',
  '/sign-up',
];

type UserContextProps = {
  user: User | null;
  token: string | null;
  signIn: ({ email, password }: { email: string; password: string }) => Promise<void>;
  signUp: ({ email, password }: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  showOnboardingModal: boolean;

  setUser: (user: User) => void;
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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      if (!user) {
        navigate('/sign-in');
      }
    } else if (!user && !publicRoutes.some(
      (route: string) => location.pathname.startsWith(route),
    )) {
      navigate('/sign-in');
    } else if (user && publicRoutes.some((route: string) => location.pathname.startsWith(route))) {
      navigate('/');
    }
  }, [location, navigate, user]);

  useEffect(() => {
    if (user) {
      setShowOnboardingModal(!(user.firstName && user.lastName));
    }
  }, [user]);

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { data: { token: loggedInUserToken, user: loggedInUser } } = await fetcher.post('/auth/sign-in', {
      email,
      password,
    });

    writeToLocalStorage(TOKEN, loggedInUserToken);
    writeToLocalStorage(USER, loggedInUser);

    setToken(loggedInUserToken);
    setUser(loggedInUser);

    navigate('/');
  };

  const signUp = async ({ email, password }: { email: string; password: string }) => {
    await fetcher.post('/auth/sign-up', {
      email,
      password,
    });

    setTimeout(() => {
      navigate(`/sign-in?email=${email}`);
    }, 1000);
  };

  const signOut = () => {
    localStorage.clear();
    sessionStorage.clear();

    setUser(null);
    setToken(null);
    navigate('/sign-in');
  };

  return (
    <UserContext.Provider
      value={
        useMemo(() => ({
          user: user ?? null, token, signOut, signIn, signUp, showOnboardingModal, setUser,
        }), [user, token, signOut, signIn, signUp, showOnboardingModal, setUser])
      }
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
