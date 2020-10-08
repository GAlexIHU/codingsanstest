import User from '../models/User';
import CustomError from '../utils/customError';

interface UserData {
  username: string;
  password: string;
}

interface CreateUserResponse {
  id: string;
  token: string;
}

export const createUser = async (userData: UserData): Promise<CreateUserResponse> => {
  try {
    const user = new User(userData);
    await user.save();
    const token = await user.getSignedToken();
    return {
      id: user._id.toString(),
      token,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new CustomError('Username already taken', 400);
    } else {
      throw error;
    }
  }
};

interface AuthenticateResponse {
  exists: boolean;
  authenticated?: boolean;
  token?: string;
}

export const authenticate = async (userData: UserData): Promise<AuthenticateResponse> => {
  try {
    const user = await User.findOne({ username: userData.username });
    if (!user) return { exists: false };
    const authenticated = await user.validatePassword(userData.password);
    if (!authenticated) return { exists: true, authenticated: false };
    const token = await user.getSignedToken();
    return {
      exists: true,
      authenticated: true,
      token: token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
