import React, { useState } from 'react';
import './InputWithDropdown.css'; // Import file CSS

interface InputWithDropdownProps {
  label: string;
  value: string;
  suggestions: string[];
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({
  label,
  value,
  suggestions,
  onChange,
  onSelect,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSelect(suggestion);
    setShowSuggestions(false);
  };

  // Lọc suggestions dựa trên giá trị nhập vào
  const filteredSuggestions =
    value.trim() === ''
      ? suggestions // Hiện tất cả nếu không có chuỗi tìm kiếm
      : suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        );

  return (
    <div className="input-container">
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={label}
        />
        <button
          type="button"
          className="dropdown-arrow"
          onClick={() => setShowSuggestions(!showSuggestions)}
        >
          ⌄
        </button>
      </div>
      {showSuggestions && (
        <ul className="suggestions-list">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))
          ) : (
            suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default InputWithDropdown;
