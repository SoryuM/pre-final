interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Phones">Phones</option>
        <option value="Earphones">Earphones</option>
        <option value="Powerbank">Powerbank</option>
        <option value="Keyboard">Keyboard</option>
        <option value="Mouse">Mouse</option>
        <option value="Smartwatch">Smartwatch</option>
        <option value="Laptop">Laptop</option>
      </select>
    </div>
  );
}
