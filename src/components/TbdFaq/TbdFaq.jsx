import { Box, Typography, Stack } from '@mui/material';
import { useState } from 'react';
const FaqSection = () => {
  const FAQS = [
    {
      question: 'What is DevCareer Web5 Hackathon?',
      answer:
        'DevCareer Web5 Hackathon is a proud initiative of DevCareer and TBD. This is a four-week virtual event that brings together developers, designers, and tech enthusiasts to learn and build with Web5 and decentralized technologies.',
    },
    {
      question: 'When is the Hackathon taking place?',
      answer:
        'The hackathon is scheduled to run from November 20th to December 15th, 2023.',
    },
    {
      question: 'Who can participate?',
      answer:
        'Anyone interested in Web5 and decentralized technologies with relevant technical skills is eligible to apply for DevCareer Web5 Hackathon.      ',
    },
    {
      question: ' What if I’ve never been to a hackathon before?',
      answer: ` No worries! DevCareer Web5 Hackathon is an inclusive and welcoming event for participants of all skill levels. Whether you're a first-time hackathon attendee or a seasoned developer, our hackathon is designed to provide a supportive environment. We provide learning resources, mentorship, workshop and a community that encourages collaboration and growth. Be eager to learn and meet lots of awesome people in the community.`,
    },
    {
      question: 'Can I start working on the project before the event?',
      answer: `No, to maintain fairness, participants are not permitted to work on their projects before the start of the event. Working on existing projects is also not allowed. However, you can still prepare yourself by brainstorming for ideas and learning the tools that you intend to use beforehand.`,
    },
    {
      question: ' Is there any cost to participate?',
      answer: `No, participation in the DevCareer Web5 Hackathon is free of charge, all you have to do is show up!`,
    },
    {
      question: 'Are we allowed to form teams with our friends and colleagues?',
      answer: `Yes, you can form a team with your friends and colleagues, but keep in mind that one person from the team needs to submit the application. DevCareer Web5 Hackathon is open to inclusive teams made up of four individuals, with at least one female member. Teams can be formed before or during the event.`,
    },
    {
      question:
        'I live in Nigeria, and the rest of my team is distributed across the world, can we still participate?',
      answer: `Each phase of the hackathon is designed to accommodate remote teams. The training will be held on a video conferencing platform, and resources will be shared in the same manner. The hackathon will be conducted virtually.      `,
    },
    {
      question:
        'Can I join if I live in a different country from the rest of my team?',
      answer: `Absolutely! Each phase of the hackathon is designed to accommodate remote teams. The training will be held on a video conferencing platform, and resources will be shared in the same manner. The hackathon will be conducted virtually. We encourage and welcome participants from diverse locations to collaborate and contribute to the hackathon experience.`,
    },
    {
      question: ' What are the prizes for the top performing team?',
      answer: `We have a prize pool of $30,000 for the top teams; First, Second, Third place runner ups and prize gifts for all presenting teams. Alot of prizes are to be won at different stages of the hackathon also.
      participants and innovative presentations get cool gift Items and scholarship opportunities`,
    },
    {
      question: 'Where can I ask additional questions?',
      answer: `Join our Slack community (THe #Web5 Hackathon channel)  for real-time interactions and support. Additionally, you can reach out through the official contact channels listed on the website.`,
    },
  ];
  const [currentFaq, setCurrentFaq] = useState(0);
  return (
    <Box
      component="section"
      width={{ xs: '90%', md: '60%' }}
      mx="auto"
      py={{ xs: '50px', md: '100px' }}
    >
      <Stack alignItems="center">
        <Typography
          component="h2"
          color="black.100"
          fontSize={{ xs: '24px', md: '48px' }}
          fontWeight="medium"
          mb={{ xs: '8px', md: '16px' }}
          w={{ xs: '100%', md: '50%' }}
          textAlign="center"
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          component="p"
          color="grey.500"
          fontSize={{ xs: '12px', md: '20px' }}
          mb={{ xs: '24px', md: '48px' }}
          w={{ xs: '100%', md: '70%' }}
          textAlign="center"
        >
          You will find answers to the questions we get asked the most
        </Typography>
      </Stack>
      <Stack gap={{ xs: '12px', md: '24px' }}>
        {FAQS.map((faq, index, arr) => (
          <FaqBlock
            currentFaq={currentFaq}
            setCurrentFaq={setCurrentFaq}
            question={faq.question}
            answer={faq.answer}
            key={index}
            index={index}
            last={arr.length - 1}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FaqSection;

const FaqBlock = (props) => {
  const { question, answer, index, currentFaq, setCurrentFaq, last } = props;
  const open = currentFaq === index;

  const openFaqHandler = () => {
    setCurrentFaq(index);
  };
  return (
    <Box
      sx={{
        cursor: 'pointer',
      }}
      py={{ xs: '16px', md: '32px' }}
      borderBottom={index === last ? '' : '1px solid #FFEC19'}
    >
      <Stack
        direction="row"
        onClick={openFaqHandler}
        justifyContent="space-between"
        w="100%"
        bgColor="transparent"
        alignItems="center"
        mb="8px"
      >
        <Typography
          as="p"
          color="black.400"
          fontSize={{ xs: '16px', md: '20px' }}
          fontWeight="medium"
        >
          {question}
        </Typography>
        <Stack
          // border="1px solid #000"
          borderRadius="50px"
          color="#000"
          fontSize="36px"
          fontWeight="700"
          height="36px"
          width="36px"
          justifyContent="center"
          alignItems="center"
        >
          {open ? '-' : '+'}
        </Stack>
      </Stack>
      {open && (
        <Typography color="grey.800" fontSize={{ xs: '12px', md: '16px' }}>
          {answer}
        </Typography>
      )}
    </Box>
  );
};
