import axios from 'axios';
import { useState } from 'react';

function App() {
    const [domain, setDomain] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [available, setAvailable] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post(
                'http://localhost:3000/check-domain',
                { domain }
            );
            setResult(response.data);
            if (Object.keys(response.data).length === 0) {
                setAvailable(true);
                // console.log('Available:', true);
            } else {
                setAvailable(false);
                // console.log('Available:', false);
            }
        } catch (error) {
            console.error('Error:', error);
            setResult({ error: 'An error occurred while checking the domain' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Domain Availability Checker
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="Enter a domain name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Checking...' : 'Check Availability'}
                    </button>
                </form>
                {result && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Results:
                        </h2>
                        {result.error ? (
                            <p className="text-red-600">{result.error}</p>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-gray-700">
                                    {available ? null : (
                                        <span>
                                            Domain: {result.domain_name}
                                        </span>
                                    )}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">
                                        Available:
                                    </span>{' '}
                                    <span
                                        className={
                                            available
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }
                                    >
                                        {available ? 'Yes' : 'No'}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
