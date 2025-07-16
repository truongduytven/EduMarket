import Tabs from "../components/tabs";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { getAllProduct } from "../apis/getProduct";
import { App } from "antd";
import FilterBar from "../components/filteredBar";
import ProductDetailModal from "../components/productDetailModal";
import { formatPrice } from "../lib/utils";
import ProductCard from "../components/productCard";
import ProductCardSkeleton from "../components/productCardSkeleton";
import SuggestionSection from "../components/suggestionSection";
import { useSearch } from "../contexts/searchContext";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewHistory, setViewHistory] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentView, setCurrentView] = useState<
    "all" | "favorites" | "history"
  >("all");
  const { message } = App.useApp();
  const { searchTerm } = useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const categories = ["Tất cả", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allProducts = await getAllProduct();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        message.error("Lỗi khi tải danh sách sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [categoryFilter, priceFilter, products, currentView, searchTerm]);

  const filterProducts = () => {
    let result = [...products];

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (priceFilter !== "all") {
      result = result.filter((p) => {
        const price = p.price;
        if (priceFilter === "under500k") return price < 500000;
        if (priceFilter === "500k-1m")
          return price >= 500000 && price <= 1000000;
        if (priceFilter === "over1m") return price > 1000000;
        return true;
      });
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch) ||
          p.instructor.toLowerCase().includes(lowerSearch)
      );
    }

    if (currentView === "favorites") {
      result = result.filter((p) => favorites.includes(p.id));
    } else if (currentView === "history") {
      result = result.filter((p) => viewHistory.includes(p.id));
    }

    if (result.length === 0 && products.length > 0) {
      message.warning("Không có sản phẩm nào phù hợp với bộ lọc hiện tại");
    }

    setFilteredProducts(result);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
    if (!viewHistory.includes(product.id)) {
      setViewHistory((prev) => [...prev, product.id]);
    }
  };

  return (
    <div className="w-full bg-gray-50">
      <Tabs
        currentView={currentView}
        setCurrentView={setCurrentView}
        products={products}
        favorites={favorites}
        viewHistory={viewHistory}
        setSuggestions={setSuggestions}
        setShowSuggestions={setShowSuggestions}
      />
      <FilterBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        categories={categories}
      />

      {showSuggestions && (
        <SuggestionSection
          suggestions={suggestions}
          onClose={() => setShowSuggestions(false)}
          onProductClick={handleProductClick}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-search text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy khóa học nào
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {filteredProducts.length} kết quả đã được tìm thấy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <ProductDetailModal
        product={selectedProduct}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        formatPrice={formatPrice}
      />
    </div>
  );
}

export default Home;
