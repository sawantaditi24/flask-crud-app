# Bank Transactions CRUD Application

A modern React frontend with Flask backend for managing bank transactions.

## Features

- ✅ Create bank transactions (deposits, withdrawals, transfers)
- ✅ View all transactions
- ✅ Update transactions
- ✅ Delete transactions (hard delete)
- ✅ Beautiful modern UI with React
- ✅ Real-time balance calculation

## Project Structure

```
bank-transactions-react/
├── frontend/          # React application
│   └── src/
│       ├── App.jsx   # Main component
│       └── App.css   # Styling
├── backend/          # Flask API
│   ├── app.py        # Flask application
│   └── requirements.txt
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

The API will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the React app:
```bash
npm run dev
```

The app will run on `http://localhost:5173` (or another port if 5173 is taken)

## Usage

1. Start the backend server first (port 5001)
2. Start the frontend dev server (port 5173)
3. Open your browser and go to the frontend URL
4. Create, view, update, and delete transactions

## Current Status

This is the **basic CRUD version** without:
- ❌ Soft Delete
- ❌ Versioning
- ❌ Activity Logging

These features will be added as enhancements!

