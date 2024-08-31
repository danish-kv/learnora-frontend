import React from "react";

const Sidebar = ({ categories, onSelectCategory,selectedCategory }) => {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <nav>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => {onSelectCategory(category.slug) 
                  console.log(category.slug, selectedCategory);
                  
                }}
                className={`block w-full py-2 px-3 rounded-md transition-colors ${
                  selectedCategory && category.slug === selectedCategory
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
