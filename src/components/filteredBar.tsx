import { FilterOutlined } from "@ant-design/icons";

interface Props {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
  categories: string[];
}

function FilterBar({
  categoryFilter,
  setCategoryFilter,
  priceFilter,
  setPriceFilter,
  categories,
}: Props) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <FilterOutlined className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Lọc theo:
            </span>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Tất cả mức giá</option>
            <option value="under500k">Dưới 500K</option>
            <option value="500k-1m">500K - 1 triệu</option>
            <option value="over1m">Trên 1 triệu</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
