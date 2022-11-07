import { Avatar, Stack } from '@chakra-ui/react';

import OnboardingModal from '../components/onboarding-modal';
import { useUser } from '../providers/user-provider';

const Home = () => {
  const { user } = useUser();

  return (
    <Stack h="100vh" justify="center" align="center">
      <OnboardingModal />
      {user?.profilePicture && <Avatar src={user.profilePicture} size="full" />}
    </Stack>
  );
};

export default Home;
