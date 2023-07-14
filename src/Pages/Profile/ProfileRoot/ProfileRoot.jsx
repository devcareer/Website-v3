import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { devcareerhub, signOut } from '../../../assets/Images';
import { AccountSettings, EditProfile } from '../../../Pages';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const ProfileRoot = () => {
  useEffect(() => {
    console.log(import.meta.env.VITE_BASE_URL + 'signup');
  }, []);
  const LINK_ACTIONS = [
    {
      text: 'Overview',
      to: 'overview',
    },
    {
      text: 'Edit Profile',
      to: 'edit',
    },
    {
      text: 'Account Settings',
      to: 'settings',
    },
  ];
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  return (
    <Box bgcolor="#E0E0E0" pt="50px">
      <Stack
        component="nav"
        direction={{ xs: 'column', lg: 'row' }}
        alignItems="center"
        gap="30px"
        width="90%"
        mx="auto"
        maxWidth="1200px"
      >
        <Link>
          <Box
            component="img"
            src={devcareerhub}
            alt="devcareer logo"
            width="182px"
          ></Box>
        </Link>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-around"
          py={{ xs: '24px', sm: '16px' }}
          px={{ xs: '24px', lg: '0px' }}
          bgcolor="background.offwhite"
          border="1px solid #F4F4F4"
          borderRadius="16px"
          flexGrow="1"
        >
          {LINK_ACTIONS.map((data, i) => (
            <ProfileLink key={i} data={data} active={mode === data.to} />
          ))}
        </Stack>
        <Button
          sx={{
            py: { xs: '8px', sm: '16px' },
            px: '20px',
            borderRadius: '8px',
            display: 'flex',
            gap: '8px',
            bgcolor: 'background.offwhite',
          }}
        >
          <Box component="img" src={signOut} alt="Logout"></Box>
          <Typography color="grey.500" textTransform="capitalize">
            Log Out
          </Typography>
        </Button>
      </Stack>
      {mode === 'settings' && <AccountSettings />}
      {mode === 'edit' && <EditProfile />}
    </Box>
  );
};

export default ProfileRoot;

const ProfileLink = ({ data, active }) => {
  const navigate = useNavigate();
  const { to, text } = data;
  return (
    <Button
      onClick={() => navigate(`?mode=${to}`)}
      sx={{
        py: '12px',
        px: '20px',
        display: 'flex',

        gap: '5px',
        borderRadius: '8px',
        bgcolor: active ? '#05B993' : 'inherit',
        ':hover': {
          bgcolor: active ? '#05B993' : 'inherit',
        },
      }}
    >
      {text === 'Edit Profile' && <EditIcon active={active} />}
      {text === 'Overview' && <ProfileIcon active={active} />}
      {text === 'Account Settings' && <SettingsIcon active={active} />}
      <Typography
        color={active ? '#FEFEFE' : 'grey.500'}
        textTransform="capitalize"
        fontSize="18px"
      >
        {text}
      </Typography>
    </Button>
  );
};
// THE ICONS FOR EACH BUTTON. OVERVIEW, SETTINGS & EDIT.

const SettingsIcon = ({ active }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Gear" clip-path="url(#clip0_1081_2033)">
        <path
          id="Vector"
          d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
          stroke={active ? '#FEFEFE' : '#A3A3A3'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M3.884 16.6964C3.4696 15.9826 3.15212 15.2168 2.93994 14.4192L4.51307 12.4504C4.49525 12.1494 4.49525 11.8477 4.51307 11.5467L2.94088 9.57793C3.1527 8.78019 3.46953 8.01412 3.88307 7.2998L6.38713 7.01855C6.58709 6.79327 6.80028 6.58008 7.02557 6.38012L7.30682 3.87699C8.0201 3.46543 8.78492 3.15048 9.58119 2.94043L11.5499 4.51355C11.8509 4.49574 12.1527 4.49574 12.4537 4.51355L14.4224 2.94137C15.2202 3.15319 15.9863 3.47002 16.7006 3.88355L16.9818 6.38762C17.2071 6.58758 17.4203 6.80077 17.6203 7.02605L20.1234 7.3073C20.5378 8.02108 20.8553 8.78688 21.0674 9.58449L19.4943 11.5532C19.5121 11.8542 19.5121 12.156 19.4943 12.457L21.0665 14.4257C20.8562 15.2232 20.5409 15.9893 20.129 16.7039L17.6249 16.9851C17.425 17.2104 17.2118 17.4236 16.9865 17.6236L16.7053 20.1267C15.9915 20.5411 15.2257 20.8586 14.4281 21.0707L12.4593 19.4976C12.1583 19.5154 11.8566 19.5154 11.5556 19.4976L9.58682 21.0698C8.78931 20.8595 8.02325 20.5442 7.30869 20.1323L7.02744 17.6282C6.80215 17.4283 6.58897 17.2151 6.389 16.9898L3.884 16.6964Z"
          stroke={active ? '#FEFEFE' : '#A3A3A3'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1081_2033">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
const ProfileIcon = ({ active }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="User" clip-path="url(#clip0_1081_2021)">
        <path
          id="Vector"
          d="M12.5 15C15.8137 15 18.5 12.3137 18.5 9C18.5 5.68629 15.8137 3 12.5 3C9.18629 3 6.5 5.68629 6.5 9C6.5 12.3137 9.18629 15 12.5 15Z"
          stroke={active ? '#FEFEFE' : '#A3A3A3'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M3.5 20.25C5.31594 17.1122 8.61406 15 12.5 15C16.3859 15 19.6841 17.1122 21.5 20.25"
          stroke={active ? '#FEFEFE' : '#A3A3A3'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1081_2021">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const EditIcon = ({ active }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="PencilSimple" clip-path="url(#clip0_1081_2027)">
        <path
          id="Vector"
          d="M9.18969 20.2501H5C4.80109 20.2501 4.61032 20.1711 4.46967 20.0305C4.32902 19.8898 4.25 19.699 4.25 19.5001V15.3104C4.25009 15.1118 4.32899 14.9213 4.46938 14.7807L16.0306 3.2195C16.1713 3.07895 16.362 3 16.5608 3C16.7596 3 16.9503 3.07895 17.0909 3.2195L21.2806 7.40637C21.4212 7.54701 21.5001 7.7377 21.5001 7.93653C21.5001 8.13535 21.4212 8.32605 21.2806 8.46668L9.71937 20.0307C9.57883 20.1711 9.38834 20.25 9.18969 20.2501Z"
          stroke={active ? '#FEFEFE' : '#A3A3A3'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M13.25 6L18.5 11.25"
          stroke={active ? '#FEFEFE' : '#A3A3A3'}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1081_2027">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
