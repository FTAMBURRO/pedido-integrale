import { Product } from "@shared/schema";
import { formatMoney } from "@/utils/money";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface RowItemProps {
  product: Product;
  quantity: number;
  flavors?: string[];
  flavorQuantities: Record<string, number>;
  onIncrement: () => void;
  onDecrement: () => void;
  onFlavorIncrement: (flavor: string) => void;
  onFlavorDecrement: (flavor: string) => void;
}

export function RowItem({ product, quantity, flavors, flavorQuantities, onIncrement, onDecrement, onFlavorIncrement, onFlavorDecrement }: RowItemProps) {
  const hasFlavors = !!flavors?.length;
  const totalFlavorQty = hasFlavors
    ? Object.values(flavorQuantities).reduce((a, b) => a + b, 0)
    : 0;
  const effectiveQty = hasFlavors ? totalFlavorQty : quantity;
  const hasQuantity = effectiveQty > 0;

  return (
    <div
      className={cn(
        "group flex flex-col py-4 border-b border-border last:border-0 transition-all duration-200",
        !hasQuantity && "opacity-60 hover:opacity-100"
      )}
    >
      {/* Fila principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0 mb-1 sm:mb-0 pr-4">
          <h3 className={cn(
            "font-medium text-base sm:text-lg leading-tight text-foreground transition-colors",
            hasQuantity && "text-primary font-semibold"
          )}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            {formatMoney(product.price)}{hasFlavors ? " c/u" : ""}
          </p>
        </div>

        {/* Contador simple (sin sabores) */}
        {!hasFlavors && (
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="sm:hidden font-mono text-sm font-medium">
              {quantity > 0 && (
                <span className="text-primary mr-2">
                  Sub: {formatMoney(product.price * quantity)}
                </span>
              )}
            </span>
            <div className="flex items-center bg-secondary/50 rounded-full p-1 border border-border/50">
              <Button variant="ghost" size="icon"
                className="h-8 w-8 rounded-full hover:bg-white hover:text-destructive hover:shadow-sm transition-all"
                onClick={onDecrement} disabled={quantity === 0}>
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-10 text-center font-mono font-bold text-lg tabular-nums leading-none">{quantity}</div>
              <Button variant="ghost" size="icon"
                className="h-8 w-8 rounded-full hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                onClick={onIncrement}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Resumen total cuando hay sabores */}
        {hasFlavors && hasQuantity && (
          <span className="text-sm font-mono text-primary font-semibold shrink-0">
            {totalFlavorQty} ud. — Sub: {formatMoney(product.price * totalFlavorQty)}
          </span>
        )}
      </div>

      {/* Sub-contadores por sabor */}
      {hasFlavors && (
        <div className="mt-3 ml-2 space-y-2">
          {flavors!.map((flavor) => {
            const qty = flavorQuantities[flavor] || 0;
            return (
              <div key={flavor} className="flex items-center justify-between gap-2">
                <span className={cn(
                  "text-sm flex-1",
                  qty > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {flavor}
                  {qty > 0 && (
                    <span className="ml-2 text-xs font-mono text-primary">
                      ({formatMoney(product.price * qty)})
                    </span>
                  )}
                </span>
                <div className="flex items-center bg-secondary/50 rounded-full p-0.5 border border-border/50">
                  <Button variant="ghost" size="icon"
                    className="h-7 w-7 rounded-full hover:bg-white hover:text-destructive hover:shadow-sm transition-all"
                    onClick={() => onFlavorDecrement(flavor)} disabled={qty === 0}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="w-8 text-center font-mono font-bold text-base tabular-nums leading-none">{qty}</div>
                  <Button variant="ghost" size="icon"
                    className="h-7 w-7 rounded-full hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                    onClick={() => onFlavorIncrement(flavor)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
