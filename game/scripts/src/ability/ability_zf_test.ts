import { modifier_zf_xunyun } from "../modifiers/modifier_zf_xunyun";
import { BaseAbility, registerAbility } from "../utils/dota_ts_adapter";
import { reloadable } from "../utils/tstl-utils";

@reloadable
@registerAbility()
export class ability_zf_test extends BaseAbility
{
    // OnAbilityPhaseStart
    OnAbilityPhaseStart(): boolean {
        print('[zf_ability] ability_zf_test', 'OnAbilityPhaseStart 当施放时间开始时，资源还没有用完。如果转换成功，则返回true；如果转换失败，则返回false，无参数')
        return true;
    }

    OnAbilityPinged(playerId: PlayerID, ctrlHeld: boolean): void {
        
        print('[zf_ability] ability_zf_test', 'OnAbilityPinged 由于任何原因取消了演出时间。没有返回类型，没有参数。')
    }

    OnAbilityPhaseInterrupted(): void {
        print('[zf_ability] ability_zf_test', 'OnAbilityPhaseInterrupted 由于任何原因取消了演出时间。没有返回类型，没有参数。')
        
    }

    OnAbilityUpgrade(upgradeAbility: object): void {
        print('[zf_ability] ability_zf_test', 'OnAbilityUpgrade 由于任何原因取消了演出时间。没有返回类型，没有参数。')
        
    }

    OnSpellStart(): void {
        print('[zf_ability] ability_zf_test', 'OnSpellStart 2222 当施法时间结束时，资源已经消耗殆尽——大多数技能开始在这个功能中工作。没有返回类型，没有参数。')

        const point = this.GetOrigin();
        print('[zf_ability] point', point.x, point.y, point.z);

        const units = FindUnitsInRadius(DotaTeam.NOTEAM, point, null, 500, UnitTargetTeam.ENEMY, UnitTargetType.ALL, UnitTargetFlags.NONE, FindOrder.FARTHEST, false);
        print('[zf_ability] units.length', units.length);

        for(let unit of units){
            print('[zf_ability] unit', unit.GetName());
            let project:CreateTrackingProjectileOptions = {
                Ability: this,
                Source: this.GetCaster(),
                Target:unit,
                iVisionRadius: 100000,
                iMoveSpeed: 200,
                bDodgeable: false,
                EffectName: 'particles/neutral_fx/pine_cone_seed_shot_tracking.vpcf',
                // EffectName: 'particles/dev/library/base_tracking_projectile.vpcf',
                bVisibleToEnemies: true,
                bDrawsOnMinimap: true,

            };
            ProjectileManager.CreateTrackingProjectile(project);
    
        }
    }

    // OnProjectileThink(location: Vector): void {
        
    //     print('[zf_ability] ability_zf_test', 'OnProjectileThink 如果这个能力创造了一个弹丸，这个函数将在弹丸行进时被多次调用。vLocation是当前射弹位置。无返回类型。')
    //     return  super.OnProjectileThink(location);
    // }

    OnProjectileHit(target: CDOTA_BaseNPC, location: Vector): boolean | void {
        print('[zf_ability] ability_zf_test', 'OnProjectileHit 当弹丸达到最大距离或与符合其目标类型的NPC碰撞时。如果hTarget为null，则表示该弹丸已过期。Return true摧毁粒子，Return false继续发射（这适用于可以击中多个NPC的线性射弹，如Dragon Slave。如果射弹已经到达终点，即使通过false，它也会过期）')
        // return  super.OnProjectileHit(target, location);

        const hitEffectId = ParticleManager.CreateParticle('models/heroes/phantom_assassin_persona/debut/particles/pa_badguy/pa_badguy_bladeimpact.vpcf', ParticleAttachment.POINT_FOLLOW, target );
        ParticleManager.SetParticleControl(hitEffectId, 3, target.GetOrigin());
        Timers.CreateTimer(3, ()=>{
            ParticleManager.DestroyParticle(hitEffectId, true);
        });

        const damage: ApplyDamageOptions = {
            victim: target,
            attacker: this.GetCaster(),
            damage: 100,
            damage_type: DamageTypes.MAGICAL
        };
        ApplyDamage(damage);
        target.AddNewModifier(this.GetCaster(), this, modifier_zf_xunyun.NAME, {
            duration:10
        })
        return false;
    }


    // OnProjectileThink_ExtraData(location: Vector, extraData: object): void {
        
    //     print('[zf_ability] ability_zf_test', 'OnProjectileThink_ExtraData ')
    //     super.OnProjectileThink_ExtraData(location, extraData);
    // }

    // OnProjectileHit_ExtraData(target: CDOTA_BaseNPC, location: Vector, extraData: object): boolean | void {
        
    //     print('[zf_ability] ability_zf_test', 'OnProjectileHit_ExtraData ')
    //     super.OnProjectileHit_ExtraData(target, location, extraData);
    // }

    // OnProjectileThinkHandle(projectileHandle: ProjectileID): void {
        
    //     print('[zf_ability] ability_zf_test', 'OnProjectileThinkHandle ')
    //     super.OnProjectileThinkHandle(projectileHandle);
    // }
    
    // OnProjectileHitHandle(target: CDOTA_BaseNPC, location: Vector, projectileHandle: ProjectileID): boolean | void {
        
    //     print('[zf_ability] ability_zf_test', 'OnProjectileHitHandle ')
    //     super.OnProjectileHitHandle(target, location, projectileHandle);
    // }

    GetIntrinsicModifierName(): string {
        let name = super.GetIntrinsicModifierName();
        print('[zf_ability] ability_zf_test', 'GetIntrinsicModifierName 返回此技能被动添加的修饰符的“modifier_name”。', name)
        return name;
    }

    OnChannelFinish(interrupted: boolean): void {
        
        print('[zf_ability] ability_zf_test', 'OnChannelFinish 当通道完成时，bInterrupted参数通知通道是否完成。无返回类型', interrupted)
    }

    OnUpgrade(): void {
        
        print('[zf_ability] ability_zf_test', 'OnUpgrade 当能力升级时。没有参数，没有返回类型。 ')
    }

}