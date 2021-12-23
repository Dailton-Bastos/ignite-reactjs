import React from 'react';

import { useRouter } from 'next/router';

import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';

interface SidebarDrawerProviderProps {
  children: React.ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

export const SidebarDrawerContext = React.createContext(
  {} as SidebarDrawerContextData
);

export const SidebarDrawerProvider = ({
  children,
}: SidebarDrawerProviderProps) => {
  const disclosure = useDisclosure();
  const router = useRouter();

  React.useEffect(() => {
    disclosure.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

export const useSidebarDrawer = () => React.useContext(SidebarDrawerContext);
