import { Collider } from 'UnityEngine';
import { ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// This class controls the moving platforms
export default class MovingPlatformCollision extends ZepetoScriptBehaviour {

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerEnter.html
    // This event is fired when the player reaches the moving platform
    OnTriggerEnter(collider: Collider) {

        // Obtain the ZepetoCharacter component from the collider that activates the trigger
        let _player = collider.GetComponent<ZepetoCharacter>();

        // Check if the variable "_player" is not null
        if (_player) {

            // We set this transform like parent of the "_player"
            // This is done to keep player positions related to the platform
            _player.transform.SetParent(this.transform);
        }
    }

    // https://docs.unity3d.com/ScriptReference/Collider.OnTriggerExit.html
    // This event is fired when the player leaves the moving platform
    OnTriggerExit(collider: Collider) {

        // Obtain the ZepetoCharacter component from the collider that activates the trigger
        let _player = collider.GetComponent<ZepetoCharacter>();

        // Check if the variable "_player" is not null
        if (_player) {

            // We set the parents of the "_player" on null
            // By unparenting the player from the mobile platform, he can move freely again
            _player.transform.parent = null;
        }
    }
}