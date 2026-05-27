import React, { useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './NombaHackathonTracks.css';
import { buildTrackRegistrationLink, NOMBATRACK_GROUPS } from './nombaTracksData';

const NombaHackathonTracks = () => {
  const { pathname, hash } = useLocation();
  const activeFocusHash = hash.startsWith('#focus-') ? hash.slice(1) : '';

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const scrollBlock = targetId.startsWith('focus-') ? 'center' : 'start';
      requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        target?.scrollIntoView({ behavior: 'smooth', block: scrollBlock });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return (
    <Box className="nmt-page">
      <Box className="nmt-hero">
        <Box className="nmt-hero__content">
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.4}>
            <Link to="/programs/nomba-hackathon" style={{ textDecoration: 'none' }}>
              <Button className="nmt-btn nmt-btn--ghost">Back to Hackathon Page</Button>
            </Link>
            <Link to="/programs/nomba-hackathon/register" style={{ textDecoration: 'none' }}>
              <Button className="nmt-btn nmt-btn--ghost">Go to Registration</Button>
            </Link>
          </Stack>

          <Typography className="nmt-kicker">Official Track Catalogue</Typography>
          <Typography className="nmt-title" component="h1">
            Nomba Hackathon Focus Areas
          </Typography>
          <Typography className="nmt-subtitle">
            Two track categories, thirteen focus areas. Pick one focus area as your primary direction
            and register directly from any card below.
          </Typography>

          <Stack className="nmt-stat-row" direction={{ xs: 'column', sm: 'row' }}>
            <Box className="nmt-stat">
              <Typography className="nmt-stat__number">2</Typography>
              <Typography className="nmt-stat__label">Track Categories</Typography>
            </Box>
            <Box className="nmt-stat">
              <Typography className="nmt-stat__number">13</Typography>
              <Typography className="nmt-stat__label">Focus Areas</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box className="nmt-body">
        {NOMBATRACK_GROUPS.map((group) => (
          <Box key={group.id} className="nmt-track-group" id={`track-${group.id}`}>
            <Box className="nmt-track-group__head">
              <Typography className="nmt-track-group__label">{group.label} Track</Typography>
              <Typography className="nmt-track-group__headline" component="h2">
                {group.headline}
              </Typography>
              <Typography className="nmt-track-group__summary">{group.summary}</Typography>
            </Box>

            <Box className="nmt-focus-grid">
              {group.focuses.map((focus) => (
                <Box
                  key={focus.id}
                  id={`focus-${focus.id}`}
                  className={`nmt-focus-card ${activeFocusHash === `focus-${focus.id}` ? 'is-target' : ''}`}
                >
                  <Typography className="nmt-focus-card__title">{focus.title}</Typography>
                  <Typography className="nmt-focus-card__challenge">{focus.challenge}</Typography>

                  {focus.exampleBuilds && (
                    <Box className="nmt-focus-card__section">
                      <Typography className="nmt-focus-card__section-title">Example Builds</Typography>
                      <ul>
                        {focus.exampleBuilds.map((item) => (
                          <li key={`${focus.id}-example-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  {focus.mustInclude && (
                    <Box className="nmt-focus-card__section">
                      <Typography className="nmt-focus-card__section-title">Must Include</Typography>
                      <ul>
                        {focus.mustInclude.map((item) => (
                          <li key={`${focus.id}-must-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  <Box className="nmt-focus-card__section">
                    <Typography className="nmt-focus-card__section-title">Key APIs</Typography>
                    <Stack className="nmt-api-chips" direction="row" flexWrap="wrap" gap={0.8}>
                      {focus.keyApis.map((api) => (
                        <span key={`${focus.id}-api-${api}`} className="nmt-api-chip">
                          {api}
                        </span>
                      ))}
                    </Stack>
                  </Box>

                  {focus.whyThisMatters && (
                    <Box className="nmt-focus-card__section nmt-focus-card__section--note">
                      <Typography className="nmt-focus-card__section-title">Why This Matters</Typography>
                      <Typography className="nmt-focus-card__copy">{focus.whyThisMatters}</Typography>
                    </Box>
                  )}

                  <Box className="nmt-focus-card__section nmt-focus-card__section--judge">
                    <Typography className="nmt-focus-card__section-title">Judged On</Typography>
                    <Typography className="nmt-focus-card__copy">{focus.judgedOn}</Typography>
                  </Box>

                  <Link to={buildTrackRegistrationLink(group.id, focus.id)} style={{ textDecoration: 'none' }}>
                    <Button className="nmt-btn nmt-btn--primary">Register for this focus</Button>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NombaHackathonTracks;
