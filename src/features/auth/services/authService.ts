import axiosInstance from '../../../api/axiosInstance';

export const login = async (username: string, password: string): Promise<string> => {
  // throw new Error('Simulated login error for testing.');
  const response = await axiosInstance.post('/login', { username, password });
  return response.data.token;
};
