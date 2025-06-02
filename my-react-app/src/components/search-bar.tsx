import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (city: string) => void;
    loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <div className="search-container">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                    className="search-input"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="search-button"
                    disabled={loading || !city.trim()}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;