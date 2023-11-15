import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DpdInput, DpdRadio } from '../../components';
import { useFormik } from 'formik';
import { SKILL_LEVEL } from '../DCTP/DpdsRegistration';
import countryList from 'react-select-country-list';
import { AddButton } from '../Profile/EditProfile/WorkExperience';
import AddTeamModal from '../../components/Modal/AddTeamModal';
import { deleteIcon, editIcon } from '../../assets/Images';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

const REQUIREMENTS = [
  'Each team must consist of a maximum of four members.',
  'At least one female member must be present in each team.',
  'Each Participant must only be in one team, if found otherwise, the entire team will be disqualified.',
  'Each team member must possess a specific skill set related to design, engineering, or blockchain technology.',
  'Participants can join as individuals and form teams during Week 2',
  'Everyone needs to first register as an individual, inclduing the team lead. After that, your teamlead needs to come back and register as team again and include you all.',
];
const FOCUS = [
  'Decentralized Finance (DeFi)',
  'Metaverse Applications',
  'Blockchain Games',
  'Travel Applications',
  'Music Applications',
  'Identity Wallets',
  'Privacy & digital infrastructure',
  'Creator economy',
  'Others',
];

const Web5Registration = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <Box
      component="section"
      className="container web5"
      py="32px"
      color="text.grey.800"
    >
      <Button
        sx={{
          color: '#363636',
          boxShadow: '0px 3px 8px 0 rgba(0, 0, 0, .24)',
          textTransform: 'capitalize',
        }}
        onClick={() => navigate('/programs/web5')}
      >
        Go back
      </Button>
      <Typography
        component="h2"
        fontWeight="700"
        fontSize={{ xs: '32px', md: '32px' }}
        color="text.black.100"
        mt="20px"
      >
        DevCareer Web 5 Hackathon
      </Typography>
      <Typography
        mb={{ xs: '16px', md: '20px' }}
        fontSize={{ xs: '16px', md: '20px' }}
      >
        We are thrilled to extend an exclusive invitation to the DevCareer Web 5
        Hackathon, a one-of-a-kind hackathon experience designed to bring out
        your creativity and coding skills.DevCareer is known for its hands-on
        approach to software development education, offering practical projects
        and real-world challenges while teaching the latest programming
        languages, frameworks, and tools.
      </Typography>
      <Typography fontSize={{ xs: '16px', md: '20px' }}>
        Requirements:
      </Typography>
      <Stack component="ul" pl="20px">
        {REQUIREMENTS.map((req, i) => (
          <Typography
            component="li"
            key={i}
            fontWeight="700"
            fontSize={{ xs: '16px', md: '20px' }}
          >
            {req}
          </Typography>
        ))}
      </Stack>
      <Web5Form />
    </Box>
  );
};

export default Web5Registration;
const ReducerFn = (state, action) => {
  const { type, data, id } = action;

  if (type === 'ADD_MEMBER') {
    return [...state, data];
  }
  if (type === 'DELETE_MEMBER') {
    return state.filter((member) => member.id !== id);
  }
  if (type === 'EDIT_MEMBER') {
    const memberToEdit = state.findIndex((member) => member.id === data.id);
    state[memberToEdit] = action.data; // Manipulating existing member using it's index in the array...
    console.log(memberToEdit, state);
    return state;
  }
  if (type === 'CLEAR_MEMBERS') {
    return [];
  }
  return state;
};
const Web5Form = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [TEAM, teamDispatchFn] = useReducer(ReducerFn, []);
  const COUNTRY_ARRAY = useMemo(() => countryList().getData(), []);
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    experience: '',
    gender: '',
    skillLevel: '',
    country: '',
    focus: '',
    plan: '',
    member: '',
    github: '',
    feedback: '',
    others: '',
    role: 'Individual',
  };
  const validate = (values) => {
    const emailRegex = /^\s*([^\s@]+)@([^\s@]+\.[^\s@]+)\s*$/;
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Enter your First Name';
    }
    if (!values.lastName) {
      errors.lastName = 'Enter your Last Name';
    }
    if (!emailRegex.test(values.email)) {
      errors.email = 'Enter a Valid Email Address';
    }
    if (!values.experience) {
      errors.experience = 'Enter your hackathon experience';
    }
    if (!values.gender) {
      errors.gender = 'Please select a gender';
    }
    if (!values.skillLevel) {
      errors.skillLevel = 'Please select an option';
    }
    if (!values.country) {
      errors.country = 'Please select a country';
    }
    if (!values.focus) {
      errors.focus = 'Please select an option';
    }
    if (!values.plan) {
      errors.plan = 'Please fill this correctly';
    }
    if (!values.member) {
      errors.member = 'Please select an option';
    }
    if (values.focus === 'Others' && !values.others) {
      console.log('There is error');
      errors.others = 'Please input something';
    }
    if (!values.role) {
      errors.role = 'Please select...';
    }
    return errors;
  };
  const {
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const transfromTeamArrayIntoString = () => {
        let TEAM_CONCAT = '';
        const TEAM_ARRAY = TEAM.map(
          (member) => `(${member.fullName}, ${member.email})`
        );
        TEAM_ARRAY.forEach((member) => {
          TEAM_CONCAT += member;
        });
        return TEAM_CONCAT;
      };

      const DATA = new FormData();
      DATA.append('entry.1780295808', values.firstName);
      DATA.append('entry.932451859', values.lastName);
      DATA.append('entry.1664470478', values.email);
      DATA.append('entry.1316307388', values.experience); // entry.1316307388"
      DATA.append('entry.1064466476', values.gender);
      DATA.append('entry.81318272', values.skillLevel);
      DATA.append('entry.933939755', values.country);
      DATA.append('entry.467641655', values.focus);
      DATA.append('entry.1585515473', values.others);
      DATA.append('entry.71336846', values.plan);
      DATA.append('entry.253632849', values.member);
      DATA.append('entry.340422998', values.github);
      DATA.append('entry.1738249386', values.feedback);
      DATA.append('entry.372668222', values.role);
      DATA.append('entry.1177983450', transfromTeamArrayIntoString());

      setIsSubmitting(true);
      fetch(
        'https://docs.google.com/forms/u/0/d/e/1FAIpQLScGrQ8GkapGabqp7ehM2R4yW0FFq36856eCpHQSxKPfxnQVng/formResponse?pli=1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: DATA,
        }
      )
        .then((res) => {
          toast.success('Application Successful!!!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setTimeout(() => {
            navigate('/programs/web5');
          }, 3000);
        })
        .catch((err) => {
          toast.error('Network Error! Please retry...', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });
  useEffect(() => {
    if (values.role === 'Individual') {
      teamDispatchFn({ type: 'CLEAR_MEMBERS' });
    }
  }, [values.role]);
  return (
    <Stack gap={{ xs: '20px', md: '32px' }} mt="32px">
      <DpdInput
        label="First Name"
        required={true}
        name="firstName"
        error={touched.firstName && errors.firstName ? errors.firstName : ''}
        id="firstName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.firstName}
      />
      <DpdInput
        label="Last Name"
        required={true}
        name="lastName"
        error={touched.lastName && errors.lastName ? errors.lastName : ''}
        id="lastName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.lastName}
      />
      <DpdInput
        label="Email Address"
        required={true}
        name="email"
        error={touched.email && errors.email ? errors.email : ''}
        id="email"
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <DpdRadio
        label="Do you have any previous Hackathon Experience?"
        options={['Yes', 'No']}
        required={true}
        titleColor="text.black.100"
        name="experience"
        id="experience"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.experience && touched.experience ? errors.experience : ''}
      />
      <DpdRadio
        label="GENDER"
        options={['Female', 'Male', 'Others']}
        required={true}
        titleColor="#888"
        name="gender"
        error={errors.gender && touched.gender ? errors.gender : ''}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <DpdRadio
        label="SKILL LEVEL"
        options={SKILL_LEVEL}
        required="true"
        titleColor="#888"
        name="skillLevel"
        error={errors.skillLevel && touched.skillLevel ? errors.skillLevel : ''}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormControl error={errors.country && touched.country}>
        <InputLabel
          sx={{ fontWeight: '700', color: 'text.grey.800', mb: '8px' }}
        >
          Country
        </InputLabel>
        <Select
          name="country"
          label="State of Residence"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.country}
        >
          {COUNTRY_ARRAY?.map((country, i) => (
            <MenuItem key={i} value={country.label}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl error={errors.focus && touched.focus}>
        <InputLabel
          sx={{ fontWeight: '700', color: 'text.grey.800', mb: '8px' }}
        >
          Select Area of Focus
        </InputLabel>
        <Select
          name="focus"
          label="State of Residence"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.focus}
          defaultValue={values.focus}
        >
          {FOCUS.map((focus, i) => (
            <MenuItem key={i} value={focus}>
              {focus}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {values.focus === 'Others' && (
        <DpdInput
          name="others"
          id="others"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.others && touched.others ? errors.others : ''}
        />
      )}
      <DpdRadio
        label="Do you plan to continue working on this after the Hackathon?"
        options={['Yes', 'No']}
        required={true}
        titleColor="text.black.100"
        name="plan"
        id="experience"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.plan && touched.plan ? errors.plan : ''}
      />
      <DpdRadio
        label="Are you a member of DevCareer Africa Community?"
        options={['Yes', 'No']}
        required="true"
        titleColor="text.black.100"
        name="member"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.member && touched.member ? errors.member : ''}
      />
      <DpdInput
        label="Link to Github profile"
        name="github"
        id="github"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <DpdInput
        label="Do you have any final thoughts or feedback on this application you'd like to share?"
        name="feedback"
        id="feedback"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormControl error={errors.role && touched.role}>
        <Typography fontWeight="700" mb="10px">
          Everyone should individually register, including the team lead, and
          then the team lead should return to register the entire team, ensuring
          all members are included.
        </Typography>
        <Select
          name="role"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.role}
        >
          <MenuItem value="Team"> Apply as a Team</MenuItem>
          <MenuItem value="Individual"> Apply as an Individual</MenuItem>
        </Select>
      </FormControl>
      <Stack>
        {values.role === 'Team' && (
          <Typography
            fontWeight="700"
            fontSize={{ xs: '16px', md: '20px' }}
            color="text.black.100"
          >
            Add Teammates
          </Typography>
        )}
        {values.role === 'Team' && (
          <Typography
            fontWeight="500"
            fontSize={{ xs: '16px', md: '20px' }}
            color="text.grey.800"
            mb="8px"
          >
            Add up to 3 team members
          </Typography>
        )}
        <Stack gap={{ xs: '10px', md: '16px' }}>
          {TEAM.map((member, i) => (
            <Member
              key={i}
              name={member.fullName}
              email={member.email}
              id={member.id}
              teamDispatchFn={teamDispatchFn}
              openModal={handleModalOpen}
            />
          ))}
        </Stack>
        {TEAM.length < 3 && values.role === 'Team' && (
          <AddButton title="Add Team Member" openModal={handleModalOpen} />
        )}
      </Stack>
      <LoadingButton
        id="web5ActionButton"
        loading={isSubmitting}
        onClick={handleSubmit}
        fontWeight="500"
        fontSize="20px"
        variant="outlined"
        sx={{
          textTransform: 'capitalize',
          opacity: isSubmitting ? '0.7' : '1',
          py: '20px',
          borderRadius: '8px',
          color: '#FEFEFE',
          bgcolor: 'primary.main',
          mt: '72px',
          width: { xs: '100%' },
          '&:hover': {
            bgcolor: 'primary.main',
          },
          '&:disabled': {
            backgroundColor: '#e0e0e0',
          },
          ':hover': {
            transform: 'scale(0.9)',
          },
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Enroll into Program'}
      </LoadingButton>
      {showModal && (
        <AddTeamModal
          closeModal={handleModalClose}
          dispatchFn={teamDispatchFn}
          team={TEAM}
        />
      )}
    </Stack>
  );
};

const Member = ({ name, email, id, teamDispatchFn, openModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deleteMember = () => {
    teamDispatchFn({ type: 'DELETE_MEMBER', id: id });
  };
  const editMember = () => {
    searchParams.set('id', id);
    setSearchParams(searchParams);
    openModal();
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Stack>
        <Typography
          fontWeight="500"
          color="text.grey.800"
          fontSize={{ xs: '16px', md: '20px' }}
        >
          {name}
        </Typography>
        <Typography color="text.grey.700" fontSize={{ xs: '16px', md: '20px' }}>
          {email}
        </Typography>
      </Stack>
      <Stack direction="row" gap="10px">
        <Box
          component="img"
          src={deleteIcon}
          onClick={deleteMember}
          sx={{ cursor: 'pointer' }}
        ></Box>
        <Box
          component="img"
          src={editIcon}
          onClick={editMember}
          sx={{ cursor: 'pointer' }}
        ></Box>
      </Stack>
    </Stack>
  );
};

// const submit = () => {
//   const newFormData = () => {
//     const Data = {
//       'entry.1780295808': 'riddo',
//       'entry.932451859': 'niran',
//     };
//     const formData = new FormData();
//     const newArr = Object.entries(Data);
//     newArr.map((item) => {
//       return formData.append(`${item[0]}`, item[1]);
//     });
//     return formData;
//   };
//   fetch(
//     'https://docs.google.com/forms/u/0/d/e/1FAIpQLScGrQ8GkapGabqp7ehM2R4yW0FFq36856eCpHQSxKPfxnQVng/formResponse?pli=1',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       mode: 'no-cors',
//       body: newFormData(),
//     }
//   ).then((res) => console.log(res));
// };
// submit();
