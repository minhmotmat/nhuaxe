import React from "react";
import { PartData } from "./types";

interface PartDetailsProps {
  part: PartData | null;
}

const PartDetails: React.FC<PartDetailsProps> = ({ part }) => {
  if (!part) {
    return <div>Không tìm thấy thông tin phần.</div>;
  }

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).catch((err) => {
      console.error("Lỗi khi sao chép: ", err);
    });
  };

  return (
    <div>
      {part.Image && (
        <img
          src={part.Image}
          alt={part.Full}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
      {Object.entries(part).map(([key, value]) => {
        if (
          typeof value === "object" &&
          value !== null &&
          "Ma" in value &&
          "Price" in value
        ) {
          return (
            <div key={key}>
              <span style={{ fontWeight: "bold", color: "brown" }}>{key}:</span>{" "}
              {value.Ma} -
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {formatPrice(value.Price)} VND
              </span>
              <button
                onClick={() => handleCopy(value.Ma)}
                style={{ marginLeft: "10px" }}
              >
                Copy
              </button>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PartDetails;
