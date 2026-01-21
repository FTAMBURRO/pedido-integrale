import { OrderState, Product } from "@shared/schema";
import { formatMoney } from "./money";

const PHONE_NUMBER = "+5493446534509"; // IntegraLe WhatsApp

export function generateWhatsAppLink(
  state: OrderState, 
  products: Product[],
  total: number
): string {
  const itemsList = Object.entries(state.items)
    .filter(([_, qty]) => qty > 0)
    .map(([idStr, qty]) => {
      const product = products.find(p => p.id === Number(idStr));
      if (!product) return "";
      return `• ${qty}x ${product.name} (${formatMoney(product.price * qty)})`;
    })
    .join("\n");

  const message = `Hola! Soy *${state.customerName}*. Quiero hacer un pedido:

${itemsList}

*Total: ${formatMoney(total)}*

Entrega: ${state.deliveryMethod === 'delivery' ? 'Envío a domicilio' : 'Retiro por local'}
${state.deliveryMethod === 'delivery' ? `Dirección: ${state.address}` : ''}
${state.notes ? `Notas: ${state.notes}` : ''}`;

  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
