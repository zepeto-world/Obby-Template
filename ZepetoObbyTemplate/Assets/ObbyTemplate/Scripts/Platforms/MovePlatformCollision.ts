import { CharacterController, Collider } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// This class controls  the moving platforms
export default class MovePlatformCollision extends ZepetoScriptBehaviour {
    // When the player collides, it becomes a child of the platform
    OnTriggerEnter ( collider: Collider ) {
        let _player = collider.GetComponent<ZepetoCharacter>();
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