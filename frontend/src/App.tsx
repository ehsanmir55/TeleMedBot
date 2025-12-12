import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import DoctorRegistration from './pages/DoctorRegistration';
import PatientRegistration from './pages/PatientRegistration';
import DoctorList from './pages/DoctorList';

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        // Handle Telegram WebApp
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
        }

        // Handle RTL
        const dir = ['fa', 'ar'].includes(i18n.language) ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register/doctor" element={<DoctorRegistration />} />
                    <Route path="/register/patient" element={<PatientRegistration />} />
                    <Route path="/doctors" element={<DoctorList />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
