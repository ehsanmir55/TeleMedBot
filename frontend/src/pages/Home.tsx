import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">TeleMedBot</h1>
            <div className="space-y-4 w-full max-w-xs">
                <button
                    onClick={() => navigate('/register/patient')}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    I am a Patient
                </button>
                <button
                    onClick={() => navigate('/register/doctor')}
                    className="w-full bg-white text-blue-500 border border-blue-500 py-3 rounded-lg shadow hover:bg-blue-50 transition"
                >
                    I am a Doctor
                </button>
            </div>
        </div>
    );
};

export default Home;
