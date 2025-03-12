export const ProductService = () => {
    const getProductsMini = async () => {
      const response = await fetch('https://dummyjson.com/products'); // 🔥 Đổi API phù hợp
      const data = await response.json();
      return data.products;
    };
    return { getProductsMini };
  };
  