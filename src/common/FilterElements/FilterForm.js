import React, { useState } from "react";

export const useFilterForm = (initialValue = {}) => {
  const [filter, setFilter] = useState(initialValue);
  
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFilter((state) => ({
      ...filter,
      [name]: { ...state[name], value: value },
    }));
  };
  const onChangeSwitch = (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    setFilter((state) => ({
      ...filter,
      [name]: { ...state[name], value: checked },
    }));
  };

  const onChangeDate = (value, key) => {
    setFilter((state) => ({
      ...filter,
      [key]: { ...state[key], value: value },
    }));
  };
  return {
    onChange,
    onChangeSwitch,
    onChangeDate,
    filter,
    setFilter,
  };
};
