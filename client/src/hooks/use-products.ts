import { useQuery } from "@tanstack/react-query";
import { PRODUCTS } from "@/data/products";
import { api } from "@shared/routes";
import { Product } from "@shared/schema";

// Even though we are using static data now, we structure this as a hook
// so it's easy to switch to the real API later: api.products.list.path
export function useProducts() {
  return useQuery({
    queryKey: ["/api/products"], // Placeholder key
    queryFn: async (): Promise<Product[]> => {
      // Simulate network delay for realistic feel
      // await new Promise(resolve => setTimeout(resolve, 300));
      return PRODUCTS;
    },
    // Keep data fresh forever since it's client-side static
    staleTime: Infinity,
  });
}
