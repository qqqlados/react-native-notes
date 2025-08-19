# Notes App

A React Native application for creating and managing notes with internationalization support.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the App

**Important**: Use tunnel mode to avoid network issues:

```bash
npx expo start --tunnel
```

The regular `npm run start` command may not work due to network configuration issues.

### Backend Configuration

The app uses a backend API for note management. The backend URL is configured in `utils/axios.ts` with the `baseUrl` pointing to the deployed backend service.

Backend repository: [GitHub Link](https://github.com/qqqlados/notes-server)

## App Structure

### Welcome Screen (`/`)

- Displays a welcome message with a motivational quote
- Language switcher (EN/FR/IT) in the top-right corner
- "Start" button to begin using the app

### My Notes Tab (`/(tabs)/my-notes`)

- Lists all created notes
- Shows empty state when no notes exist
- Each note displays title and creation date
- Tap on a note to view details

### Create Note Tab (`/(tabs)/create-note`)

- Form to create new notes
- Title and description fields with validation
- "Create" button (disabled until both fields are filled)
- Simulated 2-second loading delay for better UX

### Note Details (`/my-notes/[id]`)

- Full note view with title, text, and creation date
- Edit button (pencil icon) to modify the note
- Delete button (trash icon) with confirmation modal
- Back navigation to notes list

### Features

- **Internationalization**: Support for English, French, and Italian
- **Real-time Updates**: Notes sync with backend API
- **Form Validation**: Prevents creating empty notes
- **Responsive Design**: Works on both mobile and web
- **Dark/Light Theme**: Automatic theme switching

## Testing

### E2E Testing with Detox

```bash
# Build and run tests
detox build --configuration android.emu.debug
detox test --configuration android.emu.debug
```

```bash
# Start web version
npm run web

## Technologies Used

- **React Native** with Expo
- **Expo Router** for navigation
- **Zustand** for state management
- **i18next** for internationalization
- **Axios** for API communication
- **Detox** for e2e testing
- **Cypress** for web testing
```
