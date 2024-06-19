import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { isArray } from 'lodash';

export interface Profile {
  id: number;
  first_name: string,
  last_name: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  photo: string;
  notes: string;
}

interface ProfileState {
  profiles: Profile[];
  inFocus: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  inFocus: null,
  status: 'idle',
  error: null,
};

async function returnNetworkProfiles() {
  const profiles = await fetch("https://codechallenge.rivet.work/api/v1/profile/1", {
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || ''
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('got some data', data);
    return isArray(data) ? data : [data];
  });

  return profiles;
}

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
  // Now using returnNetworkProfiles to fetch real profiles
  return await returnNetworkProfiles();
});

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setActiveProfile: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const found = state.profiles.find((item) => item.id === id);
      state.inFocus = found || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Direct assignment of the payload to profiles is correct here
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch profiles';
      });
  }
});

export const { setActiveProfile } = profileSlice.actions;
export const profileList = (state: RootState) => state.profile.profiles;
export const countProfiles = (state: RootState) => state.profile.profiles.length as number;
export const currentProfile = (state: RootState) => state.profile.inFocus;
export const profileStatus = (state: RootState) => state.profile.status;
export const profileError = (state: RootState) => state.profile.error;

export default profileSlice.reducer;