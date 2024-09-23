import React, { useState } from "react";
import data from "./nhua.json"; // Import dữ liệu từ file JSON
import InputWithDropdown from "./InputWithDropdown";
import PartDetails from "./PartDetails";
import { PartData } from "./types"; // Định nghĩa kiểu dữ liệu từ file types.ts

const App: React.FC = () => {
  const [type, setType] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [selectedPart, setSelectedPart] = useState<PartData | null>(null);

  // Gợi ý
  const [typeSuggestions, setTypeSuggestions] = useState<string[]>([]);
  const [modelSuggestions, setModelSuggestions] = useState<string[]>([]);
  const [colorSuggestions, setColorSuggestions] = useState<string[]>([]);

  // Handle Search when Model & Color are selected
  const handleSearch = () => {
    const foundPart = data.find(
      (part) =>
        part.Type === type && part.Model === model && part.Color === color
    );
    setSelectedPart(foundPart || null);
  };

  // Handle Type change, reset Model and Color
  const handleTypeChange = (value: string) => {
    setType(value);
    setModel(""); // Reset model
    setColor(""); // Reset color

    const suggestions = data
      .map((part) => part.Type)
      .filter((t) => t.toLowerCase().includes(value.toLowerCase()));
    setTypeSuggestions([...new Set(suggestions)]);
  };

  // Handle Model change, reset Color
  const handleModelChange = (value: string) => {
    setModel(value);
    setColor(""); // Reset color when model is selected

    const suggestions = data
      .filter((part) => part.Type === type)
      .map((part) => part.Model)
      .filter((m) => m.toLowerCase().includes(value.toLowerCase()));
    setModelSuggestions([...new Set(suggestions)]);
  };

  // Handle Color change
  const handleColorChange = (value: string) => {
    setColor(value);
    const suggestions = data
      .filter((part) => part.Type === type && part.Model === model)
      .map((part) => part.Color)
      .filter((c) => c.toLowerCase().includes(value.toLowerCase()));
    setColorSuggestions([...new Set(suggestions)]);
  };

  // Handle Image Click
  const handleImageClick = (part: PartData) => {
    setSelectedPart(part); // Set the selected part when an image is clicked
  };

  return (
    <div style={{ padding: "10px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <InputWithDropdown
          label="Type"
          value={type}
          suggestions={typeSuggestions}
          onChange={handleTypeChange}
          onSelect={setType}
        />
        <InputWithDropdown
          label="Model"
          value={model}
          suggestions={modelSuggestions}
          onChange={handleModelChange}
          onSelect={setModel}
        />
        <InputWithDropdown
          label="Color"
          value={color}
          suggestions={colorSuggestions}
          onChange={handleColorChange}
          onSelect={setColor}
        />
      </div>

      {/* Conditionally display the search button */}
      {(model || color) && (
        <button onClick={handleSearch} style={{ marginTop: "10px" }}>
          Tìm kiếm
        </button>
      )}

      {/* Display parts with images when only Type is selected and no part is selected */}
      {type && !model && !color && (
        <div style={{ marginTop: "20px" }}>
          {Object.entries(
            data
              .filter((part) => part.Type === type)
              .reduce((acc, part) => {
                if (!acc[part.Model]) {
                  acc[part.Model] = [];
                }
                acc[part.Model].push(part);
                return acc;
              }, {} as Record<string, PartData[]>)
          ).map(([modelName, parts]) => (
            <div key={modelName} style={{ marginBottom: "20px" }}>
              <h3 style={{ textAlign: "left", color: "#007BFF" }}>
                {modelName}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "flex-start",
                }}
              >
                {parts.map((part) => (
                  <div
                    key={`${part.Type}_${part.Model}_${part.Color}`}
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src={`./images/${part.Type}_${part.Model}_${part.Color}.png`}
                      alt={`${part.Type} ${part.Model} ${part.Color}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(part)}
                    />
                    <div style={{ fontWeight: "bold" }}>
                      {`${part.Type} ${part.Model} ${part.Color}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display parts with images when Type and Model are selected, and no Color is chosen */}
      {type && model && !color && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {data
            .filter((part) => part.Type === type && part.Model === model)
            .map((part) => (
              <div
                key={`${part.Type}_${part.Model}_${part.Color}`}
                style={{ textAlign: "center" }}
              >
                <img
                  src={`./images/${part.Type}_${part.Model}_${part.Color}.png`}
                  alt={`${part.Type} ${part.Model} ${part.Color}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(part)}
                />
                <div style={{ fontWeight: "bold" }}>
                  {`${part.Type} ${part.Model} ${part.Color}`}
                </div>
              </div>
            ))}
        </div>
      )}
      {/* Show details only if part is selected and Model or Color is chosen */}
      {selectedPart && <PartDetails part={selectedPart} />}
    </div>
  );
};

export default App;
