# Database Information

## Database Type: SQLite

The application uses **SQLite** database, which:
- ✅ **Automatically persists data** - No separate database server needed
- ✅ **Creates database file** - `bank_transactions.db` in the backend folder
- ✅ **Data persists** - All transactions are saved permanently
- ✅ **No setup required** - Works out of the box

## Database File Location

The database file is stored at:
```
bank-transactions-react/backend/bank_transactions.db
```

## How It Works

1. **First Run**: When you start the Flask app, it automatically creates:
   - `bank_transactions.db` file (if it doesn't exist)
   - `transactions` table with all required columns

2. **Data Persistence**: 
   - When you create a transaction → Saved to database
   - When you update a transaction → Saved to database
   - When you delete a transaction → Removed from database
   - **Data persists even after restarting the server**

3. **Data Structure**:
   - `id` - Primary key (auto-increment)
   - `account_number` - Account number (String)
   - `transaction_type` - Type: deposit, withdrawal, transfer
   - `amount` - Transaction amount (Float)
   - `description` - Transaction description (String, optional)
   - `date` - Transaction date/time (DateTime, auto-generated)

## Verifying Database

You can verify the database is working by:
1. Creating a transaction in the React app
2. Restarting the Flask server
3. Refreshing the React app
4. **Your transaction should still be there!** ✅

## Note

- The database file (`.db`) is **not** pushed to GitHub (it's in `.gitignore`)
- Each developer/user will have their own local database file
- In production, you might want to use PostgreSQL or MySQL instead of SQLite

## Current Status

✅ Database is properly configured  
✅ Data persistence is working  
✅ All CRUD operations save to database  

