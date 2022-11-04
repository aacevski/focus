type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

export type UserUpdatedResponse = {
  data: {
    profilePicture: string;
    firstName: string;
    lastName: string;
  };
};

export default User;
