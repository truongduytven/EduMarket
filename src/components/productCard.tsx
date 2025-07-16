import {
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, App } from "antd";
import type { Product } from "../types";
import { formatPrice } from "../lib/utils";
import { useCart } from "../contexts/cartContext";

interface ProductCardProps {
  product: Product;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  onClick: (product: Product) => void;
}

const ProductCard = ({
  product,
  favorites,
  toggleFavorite,
  onClick,
}: ProductCardProps) => {
  const { cart, addToCart } = useCart();
  const { message } = App.useApp();

  const isFavorite = favorites.includes(product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-[1.02]"
      onClick={() => onClick(product)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover object-top group-hover:opacity-50"
        />
        <div className="absolute z-20 top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
              message.success(
                isFavorite ? "Đã xóa khỏi yêu thích!" : "Đã thêm vào yêu thích!"
              );
            }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200 cursor-pointer"
          >
            {isFavorite ? (
              <HeartFilled style={{ color: "#FF0000" }} className="text-sm" />
            ) : (
              <HeartOutlined className="text-gray-600 text-sm" />
            )}
          </button>
        </div>
        {product.originalPrice && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -
              {Math.round(
                (1 - product.price / product.originalPrice) * 100
              )}
              %
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            className="!rounded-button cursor-pointer whitespace-nowrap"
          >
            Xem chi tiết
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
          <span className="text-xs text-gray-500">{product.level}</span>
        </div>

        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <StarFilled style={{ color: "#ffc400" }} className="text-sm" />
            <span className="text-sm font-medium text-[#ffc400]">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">
            {product.students.toLocaleString()} học viên
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end space-x-2">
          <Button
            type="primary"
            size="small"
            icon={<ShoppingCartOutlined />}
            className="!rounded-button cursor-pointer whitespace-nowrap"
            onClick={(e) => {
              e.stopPropagation();
              if (isInCart) {
                message.error("Sản phẩm đã có trong giỏ hàng!");
                return;
              }
              addToCart(product);
              message.success("Đã thêm vào giỏ hàng!");
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
