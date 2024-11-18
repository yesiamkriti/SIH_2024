"use client"
import { createContext, useState, ReactNode, FC } from 'react';
import { userData } from './components/interface';

interface ProfileContextType {
  profileData: any; // or specify the type of userData
  setProfileData: (profileData: any) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<userData | null>(null);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
