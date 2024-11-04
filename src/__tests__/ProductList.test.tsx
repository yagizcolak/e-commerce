import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import MockAdapter from 'axios-mock-adapter';
import ProductList from '../pages/ProductList';
import { AuthContext } from '../context/AuthContext';
import { CurrencyContext } from '../context/CurrencyContext';
import { Product } from '../types/Product';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mock = new MockAdapter(axiosInstance);

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 29.99,
    rating: 4.5,
    image: 'product1.jpg',
    images: ['product1-1.jpg', 'product1-2.jpg'],
    description: 'Description for Product 1',
    arrivalDate: '2021-08-01T00:00:00Z',
    comments: [],
  },
];

describe('ProductList Component', () => {
  const mockLogout = jest.fn();
  const mockSetCurrency = jest.fn();

  const renderProductList = () => {
    localStorage.setItem('token', 'test-token');

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ token: 'test-token', login: jest.fn(), logout: mockLogout }}>
          <CurrencyContext.Provider value={{ currency: 'USD', setCurrency: mockSetCurrency }}>
            <ProductList />
          </CurrencyContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
    localStorage.removeItem('token');
  });

  test('displays loading indicator while fetching products', () => {
    mock.onGet('/api/products').reply(() => {
      return new Promise(() => {});
    });

    renderProductList();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    mock.onGet('/api/products').reply(500, { message: 'Internal Server Error' });

    renderProductList();

    const errorMessage = await screen.findByText(/internal server error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders list of products on successful fetch', async () => {
    mock.onGet('/api/products').reply(200, mockProducts);

    renderProductList();

    for (const product of mockProducts) {
      const productName = await screen.findByText(product.name);
      expect(productName).toBeInTheDocument();

      const productPrice = screen.getByText(`$${product.price}`);
      expect(productPrice).toBeInTheDocument();
    }
  });

  test('navigates to product detail on product click', async () => {
    mock.onGet('/api/products').reply(200, mockProducts);

    renderProductList();

    const productCard = await screen.findByText(mockProducts[0].name);
    fireEvent.click(productCard);

    expect(mockNavigate).toHaveBeenCalledWith(`/products/${mockProducts[0].id}`);
  });
});