import { reloadable } from "./utils/tstl-utils";

print('[zf] GameMode')
@reloadable
export class GameMode{
    public static Activate(this:void)
    {
        print('[zf] GameMode.Activate')
        let eventListenerID : EventListenerID = ListenToGameEvent('npc_spawned', (event)=>{
            const hero = EntIndexToHScript(event.entindex) as CDOTA_BaseNPC;
            if(hero.IsHero())
            {
                hero.HeroLevelUp(true);
                hero.HeroLevelUp(true);
                hero.HeroLevelUp(true);
                hero.HeroLevelUp(true);
            }

            print('[zf] GameMode.Activate event npc_spawned :',event.entindex, event.game_event_listener, event.game_event_name,  event.splitscreenplayer)
        }, null);
        print('[zf] eventListenerID:' + eventListenerID)
    }
}