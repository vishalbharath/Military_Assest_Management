# Military Asset Management System 

## Project Overview

The Military Asset Management System (MAMS) is a comprehensive web-based application designed to enable commanders and logistics personnel to manage the movement, assignment, and expenditure of critical military assets across multiple bases. The system provides transparency, streamlined logistics, and accountability through a secure role-based solution.

## 🎯 Core Features

- **Real-time Dashboard**: Track Opening Balance, Closing Balance, Net Movement, Assigned, and Expended assets
- **Purchase Management**: Record and manage asset purchases with approval workflows
- **Transfer System**: Facilitate and log inter-base transfers with complete history
- **Assignment Tracking**: Assign assets to personnel and monitor usage
- **Role-Based Access Control**: Secure access for Admin, Base Commander, and Logistics Officer roles
- **Audit Trail**: Complete logging of all transactions for accountability
- **Responsive Design**: Optimized for desktop command centers and mobile field operations

## 🛠 Technology Stack

### Frontend
- **React 18**: Modern JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful icon library
- **Date-fns**: Modern JavaScript date utility library
- **Clsx**: Utility for constructing className strings conditionally

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing tool
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
military-asset-management/
├── public/                          # Static assets
├── src/
│   ├── components/                  # React components
│   │   ├── Auth/                   # Authentication components
│   │   │   └── Login.jsx           # Login form and authentication
│   │   ├── Dashboard/              # Dashboard components
│   │   │   ├── Dashboard.jsx       # Main dashboard view
│   │   │   ├── MetricCard.jsx      # Metric display cards
│   │   │   ├── AssetTypeChart.jsx  # Asset visualization chart
│   │   │   └── RecentActivity.jsx  # Activity feed component
│   │   ├── Layout/                 # Layout components
│   │   │   └── Navigation.jsx      # Sidebar navigation
│   │   ├── Purchases/              # Purchase management
│   │   │   └── Purchases.jsx       # Purchase tracking and approval
│   │   ├── Transfers/              # Transfer management
│   │   │   └── Transfers.jsx       # Inter-base transfer tracking
│   │   ├── Assignments/            # Assignment management
│   │   │   └── Assignments.jsx     # Personnel asset assignments
│   │   └── Audit/                  # Audit and logging
│   │       └── AuditLogs.jsx       # System audit trail
│   ├── context/                    # React context providers
│   │   └── AuthContext.jsx         # Authentication and RBAC context
│   ├── services/                   # API and business logic
│   │   └── api.js                  # Mock API service layer
│   ├── types/                      # Type definitions and constants
│   │   └── index.js                # Enums and constants
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles and Tailwind imports
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite build configuration
└── README.md                       # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd military-asset-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 👥 User Roles and Permissions

### 1. Admin
**Full system access with all permissions**

**Capabilities:**
- View all bases and assets across the entire system
- Manage user accounts and role assignments
- Approve high-value purchases and critical transfers
- Access complete audit trails and system logs
- Configure system settings and base parameters
- Override security restrictions when necessary

**Dashboard Access:**
- System-wide metrics and analytics
- Multi-base asset distribution overview
- Critical alerts and notifications
- User activity monitoring

### 2. Base Commander
**Base-level command authority**

**Capabilities:**
- View and manage assets within their assigned base
- Approve purchase requests from logistics officers
- Authorize inter-base transfers and asset movements
- Assign assets to personnel under their command
- Review base-specific audit logs and reports
- Make strategic decisions on asset allocation

**Dashboard Access:**
- Base-specific asset metrics
- Personnel assignment overview
- Pending approvals requiring attention
- Base operational status indicators

### 3. Logistics Officer
**Operational asset management**

**Capabilities:**
- Create and submit purchase requests
- Initiate inter-base transfer requests
- Manage day-to-day asset assignments
- Track asset maintenance and status updates
- Generate operational reports
- Monitor asset utilization and availability

**Dashboard Access:**
- Asset availability and status
- Pending requests and assignments
- Maintenance schedules and alerts
- Operational efficiency metrics

## 🔐 Authentication System

### Demo Credentials
The system includes demo accounts for testing different user roles:

- **Admin Access**
  - Username: `admin`
  - Password: `password123`

- **Base Commander Access**
  - Username: `commander`
  - Password: `password123`

- **Logistics Officer Access**
  - Username: `logistics`
  - Password: `password123`

### Security Features
- Session-based authentication with secure token management
- Role-based access control (RBAC) with permission validation
- Automatic session timeout for security
- Secure password handling and validation
- Activity logging for security auditing

## 📊 System Modules

### 1. Dashboard Module
**Real-time operational overview**

**Features:**
- Opening Balance tracking
- Closing Balance monitoring
- Net Movement calculations
- Asset assignment statistics
- Expenditure tracking
- Visual asset distribution charts
- Recent activity feed
- Status overview tables

**Key Metrics:**
- Total assets by type (Vehicles, Weapons, Ammunition, Equipment)
- Asset status distribution (Available, Assigned, Maintenance, Expended)
- Movement trends and patterns
- Critical alerts and notifications

### 2. Purchase Management Module
**Asset procurement and approval workflow**

**Features:**
- Purchase request creation and submission
- Multi-level approval workflows
- Supplier management and tracking
- Cost analysis and budgeting
- Delivery scheduling and monitoring
- Purchase history and reporting

**Workflow:**
1. Logistics Officer creates purchase request
2. Base Commander reviews and approves/rejects
3. Admin provides final authorization for high-value items
4. System tracks delivery and asset integration

### 3. Transfer Management Module
**Inter-base asset movement tracking**

**Features:**
- Transfer request initiation
- Route planning and optimization
- Real-time shipment tracking
- Multi-base coordination
- Transfer history and documentation
- Automated notifications and updates

**Transfer Process:**
1. Request creation with source and destination bases
2. Asset verification and availability check
3. Command approval and authorization
4. Logistics coordination and execution
5. Delivery confirmation and asset integration

### 4. Assignment Management Module
**Personnel asset allocation and tracking**

**Features:**
- Asset assignment to personnel
- Usage monitoring and reporting
- Return processing and verification
- Maintenance scheduling
- Performance tracking
- Assignment history and analytics

**Assignment Lifecycle:**
1. Asset selection and availability verification
2. Personnel assignment and documentation
3. Usage monitoring and status updates
4. Return processing and condition assessment
5. Maintenance scheduling and asset cycling

### 5. Audit and Logging Module
**Complete transaction transparency**

**Features:**
- Comprehensive activity logging
- User action tracking
- System event monitoring
- Compliance reporting
- Security audit trails
- Data integrity verification

**Logged Activities:**
- User authentication and access
- Asset movements and transfers
- Purchase approvals and transactions
- Assignment changes and updates
- System configuration modifications
- Security events and alerts

## 🎨 User Interface Design

### Design Philosophy
The MAMS interface follows military design principles emphasizing:
- **Clarity**: Clean, unambiguous information presentation
- **Efficiency**: Streamlined workflows for rapid decision-making
- **Reliability**: Consistent behavior and visual feedback
- **Accessibility**: Usable across various devices and conditions

### Color Scheme
- **Primary**: Slate gray (#1e293b) for professional appearance
- **Accent**: Amber (#d97706) for highlights and actions
- **Success**: Green (#059669) for positive states
- **Warning**: Yellow (#ca8a04) for caution states
- **Error**: Red (#dc2626) for critical alerts
- **Info**: Blue (#2563eb) for informational content

### Typography
- **Headings**: Bold, clear hierarchy for easy scanning
- **Body Text**: Optimized for readability in various lighting conditions
- **Data**: Monospace fonts for numerical data and codes
- **Labels**: Consistent sizing and spacing for form elements

## 🔧 Configuration and Customization

### Environment Variables
Create a `.env` file in the root directory for configuration:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# Authentication
VITE_SESSION_TIMEOUT=3600000
VITE_TOKEN_REFRESH_INTERVAL=300000

# Feature Flags
VITE_ENABLE_AUDIT_LOGS=true
VITE_ENABLE_REAL_TIME_UPDATES=true
```

### Tailwind CSS Customization
Modify `tailwind.config.js` to customize the design system:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        military: {
          olive: '#4A5D23',
          navy: '#1E3A8A',
          sand: '#F5E6D3'
        }
      },
      fontFamily: {
        military: ['Inter', 'sans-serif']
      }
    }
  }
}
```

## 🧪 Testing and Quality Assurance

### Code Quality
- ESLint configuration for consistent code style
- Prettier integration for automatic formatting
- Component-based architecture for maintainability
- Comprehensive error handling and validation

### Testing Strategy
- Unit tests for individual components
- Integration tests for user workflows
- End-to-end tests for critical paths
- Performance testing for large datasets

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Cloud Platforms**: AWS S3, Google Cloud Storage
- **Container Deployment**: Docker with nginx
- **CDN Integration**: CloudFlare, AWS CloudFront

### Performance Optimization
- Code splitting for faster loading
- Image optimization and lazy loading
- Bundle size optimization
- Caching strategies for static assets

## 🔮 Future Enhancements

### Planned Features
- Real-time notifications and alerts
- Mobile application for field operations
- Advanced analytics and reporting
- Integration with external military systems
- Barcode/QR code scanning for assets
- Geolocation tracking for mobile assets

### Technical Improvements
- Backend API development with Node.js/Express
- Database integration with MySQL/PostgreSQL
- Real-time updates with WebSocket connections
- Advanced security features and encryption
- Automated testing and CI/CD pipeline
- Performance monitoring and analytics

## 📞 Support and Maintenance

### Documentation
- Inline code comments for developers
- User guides for each role type
- API documentation for integrations
- Troubleshooting guides and FAQs

### Maintenance
- Regular security updates and patches
- Performance monitoring and optimization
- User feedback integration and improvements
- System backup and disaster recovery procedures


**CLASSIFICATION: UNCLASSIFIED // FOR OFFICIAL USE ONLY**

*This system contains sensitive operational information. Access is restricted to authorized personnel only.*
