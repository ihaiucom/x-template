import { BaseModifier, registerModifier } from "../utils/dota_ts_adapter";
import { reloadable } from "../utils/tstl-utils";


@reloadable
@registerModifier()
export class modifier_zf_xunyun extends BaseModifier
{
    static NAME = 'modifier_zf_xunyun';

    // CheckState(): Partial<Record<ModifierState, boolean>> {
    //     return {[ModifierState.FROZEN]:true};
    // }

    DeclareFunctions(): ModifierFunction[] {
        return [ModifierFunction.ON_UNIT_MOVED]
    }

    OnUnitMoved(event: ModifierUnitEvent): void {
        ApplyDamage({
            victim: event.unit,
            attacker: this.GetCaster(),
            damage: 10,
            damage_type: DamageTypes.PHYSICAL
        });
    }
}