import { OrderState, Product } from "@shared/schema";
import { PRODUCT_FLAVORS } from "@/data/flavors";
import { formatMoney } from "./money";

const PHONE_NUMBER = "+5493446534509"; // IntegraLe WhatsApp

export function generateWhatsAppLink(
  state: OrderState, 
  products: Product[],
  total: number
): string {
  // Productos sin sabores
  const regularLines = Object.entries(state.items)
    .filter(([idStr, qty]) => qty > 0 && !PRODUCT_FLAVORS[Number(idStr)])
    .map(([idStr, qty]) => {
      const product = products.find(p => p.id === Number(idStr));
      if (!product) return "";
      return `• ${qty}x ${product.name} (${formatMoney(product.price * qty)})`;
    });

  // Productos con sabores
  const flavorLines = Object.entries(state.flavorItems)
    .map(([idStr, flavorMap]) => {
      const product = products.find(p => p.id === Number(idStr));
      if (!product) return "";
      const active = Object.entries(flavorMap).filter(([, q]) => q > 0);
      if (active.length === 0) return "";
      const totalQty = active.reduce((sum, [, q]) => sum + q, 0);
      const detail = active.map(([f, q]) => `${q}x ${f}`).join(", ");
      return `• ${product.name}: ${detail} (${formatMoney(product.price * totalQty)})`;
    });

  const itemsList = [...regularLines, ...flavorLines].filter(Boolean).join("\n");

  const message = `Hola! Soy *${state.customerName}*. Quiero hacer un pedido:

${itemsList}

*Total: ${formatMoney(total)}*

Entrega: A coordinar
${state.notes ? `Notas: ${state.notes}` : ''}`;

  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
