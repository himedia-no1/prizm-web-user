# Prizm Web User

This is the web client for Prizm, an AI-powered developer collaboration messenger.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Real-time Chat:** Communicate with your team in channels and direct messages.
- **AI Assistant:** Get help from an AI assistant in your chat.
- **Threads:** Organize conversations with threads.
- **File Sharing:** Share files with your team.
- **Dark Mode:** Switch between light and dark mode.
- **Multi-language Support:** The UI supports English and Korean.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **API Client:** [Axios](https://axios-http.com/)
- **Styling:** CSS Modules and a global `globals.css` file

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages
│   ├── (main)/                   # Main app pages
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
├── components/                   # React components
│   ├── common/
│   ├── layout/
│   ├── chat/
│   └── modals/
├── constants/                    # Constants (e.g., strings for i18n)
├── store/                        # Zustand stores
├── api/                          # API layer (axios instance and functions)
└── styles/                       # Global styles
```

## API Configuration

The backend API endpoint can be configured by setting the `NEXT_PUBLIC_API_URL` environment variable in a `.env.local` file at the root of the project.

```
NEXT_PUBLIC_API_URL=http://your-backend-api.com/api
```

If this variable is not set, it will default to `http://localhost:8080`.