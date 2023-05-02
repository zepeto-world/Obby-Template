import { Collider, Debug, Collision } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayer } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class MovePlatformCollision extends ZepetoScriptBehaviour {
    private player: ZepetoCharacter;

    OnTriggerEnter(collider: Collider) {
        this.player = collider.GetComponent<ZepetoCharacter>();
        if (this.player) {
            Debug.Log("SETTING PARENT: " + collider.name);
            this.player.transform.SetParent(this.transform);
        }
    }
    OnTriggerExit(collider: Collider) {
        var _player = collider.GetComponent<ZepetoCharacter>();
        if (_player) {
            this.player.transform.parent = null;
            this.player = null;
        }
    }
}