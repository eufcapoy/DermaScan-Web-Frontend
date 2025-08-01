import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionPlanCard from './SubscriptionPlanCard';
import UserManagement from './UserManagement';
import ProductManagement from './admin_product_management';
import ActivityLogs from './admin_activity_logs';
import BookingReviews from './admin_booking_reviews';
import { Container, Form, Row, Col, Card, Table, Badge, InputGroup, FormControl, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';
import '../styles/admin_dashboard.css';
import { Modal } from 'react-bootstrap';
import { BsKey, BsShield } from 'react-icons/bs';

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
  // All state declarations
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState("/icons/profile.png");

  // All refs
  const profileRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Navigation hook
  const navigate = useNavigate();

  // All handlers
  const handleSidebarToggle = () => setShowSidebar(!showSidebar);
  
  const handleProfileClick = () => setShowProfileDropdown((prev) => !prev);
  
  const handleProfileBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowProfileDropdown(false);
    }
  };

  const handleMenuClick = (screen) => {
    setActiveScreen(screen);
    setShowSidebar(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-1" style={{ minHeight: '100vh', background: '#F7F9FB' }}>
      {/* Header */}
      <Navbar bg="white" expand="lg" fixed="top" className="border-bottom border-1 border-primary shadow-sm admin-navbar" style={{ height: HEADER_HEIGHT, zIndex: 1100 }}>
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
                <div className="profile-dropdown-menu position-absolute top-100 end-0 bg-white rounded-3 shadow-lg border" style={{width: 150, padding: 10 }} tabIndex={-1}>
                  <button
                    className="profile-dropdown-item d-flex align-items-center w-100 bg-transparent border-0 px-2 py-2 text-dark text-nowrap"
                    style={{ transition: 'background 0.2s, color 0.2s' }}
                    onClick={() => { 
                      setShowProfileDropdown(false);
                      setShowProfileModal(true);
                    }}
                  >
                    <img src="/icons/my profile.png" alt="My Profile" className="me-3" width="20" height="20" />
                    My Profile
                  </button>
                  <hr className="my-1 mx-2 border border-1 border-secondary opacity-25" />
                  <button
                    className="profile-dropdown-item d-flex align-items-center w-100 bg-transparent border-0 px-2 py-2 fs-6 text-dark text-nowrap"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate('/');
                    }}
                  >
                    <img src="/icons/logout.png" alt="Log Out" className="me-3" width="20" height="20" />
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
          <div className={`admin-menu-item${activeScreen === 'dashboard' ? ' active' : ''}`} onClick={() => handleMenuClick('dashboard')}><img src="/icons/dashboard.png" alt="Dashboard" className="sidebar-icon" /> Dashboard</div>
          <div className={`admin-menu-item${activeScreen === 'user' ? ' active' : ''}`} onClick={() => handleMenuClick('user')}><img src="/icons/user management icon.png" alt="User Management" className="sidebar-icon" /> User Management</div>
          <div className={`admin-menu-item${activeScreen === 'product' ? ' active' : ''}`} onClick={() => handleMenuClick('product')}><img src="/icons/product management icon.png" alt="Product Management" className="sidebar-icon" /> Product Management</div>
          <div className={`admin-menu-item${activeScreen === 'activity' ? ' active' : ''}`} onClick={() => handleMenuClick('activity')}><img src="/icons/activitylogs icon.png" alt="Activity Logs" className="sidebar-icon" /> Activity Logs</div>
          <div className={`admin-menu-item${activeScreen === 'booking' ? ' active' : ''}`} onClick={() => handleMenuClick('booking')}><img src="/icons/booking reviews icon.png" alt="Bookings Reviews" className="sidebar-icon" /> Bookings Reviews</div>
        </Nav>
      </div>

      {/* Sidebar for mobile (offcanvas) */}
      <Offcanvas show={showSidebar} onHide={handleSidebarToggle} responsive="md" className="d-md-none">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <div className={`admin-menu-item${activeScreen === 'dashboard' ? ' active' : ''}`} onClick={() => handleMenuClick('dashboard')}><img src="/icons/dashboard.png" alt="Dashboard" className="sidebar-icon" /> Dashboard</div>
            <div className={`admin-menu-item${activeScreen === 'user' ? ' active' : ''}`} onClick={() => handleMenuClick('user')}><img src="/icons/user management icon.png" alt="User Management" className="sidebar-icon" /> User Management</div>
            <div className={`admin-menu-item${activeScreen === 'product' ? ' active' : ''}`} onClick={() => handleMenuClick('product')}><img src="/icons/product management icon.png" alt="Product Management" className="sidebar-icon" /> Product Management</div>
            <div className={`admin-menu-item${activeScreen === 'activity' ? ' active' : ''}`} onClick={() => handleMenuClick('activity')}><img src="/icons/activitylogs icon.png" alt="Activity Logs" className="sidebar-icon" /> Activity Logs</div>
            <div className={`admin-menu-item${activeScreen === 'booking' ? ' active' : ''}`} onClick={() => handleMenuClick('booking')}><img src="/icons/booking reviews icon.png" alt="Bookings Reviews" className="sidebar-icon" /> Bookings Reviews</div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <div className="main-content">
        {activeScreen === 'dashboard' ? (
          <Row className="responsive-main-content px-md-4">
            <Col xs={12}>
              {activeScreen === 'dashboard' ? (
                <>
                  <h3 className="mb-4 fw-bold text-center fs-3 text-md-start">Welcome back, Admin.</h3>
                  {/* Stat Cards */}
                  <Row className="mb-4 g-3">
                    {statCards.map((card, idx) => (
                      <Col key={idx} xs={12} sm={6} md={6} lg={3}>
                        <Card className="shadow-sm border border-primary rounded-5 h-100">
                          <Card.Body className="position-relative d-flex flex-column justify-content-between p-3">
                            {/* Icon top-right */}
                            <div className="position-absolute top-0 end-0 m-3">
                              <img src={card.icon} alt={card.iconAlt} style={{ width: '38px', height: '38px' }} />
                            </div>
                            {/* Label top-left */}
                            <div className="text-muted small">{card.label}</div>
                            {/* Value center-right */}
                            <div className="mt-2 d-flex justify-content-start align-items-center">
                              <span className="fw-bold fs-3">{card.value}</span>
                            </div>
                            {/* Horizontal Line */}
                            <hr className="my-2 border-secondary" />
                            {/* Trend bottom-center */}
                            <div className="text-center mt-auto">
                              <span className="small" style={{ color: card.trendColor }}>
                                {card.trend}
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
        
                  {/* Content Row */}
                  <Row>
                    {/* Left: Table */}
                    <Col xs={12} lg={8} className="mb-4">
                      <Card className="border border-primary shadow-sm mb-4 recent-product-card">
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
                              {tableRows.slice(0, 7).map((row, idx) => (
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
        
                    {/* Right: Subscription Plan */}
                    <Col xs={12} lg={4}>
                      <SubscriptionPlanCard />
                    </Col>
                  </Row>
                </>
              ) : activeScreen === 'user' ? (
                <UserManagement />
              ) : activeScreen === 'product' ? (
                <ProductManagement />
              ) : activeScreen === 'activity' ? (
                <ActivityLogs />
              ) : activeScreen === 'booking' ? (
                <BookingReviews />
              ) : null}
            </Col>
          </Row>       
        ) : activeScreen === 'user' ? (
          <UserManagement />
        ) : activeScreen === 'product' ? (
          <ProductManagement/>
        ) : activeScreen === 'activity' ? (
          <ActivityLogs />
        ) : activeScreen === 'booking' ? (
          <BookingReviews />
        ) : null}
      </div>

      {/* Admin Profile Modal */}
      <Modal 
        show={showProfileModal} 
        onHide={() => setShowProfileModal(false)}
        size="lg"
        centered
        dialogClassName="admin-profile-modal"
      >
        {/* Header */}
        <div 
          className="bg-primary px-4 pt-4 pb-4 d-flex justify-content-center align-items-center position-relative rounded-top"
          style={{ background: '#1E5EFF' }}
        >
          <h4 className="text-white fw-bold mb-0">Admin Profile</h4>
        </div>
        <Modal.Body className="px-4 py-4">
          {/* Avatar Section */}
          <div className="text-center mt-4 mb-4">
            <div className="position-relative d-inline-block border border-1 border-primary rounded-circle">
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-circle"
                width="120"
                height="120"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="d-none"
              />
              <button
                className="position-absolute bottom-0 end-0 border-0 p-0 translate-middle-x translate-middle-y bg-transparent"
                onClick={() => fileInputRef.current.click()}
              >
                <img 
                  src="/icons/camera_icon.png" 
                  alt="Change photo"
                  width="24"
                  height="24"
                />
              </button>
            </div>
          </div>
          {/* Profile Information */}
          <div className="bg-light rounded-4 p-4 mb-4" style={{ background: '#f1f9f8' }}>
            <Form>
              <Form.Group className="mb-3 row align-items-center">
                <Form.Label className="col-3 fw-medium mb-0">Full Name:</Form.Label>
                <div className="col-5">
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={'John Doe'}
                    onChange={() => {}}
                    className="rounded-3"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3 row align-items-center">
                <Form.Label className="col-3 fw-medium mb-0">Email Address:</Form.Label>
                <div className="col-5">
                  <Form.Control
                    type="email"
                    name="email"
                    value={'admin@dermascan.com'}
                    onChange={() => {}}
                    className="rounded-3"
                  />
                </div>
              </Form.Group>

              <div className="row mb-3 align-items-center">
                <div className="col-3 fw-medium">Role:</div>
                <div className="col-5 text-secondary">Admin</div>
              </div>

              <div className="row align-items-center">
                <div className="col-3 fw-medium">Last Login:</div>
                <div className="col-5 text-secondary">June 5, 2025 – 13:45 PM</div>
              </div>
            </Form>
          </div>

          {/* Security Section */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">
              <span role="img" aria-label="security">🔒</span> Security
            </h6>
            
            <div className="bg-white rounded-4 shadow-sm p-3 mb-3">
              <button className="btn w-100 text-start border-0 d-flex align-items-center gap-2">
                <BsKey size={20} />
                <span className="fw-medium">Change Password</span>
              </button>
            </div>

            <div className="bg-white rounded-4 shadow-sm p-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <BsShield size={20} />
                <span className="fw-medium">Two-Factor Authentication (2FA)</span>
              </div>
              <span className="text-danger">Disabled</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="d-flex justify-content-end">
            <Button 
              variant="primary"
              className="px-4 rounded-3 fw-bold"
            >
              Save Changes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminDashboard;