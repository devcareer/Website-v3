import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import {
  Email,
  FileDownload,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  Logout,
  Refresh,
  Search,
  WorkspacePremium,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './NombaHackathonAdmin.css';

const ADMIN_TOKEN_KEY = 'devcareer_nomba_admin_token';
const ADMIN_EMAIL_KEY = 'devcareer_nomba_admin_email';
const RESULTS_LIMIT = 50;
const VERIFIED_ADMIN_PATH = '/hackathon/admin';
const UNVERIFIED_ADMIN_PATH = '/hackathon/admin/unverified';
const CERTIFICATES_ADMIN_PATH = '/hackathon/admin/certificates';

const getTotalPages = (total) => Math.max(1, Math.ceil(total / RESULTS_LIMIT));
const SHOW_ALL_PAGE_SIZE = 1000;

const formatDate = (value) => {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const formatDuration = (milliseconds) => {
  const totalSeconds = Math.max(
    0,
    Math.round(Number(milliseconds || 0) / 1000)
  );

  if (totalSeconds >= 3600 && totalSeconds % 3600 === 0) {
    return `${totalSeconds / 3600}h`;
  }

  if (totalSeconds >= 60 && totalSeconds % 60 === 0) {
    return `${totalSeconds / 60}m`;
  }

  return `${totalSeconds}s`;
};

const registrationMatchesQuery = (registration, normalizedQuery) =>
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
    .includes(normalizedQuery);

const buildRegistrationsUrl = ({ limit, offset, all = false }) => {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (all) {
    params.set('all', 'true');
    params.set('ts', String(Date.now()));
  }

  return `/api/admin/nomba-hackathon/registrations?${params.toString()}`;
};

const fetchRegistrationsPage = async ({
  authHeaders,
  limit,
  offset,
  all = false,
}) => {
  const response = await fetch(buildRegistrationsUrl({ limit, offset, all }), {
    cache: all ? 'no-store' : 'default',
    credentials: 'include',
    headers: authHeaders,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to load registrations.');
  }

  return data;
};

const parseJsonResponse = async (response, fallbackMessage) => {
  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    throw new Error(data?.error || fallbackMessage);
  }

  return data;
};

const registrationCsvColumns = [
  'id',
  'program',
  'submittedAt',
  'firstName',
  'lastName',
  'email',
  'phone',
  'state',
  'participationMode',
  'teamName',
  'teamSize',
  'track',
  'focusArea',
  'role',
  'experienceLevel',
  'createdAt',
];

const escapeCsvValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);

  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

const registrationsToCsv = (rows) =>
  [
    registrationCsvColumns.join(','),
    ...rows.map((row) =>
      registrationCsvColumns
        .map((column) => escapeCsvValue(row[column]))
        .join(',')
    ),
  ].join('\n');

const downloadBlob = ({ blob, filename }) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

const NombaHackathonAdmin = () => {
  const location = useLocation();
  const [token, setToken] = useState(
    () => localStorage.getItem(ADMIN_TOKEN_KEY) || ''
  );
  const [adminEmail, setAdminEmail] = useState(
    () => localStorage.getItem(ADMIN_EMAIL_KEY) || ''
  );
  const isUnverifiedPage = location.pathname.includes('/unverified');
  const isCertificatesPage = location.pathname.includes('/certificates');

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
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
  };

  if (!token) {
    return <AdminLogin onAuthenticated={handleAuthenticated} />;
  }

  if (isUnverifiedPage) {
    return (
      <UnverifiedDashboard
        adminEmail={adminEmail}
        token={token}
        onLogout={handleLogout}
      />
    );
  }

  if (isCertificatesPage) {
    return (
      <CertificatesDashboard
        adminEmail={adminEmail}
        token={token}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <VerifiedDashboard
      adminEmail={adminEmail}
      token={token}
      onLogout={handleLogout}
    />
  );
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
        <p className="nha-login__subtitle">
          Sign in to view registrations, search applicants, and export
          responses.
        </p>

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

const VerifiedDashboard = ({ adminEmail, token, onLogout }) => {
  const [registrations, setRegistrations] = useState([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'submitted',
    direction: 'desc',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAllRegistrations, setShowAllRegistrations] = useState(false);
  const [error, setError] = useState('');
  const [lastLoadedAt, setLastLoadedAt] = useState(null);

  const authHeaders = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const loadRegistrations = useCallback(
    async ({ quiet = false } = {}) => {
      if (!quiet) {
        setIsLoading(true);
      }
      setError('');

      try {
        let nextRegistrations = [];
        let nextTotal = 0;

        if (showAllRegistrations) {
          let offset = 0;

          while (offset === 0 || nextRegistrations.length < nextTotal) {
            const data = await fetchRegistrationsPage({
              authHeaders,
              limit: SHOW_ALL_PAGE_SIZE,
              offset,
              all: offset === 0,
            });
            const pageRegistrations = data.registrations || [];

            nextTotal =
              data.total ?? nextRegistrations.length + pageRegistrations.length;
            nextRegistrations = [...nextRegistrations, ...pageRegistrations];

            if (
              pageRegistrations.length === 0 ||
              nextRegistrations.length >= nextTotal
            ) {
              break;
            }

            offset += pageRegistrations.length;
          }
        } else {
          const offset = currentPage * RESULTS_LIMIT;
          const data = await fetchRegistrationsPage({
            authHeaders,
            limit: RESULTS_LIMIT,
            offset,
          });

          nextRegistrations = data.registrations || [];
          nextTotal = data.total ?? nextRegistrations.length;
        }

        const lastPage = showAllRegistrations
          ? 0
          : Math.max(0, getTotalPages(nextTotal) - 1);

        if (!showAllRegistrations && currentPage > lastPage) {
          setCurrentPage(lastPage);
          return;
        }

        setRegistrations(nextRegistrations);
        setTotalRegistrations(nextTotal);
        setLastLoadedAt(new Date());
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    },
    [authHeaders, currentPage, showAllRegistrations]
  );

  useEffect(() => {
    loadRegistrations();

    if (showAllRegistrations) {
      return undefined;
    }

    const intervalId = window.setInterval(
      () => loadRegistrations({ quiet: true }),
      10000
    );

    return () => window.clearInterval(intervalId);
  }, [loadRegistrations, showAllRegistrations]);

  const stats = useMemo(() => {
    const teamCount = registrations.filter(
      (registration) => registration.participationMode === 'Team'
    ).length;
    const soloCount = registrations.filter(
      (registration) => registration.participationMode === 'Solo'
    ).length;

    return {
      total: totalRegistrations,
      teamCount,
      soloCount,
      latest: registrations[0]?.createdAt,
    };
  }, [registrations, totalRegistrations]);

  const verifiedPageStart =
    registrations.length > 0
      ? showAllRegistrations
        ? 1
        : currentPage * RESULTS_LIMIT + 1
      : 0;
  const verifiedPageEnd =
    registrations.length > 0
      ? showAllRegistrations
        ? registrations.length
        : currentPage * RESULTS_LIMIT + registrations.length
      : 0;
  const verifiedRowOffset = showAllRegistrations
    ? 0
    : currentPage * RESULTS_LIMIT;

  const normalizedQuery = query.trim().toLowerCase();
  const filteredRegistrations = useMemo(() => {
    if (!normalizedQuery) {
      return registrations;
    }

    return registrations.filter((registration) =>
      registrationMatchesQuery(registration, normalizedQuery)
    );
  }, [normalizedQuery, registrations]);

  const sortedRegistrations = useMemo(() => {
    const getValue = (registration, key) => {
      if (key === 'applicant') {
        return `${registration.firstName || ''} ${registration.lastName || ''}`;
      }

      if (key === 'contact') {
        return registration.email || '';
      }

      if (key === 'submitted') {
        return new Date(
          registration.createdAt || registration.submittedAt || 0
        ).getTime();
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

      return (
        String(leftValue).localeCompare(String(rightValue), undefined, {
          sensitivity: 'base',
        }) * direction
      );
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

  const toggleShowAllRegistrations = () => {
    setCurrentPage(0);
    setShowAllRegistrations((current) => !current);
  };

  const downloadCsv = async () => {
    const expectedCount = totalRegistrations || registrations.length;
    const confirmed = window.confirm(
      `Download CSV for ${expectedCount} verified registration${
        expectedCount === 1 ? '' : 's'
      }?`
    );

    if (!confirmed) {
      return;
    }

    setIsDownloading(true);

    try {
      if (showAllRegistrations && registrations.length >= expectedCount) {
        downloadBlob({
          blob: new Blob([registrationsToCsv(registrations)], {
            type: 'text/csv;charset=utf-8',
          }),
          filename: 'nomba-hackathon-registrations.csv',
        });
        toast.success(
          `Downloaded ${registrations.length} verified registration${
            registrations.length === 1 ? '' : 's'
          }.`
        );
        return;
      }

      const response = await fetch(
        `/api/admin/nomba-hackathon/registrations?format=csv&all=true&ts=${Date.now()}`,
        {
          cache: 'no-store',
          credentials: 'include',
          headers: authHeaders,
        }
      );

      if (!response.ok) {
        throw new Error('Unable to export registrations.');
      }

      const blob = await response.blob();
      downloadBlob({ blob, filename: 'nomba-hackathon-registrations.csv' });

      const exportedCount = response.headers.get('X-Exported-Count');

      if (exportedCount) {
        toast.success(
          `Downloaded ${exportedCount} verified registration${
            exportedCount === '1' ? '' : 's'
          }.`
        );
      }
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
            <h1 className="nha-title">Verified Registration Admin</h1>
            <p className="nha-subtitle">
              Signed in as {adminEmail || 'admin'}. Verified results refresh
              every 10 seconds.
            </p>
          </div>

          <div className="nha-header__actions">
            <span className="nha-status">
              {lastLoadedAt
                ? `Updated ${formatDate(lastLoadedAt)}`
                : 'Waiting for data'}
            </span>
            <Button
              className="nha-icon-action"
              variant="outlined"
              component={Link}
              to={CERTIFICATES_ADMIN_PATH}
              startIcon={<WorkspacePremium />}
            >
              Certificates
            </Button>
            <Button
              className="nha-icon-action"
              variant="outlined"
              component={Link}
              to={UNVERIFIED_ADMIN_PATH}
              startIcon={<Email />}
            >
              Unverified
            </Button>
            <Button
              className="nha-icon-action"
              variant="outlined"
              startIcon={
                showAllRegistrations ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )
              }
              onClick={toggleShowAllRegistrations}
              disabled={isLoading || isDownloading}
            >
              {showAllRegistrations ? 'Paginated' : 'Show All'}
            </Button>
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
            <Button
              className="nha-icon-action"
              variant="text"
              startIcon={<Logout />}
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </header>

        <section className="nha-stats" aria-label="Registration summary">
          <Stat label="Total Responses" value={stats.total} />
          <Stat
            label={showAllRegistrations ? 'Solo Total' : 'Solo On Page'}
            value={stats.soloCount}
          />
          <Stat
            label={showAllRegistrations ? 'Team Total' : 'Team On Page'}
            value={stats.teamCount}
          />
          <Stat
            label={showAllRegistrations ? 'Newest Loaded' : 'Newest On Page'}
            value={stats.latest ? formatDate(stats.latest) : '-'}
          />
        </section>

        <section className="nha-toolbar">
          <TextField
            className="nha-search"
            size="small"
            label="Search verified registrations"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            InputProps={{
              startAdornment: (
                <Search
                  fontSize="small"
                  style={{ marginRight: 8, color: '#617089' }}
                />
              ),
            }}
          />
          <span className="nha-status">
            {normalizedQuery
              ? `${sortedRegistrations.length} match${
                  sortedRegistrations.length === 1 ? '' : 'es'
                } ${
                  showAllRegistrations ? 'across all records' : 'on this page'
                }`
              : `Showing ${
                  showAllRegistrations ? 'all ' : ''
                }${verifiedPageStart}-${verifiedPageEnd} of ${totalRegistrations}`}
          </span>
        </section>

        {error && <div className="nha-error">{error}</div>}

        <div className="nha-section-heading">
          <div>
            <h2>Verified Registrations</h2>
            <p>
              Applicants who completed OTP verification and were saved to the
              admin database.
            </p>
          </div>
        </div>
        <section className="nha-table-wrap">
          <table className="nha-table">
            <thead>
              <tr>
                <th className="nha-table__serial">#</th>
                <SortableHeader
                  label="Applicant"
                  sortKey="applicant"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Contact"
                  sortKey="contact"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="State"
                  sortKey="state"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Mode"
                  sortKey="participationMode"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Track"
                  sortKey="track"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Focus Area"
                  sortKey="focusArea"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Role"
                  sortKey="role"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Experience"
                  sortKey="experienceLevel"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Submitted"
                  sortKey="submitted"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
              </tr>
            </thead>
            <tbody>
              {sortedRegistrations.map((registration, index) => (
                <tr key={registration.id}>
                  <td className="nha-table__serial">
                    {verifiedRowOffset + index + 1}
                  </td>
                  <td>
                    <div className="nha-person">
                      {registration.firstName} {registration.lastName}
                    </div>
                    {registration.teamName && (
                      <div className="nha-muted">
                        {registration.teamName}
                        {registration.teamSize
                          ? ` - ${registration.teamSize} people`
                          : ''}
                      </div>
                    )}
                  </td>
                  <td>
                    <Stack gap={0.4}>
                      <a href={`mailto:${registration.email}`}>
                        {registration.email}
                      </a>
                      <a href={`tel:${registration.phone}`}>
                        {registration.phone}
                      </a>
                    </Stack>
                  </td>
                  <td>{registration.state || '-'}</td>
                  <td>
                    <span className="nha-pill">
                      {registration.participationMode}
                    </span>
                  </td>
                  <td>{registration.track}</td>
                  <td>{registration.focusArea}</td>
                  <td>{registration.role}</td>
                  <td>{registration.experienceLevel}</td>
                  <td>
                    {formatDate(
                      registration.createdAt || registration.submittedAt
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && sortedRegistrations.length === 0 && (
            <div className="nha-empty">
              {query
                ? 'No registrations match this search.'
                : 'No registrations yet.'}
            </div>
          )}
        </section>

        {!showAllRegistrations && (
          <PaginationControls
            currentPage={currentPage}
            loadedCount={registrations.length}
            total={totalRegistrations}
            isLoading={isLoading}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
};

const CertificatesDashboard = ({ adminEmail, token, onLogout }) => {
  const [summary, setSummary] = useState(null);
  const [seedStats, setSeedStats] = useState(null);
  const [guardSettings, setGuardSettings] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [claims, setClaims] = useState([]);
  const [totalRecipients, setTotalRecipients] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastLoadedAt, setLastLoadedAt] = useState(null);

  const authHeaders = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );
  const normalizedQuery = query.trim().toLowerCase();

  const loadCertificates = useCallback(
    async ({ quiet = false } = {}) => {
      if (!quiet) {
        setIsLoading(true);
      }
      setError('');

      try {
        const recipientParams = new URLSearchParams({
          limit: String(RESULTS_LIMIT),
          offset: String(currentPage * RESULTS_LIMIT),
        });
        const claimParams = new URLSearchParams({
          limit: '50',
          offset: '0',
        });

        if (normalizedQuery) {
          recipientParams.set('query', normalizedQuery);
          claimParams.set('query', normalizedQuery);
        }

        const [summaryResponse, recipientsResponse, claimsResponse] =
          await Promise.all([
            fetch('/api/admin/nomba-hackathon/certificates/summary', {
              credentials: 'include',
              headers: authHeaders,
            }),
            fetch(
              `/api/admin/nomba-hackathon/certificates/recipients?${recipientParams.toString()}`,
              {
                credentials: 'include',
                headers: authHeaders,
              }
            ),
            fetch(
              `/api/admin/nomba-hackathon/certificates/claims?${claimParams.toString()}`,
              {
                credentials: 'include',
                headers: authHeaders,
              }
            ),
          ]);

        const [summaryData, recipientsData, claimsData] = await Promise.all([
          parseJsonResponse(
            summaryResponse,
            'Unable to load certificate summary.'
          ),
          parseJsonResponse(
            recipientsResponse,
            'Unable to load certificate recipients.'
          ),
          parseJsonResponse(
            claimsResponse,
            'Unable to load certificate claims.'
          ),
        ]);

        const nextRecipients = recipientsData.recipients || [];
        const nextTotalRecipients =
          recipientsData.total ?? nextRecipients.length;
        const lastPage = Math.max(0, getTotalPages(nextTotalRecipients) - 1);

        if (currentPage > lastPage) {
          setCurrentPage(lastPage);
          return;
        }

        setSummary(summaryData.summary || null);
        setSeedStats(summaryData.seed || null);
        setGuardSettings(summaryData.guards || null);
        setRecipients(nextRecipients);
        setClaims(claimsData.claims || []);
        setTotalRecipients(nextTotalRecipients);
        setTotalClaims(claimsData.total ?? claimsData.claims?.length ?? 0);
        setLastLoadedAt(new Date());
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    },
    [authHeaders, currentPage, normalizedQuery]
  );

  useEffect(() => {
    loadCertificates();
    const intervalId = window.setInterval(
      () => loadCertificates({ quiet: true }),
      15000
    );

    return () => window.clearInterval(intervalId);
  }, [loadCertificates]);

  const handleQueryChange = (event) => {
    setCurrentPage(0);
    setQuery(event.target.value);
  };

  const recipientPageStart =
    recipients.length > 0 ? currentPage * RESULTS_LIMIT + 1 : 0;
  const recipientPageEnd =
    recipients.length > 0 ? currentPage * RESULTS_LIMIT + recipients.length : 0;
  const recipientRowOffset = currentPage * RESULTS_LIMIT;
  const invalidSeedCount = seedStats?.invalidEntries?.length || 0;

  return (
    <main className="nha-page">
      <div className="nha-shell">
        <header className="nha-header">
          <div>
            <div className="nha-eyebrow">Nomba Forward Hackathon 2026</div>
            <h1 className="nha-title">Certificate Admin</h1>
            <p className="nha-subtitle">
              Signed in as {adminEmail || 'admin'}. Manage eligible certificate
              emails and verified certificate claims.
            </p>
          </div>

          <div className="nha-header__actions">
            <span className="nha-status">
              {lastLoadedAt
                ? `Updated ${formatDate(lastLoadedAt)}`
                : 'Waiting for data'}
            </span>
            <Button
              className="nha-icon-action"
              variant="outlined"
              component={Link}
              to={VERIFIED_ADMIN_PATH}
            >
              Verified
            </Button>
            <Button
              className="nha-icon-action"
              variant="outlined"
              component={Link}
              to={UNVERIFIED_ADMIN_PATH}
              startIcon={<Email />}
            >
              Unverified
            </Button>
            <Button
              className="nha-icon-action"
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => loadCertificates()}
              disabled={isLoading}
            >
              Refresh
            </Button>
            <Button
              className="nha-icon-action"
              variant="text"
              startIcon={<Logout />}
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </header>

        <section className="nha-stats" aria-label="Certificate summary">
          <Stat
            label="Eligible Emails"
            value={summary?.eligibleCount ?? totalRecipients}
          />
          <Stat
            label="Issued Certificates"
            value={summary?.issuedCount ?? totalClaims}
          />
          <Stat
            label="Unique Issued Emails"
            value={summary?.uniqueIssuedCount ?? 0}
          />
          <Stat
            label="Emailed Certificates"
            value={summary?.emailedCount ?? 0}
          />
          <Stat label="Email Failures" value={summary?.emailFailedCount ?? 0} />
          <Stat label="Invalid Seed Rows" value={invalidSeedCount} />
        </section>

        {guardSettings && (
          <section
            className="nha-guard-panel"
            aria-label="Certificate request guards"
          >
            <div>
              <div className="nha-guard-panel__eyebrow">Request Guards</div>
              <h2>Certificate Abuse Protection</h2>
            </div>
            <div className="nha-guard-list">
              <GuardItem
                label="OTP Cooldown"
                value={formatDuration(guardSettings.requestCooldownMs)}
              />
              <GuardItem
                label="Email OTP Limit"
                value={`${guardSettings.requestEmailHourlyLimit}/hr, ${guardSettings.requestEmailDailyLimit}/day`}
              />
              <GuardItem
                label="Request Fingerprint"
                value={`${guardSettings.requestIpLimit}/${formatDuration(
                  guardSettings.requestIpWindowMs
                )}`}
              />
              <GuardItem
                label="OTP Attempts"
                value={`${guardSettings.codeMaxAttempts}/code`}
              />
              <GuardItem
                label="Verify Fingerprint"
                value={`${guardSettings.verifyIpLimit}/${formatDuration(
                  guardSettings.verifyIpWindowMs
                )}`}
              />
              <GuardItem
                label="Certificate Claims"
                value={`${guardSettings.claimEmailDailyLimit}/day`}
              />
            </div>
          </section>
        )}

        <section className="nha-toolbar">
          <TextField
            className="nha-search"
            size="small"
            label="Search certificate emails or names"
            value={query}
            onChange={handleQueryChange}
            InputProps={{
              startAdornment: (
                <Search
                  fontSize="small"
                  style={{ marginRight: 8, color: '#617089' }}
                />
              ),
            }}
          />
          <span className="nha-status">
            {normalizedQuery
              ? `${totalRecipients} eligible match${
                  totalRecipients === 1 ? '' : 'es'
                }`
              : `Showing eligible emails ${recipientPageStart}-${recipientPageEnd} of ${totalRecipients}`}
          </span>
        </section>

        {error && <div className="nha-error">{error}</div>}

        <div className="nha-section-heading">
          <div>
            <h2>Eligible Certificate Emails</h2>
            <p>
              Server-side qualified list seeded into the database. This list is
              never shipped in the frontend bundle.
            </p>
          </div>
        </div>

        <section className="nha-table-wrap">
          <table className="nha-table nha-table--certificates">
            <thead>
              <tr>
                <th className="nha-table__serial">#</th>
                <th>Email</th>
                <th>Claims</th>
                <th>Latest Name</th>
                <th>Latest Issued</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient, index) => (
                <tr key={recipient.email}>
                  <td className="nha-table__serial">
                    {recipientRowOffset + index + 1}
                  </td>
                  <td>
                    <a href={`mailto:${recipient.email}`}>{recipient.email}</a>
                  </td>
                  <td>
                    <span
                      className={
                        recipient.claimCount > 0
                          ? 'nha-pill'
                          : 'nha-pill nha-pill--neutral'
                      }
                    >
                      {recipient.claimCount || 0}
                    </span>
                  </td>
                  <td>{recipient.lastCertificateName || '-'}</td>
                  <td>
                    {recipient.lastIssuedAt
                      ? formatDate(recipient.lastIssuedAt)
                      : '-'}
                  </td>
                  <td>{recipient.source}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && recipients.length === 0 && (
            <div className="nha-empty">
              {query
                ? 'No eligible certificate emails match this search.'
                : 'No certificate recipients have been seeded yet.'}
            </div>
          )}
        </section>

        <PaginationControls
          currentPage={currentPage}
          loadedCount={recipients.length}
          total={totalRecipients}
          isLoading={isLoading}
          onPageChange={setCurrentPage}
        />

        <div className="nha-section-heading">
          <div>
            <h2>Latest Issued Certificates</h2>
            <p>
              Successful OTP confirmations that unlocked a participant
              certificate.
            </p>
          </div>
          <span className="nha-status">
            {totalClaims} issued certificate{totalClaims === 1 ? '' : 's'}
          </span>
        </div>

        <section className="nha-table-wrap">
          <table className="nha-table nha-table--certificates">
            <thead>
              <tr>
                <th className="nha-table__serial">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Issued</th>
                <th>Email Status</th>
                <th>Verification</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <tr key={claim.id}>
                  <td className="nha-table__serial">{index + 1}</td>
                  <td>
                    <div className="nha-person">{claim.certificateName}</div>
                  </td>
                  <td>
                    <a href={`mailto:${claim.email}`}>{claim.email}</a>
                  </td>
                  <td>{formatDate(claim.issuedAt)}</td>
                  <td>
                    <span
                      className={
                        claim.emailError
                          ? 'nha-pill nha-pill--danger'
                          : claim.emailSentAt
                          ? 'nha-pill'
                          : 'nha-pill nha-pill--neutral'
                      }
                    >
                      {claim.emailError
                        ? 'Failed'
                        : claim.emailSentAt
                        ? 'Sent'
                        : 'Pending'}
                    </span>
                    {claim.emailError && (
                      <div className="nha-muted">{claim.emailError}</div>
                    )}
                  </td>
                  <td>{claim.verificationId || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && claims.length === 0 && (
            <div className="nha-empty">
              {query
                ? 'No issued certificates match this search.'
                : 'No certificate has been issued yet.'}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

const UnverifiedDashboard = ({ adminEmail, token, onLogout }) => {
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [totalPendingVerifications, setTotalPendingVerifications] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sendingLinkIds, setSendingLinkIds] = useState({});
  const [isSendingAll, setIsSendingAll] = useState(false);
  const [error, setError] = useState('');
  const [lastLoadedAt, setLastLoadedAt] = useState(null);

  const authHeaders = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const loadPendingVerifications = useCallback(
    async ({ quiet = false } = {}) => {
      if (!quiet) {
        setIsLoading(true);
      }
      setError('');

      try {
        const offset = currentPage * RESULTS_LIMIT;
        const response = await fetch(
          `/api/admin/nomba-hackathon/verifications/pending?limit=${RESULTS_LIMIT}&offset=${offset}`,
          {
            credentials: 'include',
            headers: authHeaders,
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || 'Unable to load unverified registrations.'
          );
        }

        const nextPendingVerifications = data.verifications || [];
        const nextTotal = data.total ?? nextPendingVerifications.length;
        const lastPage = Math.max(0, getTotalPages(nextTotal) - 1);

        if (currentPage > lastPage) {
          setCurrentPage(lastPage);
          return;
        }

        setPendingVerifications(nextPendingVerifications);
        setTotalPendingVerifications(nextTotal);
        setLastLoadedAt(new Date());
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    },
    [authHeaders, currentPage]
  );

  useEffect(() => {
    loadPendingVerifications();
    const intervalId = window.setInterval(
      () => loadPendingVerifications({ quiet: true }),
      10000
    );

    return () => window.clearInterval(intervalId);
  }, [loadPendingVerifications]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPendingVerifications = useMemo(() => {
    if (!normalizedQuery) {
      return pendingVerifications;
    }

    return pendingVerifications.filter((verification) =>
      registrationMatchesQuery(verification, normalizedQuery)
    );
  }, [normalizedQuery, pendingVerifications]);

  const pendingStats = useMemo(() => {
    const eligibleLoaded = pendingVerifications.filter(
      (verification) => verification.isValid
    ).length;
    const expiredLoaded = pendingVerifications.filter(
      (verification) => verification.expired
    ).length;

    return {
      total: totalPendingVerifications,
      eligibleLoaded,
      expiredLoaded,
      needsFreshForm: pendingVerifications.length - eligibleLoaded,
    };
  }, [pendingVerifications, totalPendingVerifications]);

  const pendingPageStart =
    pendingVerifications.length > 0 ? currentPage * RESULTS_LIMIT + 1 : 0;
  const pendingPageEnd =
    pendingVerifications.length > 0
      ? currentPage * RESULTS_LIMIT + pendingVerifications.length
      : 0;
  const pendingRowOffset = currentPage * RESULTS_LIMIT;

  const sendReverificationLink = async (verification) => {
    setSendingLinkIds((current) => ({ ...current, [verification.id]: true }));

    try {
      const response = await fetch(
        `/api/admin/nomba-hackathon/verifications/${verification.id}/reverification-link`,
        {
          method: 'POST',
          credentials: 'include',
          headers: authHeaders,
        }
      );
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Unable to send re-verification link.');
      }

      toast.success(`Re-verification link sent to ${verification.email}.`);
      await loadPendingVerifications({ quiet: true });
    } catch (sendError) {
      toast.error(sendError.message);
    } finally {
      setSendingLinkIds((current) => ({
        ...current,
        [verification.id]: false,
      }));
    }
  };

  const sendAllReverificationLinks = async () => {
    if (totalPendingVerifications === 0) {
      toast.info('There are no unverified registrations right now.');
      return;
    }

    const confirmed = window.confirm(
      `Send re-verification links to every eligible unverified registration in the database? This can email up to ${totalPendingVerifications} pending applicant(s).`
    );

    if (!confirmed) {
      return;
    }

    setIsSendingAll(true);

    try {
      const response = await fetch(
        '/api/admin/nomba-hackathon/verifications/reverification-links/batch',
        {
          method: 'POST',
          credentials: 'include',
          headers: authHeaders,
        }
      );
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        const detail = data?.detail ? ` ${data.detail}` : '';
        throw new Error(
          `${
            data?.error || 'Unable to send batch re-verification links.'
          }${detail}`
        );
      }

      const failedCount = data.failed || 0;
      const notAttemptedCount = data.notAttempted || 0;

      if (failedCount > 0 || notAttemptedCount > 0) {
        toast.warn(
          `Sent ${data.sent} re-verification link${
            data.sent === 1 ? '' : 's'
          }. ${failedCount} failed${
            notAttemptedCount
              ? ` and ${notAttemptedCount} were not attempted`
              : ''
          }.`
        );

        if (data.failures?.[0]) {
          toast.info(
            `First failure: ${data.failures[0].email} - ${data.failures[0].error}`
          );
        }
      } else {
        toast.success(
          `Sent ${data.sent} re-verification link${
            data.sent === 1 ? '' : 's'
          } in ${data.batches} batch${data.batches === 1 ? '' : 'es'}.`
        );
      }

      if (data.batchFallbacks > 0) {
        toast.info(
          `${data.batchFallbacks} Resend batch${
            data.batchFallbacks === 1 ? '' : 'es'
          } were retried individually.`
        );
      }

      if (data.skippedInvalid > 0) {
        toast.info(
          `${data.skippedInvalid} pending registration${
            data.skippedInvalid === 1 ? '' : 's'
          } need a fresh form.`
        );
      }

      await loadPendingVerifications({ quiet: true });
    } catch (sendError) {
      toast.error(sendError.message);
    } finally {
      setIsSendingAll(false);
    }
  };

  return (
    <main className="nha-page">
      <div className="nha-shell">
        <header className="nha-header">
          <div>
            <div className="nha-eyebrow">Nomba Forward Hackathon 2026</div>
            <h1 className="nha-title">Unverified Registration Admin</h1>
            <p className="nha-subtitle">
              Signed in as {adminEmail || 'admin'}. Pending OTP records refresh
              every 10 seconds.
            </p>
          </div>

          <div className="nha-header__actions">
            <span className="nha-status">
              {lastLoadedAt
                ? `Updated ${formatDate(lastLoadedAt)}`
                : 'Waiting for data'}
            </span>
            <Button
              className="nha-icon-action"
              variant="outlined"
              component={Link}
              to={CERTIFICATES_ADMIN_PATH}
              startIcon={<WorkspacePremium />}
            >
              Certificates
            </Button>
            <Button
              className="nha-icon-action"
              variant="outlined"
              component={Link}
              to={VERIFIED_ADMIN_PATH}
            >
              Verified
            </Button>
            <Button
              className="nha-icon-action"
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => loadPendingVerifications()}
              disabled={isLoading || isSendingAll}
            >
              Refresh
            </Button>
            <LoadingButton
              className="nha-action"
              variant="contained"
              startIcon={<Email />}
              onClick={sendAllReverificationLinks}
              loading={isSendingAll}
              disabled={isLoading || totalPendingVerifications === 0}
              disableElevation
            >
              Send All Links
            </LoadingButton>
            <Button
              className="nha-icon-action"
              variant="text"
              startIcon={<Logout />}
              onClick={onLogout}
            >
              Logout
            </Button>
          </div>
        </header>

        <section
          className="nha-stats"
          aria-label="Unverified registration summary"
        >
          <Stat label="Total Unverified" value={pendingStats.total} />
          <Stat label="Eligible On Page" value={pendingStats.eligibleLoaded} />
          <Stat
            label="Expired OTP On Page"
            value={pendingStats.expiredLoaded}
          />
          <Stat
            label="Needs Fresh Form On Page"
            value={pendingStats.needsFreshForm}
          />
        </section>

        <section className="nha-toolbar">
          <TextField
            className="nha-search"
            size="small"
            label="Search unverified registrations"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            InputProps={{
              startAdornment: (
                <Search
                  fontSize="small"
                  style={{ marginRight: 8, color: '#617089' }}
                />
              ),
            }}
          />
          <span className="nha-status">
            {normalizedQuery
              ? `${filteredPendingVerifications.length} match${
                  filteredPendingVerifications.length === 1 ? '' : 'es'
                } on this page`
              : `Showing ${pendingPageStart}-${pendingPageEnd} of ${totalPendingVerifications}`}
          </span>
        </section>

        {error && <div className="nha-error">{error}</div>}

        <div className="nha-section-heading">
          <div>
            <h2>Unverified Registrations</h2>
            <p>
              Latest pending application per email where the OTP was not
              completed yet.
            </p>
          </div>
        </div>

        <section className="nha-table-wrap">
          <table className="nha-table nha-table--pending">
            <thead>
              <tr>
                <th className="nha-table__serial">#</th>
                <th>Applicant</th>
                <th>Contact</th>
                <th>State</th>
                <th>Mode</th>
                <th>Track</th>
                <th>OTP Status</th>
                <th>Started</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPendingVerifications.map((verification, index) => (
                <tr key={verification.id}>
                  <td className="nha-table__serial">
                    {pendingRowOffset + index + 1}
                  </td>
                  <td>
                    <div className="nha-person">
                      {verification.firstName} {verification.lastName}
                    </div>
                    {verification.teamName && (
                      <div className="nha-muted">
                        {verification.teamName}
                        {verification.teamSize
                          ? ` - ${verification.teamSize} people`
                          : ''}
                      </div>
                    )}
                  </td>
                  <td>
                    <Stack gap={0.4}>
                      <a href={`mailto:${verification.email}`}>
                        {verification.email}
                      </a>
                      <a href={`tel:${verification.phone}`}>
                        {verification.phone}
                      </a>
                    </Stack>
                  </td>
                  <td>{verification.state || '-'}</td>
                  <td>
                    <span className="nha-pill">
                      {verification.participationMode}
                    </span>
                  </td>
                  <td>
                    {verification.track}
                    <div className="nha-muted">{verification.focusArea}</div>
                  </td>
                  <td>
                    <span
                      className={`nha-pill ${
                        verification.expired ? 'nha-pill--warning' : ''
                      }`}
                    >
                      {verification.expired ? 'OTP expired' : 'OTP active'}
                    </span>
                    <div className="nha-muted">
                      Attempts: {verification.attempts}
                    </div>
                  </td>
                  <td>{formatDate(verification.createdAt)}</td>
                  <td>
                    <LoadingButton
                      className="nha-action nha-action--compact"
                      variant="contained"
                      startIcon={<Email />}
                      loading={Boolean(sendingLinkIds[verification.id])}
                      disabled={!verification.isValid || isSendingAll}
                      onClick={() => sendReverificationLink(verification)}
                      disableElevation
                    >
                      Send Link
                    </LoadingButton>
                    {!verification.isValid && (
                      <div className="nha-muted">Needs fresh form</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && filteredPendingVerifications.length === 0 && (
            <div className="nha-empty">
              {query
                ? 'No unverified registrations match this search.'
                : 'No unverified registrations right now.'}
            </div>
          )}
        </section>

        <PaginationControls
          currentPage={currentPage}
          loadedCount={pendingVerifications.length}
          total={totalPendingVerifications}
          isLoading={isLoading || isSendingAll}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
};

const PaginationControls = ({
  currentPage,
  loadedCount,
  total,
  isLoading,
  onPageChange,
}) => {
  const totalPages = getTotalPages(total);
  const isFirstPage = currentPage <= 0;
  const isLastPage = currentPage >= totalPages - 1 || total === 0;
  const pageStart = loadedCount > 0 ? currentPage * RESULTS_LIMIT + 1 : 0;
  const pageEnd =
    loadedCount > 0 ? currentPage * RESULTS_LIMIT + loadedCount : 0;

  const goToPage = (nextPage) => {
    const clampedPage = Math.min(Math.max(nextPage, 0), totalPages - 1);
    onPageChange(clampedPage);
  };

  return (
    <nav className="nha-pagination" aria-label="Registration pagination">
      <div className="nha-pagination__summary">
        <span>
          Page {Math.min(currentPage + 1, totalPages)} of {totalPages}
        </span>
        <span>
          {total > 0
            ? `Records ${pageStart}-${pageEnd} of ${total}`
            : 'No records'}
        </span>
      </div>

      <div className="nha-pagination__actions">
        <Button
          className="nha-icon-action"
          variant="outlined"
          startIcon={<KeyboardArrowLeft />}
          onClick={() => goToPage(currentPage - 1)}
          disabled={isLoading || isFirstPage}
        >
          Previous
        </Button>
        <Button
          className="nha-icon-action"
          variant="outlined"
          endIcon={<KeyboardArrowRight />}
          onClick={() => goToPage(currentPage + 1)}
          disabled={isLoading || isLastPage}
        >
          Next
        </Button>
      </div>
    </nav>
  );
};

const SortableHeader = ({ label, sortKey, sortConfig, onSort }) => {
  const isActive = sortConfig.key === sortKey;
  const SortIcon =
    sortConfig.direction === 'asc' ? KeyboardArrowUp : KeyboardArrowDown;

  return (
    <th>
      <button
        type="button"
        className={`nha-sort ${isActive ? 'nha-sort--active' : ''}`}
        onClick={() => onSort(sortKey)}
      >
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

const GuardItem = ({ label, value }) => (
  <div className="nha-guard">
    <span className="nha-guard__label">{label}</span>
    <strong className="nha-guard__value">{value}</strong>
  </div>
);

export default NombaHackathonAdmin;
