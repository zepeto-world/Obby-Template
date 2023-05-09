import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './GameSettings';

export default class StartScreen extends ZepetoScriptBehaviour 
{

    public mainButton: Button;

    Start() {
        this.mainButton.onClick.AddListener(() => {
            this.OnClick();
        });
    }

    OnClick(): void {
        GameSettings.Instance.OnStartGame();
        this.gameObject.SetActive(false);
    }

}