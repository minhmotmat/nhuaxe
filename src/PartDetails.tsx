import React, { useState } from "react";
import { ExPartDetail, PartArray, PartData } from "./types";

interface PartDetailsProps {
  part: PartData | null;
  inventory: { [key: string]: number } | null;
}

const PartDetails: React.FC<PartDetailsProps> = ({ part, inventory }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm

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

  // Hàm xử lý tìm kiếm
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Lọc các item dựa trên term tìm kiếm
  const filteredItems = Object.entries(groupedData).reduce(
    (acc: any[], [partName, items]) => {
      const filteredPartItems = items.filter(
        ({ name, Ma }) =>
          name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
          Ma.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );

      if (filteredPartItems.length > 0) {
        acc.push([partName, filteredPartItems]);
      }
      return acc;
    },
    [] as PartArray
  );
  // console.log(filteredItems)
  return (
    <div>
      {part.Image && (
        <img
          src={part.Image}
          alt={part.Full}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}

      {/* Ô input để tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc mã"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />

      {/* Hiển thị kết quả sau khi tìm kiếm */}
      {filteredItems.length > 0 ? (
        filteredItems.map(([partName, items]) => (
          <div key={partName}>
            <h4>{partName}</h4>
            <ul>
            {items.map(({ name, Ma, Price }: ExPartDetail) => {  // Thêm kiểu ExPartDetail
                globalIndex++; // Tăng chỉ số toàn cục
                return (
                  <li key={Ma}>
                    <span style={{ fontWeight: "bold", color: "brown" }}>
                      {globalIndex}. {name}:
                    </span>{" "}
                    {Ma} -
                    <span style={{color:"red", fontWeight: "bold"}}> {inventory ? inventory[Ma] : ""}</span> - 
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
        ))
      ) : (
        <div>Không tìm thấy kết quả.</div>
      )}
    </div>
  );
};

export default PartDetails;
