# AI Chatbot Application

A modern chatbot application built with React (Frontend) and Flask (Backend), featuring real-time communication and a sleek user interface.

## Project Structure

```
chatbot/
├── frontend/          # React frontend application
│   ├── src/          # Source files
│   ├── public/       # Public assets
│   └── dist/         # Production build
└── backend/          # Flask backend application
    ├── models/       # Database models
    ├── routes/       # API routes
    └── utils/        # Utility functions
```

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Icons

### Backend
- Flask
- SQLAlchemy
- Flask-Migrate
- Python 3.9+

## Prerequisites

- Node.js (v14 or higher)
- Python 3.9 or higher
- npm or yarn
- pip (Python package manager)

## Local Development Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add necessary environment variables

6. Run the development server:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the frontend directory
   - Add necessary environment variables

4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend Deployment (Render.com)
1. Sign up for a Render account
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure the following:
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Add environment variables

### Frontend Deployment (Vercel)
1. Sign up for a Vercel account
2. Import your GitHub repository
3. Configure the following:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add environment variables

## Environment Variables

### Backend (.env)
```
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

### Frontend (.env)
```
VITE_API_URL=your_backend_api_url
```

## API Documentation

### Available Endpoints

#### GET /api/health
- Description: Health check endpoint
- Response: `{"status": "ok"}`

#### POST /api/chat
- Description: Send message to chatbot
- Request Body: `{"message": "string"}`
- Response: `{"response": "string"}`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
