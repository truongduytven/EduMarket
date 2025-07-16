import { useState } from "react";
import type { Product } from "../types";
import { Button, message } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import { getSuggestions } from "../apis/getSuggestions";
import { useCart } from "../contexts/cartContext";

function Tabs({
  currentView,
  setCurrentView,
  products,
  favorites,
  viewHistory,
  setSuggestions,
  setShowSuggestions
}: {
  currentView: "all" | "favorites" | "history";
  setCurrentView: (view: "all" | "favorites" | "history") => void;
  products: Product[];
  favorites: number[];
  viewHistory: number[];
  setSuggestions: (products: Product[]) => void;
  setShowSuggestions: (visible: boolean) => void;
}) {
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { cart } = useCart();
  const getSuggestion = async () => {
    setIsLoadingSuggestions(true);
    try {
      const suggestions = await getSuggestions({
        favorites,
        history: viewHistory,
        cart,
      });
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      message.error("Không thể lấy gợi ý lúc này. Vui lòng thử lại sau!");
    } finally {
      setIsLoadingSuggestions(false);
    }
  };
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCurrentView("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap !rounded-button ${
                currentView === "all"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              Tất cả khóa học ({products.length})
            </button>
            <button
              onClick={() => setCurrentView("favorites")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap !rounded-button ${
                currentView === "favorites"
                  ? "bg-red-100 text-red-600"
                  : "text-gray-600 hover:text-red-600 hover:bg-gray-100"
              }`}
            >
              Yêu thích ({favorites.length})
            </button>
            <button
              onClick={() => setCurrentView("history")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap !rounded-button ${
                currentView === "history"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-600 hover:text-green-600 hover:bg-gray-100"
              }`}
            >
              Đã xem ({viewHistory.length})
            </button>
          </div>

          <Button
            type="primary"
            icon={<RobotOutlined />}
            onClick={getSuggestion}
            loading={isLoadingSuggestions}
            className="!rounded-button cursor-pointer whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            Gợi ý AI
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
