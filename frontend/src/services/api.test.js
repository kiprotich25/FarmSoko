// src/services/api.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API from './api';

describe('API Client', () => {
  const mock = new MockAdapter(API);

  afterEach(() => {
    mock.reset();
  });

  it('should include Authorization header if token exists', async () => {
    localStorage.setItem('token', 'test-token');

    mock.onGet('/products').reply((config) => {
      expect(config.headers.Authorization).toBe('Bearer test-token');
      return [200, []];
    });

    await API.get('/products');
  });

  it('should fetch products correctly', async () => {
    const mockData = [{ _id: 1, name: 'Tomatoes' }];
    mock.onGet('/products').reply(200, mockData);

    const res = await API.get('/products');
    expect(res.data).toEqual(mockData);
  });
});
