from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from database import db
from models import User
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crud_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    """Display all users"""
    users = User.query.all()
    return render_template('index.html', users=users)

@app.route('/create', methods=['GET', 'POST'])
def create():
    """Create a new user"""
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        
        if User.query.filter_by(username=username).first():
            flash('Username already exists!', 'error')
            return redirect(url_for('create'))
        
        if User.query.filter_by(email=email).first():
            flash('Email already exists!', 'error')
            return redirect(url_for('create'))
        
        new_user = User(username=username, email=email)
        db.session.add(new_user)
        db.session.commit()
        flash('User created successfully!', 'success')
        return redirect(url_for('index'))
    
    return render_template('create.html')

@app.route('/update/<int:user_id>', methods=['GET', 'POST'])
def update(user_id):
    """Update an existing user"""
    user = User.query.get_or_404(user_id)
    
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        
        # Check if username/email already exists (excluding current user)
        if User.query.filter(User.username == username, User.id != user_id).first():
            flash('Username already exists!', 'error')
            return redirect(url_for('update', user_id=user_id))
        
        if User.query.filter(User.email == email, User.id != user_id).first():
            flash('Email already exists!', 'error')
            return redirect(url_for('update', user_id=user_id))
        
        user.username = username
        user.email = email
        db.session.commit()
        flash('User updated successfully!', 'success')
        return redirect(url_for('index'))
    
    return render_template('update.html', user=user)

@app.route('/delete/<int:user_id>', methods=['POST'])
def delete(user_id):
    """Delete a user (HARD DELETE - removes from database)"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    flash('User deleted successfully!', 'success')
    return redirect(url_for('index'))

@app.route('/api/users', methods=['GET'])
def api_get_users():
    """API endpoint to get all users"""
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

if __name__ == '__main__':
    app.run(debug=True)

