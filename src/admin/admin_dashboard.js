import React, { useState, useRef } from 'react';
import SubscriptionPlanCard from './SubscriptionPlanCard';
import { Container, Row, Col, Card, Table, Badge, InputGroup, FormControl, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';
import '../styles/admin_dashboard.css';

const HEADER_HEIGHT = 90;
const statCards = [
  {
    label: "Today's Users",
    value: 15,
    trend: '+3% than last week',
    trendColor: '#00C897',
    icon: '/icons/todays users.png',
    iconAlt: 'User',
  },
  {
    label: "Today's Dermatologist",
    value: 20,
    trend: '+10% than last week',
    trendColor: '#00C897',
    icon: '/icons/todays users.png',
    iconAlt: 'Dermatologist',
  },
  {
    label: "Today's Consultation",
    value: 20,
    trend: '-2% than last week',
    trendColor: '#FF5A5F',
    icon: '/icons/todays_consultation.png',
    iconAlt: 'Consultation',
  },
  {
    label: 'Total Subscribers',
    value: 1000,
    trend: '-20% than last week',
    trendColor: '#FF5A5F',
    icon: '/icons/today_subscriber.png',
    iconAlt: 'Subscriber',
  },
];

const tableRows = [
  { name: 'Product A', by: 'User 1', date: '2025-07-12', status: 'Completed' },
  { name: 'Product B', by: 'User 2', date: '2025-07-11', status: 'Upcoming' },
  { name: 'Product C', by: 'User 3', date: '2025-07-10', status: 'Canceled' },
  { name: 'Product A', by: 'User 4', date: '2025-07-12', status: 'Completed' },
  { name: 'Product B', by: 'User 5', date: '2025-07-11', status: 'Upcoming' },
  { name: 'Product C', by: 'User 6', date: '2025-07-10', status: 'Canceled' },
  { name: 'Product C', by: 'User 6', date: '2025-07-10', status: 'Canceled' },
];

const statusVariant = {
  Completed: 'success',
  Upcoming: 'info',
  Canceled: 'danger',
};



function AdminDashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  const handleSidebarToggle = () => setShowSidebar(!showSidebar);
  const handleProfileClick = () => setShowProfileDropdown((prev) => !prev);
  const handleProfileBlur = (e) => {
    // Close dropdown if focus leaves the dropdown and icon
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowProfileDropdown(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F9FB' }}>
      {/* Header */}
      <Navbar bg="white" expand="lg" fixed="top" className="border-bottom border-4 border-primary shadow-sm admin-navbar" style={{ height: HEADER_HEIGHT, zIndex: 1100 }}>
        <Container fluid className="d-flex justify-content-between align-items-center" style={{ height: HEADER_HEIGHT }}>
          {/* Left: Sidebar toggle and logo (mobile: toggle+centered logo, desktop: left-aligned) */}
          <div className="d-flex align-items-center flex-grow-1 flex-md-grow-0 justify-content-center justify-content-md-start position-relative" style={{ height: '100%' }}>
            {/* Sidebar toggle for mobile */}
            <Button variant="outline-primary" className="d-md-none position-absolute start-0 ms-2" style={{ zIndex: 2 }} onClick={handleSidebarToggle} aria-label="Open sidebar">
              <span className="navbar-toggler-icon"></span>
            </Button>
            <img src="/icons/nav_logo.png" alt="Logo" className="mx-auto" style={{ width: 80, height: 48 }} />
            <div className="d-none d-md-flex flex-column align-items-center ms-3">
              <img src="/icons/logo_lable.png" alt="DERMASCAN" style={{ width: 70, marginBottom: 5 }} />
              <img src="/icons/Scan.Detect.Care.png" alt="Scan.Detect.Care" style={{ width: 90, marginBottom: 5 }} />
              <img src="/icons/Admin Page.png" alt="Admin Page" style={{ width: 60 }} />
            </div>
          </div>
          {/* Right: Search (desktop only) and profile icon */}
          <div className="d-flex align-items-center admin-header-actions" style={{ gap: 12 }}>
            <div className="d-none d-md-block">
              <InputGroup className='me-3' style={{ maxWidth: 250, width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <FormControl placeholder="Type here..." />
                <InputGroup.Text><img src="/icons/search.png" alt="search" /></InputGroup.Text>
              </InputGroup>
            </div>
            <div className="profile-dropdown-wrapper position-relative" ref={profileRef} tabIndex={0} onBlur={handleProfileBlur}>
              <button
                className="profile-icon-btn"
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                  background: 'none',
                  padding: 0,
                }}
                aria-label="Profile menu"
                onClick={handleProfileClick}
                tabIndex={0}
              >
                <img src="/icons/profile.png" alt="Profile" style={{ width: 40, height: 40 }} />
              </button>
              {showProfileDropdown && (
                <div className="profile-dropdown-menu" tabIndex={-1} style={{
                  position: 'absolute',
                  top: 48,
                  right: 0,
                  minWidth: 170,
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 4px 16px 0 rgba(60,72,100,0.13)',
                  zIndex: 2000,
                  padding: '0.5rem 0',
                  border: '1px solid #f0f0f0',
                }}>
                  <button className="profile-dropdown-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '10px 18px',
                    fontSize: 15,
                    color: '#23272e',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                    onClick={() => { setShowProfileDropdown(false); /* handle profile click */ }}
                  >
                    <img src="/icons/my profile.png" alt="My Profile" style={{ width: 20, height: 20, marginRight: 12 }} />
                    My Profile
                  </button>
                  <div style={{ height: 1, background: '#f0f0f0', margin: '0 12px' }} />
                  <button className="profile-dropdown-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '10px 18px',
                    fontSize: 15,
                    color: '#23272e',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                    onClick={() => { setShowProfileDropdown(false); /* handle logout click */ }}
                  >
                    <img src="/icons/logout.png" alt="Log Out" style={{ width: 20, height: 20, marginRight: 12 }} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>

        </Container>
      </Navbar>

      {/* Sidebar for desktop */}
      <div className="d-none d-md-block admin-sidebar">
        <Nav className="flex-column">
          <div className="admin-menu-item active"><img src="/icons/dashboard.png" alt="Dashboard" className="sidebar-icon" /> Dashboard</div>
          <div className="admin-menu-item"><img src="/icons/user management icon.png" alt="User Management" className="sidebar-icon" /> User Management</div>
          <div className="admin-menu-item"><img src="/icons/product management icon.png" alt="Product Management" className="sidebar-icon" /> Product Management</div>
          <div className="admin-menu-item"><img src="/icons/activitylogs icon.png" alt="Activity Logs" className="sidebar-icon" /> Activity Logs</div>
          <div className="admin-menu-item"><img src="/icons/booking reviews icon.png" alt="Bookings Reviews" className="sidebar-icon" /> Bookings Reviews</div>
        </Nav>
      </div>

      {/* Sidebar for mobile (offcanvas) */}
      <Offcanvas show={showSidebar} onHide={handleSidebarToggle} responsive="md" className="d-md-none">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <div className="admin-menu-item active" onClick={handleSidebarToggle}><img src="/icons/dashboard.png" alt="Dashboard" className="sidebar-icon" /> Dashboard</div>
            <div className="admin-menu-item" onClick={handleSidebarToggle}><img src="/icons/user management icon.png" alt="User Management" className="sidebar-icon" /> User Management</div>
            <div className="admin-menu-item" onClick={handleSidebarToggle}><img src="/icons/product management icon.png" alt="Product Management" className="sidebar-icon" /> Product Management</div>
            <div className="admin-menu-item" onClick={handleSidebarToggle}><img src="/icons/activitylogs icon.png" alt="Activity Logs" className="sidebar-icon" /> Activity Logs</div>
            <div className="admin-menu-item" onClick={handleSidebarToggle}><img src="/icons/booking reviews icon.png" alt="Bookings Reviews" className="sidebar-icon" /> Bookings Reviews</div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <div className="main-content">
        <Container
          fluid
          className="pt-4 px-2 px-md-4 responsive-main-container"
        >
          <h3 className="mb-4 fw-bold text-center text-md-start">Welcome back, Admin.</h3>
          {/* Stat Cards */}
          <Row className="mb-4 g-3">
            {statCards.map((card, idx) => (
              <Col key={idx} xs={12} sm={12} md={12} lg={3} className="mb-2">
                <Card className="shadow-sm rounded-4 h-100 stat-card">
                  <Card.Body className="position-relative p-3">
                    <img src={card.icon} alt={card.iconAlt} className="stat-card-icon position-absolute top-0 end-0 m-3" />
                    <div className="text-muted" style={{ fontSize: 13 }}>{card.label}</div>
                    <div className="fw-bold fs-2 my-2">{card.value}</div>
                    <div style={{ fontSize: 13, color: card.trendColor }}>{card.trend}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            {/* Left: Recent Product Submissions Table */}
            <Col xs={12} lg={8} className="mb-4">
              <Card className="shadow-sm mb-4 recent-product-card">
                <Card.Body>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2 gap-2">
                    <div className="fw-semibold">Recent Product Submissions</div>
                    <a href="#" className="small">See more...</a>
                  </div>
                  <Table hover responsive size="sm" className="mb-0">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Submitted by</th>
                        <th>Date Submitted</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.slice(0, 6).map((row, idx) => (
                        <tr key={idx}>
                          <td>{row.name}</td>
                          <td>{row.by}</td>
                          <td>{row.date}</td>
                          <td><Badge bg={statusVariant[row.status]}>{row.status}</Badge></td>
                          <td><a href="#">View</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            {/* Right: Subscription Plan Card */}
            <Col xs={12} lg={3}>
              <SubscriptionPlanCard />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default AdminDashboard;