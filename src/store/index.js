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
    writeExistingProfile(state, action) {
      const { experiences, educations, personal } = action.payload;
      state.experiences = experiences;
      state.educations = educations;
      state.personal.fullName = personal.fullName;
      state.personal.about = personal.about;
      state.personal.jobTitle = personal.jobTitle;
      state.personal.location = personal.location;
      state.personal.portfolioURL = personal.portfolioURL;
    },
    addFullName(state, action) {
      state.fullName = action.payload;
    },

    addExperience(state, action) {
      const { payload } = action;
      state.experiences.push(payload);
    },
    editExperience(state, action) {
      const {
        companyName,
        jobTitle,
        startDate,
        endDate,
        employmentType,
        _id,
        tillPresent,
      } = action.payload;
      const experienceToEdit = state.experiences.find((exp) => exp._id === _id);
      experienceToEdit.companyName = companyName;
      experienceToEdit.jobTitle = jobTitle;
      experienceToEdit.startDate = startDate;
      experienceToEdit.endDate = endDate;
      experienceToEdit.employmentType = employmentType;
      experienceToEdit.tillPresent = tillPresent;
    },
    addEducation(state, action) {
      state.educations.push(action.payload);
    },
    editEducation(state, action) {
      const { schoolName, course, degree, startYear, endYear, _id } =
        action.payload;
      const educationToEdit = state.educations.find((edu) => edu._id === _id);
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
