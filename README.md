# Fintech
Fintech is a financial application focused on tracking deposits and withdrawals. Users can create an account, log in, and manage their balance with ease.

## Application Features
### User Authenticaion
Users are able to create accounts and sign-in with their credentials.
### Transaction History & Management
The application keeps your history intact and allows the user to audit themselves as they see fit.
### Database Integration
Transactions are stored inside of a database (credentials shoudl be in a .env file) and can be altered from the UI.
### Deposit/Withdrawal system
Funds can be deposited and withdrawn by the user with ease and tracked.

## Tech-Stack
- Sequelize (using a MySQL dialect)
- bcrypt
- EJS
- Node.JS
- Express.JS / Express-Session

# Getting Started
### Prerequisites
- **Node.JS**
- A **MySQL** database

# Project Tree
```plaintext
│
├── README.md
├── package.json
├── config\
│   └── database.js
│
├── models\
│   ├── index.js
│   ├── transaction.js
│   └── user.js
│
├── routes\
│   └── index.js
│
├── public\
│   ├── css\
│   │   ├── style.css
│   │   └── dashboard.css
│   │
│   ├── html\
│   │   └── index.html
│   │
│   └── js\
│       ├── script.js
│       ├── dashboard.js
│       ├── login.js
│       └── signup.js
│
└── app.js
```

### Installation
1. **Clone the repository:**
- `git clone https://github.com/DDeluca06/fintech.git`
2. **Install Dependencies**
- `npm install bcrypt dotenv ejs express express-session sequelize`
3. **Set up the database:**
- Create your SQL database
- Structure your `.env` file to match the following:
```plaintext
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST= 
PORT= 
SECRET=
```
4. **Run & Observe!**
`npm start` OR `npx nodemon`
