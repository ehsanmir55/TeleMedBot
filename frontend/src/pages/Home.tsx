import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">{t('welcome')}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{t('select_role')}</h2>
            <div className="space-y-4 w-full max-w-xs">
                <button
                    onClick={() => navigate('/register/patient')}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition font-medium"
                >
                    {t('patient_reg')}
                </button>
                <button
                    onClick={() => navigate('/register/doctor')}
                    className="w-full bg-white text-blue-500 border border-blue-500 py-3 rounded-lg shadow hover:bg-blue-50 transition font-medium"
                >
                    {t('doctor_reg')}
                </button>
            </div>
        </div>
    );
};

export default Home;
