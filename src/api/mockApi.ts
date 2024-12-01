/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/api/mockApi.ts

import MockAdapter from 'axios-mock-adapter';
import axiosInstance from './axiosInstance';
import { jwtVerify, SignJWT } from 'jose';
import CryptoJS from 'crypto-js';
import { products } from '../data/products';
import { Product } from '../types/Product';
import { Comment } from '../types/Comment';
import { JWT_SECRET } from '../config';

// Initialize mock adapter
const mock = new MockAdapter(axiosInstance, { delayResponse: 150 });

// Function to get product data from sessionStorage or initialize it
const getProductData = () => {
    const data = sessionStorage.getItem('productData');
    return data ? JSON.parse(data) : products;
};

// Function to save product data to sessionStorage
const saveProductData = (data: Product[]) => {
    sessionStorage.setItem('productData', JSON.stringify(data));
};

// Predefined user with hashed password
const users = [
    {
        username: 'user',
        passwordHash: CryptoJS.SHA256('user123').toString(),
    },
];

// Mock POST /api/login
mock.onPost('/login').reply(async (config) => {
    const { username, password } = JSON.parse(config.data);

    const user = users.find((u) => u.username === username);
    if (user && CryptoJS.SHA256(password).toString() === user.passwordHash) {
        const token = await new SignJWT({ username })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(new TextEncoder().encode(JWT_SECRET));

        return [200, { token }];
    } else {
        return [401, { message: 'Invalid username or password' }];
    }
});

// Mock GET /api/products
mock.onGet('/products').reply(async (config) => {
    const authHeader = config.headers?.Authorization || config.headers?.authorization;
    if (!authHeader) {
        return [401, { message: 'Unauthorized' }];
    }

    const token = authHeader.split(' ')[1];
    try {
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        const productData = getProductData();
        return [200, productData];
    } catch (error) {
        return [401, { message: 'Invalid token' }];
    }
});

// Mock GET /api/products/:id
mock.onGet(/\/products\/\d+$/).reply(async (config) => {
    const authHeader = config.headers?.Authorization || config.headers?.authorization;
    if (!authHeader) {
        return [401, { message: 'Unauthorized' }];
    }

    const token = authHeader.split(' ')[1];
    try {
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        const productData = getProductData();
        const id = parseInt(config.url!.split('/').pop()!, 10);
        const product = productData.find((p: Product) => p.id === id);
        if (product) {
            return [200, product];
        } else {
            return [404, { message: 'Product not found' }];
        }
    } catch (error) {
        return [401, { message: 'Invalid token' }];
    }
});

// Mock POST /api/products/:id/comments
mock.onPost(/\/products\/\d+\/comments/).reply(async (config) => {
    const authHeader = config.headers?.Authorization || config.headers?.authorization;
    if (!authHeader) {
        return [401, { message: 'Unauthorized' }];
    }

    const token = authHeader.split(' ')[1];
    try {
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        const productData = getProductData();
        const id = parseInt(config.url!.split('/')[2], 10);
        const product = productData.find((p: Product) => p.id === id);
        if (product) {
            const newComment: Comment = JSON.parse(config.data);
            product.comments.unshift(newComment);
            // Update the product's average rating
            product.rating =
                product.comments.reduce((sum: number, c: Comment) => sum + c.rating, 0) /
                product.comments.length;
            saveProductData(productData);
            return [201, newComment];
        } else {
            return [404, { message: 'Product not found' }];
        }
    } catch (error) {
        return [401, { message: 'Invalid token' }];
    }
});

export default mock;