import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

type SearchInputProps = {
    onSearch: (searchText: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    };

    const performSearch = () => {
        const trimmedSearchText = searchText.trim();
        if (trimmedSearchText !== '' && onSearch) {
            onSearch(trimmedSearchText);
        }
    };

    const handleClick = (event: MouseEvent<SVGElement>) => {
        event.preventDefault();
        performSearch();
    };

    return (
        <div className={`w-4/5 md:w-1/2 mx-auto mb-2 relative ${isFocused ? 'border-blue-500' : 'border-gray-300'}`}>
            <input
                className={`w-full px-4 py-3 rounded-lg border placeholder-gray-500 text-sm focus:outline-none ${isFocused ? 'border-blue-500' : 'border-gray-300'
                    }`}
                type="text"
                placeholder="Search the answer..."
                value={searchText}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyPress={handleKeyPress}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isFocused ? '#4299e1' : 'currentColor'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer`}
                onClick={handleClick}
            >
                <circle cx="10.5" cy="10.5" r="7.5" />
                <line x1="21" y1="21" x2="15.8" y2="15.8" />
            </svg>
        </div>
    );
};

export default SearchInput;
