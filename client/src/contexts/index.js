import React, { useState } from "react";

import { CategoriesContext, categoriesValue } from "./categories";
import { CategoryContext, categoryValue } from "./category";

export default function Index({ children }) {
  const [category, setCategory] = useState(categoryValue);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      <CategoriesContext.Provider value={{ categories: categoriesValue }}>
        {children}
      </CategoriesContext.Provider>
    </CategoryContext.Provider>
  );
}
