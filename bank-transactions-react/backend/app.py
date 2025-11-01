from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Database configuration - SQLite database will persist data in bank_transactions.db file
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'bank_transactions.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)  # Enable CORS for React frontend

db = SQLAlchemy(app)

# Transaction Model
class Transaction(db.Model):
    """Bank Transaction model"""
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    account_number = db.Column(db.String(50), nullable=False)
    transaction_type = db.Column(db.String(20), nullable=False)  # 'deposit', 'withdrawal', 'transfer'
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Transaction {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'account_number': self.account_number,
            'transaction_type': self.transaction_type,
            'amount': self.amount,
            'description': self.description,
            'date': self.date.isoformat() if self.date else None
        }

# Create tables
with app.app_context():
    db.create_all()

# API Routes

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    """Get all transactions"""
    transactions = Transaction.query.order_by(Transaction.date.desc()).all()
    return jsonify([t.to_dict() for t in transactions])

@app.route('/api/transactions', methods=['POST'])
def create_transaction():
    """Create a new transaction"""
    data = request.json
    
    new_transaction = Transaction(
        account_number=data.get('account_number'),
        transaction_type=data.get('transaction_type'),
        amount=data.get('amount'),
        description=data.get('description')
    )
    
    db.session.add(new_transaction)
    db.session.commit()
    
    return jsonify(new_transaction.to_dict()), 201

@app.route('/api/transactions/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    """Update a transaction"""
    transaction = Transaction.query.get_or_404(transaction_id)
    data = request.json
    
    transaction.account_number = data.get('account_number', transaction.account_number)
    transaction.transaction_type = data.get('transaction_type', transaction.transaction_type)
    transaction.amount = data.get('amount', transaction.amount)
    transaction.description = data.get('description', transaction.description)
    
    db.session.commit()
    
    return jsonify(transaction.to_dict())

@app.route('/api/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    """Delete a transaction (HARD DELETE)"""
    transaction = Transaction.query.get_or_404(transaction_id)
    db.session.delete(transaction)
    db.session.commit()
    
    return jsonify({'message': 'Transaction deleted successfully'}), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Different port to avoid conflict

