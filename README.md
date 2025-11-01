# Basic CRUD Application

This is a simple Flask CRUD (Create, Read, Update, Delete) application with a modern, polished UI.

## Features

- Create new users
<img width="587" height="943" alt="Screenshot 2025-10-31 at 6 56 46 PM" src="https://github.com/user-attachments/assets/7b9bac19-95f2-4f90-a7e1-d0443db09dc8" />

- Read/View all users
<img width="584" height="946" alt="Screenshot 2025-10-31 at 6 46 21 PM" src="https://github.com/user-attachments/assets/55cb38fe-bea8-47f2-bcf4-0ba7a30493cf" />

- Update existing users
<img width="588" height="947" alt="Screenshot 2025-10-31 at 6 53 19 PM" src="https://github.com/user-attachments/assets/53b3710c-29ea-4ee1-818a-7d8db7b6b3ab" />

- Delete users (hard delete - permanently removes from database)
<img width="1101" height="1017" alt="Screenshot 2025-10-31 at 6 54 10 PM" src="https://github.com/user-attachments/assets/7242f8fc-a8a2-4550-b8dc-81a8b45212f8" />

- Beautiful, modern UI with gradients and animations




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

