# Gemini Clone - Chat Application

A responsive Gemini-style chat application with OTP authentication, chatroom management, and simulated AI responses.

## Features

- OTP-based authentication with country code selection
- Chatroom creation and management
- Simulated AI responses with typing indicators
- Image upload support
- Dark/light mode toggle
- Responsive design for all screen sizes
- Toast notifications for user feedback
- Clipboard functionality for messages

## Technologies Used

- React with TypeScript
- React Router
- Zustand for state management
- React Hook Form + Zod for form validation
- Tailwind CSS for styling
- Shadcn/ui components
- Lucide icons

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Deployment

The app is deployed on Vercel: [Live Demo](#) (replace with your deployment URL)

## Implementation Details

### Authentication
- Uses a simulated OTP flow with country code selection
- Data fetched from restcountries.com API
- Form validation with React Hook Form and Zod

### Chat Features
- Messages displayed with timestamps and user/AI distinction
- Typing indicators for simulated AI responses
- Image upload with preview
- Copy-to-clipboard functionality
- Auto-scroll to latest message

### State Management
- Zustand stores for authentication and chat data
- Persistence using localStorage

### UI/UX
- Responsive design with Tailwind CSS
- Dark mode support
- Loading states and skeletons
- Toast notifications for user feedback