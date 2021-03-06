import { Select, Tag } from "antd";
import React from "react";

export default function SelectForm({ selectData, onSelect, hasTag, ...restProps }) {
  const [searchSelect, setSearchSelect] = React.useState([]);

  React.useEffect(() => {
    setSearchSelect(selectData);
  }, [selectData]);

  const handleSelect = (value) => {
    onSelect(value);
  };
  const handleSelectSearch = (searchText) => {
    if (searchText) {
      setSearchSelect(searchSelect.filter((item) => item.label.includes(searchText)));
    } else {
      setSearchSelect(selectData);
    }
    if (searchSelect.length === 0) {
      setSearchSelect(selectData);
    }
  };

  return (
    <Select {...restProps} onSelect={handleSelect} onSearch={handleSelectSearch} size="large">
      {searchSelect?.map((item) => (
        <Select.Option value={item.value} key={item.value}>
          {hasTag ? (
            <Tag icon={item?.icon} color={item.colorTag}>
              {item.label}
            </Tag>
          ) : (
            item.label
          )}
        </Select.Option>
      ))}
    </Select>
  );
}
