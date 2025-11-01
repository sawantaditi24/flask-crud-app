# Basic CRUD Application

This is a simple Flask CRUD (Create, Read, Update, Delete) application with a modern, polished UI.

## Features

- Create new users
- Read/View all users
- Update existing users
- Delete users (hard delete - permanently removes from database)
- Beautiful, modern UI with gradients and animations

<img width="584" height="946" alt="Screenshot 2025-10-31 at 6 46 21 PM" src="https://github.com/user-attachments/assets/55cb38fe-bea8-47f2-bcf4-0ba7a30493cf" />


## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
python app.py
```

3. Access at: `http://localhost:5000`

## Project Structure

```
original_version/
├── app.py           # Main Flask application
├── models.py        # Database models
├── database.py      # Database setup
├── requirements.txt # Python dependencies
├── templates/       # HTML templates
│   ├── base.html    # Base template
│   ├── index.html   # User listing
│   ├── create.html  # Create user form
│   └── update.html  # Update user form
└── README.md        # This file
```

## Database

- Uses SQLite (`crud_app.db`)
- Single `users` table with: id, username, email, created_at

This is the **original version** before enhancements.

