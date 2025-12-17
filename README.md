# 🚗 Phevon Car Rental

Experience the thrill of the drive with Phevon's premium fleet. A modern, full-stack car booking platform built for luxury, comfort, and style.

![Phevon Branding](/frontend/public/car-icon.svg)

## ✨ Features

- **Luxury Fleet Browsing**: Explore a curated selection of premium vehicles with advanced filtering (Price, Type).
- **Seamless Booking**: Real-time availability checks and intuitive booking flow.
- **AI Assistant**: Integrated **Gemini AI Chatbot** to answer queries and recommend cars.
- **Secure Authentication**: User accounts with Google OAuth integration and profile management.
- **Modern Dashboard**: Manage your bookings and profile details in a sleek interface.
- **Interactive UI**: Responsive design with glassmorphism, smooth animations, and luxury aesthetics.

## 🛠️ Tech Stack

### Frontend
- **React 19** with **Vite**: Blazing fast frontend capable of HMR.
- **TypeScript**: For type-safe, maintainable code.
- **TailwindCSS**: Utility-first styling for a modern, responsive design.
- **Lucide React**: Beautiful, consistent iconography.
- **Framer Motion**: Smooth entry and interaction animations.

### Backend
- **Django 5.0** & **Django REST Framework**: Robust and secure API.
- **Google Gemini API**: Powering the intelligent chatbot assistant.
- **Gmail SMTP**: For sending confirmation emails and contact form responses.
- **SQLite**: Lightweight database for development.

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Gmail App Password (for email features)
- Google Cloud Console Project (for OAuth and Gemini)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/FEBEN-G/Phevon-Car-Booking-website.git
    cd Phevon-Car-Booking-website
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    
    # Run migrations
    python manage.py migrate
    
    # Start server
    python manage.py runserver
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Environment Variables**
    Create a `.env` file in `backend/` with:
    ```env
    DEBUG=True
    SECRET_KEY=your_secret_key
    GEMINI_API_KEY=your_gemini_key
    EMAIL_HOST_USER=your_email@gmail.com
    EMAIL_HOST_PASSWORD=your_app_password
    ```

## 🤝 Contact

**Phevon Digital Solutions**  
📍 Addis Ababa, Ethiopia  
📧 phevondigitalsolutions@gmail.com  
📞 +251 93 731 8894

---
© 2024 Phevon Car Rental. All rights reserved.
