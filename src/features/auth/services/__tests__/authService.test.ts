import axiosInstance from '../../../../api/axiosInstance';
import { login } from '../authService';

jest.mock('../../../../api/axiosInstance');

describe('authService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('login returns token on successful request', async () => {
        const mockedPost = axiosInstance.post as jest.Mock;
        mockedPost.mockResolvedValueOnce({ data: { token: 'fake-token' } });

        const token = await login('user', 'password');
        expect(token).toBe('fake-token');
        expect(mockedPost).toHaveBeenCalledWith('/login', { username: 'user', password: 'password' });
    });

    test('login throws error on failed request', async () => {
        const mockedPost = axiosInstance.post as jest.Mock;
        mockedPost.mockRejectedValueOnce(new Error('Network Error'));

        await expect(login('user', 'wrong-password')).rejects.toThrow('Network Error');
        expect(mockedPost).toHaveBeenCalledWith('/login', { username: 'user', password: 'wrong-password' });
    });
});