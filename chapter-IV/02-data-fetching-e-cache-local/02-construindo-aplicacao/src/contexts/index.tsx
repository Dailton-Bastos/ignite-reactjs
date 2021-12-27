import React from 'react';

interface AppStorageProps {
  children: React.ReactNode;
}

import { SidebarDrawerProvider } from './SidebarDrawerContext';

export const AppStorage = ({ children }: AppStorageProps) => {
  return <SidebarDrawerProvider>{children}</SidebarDrawerProvider>;
};
