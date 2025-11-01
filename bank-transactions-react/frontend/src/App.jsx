import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    account_number: '',
    transaction_type: 'deposit',
    amount: '',
    description: ''
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTransaction) {
        await axios.put(`${API_URL}/transactions/${editingTransaction.id}`, formData);
      } else {
        await axios.post(`${API_URL}/transactions`, formData);
      }
      fetchTransactions();
      resetForm();
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Error saving transaction');
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      account_number: transaction.account_number,
      transaction_type: transaction.transaction_type,
      amount: transaction.amount.toString(),
      description: transaction.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`${API_URL}/transactions/${id}`);
        fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
        alert('Error deleting transaction');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      account_number: '',
      transaction_type: 'deposit',
      amount: '',
      description: ''
    });
    setEditingTransaction(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'deposit':
        return 'type-deposit';
      case 'withdrawal':
        return 'type-withdrawal';
      case 'transfer':
        return 'type-transfer';
      default:
        return '';
    }
  };

  const getTotalBalance = () => {
    return transactions.reduce((total, t) => {
      if (t.transaction_type === 'deposit') return total + t.amount;
      if (t.transaction_type === 'withdrawal') return total - t.amount;
      return total;
    }, 0);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🏦 Bank Transactions</h1>
          <p className="subtitle">Manage your banking transactions</p>
        </header>

        <div className="balance-card">
          <h2>Total Balance</h2>
          <p className={`balance-amount ${getTotalBalance() >= 0 ? 'positive' : 'negative'}`}>
            ${getTotalBalance().toFixed(2)}
          </p>
        </div>

        <div className="actions-bar">
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Transaction'}
          </button>
          {transactions.length > 0 && (
            <span className="transaction-count">{transactions.length} transactions</span>
          )}
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingTransaction ? 'Edit Transaction' : 'Create New Transaction'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  value={formData.account_number}
                  onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Transaction Type</label>
                <select
                  value={formData.transaction_type}
                  onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}
                  required
                >
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingTransaction ? 'Update' : 'Create'} Transaction
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="transactions-list">
          <h2>Transaction History</h2>
          {transactions.length === 0 ? (
            <div className="empty-state">
              <p>No transactions found. Create your first transaction!</p>
            </div>
          ) : (
            <div className="transactions-grid">
              {transactions.map((transaction) => (
                <div key={transaction.id} className={`transaction-card ${getTransactionTypeColor(transaction.transaction_type)}`}>
                  <div className="transaction-header">
                    <span className="transaction-type">{transaction.transaction_type.toUpperCase()}</span>
                    <span className="transaction-amount">
                      {transaction.transaction_type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="transaction-details">
                    <p><strong>Account:</strong> {transaction.account_number}</p>
                    {transaction.description && (
                      <p><strong>Description:</strong> {transaction.description}</p>
                    )}
                    <p className="transaction-date">{formatDate(transaction.date)}</p>
                  </div>
                  <div className="transaction-actions">
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(transaction)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(transaction.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
