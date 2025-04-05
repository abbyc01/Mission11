import { useEffect, useState } from 'react';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://onlinebookstore-cummings-backend.azurewebsites.net/api/Book/GetBookTypes'
      );
      const data = await response.json();

      setCategories(data);
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="border rounded p-3 bg-light" style={{ maxWidth: '250px' }}>
      <h5 className="mb-3">Book Categories</h5>
      <div>
        {categories.map((c) => (
          <div key={c} className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id={c}
              value={c}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label ms-2" htmlFor={c}>
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
