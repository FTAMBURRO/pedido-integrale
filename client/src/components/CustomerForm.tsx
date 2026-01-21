import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OrderState } from "@shared/schema";
import { User, NotebookPen } from "lucide-react";

interface CustomerFormProps {
  state: OrderState;
  dispatch: React.Dispatch<any>;
}

export function CustomerForm({ state, dispatch }: CustomerFormProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-muted-foreground font-medium">
            <User className="w-4 h-4" /> Tu Nombre <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="name"
            placeholder="Ej: María Pérez" 
            value={state.customerName}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'customerName', value: e.target.value })}
            className="bg-muted/30 border-border/50 focus:bg-white transition-all h-11"
          />
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-muted-foreground font-medium">
            Método de Entrega
          </Label>
          <div className="flex items-center space-x-2 px-3 py-2 bg-muted/30 rounded-lg border border-border/50">
            <input type="radio" id="coordinar" name="delivery" checked disabled className="cursor-not-allowed" />
            <Label htmlFor="coordinar" className="font-normal cursor-not-allowed">A coordinar</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="flex items-center gap-2 text-muted-foreground font-medium">
          <NotebookPen className="w-4 h-4" /> Notas adicionales (opcional)
        </Label>
        <Textarea 
          id="notes"
          placeholder="Aclaraciones sobre el pedido, horarios, etc."
          value={state.notes}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'notes', value: e.target.value })}
          className="bg-muted/30 border-border/50 focus:bg-white transition-all min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
}
