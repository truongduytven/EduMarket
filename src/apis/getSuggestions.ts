import type { Product } from "../types";
import eduMarketAPI from "./configAPI";

export const getSuggestions = async ({
  favorites,
  history,
  cart,
}: {
  favorites: number[];
  history: number[];
  cart: Product[];
}): Promise<Product[]> => {
  const { data: allProducts } = await eduMarketAPI.get<Product[]>("/CourseProduct");

  const cartIds = cart.map((p) => p.id);
  const favProducts = allProducts.filter((p) => favorites.includes(p.id));
  const historyProducts = allProducts.filter((p) => history.includes(p.id));

  const getSimilarProducts = (source: Product[]) => {
    const categories = new Set(source.map((p) => p.category));
    const levels = new Set(source.map((p) => p.level));

    return allProducts.filter(
      (p) =>
        !cartIds.includes(p.id) &&
        (categories.has(p.category) || levels.has(p.level))
    );
  };

  let suggestions: Product[] = [];

  if (cart.length > 0) {
    suggestions = getSimilarProducts(cart);
  } else if (favProducts.length > 0) {
    suggestions = getSimilarProducts(favProducts);
  } else if (historyProducts.length > 0) {
    suggestions = getSimilarProducts(historyProducts);
  } else {
    suggestions = allProducts.filter(
      (p) => p.level.toLowerCase() === "người mới" && !cartIds.includes(p.id)
    );
  }

  const uniqueSuggestions = Array.from(new Set(suggestions.map((p) => p.id)))
    .map((id) => suggestions.find((p) => p.id === id)!)
    .slice(0, 4);

  return uniqueSuggestions;
};

