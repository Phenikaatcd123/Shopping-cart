interface Props {
  category: string;
  onCategoryChange: (value: string) => void;
}

export default function FilterBar({ category, onCategoryChange }: Props) {
  return (
    <select aria-label="Filter by category" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
      <option value="">All</option>
      <option value="men's clothing">Men</option>
      <option value="women's clothing">Women</option>
      <option value="electronics">Electronics</option>
      <option value="jewelery">Jewelery</option>
    </select>
  );
}
