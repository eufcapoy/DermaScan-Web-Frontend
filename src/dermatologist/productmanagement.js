import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Modal
} from "react-bootstrap";
import { Layout } from "./Layout";
import "../styles/derma_product_management.css";

const DermaProductManagement = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  // Sample products data matching your image
  const productsData = [
    {
      id: "#20462",
      product: "ClearGlow Facial Gel",
      category: "Serum / Treatment",
      skinType: "Oily",
      description: "A lightweight gel that...",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#18533",
      product: "HydraMask Pro",
      category: "Mask",
      skinType: "Dry",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#40169",
      product: "DermaClean Wash",
      category: "Cleanser",
      skinType: "Combination",
      description: "Dr. Sofia Lim",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#34304",
      product: "SPF 50+ Shield",
      category: "Sunscreen",
      skinType: "All",
      description: "Dr. Ana Reyes",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#17168",
      product: "AcneAway Gel",
      category: "Treatment",
      skinType: "Oily",
      description: "Pending Review",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#73003",
      product: "PureTone",
      category: "Toner",
      skinType: "Normal",
      description: "Dr. Michael Cruz",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#58626",
      product: "SoftSkin Lotion",
      category: "Moisturizer",
      skinType: "Dry",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#40122",
      product: "PoreFix Strips",
      category: "Treatment",
      skinType: "Oily",
      description: "Dr. Sofia Lim",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#89044",
      product: "Vitaboost Cream",
      category: "Cream",
      skinType: "Combination",
      description: "Pending Review",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#85252",
      product: "MatteTone Pads",
      category: "Toner",
      skinType: "Oily",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#85252",
      product: "MatteTone Pads",
      category: "Toner",
      skinType: "Oily",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
    {
      id: "#85252",
      product: "MatteTone Pads",
      category: "Toner",
      skinType: "Oily",
      description: "Dr. Emily Santos",
      ingredients: "Water, Salicylic Acid...",
    },
  ];

  // Notification data
  const notifications = [
    {
      name: "Sarah Johnson",
      time: "July 15, 2025 at 2:00 PM",
      ago: "5 minutes ago",
    },
    {
      name: "Michael Chen",
      time: "July 18, 2025 at 9:00 AM",
      ago: "12 minutes ago",
    },
    {
      name: "Emma Rodriguez",
      time: "August 5, 2025 at 11:30 AM",
      ago: "28 minutes ago",
    },
    {
      name: "David Park",
      time: "July 22, 2025 at 3:15 PM",
      ago: "30 minutes ago",
    },
  ];

  // Filter products based on search term
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };
  const handleView = (product) => {
    setViewingProduct(product);
    setShowViewModal(true);
  };
  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    // Remove the product from your products array/state
    // Example: setProducts(products.filter(p => p.id !== productToDelete.id))
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  const [filters, setFilters] = useState({
    category: "",
    skinType: "",
    dateRange: "",
  });
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.skinType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesSkinType =
      !filters.skinType || product.skinType === filters.skinType;

    return matchesSearch && matchesCategory && matchesSkinType;
  });
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      skinType: "",
      dateRange: "",
    });
  };

  const applyFilters = () => {
    setShowFilterModal(false);
    // Filters are applied automatically through the filteredProducts logic
  };
  return (
    <Layout currentPage="products">
      {/* Modals */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          className="border-0 pb-0"
          style={{
            backgroundColor: "#205EFA",
            margin: "-1rem 0rem 0 -.05rem",
            borderRadius: "12px 12px 12px 12px",
            position: "relative",
          }}
        >
          <Modal.Title
            className="w-100 text-center text-white m-0"
            style={{
              fontWeight: "bold",
              fontSize: "35px",
              padding: "20px 0",
            }}
          >
            Add your product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#EDF8F6", padding: "30px" }}>
          <Form>
            <Row className="mb-2" style={{ marginBottom: "0.75rem" }}>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="productName">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Product Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="productCategory">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-1" style={{ marginBottom: "5rem" }}>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="skinCondition">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Skin Condition
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form.Group controlId="productDescription">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    style={{
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      resize: "none",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-1">
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="ingredients">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Ingredients
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    style={{
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      resize: "none",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col lg={6} md={6} sm={12}>
                <Form.Group className="mb-3" controlId="imageUpload">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Upload Image
                  </Form.Label>
                  <div
                    style={{
                      border: "2px dashed #ccc",
                      padding: "20px",
                      textAlign: "center",
                      borderRadius: "6px",
                      marginBottom: "12px",
                      backgroundColor: "white",
                      minHeight: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div style={{ marginBottom: "4px" }}>
                        <img
                          src="/icons/uploadicon.png"
                          alt="Upload icon"
                          style={{
                            width: "29px",
                            height: "24px",
                            filter: "opacity(0.8)",
                          }}
                        />
                      </div>
                      <p style={{ marginBottom: "-8px", fontSize: "14px" }}>
                        Drag & drop images or{" "}
                        <span
                          style={{
                            color: "#4285F4",
                            fontWeight: "500",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Browse
                        </span>
                      </p>
                      <small style={{ color: "#666", fontSize: "10px" }}>
                        Supported formats: JPG, PNG, PDF
                      </small>
                    </div>
                  </div>

                  {/* Uploaded files - make responsive */}
                  <div style={{ marginBottom: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#e8f5e8",
                        border: "1px solid #4caf50",
                        borderRadius: "4px",
                        fontSize: "14px",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ flexGrow: 1, wordBreak: "break-all" }}>
                        sampleimage.jpg
                      </span>
                      <span
                        style={{
                          color: "#4caf50",
                          cursor: "pointer",
                          marginLeft: "8px",
                        }}
                      >
                        ✕
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#e8f5e8",
                        border: "1px solid #4caf50",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ flexGrow: 1, wordBreak: "break-all" }}>
                        sampleimage.jpg
                      </span>
                      <span
                        style={{
                          color: "#4caf50",
                          cursor: "pointer",
                          marginLeft: "8px",
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "40px" }}
            >
              <Button
                variant="danger"
                className="me-3"
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#2857CC",
                  border: "none",
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="xl"
        centered
      >
        <Modal.Header
          closeButton
          className="border-0 pb-0"
          style={{
            backgroundColor: "#205EFA",
            margin: "-1rem 0rem 0 -.05rem",
            borderRadius: "12px 12px 12px 12px",
            position: "relative",
          }}
        >
          <Modal.Title
            className="w-100 text-center text-white m-0"
            style={{
              fontWeight: "bold",
              fontSize: "35px",
              padding: "20px 0",
            }}
          >
            Edit your product
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#EDF8F6", padding: "30px" }}>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="editProductName">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Product Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    defaultValue={editingProduct?.product || ""}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editProductCategory">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    defaultValue={editingProduct?.category || ""}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-2" style={{ marginBottom: "0.25rem" }}>
              <Col md={6}>
                <Form.Group controlId="editSkinCondition">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Skin Condition
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type here"
                    defaultValue={editingProduct?.skinType || ""}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editProductDescription">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    defaultValue={editingProduct?.description || ""}
                    style={{
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      resize: "none",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="editIngredients">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Ingredients
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Type here"
                    defaultValue={editingProduct?.ingredients || ""}
                    style={{
                      padding: "15px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      resize: "none",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group className="mb-4" controlId="editImageUpload">
                  <Form.Label
                    style={{ fontWeight: "500", marginBottom: "8px" }}
                  >
                    Upload Image
                  </Form.Label>
                  <div
                    style={{
                      border: "2px dashed #ccc",
                      padding: "20px",
                      textAlign: "center",
                      borderRadius: "6px",
                      marginBottom: "12px",
                      backgroundColor: "white",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          marginBottom: "4px",
                        }}
                      >
                        <img
                          src="/icons/uploadicon.png"
                          alt="Upload icon"
                          style={{
                            width: "29px",
                            height: "24px",
                            color: "#ddd",
                            filter: "opacity(0.8)",
                          }}
                        />
                      </div>
                      <p style={{ marginBottom: "-8px", fontSize: "14px" }}>
                        Drag & drop images or{" "}
                        <span
                          style={{
                            color: "#4285F4",
                            fontWeight: "500",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Browse
                        </span>
                      </p>
                      <small style={{ color: "#666", fontSize: "10px" }}>
                        Supported formats: JPG, PNG, PDF
                      </small>
                    </div>
                  </div>

                  {/* Uploaded files */}
                  <div style={{ marginBottom: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#e8f5e8",
                        border: "1px solid #4caf50",
                        borderRadius: "4px",
                        fontSize: "14px",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ flexGrow: 1 }}>sampleimage.jpg</span>
                      <span style={{ color: "#4caf50", cursor: "pointer" }}>
                        ✕
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#e8f5e8",
                        border: "1px solid #4caf50",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ flexGrow: 1 }}>sampleimage.jpg</span>
                      <span style={{ color: "#4caf50", cursor: "pointer" }}>
                        ✕
                      </span>
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "40px" }}
            >
              <Button
                variant="danger"
                className="me-3"
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#2857CC",
                  border: "none",
                  padding: "10px 40px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        size="xl"
        centered
      >
        <Modal.Header
          className="border-0 pb-0"
          style={{
            backgroundColor: "#205EFA",
            margin: "-1rem 0rem 0 -.05rem",
            borderRadius: "12px 12px 12px 12px",
            position: "relative",
            color: "white",
          }}
        >
          <Modal.Title
            className="w-100 text-center text-white m-0 d-flex align-items-center justify-content-center"
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              padding: "20px 0",
              gap: "10px",
            }}
          >
            🔎 Product Information
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            backgroundColor: "#F8F9FA",
            padding: "30px",
            position: "relative",
          }}
        >
          {/* Close Button - Top Right Corner */}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowViewModal(false)}
            style={{
              position: "absolute",
              top: "15px",
              right: "40px",
              background: "none",
              border: "none",
              fontSize: "30px",
              color: "#000000",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            ✕
          </button>

          {viewingProduct && (
            <>
              {/* Product ID - Single Line */}
              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Product ID:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Name - Single Line */}
              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Product Name:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.product}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date Created - Single Line */}
              <div className="row mb-4">
                <div className="col-12">
                  <div
                    className="mb-3"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Date Created:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category - Single Line */}
              <div className="row mb-0">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>Category:</strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skin Condition - Single Line */}
              <div className="row mb-4">
                <div className="col-12">
                  <div
                    className="mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <strong style={{ minWidth: "120px" }}>
                      Skin Condition:
                    </strong>
                    <span style={{ marginLeft: "10px" }}>
                      {viewingProduct.skinType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="row mb-3">
                <div className="col-12">
                  <div className="mb-3">
                    <strong>Description:</strong>
                    <div
                      style={{
                        marginLeft: "20px",
                        marginTop: "5px",
                        lineHeight: "1.6",
                      }}
                    >
                      Cetaphil Gentle Skin Cleanser is a mild, non-irritating
                      formula that soothes and cleanses the skin without
                      stripping its natural moisture. Ideal for sensitive or dry
                      skin, it can be used with or without water and is suitable
                      for daily use on the face and body.
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="mb-1">
                    <strong>Ingredients:</strong>
                    <div
                      style={{
                        marginLeft: "20px",
                        marginTop: "5px",
                        lineHeight: "1.6",
                      }}
                    >
                      {viewingProduct.ingredients}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Rating */}
              <div className="row mb-2">
                <div className="col-12">
                  <div className="mb-1">
                    <strong>Product Rating:</strong>
                    <div
                      style={{
                        marginLeft: "20px",
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[1, 2, 3, 4].map((star) => (
                          <svg
                            key={star}
                            width="20"
                            height="20"
                            fill="#FFD700"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <svg
                          width="20"
                          height="20"
                          fill="#FFD700"
                          viewBox="0 0 24 24"
                          style={{ position: "relative" }}
                        >
                          <defs>
                            <linearGradient id="halfStar">
                              <stop offset="50%" stopColor="#FFD700" />
                              <stop offset="50%" stopColor="#E0E0E0" />
                            </linearGradient>
                          </defs>
                          <path
                            fill="url(#halfStar)"
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        4.5 / 5
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="mb-3">
                    <strong>Product Image:</strong>
                    <div style={{ marginLeft: "20px", marginTop: "15px" }}>
                      <img
                        src={viewingProduct.image || "/icons/productimage.png"}
                        alt={viewingProduct.product || "Product Image"}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "2px solid #e0e0e0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjBGMEYwIiByeD0iMTIiLz4KPHN2ZyB4PSIzNSIgeT0iMzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjQ0NDQ0NDIj4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDEzdjEwaDEwdi0xMGgtMTB6TTMgM3YxOGgxOHYtMThoLTE4eiIgZmlsbD0iI0NDQ0NDQyIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjEwIiByPSIyIiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPgo8L3N2Zz4KPC9zdmc+";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Product Button - Bottom Right */}
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#205EFA",
                      border: "none",
                      borderRadius: "8px",
                      marginRight: "15px",
                      padding: "10px 40px",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      setShowViewModal(false);
                      handleEdit(viewingProduct);
                    }}
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          style={{
            backgroundColor: "#FFFFFF",
            padding: "30px 30px",
            borderRadius: "50px", // Increased border radius
            border: "none",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Trash Icon */}
          <div style={{ marginBottom: "20px" }}>
            <svg
              width="150"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              style={{ margin: "0 auto" }}
            >
              <circle cx="30" cy="30" r="30" fill="#FFE6E6" />
              <path
                d="M22 26h16m-2 0v12a2 2 0 01-2 2H26a2 2 0 01-2-2V26m3 0V24a2 2 0 012-2h2a2 2 0 012 2v2"
                stroke="#FF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h4
            style={{
              color: "#205EFA", // Changed text color
              fontWeight: "bold",
              marginBottom: "12px",
              fontSize: "25px",
            }}
          >
            Do you wish to delete this product?
          </h4>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setShowDeleteModal(false)}
              style={{
                backgroundColor: "#DC3545", // Red background
                color: "white",
                border: "none",
                borderRadius: "15px", // Increased border radius
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "100px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#C82333";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#DC3545";
              }}
            >
              No
            </button>

            <button
              onClick={confirmDelete}
              style={{
                backgroundColor: "#205EFA", // Blue background
                color: "white",
                border: "none",
                borderRadius: "15px", // Increased border radius
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "100px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#1848C7";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#205EFA";
              }}
            >
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showFilterModal}
        onHide={() => setShowFilterModal(false)}
        size="md"
        centered
      >
        <Modal.Header
          closeButton
          className="border-0 pb-0"
          style={{
            backgroundColor: "#205EFA",
            margin: "-1rem 0rem 0 -.05rem",
            borderRadius: "12px 12px 12px 12px",
            position: "relative",
          }}
        >
          <Modal.Title
            className="w-100 text-center text-white m-0"
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              padding: "20px 0",
            }}
          >
            🔍 Filter Products
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#EDF8F6", padding: "30px" }}>
          <Form>
            {/* Category Filter */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                Category
              </Form.Label>
              <Form.Select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">All Categories</option>
                <option value="Serum / Treatment">Serum / Treatment</option>
                <option value="Mask">Mask</option>
                <option value="Cleanser">Cleanser</option>
                <option value="Sunscreen">Sunscreen</option>
                <option value="Treatment">Treatment</option>
                <option value="Toner">Toner</option>
                <option value="Moisturizer">Moisturizer</option>
                <option value="Cream">Cream</option>
              </Form.Select>
            </Form.Group>

            {/* Skin Type Filter */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                Skin Type
              </Form.Label>
              <Form.Select
                value={filters.skinType}
                onChange={(e) => handleFilterChange("skinType", e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">All Skin Types</option>
                <option value="Oily">Oily</option>
                <option value="Dry">Dry</option>
                <option value="Combination">Combination</option>
                <option value="Normal">Normal</option>
                <option value="All">All</option>
              </Form.Select>
            </Form.Group>

            {/* Date Range Filter */}
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "500", marginBottom: "8px" }}>
                Date Range
              </Form.Label>
              <Form.Select
                value={filters.dateRange}
                onChange={(e) =>
                  handleFilterChange("dateRange", e.target.value)
                }
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </Form.Select>
            </Form.Group>

            {/* Active Filters Display */}
            {(filters.category || filters.skinType || filters.dateRange) && (
              <div className="mb-3">
                <small
                  style={{
                    color: "#666",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Active Filters:
                </small>
                <div className="d-flex flex-wrap gap-2">
                  {filters.category && (
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "#205EFA",
                        color: "white",
                        padding: "4px 8px",
                        fontSize: "12px",
                      }}
                    >
                      Category: {filters.category}
                    </span>
                  )}
                  {filters.skinType && (
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        padding: "4px 8px",
                        fontSize: "12px",
                      }}
                    >
                      Skin Type: {filters.skinType}
                    </span>
                  )}
                  {filters.dateRange && (
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "#ffc107",
                        color: "black",
                        padding: "4px 8px",
                        fontSize: "12px",
                      }}
                    >
                      Date: {filters.dateRange}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={clearFilters}
                style={{
                  padding: "10px 20px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Clear All
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowFilterModal(false)}
                style={{
                  padding: "10px 20px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={applyFilters}
                style={{
                  backgroundColor: "#2857CC",
                  border: "none",
                  padding: "10px 30px",
                  fontWeight: "500",
                  borderRadius: "6px",
                }}
              >
                Apply Filters
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Container fluid className="px-2 px-md-3">
        <Row className="mb-4">
          <Col>
            <div className="products-table-container">
              {/* Table Controls */}
              <div className="table-controls">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 gap-3">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <div className="entries-selector">
                      Show
                      <select
                        className="entries-select"
                        value={entriesPerPage}
                        onChange={(e) =>
                          setEntriesPerPage(Number(e.target.value))
                        }
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                      </select>
                      entries
                    </div>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ color: "#000000", cursor: "pointer" }}
                      onClick={() => setShowFilterModal(true)}
                    >
                      <img
                        src="/icons/filtericon.png"
                        alt="Filter"
                        style={{
                          width: "15px",
                          height: "11px",
                          marginRight: "6px",
                          filter: "brightness(0)",
                        }}
                      />
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Filter
                      </span>
                    </div>
                  </div>
                  <div className="ms-auto">
                    {" "}
                    {/* This pushes the button to the right */}
                    <button
                      className="add-product-btn"
                      onClick={() => setShowAddModal(true)}
                    >
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        +
                      </span>
                      Add Product
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="table-wrapper table-responsive">
                <Table className="products-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Skin Type</th>
                      <th>Description</th>
                      <th>Ingredients</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts
                      .slice(0, entriesPerPage)
                      .map((product, index) => (
                        <tr key={index}>
                          <td>{product.id}</td>
                          <td style={{ fontWeight: 500 }}>{product.product}</td>
                          <td>{product.category}</td>
                          <td>{product.skinType}</td>
                          <td
                            style={{
                              maxWidth: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {product.description}
                          </td>
                          <td
                            style={{
                              maxWidth: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {product.ingredients}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn view-btn"
                                title="View"
                                onClick={() => handleView(product)}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                </svg>
                              </button>
                              <button
                                className="action-btn edit-btn"
                                title="Edit"
                                onClick={() => handleEdit(product)}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                </svg>
                              </button>
                              <button
                                className="action-btn delete-btn"
                                title="Delete"
                                onClick={() => handleDelete(product)}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="pagination-container">
                <button className="pagination-btn" disabled>
                  Previous
                </button>
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">3</button>
                <button className="pagination-btn">Next</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default DermaProductManagement;
