
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

- Next.js with App Router
- TypeScript
- Zustand for state management
- React Hook Form + Zod for form validation
- Tailwind CSS for styling
- Shadcn/ui components
- Lucide icons

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

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

---

# Tech Stack

- You are building a React application.
- Use TypeScript.
- Use React Router. KEEP the routes in src/App.tsx
- Always put source code in the src folder.
- Put pages into src/pages/
- Put components into src/components/
- The main page (default page) is src/pages/Index.tsx
- UPDATE the main page to include the new components. OTHERWISE, the user can NOT see any components!
- ALWAYS try to use the shadcn/ui library.
- Tailwind CSS: always use Tailwind CSS for styling components. Utilize Tailwind classes extensively for layout, spacing, colors, and other design aspects.

Available packages and libraries:

- The lucide-react package is installed for icons.
- You ALREADY have ALL the shadcn/ui components and their dependencies installed. So you don't need to install them again.
- You have ALL the necessary Radix UI components installed.
- Use prebuilt components from the shadcn/ui library after importing them. Note that these files shouldn't be edited, so make new components if you need to change them.
