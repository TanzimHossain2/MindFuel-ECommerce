"use client";
import { sortingOptions } from "@/data/shop";
import { IProduct } from "@/types/product";
import { useEffect, useState } from "react";

interface sortProps {
  products: IProduct[];
  setFinalSorted: (value: any) => void;
}

const Sorting: React.FC<sortProps> = ({ products, setFinalSorted }) => {
  const [selectedOptions, setSelectedOptions] = useState(sortingOptions[0]);

  useEffect(() => {
    if (selectedOptions.text == "Default") {
      setFinalSorted([...products]);
    } else if (selectedOptions.text == "Alphabetically, A-Z") {
      setFinalSorted(
        [...products].sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (selectedOptions.text == "Alphabetically, Z-A") {
      setFinalSorted(
        [...products].sort((a, b) => b.title.localeCompare(a.title))
      );
    } else if (selectedOptions.text == "Price, low to high") {
      setFinalSorted([...products].sort((a, b) => a.price - b.price));
    } else if (selectedOptions.text == "Price, high to low") {
      setFinalSorted([...products].sort((a, b) => b.price - a.price));
    }
  }, [products, selectedOptions, setFinalSorted]);

  return (
    <>
      {" "}
      <div className="btn-select">
        <span className="text-sort-value">{selectedOptions.text}</span>
        <span className="icon icon-arrow-down" />
      </div>
      <div className="dropdown-menu">
        {sortingOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOptions(item)}
            className={`select-item ${item == selectedOptions ? "active" : ""}`}
          >
            <span className="text-value-item">{item.text}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sorting;
