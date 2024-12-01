import axiosInstance from '../../../../api/axiosInstance';
import { addComment } from '../commentService';
import { Comment } from '../../../../types/Comment';

jest.mock('../../../../api/axiosInstance');

jest.mock("jose", () => ({
    decodeJwt: jest.fn(() => ({
        exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
    })),
}));

describe('commentService', () => {
    const mockComment: Comment = {
        id: 1,
        username: 'testuser',
        date: '2021-09-01T12:00:00Z',
        rating: 5,
        content: 'Great product!',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('addComment sends POST request and returns data', async () => {
        (axiosInstance.post as jest.Mock).mockResolvedValueOnce({ data: mockComment });

        const result = await addComment(1, mockComment);

        expect(axiosInstance.post).toHaveBeenCalledWith('/products/1/comments', mockComment);
        expect(result).toEqual(mockComment);
    });

    test('addComment handles errors', async () => {
        const errorMessage = 'Network Error';
        (axiosInstance.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

        await expect(addComment(1, mockComment)).rejects.toThrow(errorMessage);
        expect(axiosInstance.post).toHaveBeenCalledWith('/products/1/comments', mockComment);
    });
});