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
      state.fullName = action.payload;
    },
    addExperience(state, action) {
      const { payload } = action;
      state.experiences.push(payload);
    },
    editExperience(state, action) {
      const { companyName, jobTitle, startDate, endDate, employmentType, id } =
        action.payload;
      const experienceToEdit = state.experiences.find((exp) => exp.id === id);
      experienceToEdit.companyName = companyName;
      experienceToEdit.jobTitle = jobTitle;
      experienceToEdit.startDate = startDate;
      experienceToEdit.endDate = endDate;
      experienceToEdit.employmentType = employmentType;
    },
  },
});

export const store = configureStore({
  reducer: profileSlice.reducer,
});

export const profileActions = profileSlice.actions;
