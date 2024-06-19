import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  activeProfileId: number | null;
}


const initialState: ProfileState = {
  profiles: [],
  status: 'idle',
  error: null,
  activeProfileId: null,
};

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async (_, thunkAPI) => {
  const response = await fetch('https://codechallenge.rivet.work/api/v1/profiles', {
    headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`
    },
  });
  return (await response.json()) as Profile[];
});

export const fetchProfileById = createAsyncThunk('profiles/fetchProfileById', async (id: string, thunkAPI) => {
  const response = await fetch(`https://codechallenge.rivet.work/api/v1/profile/${id}`, {
    headers: {
      "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`
},
  });
  return (await response.json()) as Profile;
});

// Async thunk for loading a single profile
export const fetchProfile = createAsyncThunk(
  'profiles/fetchProfile',
  async (profileId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://codechallenge.rivet.work/api/v1/profile/${profileId}`, {
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Type check to safely access error.message
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        // Handle the case where the error is not an instance of Error
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

// Async thunk for creating a new profile
export const createProfile = createAsyncThunk(
  'profiles/createProfile',
  async (profileData: Partial<Profile>, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://codechallenge.rivet.work/api/v1/profile`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error creating profile:', error);
      // Type check to safely access error.message
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        // Handle the case where the error is not an instance of Error
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

// Async thunk for updating an existing profile
export const updateProfile = createAsyncThunk(
  'profiles/updateProfile',
  async ({ profileId, profileData }: { profileId: number; profileData: Partial<Profile>; }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://codechallenge.rivet.work/api/v1/profile/${profileId}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Type check to safely access error.message
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        // Handle the case where the error is not an instance of Error
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setActiveProfile: (state, action: PayloadAction<number | null>) => {
      state.activeProfileId = action.payload;
    },
    // Other reducers...
    fetchProfilePending: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchProfileFulfilled: (state, action: PayloadAction<Profile>) => {
      state.status = 'succeeded';
      state.error = null;
      state.profiles.push(action.payload);
    },
    fetchProfileRejected: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    createProfilePending: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    createProfileFulfilled: (state, action: PayloadAction<Profile>) => {
      state.status = 'succeeded';
      state.error = null;
      state.profiles.push(action.payload);
    },
    createProfileRejected: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateProfilePending: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    updateProfileFulfilled: (state, action: PayloadAction<Profile>) => {
      state.status = 'succeeded';
      state.error = null;
      const updatedProfile = action.payload;
      const existingProfileIndex = state.profiles.findIndex(profile => profile.id === updatedProfile.id);
      if (existingProfileIndex !== -1) {
        state.profiles[existingProfileIndex] = updatedProfile;
      }
    },
    updateProfileRejected: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunks here
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.profiles.push(action.payload);
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;;
    });
    builder.addCase(createProfile.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.profiles.push(action.payload);
    });
    builder.addCase(createProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      const updatedProfile = action.payload;
      const existingProfileIndex = state.profiles.findIndex(profile => profile.id === updatedProfile.id);
      if (existingProfileIndex !== -1) {
        state.profiles[existingProfileIndex] = updatedProfile;
      }
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;;
    });
  },
});

export const { setActiveProfile } = profileSlice.actions;

export default profileSlice.reducer;

// Define and export selectors to read values from the state
export const selectAllProfiles = (state: RootState) => state.profile.profiles;
export const currentProfile = (state: RootState) => state.profile.profiles.find(profile => profile.id === state.profile.activeProfileId);
export const selectProfileStatus = (state: RootState) => state.profile.status;
export const selectProfileError = (state: RootState) => state.profile.error as string | null;
 
