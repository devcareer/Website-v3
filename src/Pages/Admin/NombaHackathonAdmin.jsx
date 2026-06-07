import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { FileDownload, KeyboardArrowDown, KeyboardArrowUp, Logout, Refresh, Search } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import './NombaHackathonAdmin.css';

const ADMIN_TOKEN_KEY = 'devcareer_nomba_admin_token';
const ADMIN_EMAIL_KEY = 'devcareer_nomba_admin_email';
const RESULTS_LIMIT = 50;

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
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [query, setQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'submitted', direction: 'desc' });
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
        const response = await fetch(`/api/admin/nomba-hackathon/registrations?limit=${RESULTS_LIMIT}`, {
          credentials: 'include',
          headers: authHeaders,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Unable to load registrations.');
        }

        setRegistrations(data.registrations || []);
        setTotalRegistrations(data.total ?? data.registrations?.length ?? 0);
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
      total: totalRegistrations,
      teamCount,
      soloCount,
      latest: registrations[0]?.createdAt,
    };
  }, [registrations, totalRegistrations]);

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
        registration.state,
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

  const sortedRegistrations = useMemo(() => {
    const getValue = (registration, key) => {
      if (key === 'applicant') {
        return `${registration.firstName || ''} ${registration.lastName || ''}`;
      }

      if (key === 'contact') {
        return registration.email || '';
      }

      if (key === 'submitted') {
        return new Date(registration.createdAt || registration.submittedAt || 0).getTime();
      }

      return registration[key] || '';
    };

    return [...filteredRegistrations].sort((left, right) => {
      const leftValue = getValue(left, sortConfig.key);
      const rightValue = getValue(right, sortConfig.key);
      const direction = sortConfig.direction === 'asc' ? 1 : -1;

      if (typeof leftValue === 'number' && typeof rightValue === 'number') {
        return (leftValue - rightValue) * direction;
      }

      return String(leftValue).localeCompare(String(rightValue), undefined, { sensitivity: 'base' }) * direction;
    });
  }, [filteredRegistrations, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((currentSort) => {
      if (currentSort.key === key) {
        return {
          key,
          direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
        };
      }

      return {
        key,
        direction: key === 'submitted' ? 'desc' : 'asc',
      };
    });
  };

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
          <Stat label="Solo In Latest 50" value={stats.soloCount} />
          <Stat label="Team In Latest 50" value={stats.teamCount} />
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
            Showing {sortedRegistrations.length} of {registrations.length} loaded records
            {totalRegistrations > registrations.length ? ` (latest ${registrations.length} of ${totalRegistrations})` : ''}
          </span>
        </section>

        {error && <div className="nha-error">{error}</div>}

        <section className="nha-table-wrap">
          <table className="nha-table">
            <thead>
              <tr>
                <SortableHeader label="Applicant" sortKey="applicant" sortConfig={sortConfig} onSort={handleSort} />
                <SortableHeader label="Contact" sortKey="contact" sortConfig={sortConfig} onSort={handleSort} />
                <SortableHeader label="State" sortKey="state" sortConfig={sortConfig} onSort={handleSort} />
                <SortableHeader label="Mode" sortKey="participationMode" sortConfig={sortConfig} onSort={handleSort} />
                <SortableHeader label="Track" sortKey="track" sortConfig={sortConfig} onSort={handleSort} />
                <SortableHeader label="Focus Area" sortKey="focusArea" sortConfig={sortConfig} onSort={handleSort} />
                <SortableHeader label="Role" sortKey="role" sortConfig={sortConfig} onSort={handleSort} />
                <SortableHeader label="Experience" sortKey="experienceLevel" sortConfig={sortConfig} onSort={handleSort} />
                <SortableHeader label="Submitted" sortKey="submitted" sortConfig={sortConfig} onSort={handleSort} />
              </tr>
            </thead>
            <tbody>
              {sortedRegistrations.map((registration) => (
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
                  <td>{registration.state || '-'}</td>
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

          {!isLoading && sortedRegistrations.length === 0 && (
            <div className="nha-empty">{query ? 'No registrations match this search.' : 'No registrations yet.'}</div>
          )}
        </section>
      </div>
    </main>
  );
};

const SortableHeader = ({ label, sortKey, sortConfig, onSort }) => {
  const isActive = sortConfig.key === sortKey;
  const SortIcon = sortConfig.direction === 'asc' ? KeyboardArrowUp : KeyboardArrowDown;

  return (
    <th>
      <button type="button" className={`nha-sort ${isActive ? 'nha-sort--active' : ''}`} onClick={() => onSort(sortKey)}>
        <span>{label}</span>
        {isActive && <SortIcon fontSize="small" />}
      </button>
    </th>
  );
};

const Stat = ({ label, value }) => (
  <div className="nha-stat">
    <div className="nha-stat__label">{label}</div>
    <div className="nha-stat__value">{value}</div>
  </div>
);

export default NombaHackathonAdmin;
