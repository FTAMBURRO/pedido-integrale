import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { OrderState } from "@shared/schema";
import { User, MapPin, NotebookPen } from "lucide-react";

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
          <RadioGroup 
            defaultValue="pickup" 
            value={state.deliveryMethod}
            onValueChange={(val) => dispatch({ type: 'SET_FIELD', field: 'deliveryMethod', value: val })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="font-normal cursor-pointer">Retiro por local</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="font-normal cursor-pointer">Envío a domicilio</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className={state.deliveryMethod === 'delivery' ? 'animate-in fade-in slide-in-from-top-2 duration-300' : 'hidden'}>
        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2 text-muted-foreground font-medium">
            <MapPin className="w-4 h-4" /> Dirección de envío
          </Label>
          <Input 
            id="address"
            placeholder="Calle, Número, Piso, Depto..."
            value={state.address}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'address', value: e.target.value })}
            className="bg-muted/30 border-border/50 focus:bg-white transition-all h-11"
          />
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
