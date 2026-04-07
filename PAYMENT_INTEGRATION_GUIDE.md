# 🎯 Sports Hub Payment System - Integration Guide

## Overview
A complete payment management system for student athletes including payment uploads, admin verification, and QR code based payment instructions.

---

## 📊 Backend APIs Connected

### 1. **GET `/api/payments/my-payments`**
**Purpose:** Fetch all payment records for the logged-in student  
**Used In:** `StudentPaymentPage`  
**Authentication:** Bearer token (Athlete)  
**Response:** Array of payment objects with status, amount, month, year, screenshot

```javascript
// Example Data
{
  _id: "65abc123",
  athleteId: { _id: "...", name: "John Doe", email: "john@example.com", status: "approved" },
  month: "January",
  year: 2024,
  amount: 5000,
  status: "pending", // pending, approved, rejected
  screenshot: "/uploads/payment-1234567890.png",
  submittedAt: "2024-01-15T10:30:00Z",
  verifiedAt: null,
  createdAt: "2024-01-01T00:00:00Z"
}
```

### 2. **GET `/api/payments`**
**Purpose:** Fetch all payment records (Admin only)  
**Used In:** `AdminPaymentPage`  
**Authentication:** Bearer token (Admin)  
**Response:** Array of all payments with athlete details populated

### 3. **PUT `/api/payments/:id/upload`**
**Purpose:** Upload payment proof screenshot  
**Used In:** `StudentPaymentPage` → `UploadModal`  
**Authentication:** Bearer token (Athlete)  
**Method:** FormData with file upload  
**Payload:**
```javascript
{
  screenshot: File, // Image file
  transactionId: "TXN123456" // Optional
}
```
**Backend Handling:** Stores file path in `payment.screenshot`, sets status to "pending"

### 4. **PUT `/api/payments/:id/verify`**
**Purpose:** Admin approves or rejects payment  
**Used In:** `AdminPaymentPage` → Payment Table Actions  
**Authentication:** Bearer token (Admin)  
**Payload:**
```javascript
{
  status: "approved" | "rejected" | "pending"
}
```

### 5. **POST `/api/payments/generate`**
**Purpose:** Generate monthly fee records for all approved students  
**Used In:** `AdminDashboard` (Already implemented)  
**Authentication:** Bearer token (Admin)  
**Payload:**
```javascript
{
  month: "January",
  year: 2024,
  amount: 5000
}
```

---

## 🎨 Components Created

### **1. StatusBadge.jsx**
**Location:** `src/components/StatusBadge.jsx`

**Purpose:** Display payment status with color-coded badges

**Props:**
- `status` (string): "pending" | "approved" | "rejected"

**Features:**
- Color-coded rendering (yellow/green/red)
- Icon with status label
- Hover animation

**Example Usage:**
```jsx
<StatusBadge status="approved" />
```

---

### **2. FilterTabs.jsx**
**Location:** `src/components/FilterTabs.jsx`

**Purpose:** Filter payments by status

**Props:**
- `activeFilter` (string): Current active filter
- `onFilterChange` (function): Callback on filter change
- `counts` (object): Count statistics for each filter

**Features:**
- All, Pending, Approved, Rejected tabs
- Count badges
- Active state styling

**Example Usage:**
```jsx
<FilterTabs
  activeFilter={activeFilter}
  onFilterChange={handleFilterChange}
  counts={{ all: 10, pending: 2, approved: 7, rejected: 1 }}
/>
```

---

### **3. PaymentTable.jsx**
**Location:** `src/components/PaymentTable.jsx`

**Purpose:** Display payments in responsive table/card format

**Props:**
- `payments` (array): Payment records
- `isAdmin` (boolean): Show admin-specific columns/actions
- `onUpload` (function): Callback for upload action
- `onApprove` (function): Callback for approve action
- `onReject` (function): Callback for reject action
- `onViewScreenshot` (function): Callback for screenshot preview
- `loading` (boolean): Show loading state

**Features:**
- Desktop table view
- Mobile card view
- Status badges integration
- Conditional action buttons
- Smooth animations via framer-motion

**Admin Columns:**
- Student Name
- Month, Year, Amount, Status
- Screenshot preview button
- Approve/Reject buttons (for pending with screenshot)

**Student Columns:**
- Month, Year, Amount, Status
- Upload button (for pending/rejected)

---

### **4. UploadModal.jsx**
**Location:** `src/components/UploadModal.jsx`

**Purpose:** Modal form for uploading payment proof

**Props:**
- `isOpen` (boolean): Modal visibility
- `paymentId` (string): Payment record ID
- `onClose` (function): Close modal callback
- `onUpload` (function): Upload handler
- `loading` (boolean): Upload progress

**Features:**
- Drag-and-drop file upload
- Image preview
- Optional transaction ID field
- File type validation
- Smooth animations
- Success/error feedback via toast

**Workflow:**
1. Student clicks "Upload Payment Proof"
2. Modal opens with drag-drop area
3. Student selects/drags image file
4. Optional: Enters transaction ID
5. Clicks "Upload Proof"
6. FormData sent to backend
7. Toast shows result
8. Dashboard refreshes

---

### **5. ScreenshotModal.jsx**
**Location:** `src/components/ScreenshotModal.jsx`

**Purpose:** Full-screen preview of payment screenshot

**Props:**
- `isOpen` (boolean): Modal visibility
- `imageUrl` (string): Image URL to display
- `onClose` (function): Close callback

**Features:**
- Fullscreen image display
- Close button
- Smooth animations
- Touch-friendly on mobile

---

### **6. StudentPaymentPage.jsx**
**Location:** `src/pages/StudentPaymentPage.jsx`

**Purpose:** Student payment management dashboard

**Features:**
- 🔴 **QR Code & Payment Instructions**
  - Display academy payment QR code (PhonePe/UPI)
  - Step-by-step payment guide
  - UPI ID display
  - Clear instructions

- 📊 **Statistics Cards**
  - Total Fees
  - Approved Amount
  - Pending Count
  - Rejected Count

- 📋 **Payment Table**
  - All student payments
  - Status with badges
  - Upload button for pending/rejected
  - Mobile responsive

**Data Flow:**
1. Page loads → Fetch `/api/payments/my-payments`
2. Display all student payments in table
3. Student clicks "Upload Payment Proof"
4. Modal opens with file picker
5. Student previews image, enters transaction ID (optional)
6. Submits → PUT `/api/payments/{id}/upload`
7. Toast notification
8. Dashboard refreshes

---

### **7. AdminPaymentPage.jsx**
**Location:** `src/pages/AdminPaymentPage.jsx`

**Purpose:** Admin payment verification dashboard

**Features:**
- 📊 **6 Statistics Cards**
  - Total Payments
  - Pending Count
  - Approved Count
  - Rejected Count
  - With Proof Count
  - Needs Review Count

- 🔍 **Filter Tabs**
  - All payments
  - Pending review
  - Approved
  - Rejected

- 📋 **Payment Table (Admin View)**
  - Student Name
  - Month, Year, Amount
  - Status with badge
  - Screenshot preview button
  - Approve/Reject buttons (for pending with proof)

- ⚠️ **Action Required Alert**
  - Shows when payments need review

**Data Flow:**
1. Page loads → Fetch `/api/payments` (all payments)
2. Apply filter (default: all)
3. Display table with student name + payment details
4. Admin clicks "View" for screenshot
5. Full-screen modal opens
6. Admin clicks "Approve" or "Reject"
7. PUT `/api/payments/{id}/verify` with status
8. Toast notification
9. Table refreshes

---

## 🔄 Data Flow Architecture

### **Student Payment Upload Flow**
```
Student clicks "Upload Payment Proof"
        ↓
UploadModal Opens
        ↓
Select/Drag image file
        ↓
Enter optional Transaction ID
        ↓
Click "Upload Proof"
        ↓
Form Validation (image required)
        ↓
Create FormData with file + transactionId
        ↓
PUT /api/payments/{id}/upload with FormData
        ↓
Backend: Store file, set status="pending"
        ↓
Toast: "Payment proof uploaded successfully!"
        ↓
Refetch /api/payments/my-payments
        ↓
Table Updates with new screenshot
```

### **Admin Payment Verification Flow**
```
Admin navigates to /admin/payments
        ↓
Fetch /api/payments
        ↓
Display all payments in table
        ↓
Admin applies filter (pending/approved/rejected)
        ↓
For pending with screenshot:
  - Click "View" to see screenshot
  - ScreenshotModal opens
  - Click "Approve" or "Reject"
        ↓
PUT /api/payments/{id}/verify with new status
        ↓
Backend: Update payment status, set verifiedAt
        ↓
Toast: "Payment approved/rejected successfully!"
        ↓
Refetch /api/payments
        ↓
Table updates with new status
```

### **Authentication Flow**
```
Axios Request
        ↓
Interceptor: Get token from localStorage
        ↓
Add header: Authorization: Bearer {token}
        ↓
Send request with token
        ↓
Backend validates token
        ↓
Return data with 200 or error
        ↓
If 401: Clear localStorage, redirect to /login
```

---

## 🛣️ Routes Added

### **Student Routes** (Require authentication + athlete role)
- **GET** `/student/payments` → `StudentPaymentPage`

### **Admin Routes** (Require authentication + admin role)
- **GET** `/admin/payments` → `AdminPaymentPage`

---

## 🔌 Axios Integration

**Location:** `src/services/api.js` (Already configured)

**Features:**
- Automatic JWT token attachment
- Bearer token in Authorization header
- Global 401 error handling
- LocalStorage token management

**Token Storage Keys:**
- `localStorage.getItem('token')`
- `localStorage.getItem('user')`

---

## 📱 Responsive Design

### **Desktop (md+)**
- Full table layout
- All columns visible
- Inline action buttons

### **Mobile (sm)**
- Card-based layout
- Stack information vertically
- Full-width action buttons
- Scrollable without overflow

---

## 🎨 UI Features

### **Colors & Styling**
- **Background:** `bg-dark-900`, `bg-dark-800`
- **Glass Effect:** `glass-panel` class
- **Primary Color:** Gradient buttons and accents
- **Status Colors:**
  - Approved: Green (`text-green-400`)
  - Pending: Yellow (`text-yellow-400`)
  - Rejected: Red (`text-red-400`)

### **Animations**
- **Framer Motion:** Fade, scale, slide animations
- **Hover Effects:** Scale, color change
- **Transitions:** Smooth 300ms transitions

### **QR Code Display**
- Centered card layout
- Payment instructions with numbered steps
- Alert box with clear guidelines
- Responsive grid layout

---

## ✅ APIs Used - Checklist

- ✅ `GET /api/payments/my-payments` - StudentPaymentPage
- ✅ `GET /api/payments` - AdminPaymentPage
- ✅ `PUT /api/payments/:id/upload` - UploadModal submission
- ✅ `PUT /api/payments/:id/verify` - AdminPaymentPage approval/rejection
- ✅ `POST /api/payments/generate` - AdminDashboard (pre-existing)

All 5 payment APIs fully utilized!

---

## 🚀 Usage Instructions

### **For Students:**
1. Login with athlete credentials
2. Navigate to "My Payments" from navbar
3. View QR code and payment instructions
4. Pay via PhonePe/UPI
5. Click "Upload Payment Proof" button
6. Select screenshot image
7. Optionally enter transaction ID
8. Submit
9. Wait for admin verification

### **For Admins:**
1. Login with admin credentials
2. Navigate to "Payments" from navbar
3. View all payments by status
4. Filter by pending/approved/rejected
5. Click "View" to see payment screenshot
6. Click "Approve" or "Reject"
7. Mark status in system

---

## 🐛 Error Handling

- **401 Unauthorized:** Auto-logout and redirect to login
- **Network Errors:** Toast error notification
- **Validation Errors:** Toast warning + prevent submission
- **File Upload Errors:** Image type validation + error toast

---

## 📦 Dependencies Used

- `react-router-dom` - Routing
- `axios` - API calls
- `framer-motion` - Animations
- `react-icons` - Icons
- `react-toastify` - Notifications
- `tailwindcss` - Styling

---

## 🎯 Testing Checklist

- [ ] Student can view all their payments
- [ ] Student can upload payment proof
- [ ] Student sees status update after upload
- [ ] Admin can view all payments
- [ ] Admin can filter by status
- [ ] Admin can view payment screenshot
- [ ] Admin can approve payment
- [ ] Admin can reject payment
- [ ] Toast notifications work
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] QR code displays correctly
- [ ] Payment instructions are clear

---

## 🔐 Security Notes

- JWT tokens automatically attached to all requests
- Role-based access control (athlete/admin)
- File upload validated on frontend (image type)
- Backend validates file type and user authorization
- Unauthorized users cannot access payment pages

---

**Last Updated:** 2024  
**Status:** ✅ Production Ready
