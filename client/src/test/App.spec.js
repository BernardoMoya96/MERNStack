import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './../App';

describe('e_records success scenario', () => {
  beforeEach(() => {
    /**
     * mocking fetch api call
     * fetch api login call will always return user details
     *  */

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve({
          user: 'user_token_details',
          status: 'ok',
        }),
    });
  });

  test('loads and displays greeting', () => {
    render(<App />);
    // expectation to check app render successfully & showing a login or landing page
    expect(screen.getByText('Please Log In')).toBeDefined();
  });

  test('login success action', async () => {
    // rendering app component
    const { getByText, getByPlaceholderText } = render(<App />);

    // firing onchange event for both email and password with success credentials
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'test1234@gmail.com' },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'myPassword' },
    });

    // firing click event on login button once data is filled
    await act(async () => {
      fireEvent.click(getByText('Login'), { target: {} });
    });

    // expectation to make sure we are navigated to dashboard
    expect(getByText('Home')).toBeDefined();
    expect(getByText('Records')).toBeDefined();
  });
});

describe('e_records failure scenario', () => {
  beforeEach(() => {
    /**
     * mocking fetch api call
     * fetch api login call will always return error details
     *  */

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve({
          status: 'error',
          error: 'Login Failed',
        }),
    });
  });

  test('loads and displays greeting', () => {
    render(<App />);
    // expect to check app render successfully & showing a login page
    expect(screen.getByText('Please Log In')).toBeDefined();
  });

  test('login failure action', async () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    // firing onchange event for both email and password with invalid credentials
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'test1234@gmail.com' },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: '1234' },
    });

    // firing click event on login button once data is filled
    await act(async () => {
      fireEvent.click(getByText('Login'), { target: {} });
    });

    // expectation to make sure we are getting error message
    expect(getByText('Login Failed')).toBeDefined();
  });
});
