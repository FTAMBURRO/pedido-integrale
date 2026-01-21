import { useReducer } from "react";
import { useProducts } from "@/hooks/use-products";
import { OrderAction, OrderState } from "@shared/schema";
import { RowItem } from "@/components/RowItem";
import { OrderSummaryBar } from "@/components/OrderSummaryBar";
import { CustomerForm } from "@/components/CustomerForm";
import { generateWhatsAppLink } from "@/utils/whatsapp";
import { Loader2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialState: OrderState = {
  items: {},
  customerName: "",
  deliveryMethod: "pickup",
  address: "",
  notes: "",
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: (state.items[action.id] || 0) + 1,
        },
      };
    case 'DECREMENT':
      const currentQty = state.items[action.id] || 0;
      if (currentQty <= 0) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: Math.max(0, currentQty - 1),
        },
      };
    case 'SET_QTY':
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: Math.max(0, action.qty),
        },
      };
    case 'RESET':
      return { ...state, items: { ...state.items, [action.id]: 0 } };
    case 'CLEAR_ALL':
      return { ...state, items: {} };
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

export default function PedidoPage() {
  const { data: products, isLoading } = useProducts();
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { toast } = useToast();

  if (isLoading || !products) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-muted-foreground animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="font-medium">Cargando catálogo...</p>
        </div>
      </div>
    );
  }

  // Group products by category
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Calculate totals
  const total = products.reduce((acc, product) => {
    const qty = state.items[product.id] || 0;
    return acc + (product.price * qty);
  }, 0);
  
  const itemCount = Object.values(state.items).reduce((a, b) => a + b, 0);

  const handleSend = () => {
    if (!state.customerName.trim()) {
      toast({
        title: "Falta información",
        description: "Por favor completá tu nombre para poder enviar el pedido.",
        variant: "destructive",
      });
      document.getElementById("name")?.focus();
      return;
    }
    
    if (state.deliveryMethod === 'delivery' && !state.address.trim()) {
      toast({
        title: "Falta dirección",
        description: "Para envíos a domicilio necesitamos una dirección.",
        variant: "destructive",
      });
      document.getElementById("address")?.focus();
      return;
    }

    const link = generateWhatsAppLink(state, products, total);
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-border">
        <div className="container-safe py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">IntegraLe</h1>
            <p className="text-sm text-muted-foreground">Pedido por WhatsApp</p>
          </div>
        </div>
      </header>

      <main className="container-safe py-8 space-y-12">
        {/* Customer Form */}
        <section>
          <h2 className="text-lg font-semibold mb-4 px-1">Tus Datos</h2>
          <CustomerForm state={state} dispatch={dispatch} />
        </section>

        {/* Product List */}
        <section className="space-y-12">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {category}
                </h2>
                <div className="h-px bg-border flex-1" />
              </div>

              <div className="bg-white rounded-none sm:rounded-2xl divide-y divide-border/60">
                {products
                  .filter((p) => p.category === category)
                  .map((product) => (
                    <RowItem
                      key={product.id}
                      product={product}
                      quantity={state.items[product.id] || 0}
                      onIncrement={() => dispatch({ type: 'INCREMENT', id: product.id })}
                      onDecrement={() => dispatch({ type: 'DECREMENT', id: product.id })}
                    />
                  ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <OrderSummaryBar 
        total={total} 
        itemCount={itemCount} 
        onSend={handleSend}
      />
    </div>
  );
}
