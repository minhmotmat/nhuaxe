import React from "react";
import { PartData } from "./types";

interface PartDetailsProps {
  part: PartData | null;
}

const PartDetails: React.FC<PartDetailsProps> = ({ part }) => {
  if (!part) {
    return <div>Không tìm thấy thông tin phần.</div>;
  }
  console.log(part);
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value).catch((err) => {
      console.error("Lỗi khi sao chép: ", err);
    });
  };
  console.log(part);
  const filtered = Object.entries(part).filter(
    ([_, value]) =>
      typeof value === "object" &&
      value !== null &&
      "Ma" in value &&
      "Price" in value
  );

  const groupByPart = (data: [string, any][]) => {
    const grouped = data.reduce((acc, [name, detail]) => {
      const partName = detail.Part || "Khác"; // Nếu không có Part, gán là "Khác"
      if (!acc[partName]) {
        acc[partName] = [];
      }
      acc[partName].push({ name, ...detail });
      return acc;
    }, {} as Record<string, any[]>);

    return grouped;
  };

  const groupedData = groupByPart(filtered);

  let globalIndex = 0; // Biến để đánh số thứ tự toàn bộ

  return (
    <div>
      {part.Image && (
        <img
          src={part.Image}
          alt={part.Full}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
      {Object.entries(groupedData).map(([partName, items]) => (
        <div key={partName}>
          <h4>{partName}</h4>
          <ul>
            {items.map(({ name, Ma, Price }) => {
              globalIndex++; // Tăng chỉ số toàn cục
              return (
                <li key={Ma}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {globalIndex}.
                  </span>
                  <span style={{ color: "#007BFF" }}>{name}:</span> {Ma} -
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {formatPrice(Price)} VND
                  </span>
                  <button
                    onClick={() => handleCopy(Ma)}
                    style={{ marginLeft: "10px" }}
                  >
                    Copy
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PartDetails;
