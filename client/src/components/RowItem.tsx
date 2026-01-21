import { Product } from "@shared/schema";
import { formatMoney } from "@/utils/money";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface RowItemProps {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function RowItem({ product, quantity, onIncrement, onDecrement }: RowItemProps) {
  const hasQuantity = quantity > 0;

  return (
    <div 
      className={cn(
        "group flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-border last:border-0 transition-all duration-200",
        !hasQuantity && "opacity-60 hover:opacity-100"
      )}
    >
      {/* Product Info */}
      <div className="flex-1 min-w-0 mb-3 sm:mb-0 pr-4">
        <h3 className={cn(
          "font-medium text-base sm:text-lg leading-tight text-foreground transition-colors",
          hasQuantity && "text-primary font-semibold"
        )}>
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 font-mono">
          {formatMoney(product.price)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-4">
        {/* Mobile Price (only visible on small screens to balance layout) */}
        <span className="sm:hidden font-mono text-sm font-medium">
          {quantity > 0 && (
            <span className="text-primary mr-2">
              Sub: {formatMoney(product.price * quantity)}
            </span>
          )}
        </span>

        <div className="flex items-center bg-secondary/50 rounded-full p-1 border border-border/50">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-white hover:text-destructive hover:shadow-sm transition-all"
            onClick={onDecrement}
            disabled={quantity === 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="w-10 text-center font-mono font-bold text-lg tabular-nums leading-none">
            {quantity}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-white hover:text-primary hover:shadow-sm transition-all"
            onClick={onIncrement}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
