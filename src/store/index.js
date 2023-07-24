import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  personal: {
    fullName: '',
    about: '',
    jobTitle: '',
    location: '',
    portfolioURL: '',
  },
  educations: [],
  experiences: [],
  projects: [],
  skills: [],
};
const profileSlice = createSlice({
  initialState,
  name: 'profileSlice',
  reducers: {
    addFullName(state, action) {
     state.fullName=action.payload
    },
  },
});

export const store = configureStore({
  reducer: profileSlice.reducer,
});

export const profileActions = profileSlice.actions;
