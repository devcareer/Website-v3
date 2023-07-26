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
    addEducation(state, action) {
      state.educations.push(action.payload);
    },
    editEducation(state, action) {
      const { schoolName, course, degree, startYear, endYear, id } =
        action.payload;
      const educationToEdit = state.educations.find((edu) => edu.id === id);
      educationToEdit.schoolName = schoolName;
      educationToEdit.course = course;
      educationToEdit.degree = degree;
      educationToEdit.startYear = startYear;
      educationToEdit.endYear = endYear;
    },
  },
});

export const store = configureStore({
  reducer: profileSlice.reducer,
});

export const profileActions = profileSlice.actions;
