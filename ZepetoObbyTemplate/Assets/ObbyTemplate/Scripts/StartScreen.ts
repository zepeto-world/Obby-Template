import { GameObject } from 'UnityEngine';
import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './GameSettings';

export default class StartScreen extends ZepetoScriptBehaviour {

    public mainButton: Button;

    Start() {
        this.mainButton.onClick.AddListener(() => {
            this.OnClick();
        });
    }

    OnClick(): void {
        GameSettings.instance.CloseStartAlert();
        GameObject.Destroy(this.gameObject);
        GameSettings.instance.canWin = true;
    }

}