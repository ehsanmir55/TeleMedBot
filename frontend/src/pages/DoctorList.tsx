import React, { useState } from 'react';

const DoctorList: React.FC = () => {
    const [filter, setFilter] = useState('');

    // Mock Data
    const doctors = [
        { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology', fee: 50, rating: 4.8 },
        { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology', fee: 40, rating: 4.9 },
        { id: 3, name: 'Dr. Alice Brown', specialty: 'General', fee: 30, rating: 4.5 },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Find a Doctor</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search specialty..."
                    className="w-full border rounded-lg p-3 shadow-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="space-y-4">
                {doctors
                    .filter(d => d.specialty.toLowerCase().includes(filter.toLowerCase()))
                    .map((doc) => (
                        <div key={doc.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{doc.name}</h3>
                                <p className="text-gray-600">{doc.specialty}</p>
                                <div className="flex items-center text-yellow-500">
                                    <span>★ {doc.rating}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-blue-600">{doc.fee} USDT</p>
                                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                                    Book
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DoctorList;
