import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App'; // Assuming App is in the same directory
import store from './store'; // Update the import path as necessary
import fetchMock from 'jest-fetch-mock';

describe('fetchProfiles thunk', () => {
  it('should fetch and store profiles', async () => {
    // Setup mock store and dispatch fetchProfiles
    // Assert the state contains the fetched profiles
  });
});

describe('setActiveProfile reducer', () => {
  it('should set the active profile by ID', () => {
    // Initial state with profiles
    // Dispatch setActiveProfile with a valid ID
    // Expect inFocus to be set correctly
  });

  it('should do nothing for an invalid ID', () => {
    // Initial state with profiles
    // Dispatch setActiveProfile with an invalid ID
    // Expect inFocus to remain null
  });
});

describe('profileList selector', () => {
  it('should return the entire list of profiles', () => {
    // Setup initial state with profiles
    // Call profileList selector
    // Expect the entire list of profiles to be returned
  });
});

describe('countProfiles selector', () => {
  it('should return the correct count of profiles', () => {
    // Setup initial state with profiles
    // Call countProfiles selector
    // Expect the correct count of profiles to be returned
  });
});

describe('currentProfile selector', () => {
  it('should return the current active profile', () => {
    // Setup initial state with profiles and active profile
    // Call currentProfile selector
    // Expect the current active profile to be returned
  });
});

// describe('1 | Allow all employee profiles to be viewed on a single screen', () => {
//   describe('DATA FETCHING / RENDERING', () => {
//     test('Verify that the application sends a request to the correct endpoint to fetch employee profiles.', async () => {
//       fetchMock.mockResponseOnce(JSON.stringify({ data: 'some fake data' }));
      
//       // Wrap the App component with the Provider and pass the test store
//       render(
//         <Provider store={store}>
//           <App />
//         </Provider>
//       );
      
//       await new Promise(resolve => setTimeout(resolve, 100)); // Wait for the request to complete
//       expect(fetchMock.mock.calls.length).toBe(1); // Check if fetch was called with the correct URL
//       expect(fetchMock.mock.calls[0][0]).toEqual('https://codechallenge.rivet.work/api/v1/profile/1');
//     });

//     // Additional tests related to data fetching and rendering can be added here
//   });

//   // Other tests related to viewing all employee profiles on a single screen can be added here
// });
