import { Button } from "@/components/ui/button";
import { formatMoney } from "@/utils/money";
import { ShoppingBag, Send, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface OrderSummaryBarProps {
  total: number;
  itemCount: number;
  onSend: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export function OrderSummaryBar({ total, itemCount, onSend, onClear, disabled }: OrderSummaryBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom duration-500">
      <div className="container-safe py-4 flex items-center justify-between gap-4">
        
        <div className="flex flex-col">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
            Total Estimado
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-foreground">
              {formatMoney(total)}
            </span>
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
              ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {itemCount > 0 && (
            <Button
              onClick={onClear}
              variant="outline"
              size="lg"
              className="rounded-xl px-4"
              title="Vaciar carrito"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          <Button 
            onClick={onSend}
            disabled={disabled || total === 0}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-xl px-6 sm:px-8 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaWhatsapp className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline mr-2">Enviar Pedido</span>
            <span className="sm:hidden mr-2">Pedir</span>
            <Send className="h-4 w-4" />
          </Button>
        </div>

      </div>
    </div>
  );
}
