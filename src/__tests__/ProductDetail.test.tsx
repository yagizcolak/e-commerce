import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import MockAdapter from 'axios-mock-adapter';
import ProductDetail from '../pages/ProductDetail';
import { AuthContext } from '../context/AuthContext';
import { CurrencyContext } from '../context/CurrencyContext';
import { Product } from '../types/Product';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Initialize Axios mock adapter with axiosInstance
const mock = new MockAdapter(axiosInstance);

// Mock product data
const mockProduct: Product = {
  id: 1,
  name: 'Product 1',
  price: 29.99,
  rating: 4.5,
  image: 'product1.jpg',
  images: ['product1-1.jpg', 'product1-2.jpg'],
  description: 'Description for Product 1',
  arrivalDate: '2021-08-01T00:00:00Z',
  comments: [],
};

describe('ProductDetail Component', () => {
  const mockLogout = jest.fn();
  const mockSetCurrency = jest.fn();

  const renderProductDetail = (route: string, selectedProductId?: string) => {
    if (selectedProductId) {
      sessionStorage.setItem('selectedProductId', selectedProductId);
    } else {
      sessionStorage.removeItem('selectedProductId');
    }

    render(
      <MemoryRouter initialEntries={[route]}>
        <AuthContext.Provider value={{ token: 'test-token', login: jest.fn(), logout: mockLogout }}>
          <CurrencyContext.Provider value={{ currency: 'USD', setCurrency: mockSetCurrency }}>
            <Routes>
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/products" element={<div>Products List</div>} />
            </Routes>
          </CurrencyContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
    localStorage.removeItem('token');
    sessionStorage.removeItem('selectedProductId');
  });

  test('displays loading indicator while fetching product', () => {
    mock.onGet('/api/products/1').reply(() => new Promise(() => {})); // Never resolves

    renderProductDetail('/products/1', '1');

    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Ensure LoadingIndicator has role 'progressbar'
  });

  test('displays error message on fetch failure', async () => {
    mock.onGet('/api/products/1').reply(500, { message: 'Internal Server Error' });

    renderProductDetail('/products/1', '1');

    const errorMessage = await screen.findByText(/internal server error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders product details on successful fetch', async () => {
    mock.onGet('/api/products/1').reply(200, mockProduct);

    renderProductDetail('/products/1', '1');

    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('Description for Product 1')).toBeInTheDocument();
  });

  test('navigates back to products list if product is not selected', () => {
    renderProductDetail('/products/1'); // No selectedProductId

    expect(screen.getByText('Products List')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled(); // Navigation handled by <Navigate />
  });
});