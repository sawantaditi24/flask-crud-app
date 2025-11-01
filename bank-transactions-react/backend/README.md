# Bank Transactions Backend API

Flask REST API for bank transactions CRUD operations.

## Setup

```bash
pip install -r requirements.txt
python app.py
```

The API will run on `http://localhost:5001`

## API Endpoints

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/<id>` - Update transaction
- `DELETE /api/transactions/<id>` - Delete transaction (hard delete)

