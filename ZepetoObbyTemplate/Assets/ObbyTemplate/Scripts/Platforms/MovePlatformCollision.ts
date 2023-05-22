import { CharacterController, Collider } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class MovePlatformCollision extends ZepetoScriptBehaviour {
    OnTriggerEnter ( collider: Collider ) {
        let _player = collider.GetComponent<ZepetoCharacter>();
        // When the player touches the platform, they become a child of the platform to maintain the movement and prevent the players from sliding and falling
        if ( _player )
        {
            _player.transform.SetParent( this.transform );
        }
    }

    OnTriggerExit ( collider: Collider ) {
        let _player = collider.GetComponent<ZepetoCharacter>();
        // Once the player leaves the platform, they return to the main state, with no parents
        if ( _player )
        {
            _player.transform.parent = null;
        }
    }
}