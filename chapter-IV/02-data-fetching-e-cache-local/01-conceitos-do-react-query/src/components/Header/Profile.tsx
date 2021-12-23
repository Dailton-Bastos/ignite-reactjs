import React from 'react';

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  name: string;
  email: string;
  avatar: string;
  showProfileData?: boolean;
}

export const Profile = ({
  name,
  email,
  avatar,
  showProfileData = true,
}: ProfileProps) => {
  return (
    <Flex align={'center'}>
      {showProfileData && (
        <Box mr={'4'} textAlign={'right'}>
          <Text>{name}</Text>
          <Text color={'gray.300'} fontSize={'small'}>
            {email}
          </Text>
        </Box>
      )}

      <Avatar size={'md'} name={name} src={avatar} />
    </Flex>
  );
};
