import { Modal, Button, App } from "antd";
import {
  StarFilled,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { Product } from "../types";
import { useEffect, useRef } from "react";
import { useCart } from "../contexts/cartContext";

interface Props {
  product: Product | null;
  isVisible: boolean;
  onClose: () => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  formatPrice: (price: number) => string;
}

function ProductDetailModal({
  product,
  isVisible,
  onClose,
  favorites,
  toggleFavorite,
  formatPrice,
}: Props) {
  if (!product) return null;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { addToCart, cart } = useCart();
  const { message } = App.useApp();
  useEffect(() => {
    if (!isVisible && iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = "";
      iframeRef.current.src = src;
    }
  }, [isVisible]);
  return (
    <Modal
      title={null}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="product-modal"
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover rounded-xl"
            />
            <div className="text-xl my-4">Bài học thử</div>
            {product.trialVideo && (
              <iframe
                ref={iframeRef}
                key={isVisible ? "open" : "closed"}
                className="w-full h-2/5 rounded-xl"
                src={product.trialVideo}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                {favorites.includes(product.id) ? (
                  <HeartFilled
                    style={{ color: "#FF0000" }}
                    className="text-xl"
                  />
                ) : (
                  <HeartOutlined className="text-gray-600 text-xl" />
                )}
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {product.name}
            </h2>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <StarFilled style={{ color: "#ffc400" }} />
                <span className="font-semibold text-[#ffc400]">
                  {product.rating}
                </span>
                <span className="text-gray-500">
                  ({product.reviews} đánh giá)
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {product.students.toLocaleString()} học viên
              </span>
            </div>

            <p className="text-gray-600 mb-4">{product.fullDescription}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <i className="fas fa-user-tie text-blue-500 w-5"></i>
                <span className="text-sm">
                  <strong>Giảng viên:</strong> {product.instructor}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-clock text-blue-500 w-5"></i>
                <span className="text-sm">
                  <strong>Thời lượng:</strong> {product.duration}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-signal text-blue-500 w-5"></i>
                <span className="text-sm">
                  <strong>Cấp độ:</strong> {product.level}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-sm text-green-600 font-medium">
                    Tiết kiệm{" "}
                    {formatPrice(product.originalPrice - product.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                className="flex-1 !rounded-button"
                onClick={(e) => {
                  e.stopPropagation();
                  const isExist = cart.some((item) => item.id === product.id);
                  if (isExist) {
                    message.error("Sản phẩm đã có trong giỏ hàng!");
                    return;
                  }
                  addToCart(product);
                  message.success("Đã thêm vào giỏ hàng!");
                  onClose();
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductDetailModal;
