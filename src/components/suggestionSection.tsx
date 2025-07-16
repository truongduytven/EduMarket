import { RobotOutlined, StarFilled } from "@ant-design/icons";
import { Button } from "antd";
import type { Product } from "../types";
import { formatPrice } from "../lib/utils";

type Props = {
  suggestions: Product[];
  onClose: () => void;
  onProductClick: (product: Product) => void;
};

export default function SuggestionSection({
  suggestions,
  onClose,
  onProductClick,
}: Props) {
  if (suggestions.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <RobotOutlined className="text-white text-sm" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Gợi ý dành riêng cho bạn
            </h3>
          </div>
          <Button
            type="text"
            size="small"
            onClick={onClose}
            className="!rounded-button cursor-pointer whitespace-nowrap"
          >
            <i className="fas fa-times" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-purple-100"
              onClick={() => onProductClick(product)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <StarFilled className="text-yellow-400 text-xs" />
                      <span className="text-gray-500 text-xs">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
