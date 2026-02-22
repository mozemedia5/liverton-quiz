# Liverton Quiz Championship

A comprehensive web application for conducting science quiz competitions with Firebase integration, real-time scoring, and admin management.

## Features

- **User Registration & Authentication**: Secure registration with payment verification
- **Persistent Authentication**: Users stay logged in across browser restarts and PWA launches
- **Smart Page Routing**: Automatic redirection based on authentication state
- **Daily Quiz System**: 10 questions per day with 15-second timer per question
- **Real-time Leaderboard**: Live scoring and ranking updates
- **Admin Dashboard**: Complete management system for questions, users, and payments
- **Payment Integration**: Automated Flutterwave integration for Mobile Money (Airtel & MTN)
- **Mobile Responsive**: Optimized for mobile-first experience
- **Progressive Web App (PWA)**: Installable app with offline capabilities

## Authentication Flow

### User Journey

#### First-Time Visitors
1. **Homepage (index.html)**: See welcome page with registration/login options
2. **Register (register.html)**: Create account with payment verification
3. **Auto-redirect to Login**: After successful registration
4. **Login (login.html)**: Enter credentials
5. **Dashboard (dashboard.html)**: Access user dashboard upon successful login

#### Returning Authenticated Users
1. **Automatic Dashboard Access**: Users are automatically redirected to dashboard
2. **Persistent Sessions**: Authentication persists across:
   - Browser restarts
   - Tab closes
   - PWA app restarts
   - Device reboots (for PWA)
3. **No Re-login Required**: Users stay logged in until they explicitly logout

#### Authentication State Management
- **index.html**: Redirects authenticated users to dashboard
- **login.html**: Redirects authenticated users to dashboard
- **register.html**: Redirects authenticated users to dashboard
- **dashboard.html**: Redirects unauthenticated users to login
- **quiz.html**: Redirects unauthenticated users to login
- **leaderboard.html**: Redirects unauthenticated users to login
- **rules.html**: Accessible to all, shows logout button for authenticated users

#### Logout Behavior
1. **Logout Button**: Available on all authenticated pages (dashboard, quiz, leaderboard, rules)
2. **Redirect to Login**: After logout, users are redirected to login page
3. **Never See Homepage**: Authenticated users never see the homepage unless they logout
4. **Mobile Menu Logout**: Same logout behavior in mobile responsive menu

## Technology Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Backend**: Firebase Cloud Functions
- **Database**: Firestore (NoSQL)
- **Authentication**: Firebase Auth (Email/Password)
- **Hosting**: Firebase Hosting
- **Real-time**: Firestore real-time listeners

## Project Structure

```
/
├── index.html              # Homepage with animated particles
├── register.html           # User registration page
├── login.html              # User login page
├── dashboard.html          # User dashboard
├── quiz.html               # Daily quiz interface
├── leaderboard.html        # Real-time leaderboard
├── rules.html              # Competition rules
├── admin-login.html        # Admin login
├── admin-dashboard.html    # Admin dashboard
├── admin-questions.html    # Question management
├── admin-users.html        # User management
├── admin-payments.html     # Payment management
├── functions/              # Cloud Functions
│   ├── index.js           # Main Cloud Functions
│   └── package.json       # Functions dependencies
├── firestore.rules        # Firestore security rules
└── README.md              # This file
```

## Setup Instructions

### 1. Firebase Project Setup

1. Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Cloud Functions
   - Hosting

### 2. Firebase Configuration

Replace the Firebase configuration in all HTML files with your project credentials:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 3. Deploy Firestore Rules

Deploy the security rules to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

### 4. Deploy Cloud Functions

Navigate to the functions directory and deploy:

```bash
cd functions
npm install
firebase deploy --only functions
```

### 5. Deploy Hosting

Deploy the web application:

```bash
firebase deploy --only hosting
```

## Database Structure

### Collections

#### Users (`/users/{userId}`)
```javascript
{
    name: "User Name",
    email: "user@example.com",
    phone: "+256XXXXXXXXX",
    whatsapp: "+256XXXXXXXXX",
    paymentStatus: "pending|approved|rejected",
    registeredAt: "timestamp",
    role: "user|admin",
    registrationSubmitted: true
}
```

#### Quizzes (`/quizzes/{quizId}`)
```javascript
{
    date: "2026-01-25",
    seasonId: "season_2026_01",
    createdAt: "timestamp",
    createdBy: "admin_uid"
}
```

#### Questions (`/questions/{questionId}`)
```javascript
{
    quizId: "quiz_id",
    questionNumber: 1,
    question: "Question text",
    optionA: "Option A",
    optionB: "Option B",
    optionC: "Option C",
    optionD: "Option D",
    correctAnswer: "A",
    createdAt: "timestamp"
}
```

#### Attempts (`/attempts/{attemptId}`)
```javascript
{
    userId: "user_id",
    quizId: "quiz_id",
    date: "2026-01-25",
    score: 25,
    timeSpent: 120,
    answers: [...],
    completedAt: "timestamp",
    seasonId: "season_2026_01"
}
```

#### Season Stats (`/season_stats/{statsId}`)
```javascript
{
    userId: "user_id",
    seasonId: "season_2026_01",
    totalPoints: 150,
    quizzesTaken: 5,
    averageTime: 12.5,
    lastActive: "timestamp"
}
```

## Competition Rules

### Season Duration
- **Start Date**: January 25th, 2026
- **Duration**: 4 weeks (Monday-Friday only)
- **End Date**: February 19th, 2026

### Daily Quiz Schedule
- **Available Time**: 9:00 AM - 8:00 PM (EAT)
- **Questions**: 10 questions per day
- **Time Limit**: 15 seconds per question
- **Retry**: One retry allowed per question

### Scoring System
- **Correct Answer**: +3 points
- **Wrong Answer**: 0 points (with one retry)
- **Time Out**: 0 points
- **Maximum Daily Score**: 30 points

### Prizes
- **Winner**: 200,000 UGX
- **Runner-up**: 50,000 UGX

### Payment
- **Entry Fee**: 2,000 UGX
- **Payment Options**: 
  - Automated Payment via Flutterwave (Airtel & MTN)

## Admin Features

### Dashboard
- Real-time statistics (total users, approved users, pending payments)
- Quick action buttons for common tasks
- Recent activity feed

### Question Management
- Create daily quizzes with 10 questions
- Edit existing questions
- Calendar view for quiz scheduling
- Question search and filtering

### User Management
- View all registered users
- Filter by payment status, registration date
- Approve/reject payments
- Export user data to CSV

### Payment Management
- View all payment records
- Bulk approve/reject payments
- Payment statistics and analytics
- Export payment data

## Security Features

### Authentication
- Firebase Auth with email/password
- Admin role-based access control
- Secure session management

### Database Security
- Firestore security rules
- Input validation and sanitization
- Rate limiting on quiz submissions

### Data Protection
- HTTPS encryption
- Secure payment verification
- Admin-only access to sensitive data

## Support & Contact

- **Email**: infoliverton@gmail.com
- **WhatsApp**: +256 705 954 597
- **Technical Support**: Available during business hours

## Development Notes

### Mobile Optimization
- Responsive design with mobile-first approach
- Touch-friendly interface elements
- Optimized for various screen sizes

### Performance
- Lazy loading of images and components
- Efficient database queries
- Real-time updates without page refresh

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox

## Future Enhancements

- Push notifications for quiz reminders
- Social sharing features
- Advanced analytics dashboard
- Multi-language support
- Integration with payment gateways

## License

© 2026 Liverton Quiz Championship | © Liverton Codes
Designed by Musa