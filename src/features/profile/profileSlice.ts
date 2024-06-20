import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
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
  activeProfile: Profile | null;
}

const initialState: ProfileState = {
  profiles: [],
  activeProfile: null,
};

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async (_, thunkAPI) => {
  const response = await fetch('https://codechallenge.rivet.work/api/v1/profiles', {
    headers: {
      token: 'YOUR_ACCESS_TOKEN',
    },
  });
  return (await response.json()) as Profile[];
});

export const fetchProfileById = createAsyncThunk('profiles/fetchProfileById', async (id: string, thunkAPI) => {
  const response = await fetch(`https://codechallenge.rivet.work/api/v1/profile/${id}`, {
    headers: {
      token: 'YOUR_ACCESS_TOKEN',
    },
  });
  return (await response.json()) as Profile;
});

export const createProfile = createAsyncThunk('profiles/createProfile', async (profile: Profile, thunkAPI) => {
  const response = await fetch('https://codechallenge.rivet.work/api/v1/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: 'YOUR_ACCESS_TOKEN',
    },
    body: JSON.stringify(profile),
  });
  return (await response.json()) as Profile;
});

export const updateProfile = createAsyncThunk('profiles/updateProfile', async (profile: Profile, thunkAPI) => {
  const response = await fetch(`https://codechallenge.rivet.work/api/v1/profile/${profile.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: 'YOUR_ACCESS_TOKEN',
    },
    body: JSON.stringify(profile),
  });
  return (await response.json()) as Profile;
});

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      state.activeProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.activeProfile = action.payload;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      });
  },
});

export const { setActiveProfile } = profileSlice.actions;

export const profileList = (state: RootState) => state.profiles.profiles;
export const currentProfile = (state: RootState) => state.profiles.activeProfile;

export default profileSlice.reducer;
