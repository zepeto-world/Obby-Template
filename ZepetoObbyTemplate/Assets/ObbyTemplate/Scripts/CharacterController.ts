import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SpawnInfo, ZepetoPlayers, LocalPlayer, CharacterInfo, ZepetoPlayer } from 'ZEPETO.Character.Controller';
import { WorldService } from 'ZEPETO.World';

// This class spawns the player
export default class CharacterController extends ZepetoScriptBehaviour {
    // Create an instance of the player using the id;
    SpawnCharacter () {
        ZepetoPlayers.instance.CreatePlayerWithUserId( WorldService.userId, new SpawnInfo(), true );
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener( () => {
            let _player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
        } );
    }
}