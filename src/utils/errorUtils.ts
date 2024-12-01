import { AxiosError } from 'axios';

export interface ErrorResponseData {
    message: string;
}

export function isAxiosError(error: unknown): error is AxiosError<ErrorResponseData> {
    return (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        (error as AxiosError<ErrorResponseData>).isAxiosError === true
    );
}