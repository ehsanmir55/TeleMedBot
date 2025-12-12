/// <reference types="vite/client" />

interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    WebApp: any;
}

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}
