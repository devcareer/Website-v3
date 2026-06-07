import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { FileDownload, Logout, Refresh, Search } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import './NombaHackathonAdmin.css';

const ADMIN_TOKEN_KEY = 'devcareer_nomba_admin_token';
const ADMIN_EMAIL_KEY = 'devcareer_nomba_admin_email';

const formatDate = (value) => {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const NombaHackathonAdmin = () => {
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || '');
  const [adminEmail, setAdminEmail] = useState(() => localStorage.getItem(ADMIN_EMAIL_KEY) || '');

  const handleAuthenticated = (nextToken, email) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, nextToken);
    localStorage.setItem(ADMIN_EMAIL_KEY, email);
    setToken(nextToken);
    setAdminEmail(email);
  };

  const handleLogout = async () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_EMAIL_KEY);
    setToken('');
    setAdminEmail('');
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
  };

  if (!token) {
    return <AdminLogin onAuthenticated={handleAuthenticated} />;
  }

  return <AdminDashboard adminEmail={adminEmail} token={token} onLogout={handleLogout} />;
};

const AdminLogin = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid admin login.');
      }

      onAuthenticated(data.token, data.admin.email);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="nha-page nha-login">
      <section className="nha-login__panel">
        <div className="nha-login__eyebrow">DevCareer Admin</div>
        <h1 className="nha-login__title">Nomba Hackathon Results</h1>
        <p className="nha-login__subtitle">Sign in to view registrations, search applicants, and export responses.</p>

        <form className="nha-login__form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <LoadingButton
            className="nha-login__button"
            type="submit"
            loading={isSubmitting}
            variant="contained"
            disableElevation
          >
            Sign In
          </LoadingButton>
        </form>

        {error && <div className="nha-error">{error}</div>}
      </section>
    </main>
  );
};

const AdminDashboard = ({ adminEmail, token, onLogout }) => {
  const [registrations, setRegistrations] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');
  const [lastLoadedAt, setLastLoadedAt] = useState(null);

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadRegistrations = useCallback(
    async ({ quiet = false } = {}) => {
      if (!quiet) {
        setIsLoading(true);
      }
      setError('');

      try {
        const response = await fetch('/api/admin/nomba-hackathon/registrations?limit=1000', {
          credentials: 'include',
          headers: authHeaders,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Unable to load registrations.');
        }

        setRegistrations(data.registrations || []);
        setLastLoadedAt(new Date());
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    },
    [authHeaders]
  );

  useEffect(() => {
    loadRegistrations();
    const intervalId = window.setInterval(() => loadRegistrations({ quiet: true }), 10000);

    return () => window.clearInterval(intervalId);
  }, [loadRegistrations]);

  const stats = useMemo(() => {
    const teamCount = registrations.filter((registration) => registration.participationMode === 'Team').length;
    const soloCount = registrations.filter((registration) => registration.participationMode === 'Solo').length;

    return {
      total: registrations.length,
      teamCount,
      soloCount,
      latest: registrations[0]?.createdAt,
    };
  }, [registrations]);

  const filteredRegistrations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return registrations;
    }

    return registrations.filter((registration) =>
      [
        registration.firstName,
        registration.lastName,
        registration.email,
        registration.phone,
        registration.country,
        registration.participationMode,
        registration.teamName,
        registration.track,
        registration.focusArea,
        registration.role,
        registration.experienceLevel,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query, registrations]);

  const downloadCsv = async () => {
    setIsDownloading(true);

    try {
      const response = await fetch('/api/admin/nomba-hackathon/registrations?format=csv&limit=1000', {
        credentials: 'include',
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error('Unable to export registrations.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nomba-hackathon-registrations.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (downloadError) {
      toast.error(downloadError.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="nha-page">
      <div className="nha-shell">
        <header className="nha-header">
          <div>
            <div className="nha-eyebrow">Nomba Forward Hackathon 2026</div>
            <h1 className="nha-title">Registration Admin</h1>
            <p className="nha-subtitle">Signed in as {adminEmail || 'admin'}. Results refresh automatically every 10 seconds.</p>
          </div>

          <div className="nha-header__actions">
            <span className="nha-status">
              {lastLoadedAt ? `Updated ${formatDate(lastLoadedAt)}` : 'Waiting for data'}
            </span>
            <Button
              className="nha-icon-action"
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => loadRegistrations()}
              disabled={isLoading}
            >
              Refresh
            </Button>
            <LoadingButton
              className="nha-action"
              variant="contained"
              startIcon={<FileDownload />}
              onClick={downloadCsv}
              loading={isDownloading}
              disableElevation
            >
              CSV
            </LoadingButton>
            <Button className="nha-icon-action" variant="text" startIcon={<Logout />} onClick={onLogout}>
              Logout
            </Button>
          </div>
        </header>

        <section className="nha-stats" aria-label="Registration summary">
          <Stat label="Total Responses" value={stats.total} />
          <Stat label="Solo Applicants" value={stats.soloCount} />
          <Stat label="Team Applicants" value={stats.teamCount} />
          <Stat label="Latest Response" value={stats.latest ? formatDate(stats.latest) : '-'} />
        </section>

        <section className="nha-toolbar">
          <TextField
            className="nha-search"
            size="small"
            label="Search registrations"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            InputProps={{
              startAdornment: <Search fontSize="small" style={{ marginRight: 8, color: '#617089' }} />,
            }}
          />
          <span className="nha-status">
            Showing {filteredRegistrations.length} of {registrations.length}
          </span>
        </section>

        {error && <div className="nha-error">{error}</div>}

        <section className="nha-table-wrap">
          <table className="nha-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Contact</th>
                <th>Country</th>
                <th>Mode</th>
                <th>Track</th>
                <th>Focus Area</th>
                <th>Role</th>
                <th>Experience</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id}>
                  <td>
                    <div className="nha-person">
                      {registration.firstName} {registration.lastName}
                    </div>
                    {registration.teamName && (
                      <div className="nha-muted">
                        {registration.teamName}
                        {registration.teamSize ? ` - ${registration.teamSize} people` : ''}
                      </div>
                    )}
                  </td>
                  <td>
                    <Stack gap={0.4}>
                      <a href={`mailto:${registration.email}`}>{registration.email}</a>
                      <a href={`tel:${registration.phone}`}>{registration.phone}</a>
                    </Stack>
                  </td>
                  <td>{registration.country}</td>
                  <td>
                    <span className="nha-pill">{registration.participationMode}</span>
                  </td>
                  <td>{registration.track}</td>
                  <td>{registration.focusArea}</td>
                  <td>{registration.role}</td>
                  <td>{registration.experienceLevel}</td>
                  <td>{formatDate(registration.createdAt || registration.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && filteredRegistrations.length === 0 && (
            <div className="nha-empty">{query ? 'No registrations match this search.' : 'No registrations yet.'}</div>
          )}
        </section>
      </div>
    </main>
  );
};

const Stat = ({ label, value }) => (
  <div className="nha-stat">
    <div className="nha-stat__label">{label}</div>
    <div className="nha-stat__value">{value}</div>
  </div>
);

export default NombaHackathonAdmin;
