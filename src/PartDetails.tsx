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

  let filtered = Object.entries(part).filter((value) => {
    // console.log(value[1]);
    return (
      typeof value[1] === "object" &&
      value[1] !== null &&
      "Ma" in value[1] &&
      "Price" in value[1]
    );
  });
  console.log(filtered);
  // Hàm nhóm dữ liệu theo trường 'Part'
  const groupByPart = (data: any) => {
    const grouped = {};

    data.forEach(([name, detail]) => {
      if (!grouped[detail.Part]) {
        grouped[detail.Part] = [];
      }
      grouped[detail.Part].push({ name, ...detail });
    });

    return grouped;
  };
  let groupedData = groupByPart(filtered);
  console.log(groupedData);

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
            {items.map(({ name, Ma, Price }) => (
              <li key={Ma}>
                <span style={{ fontWeight: "bold", color: "brown" }}>
                  {name}:
                </span>{" "}
                {Ma} -
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
            ))}
          </ul>
        </div>
      ))}
      {/* {Object.entries(part).map(([key, value]) => {
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
      })} */}
    </div>
  );
};

export default PartDetails;
