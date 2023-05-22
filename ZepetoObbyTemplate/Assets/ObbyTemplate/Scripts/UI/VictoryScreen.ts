import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from './GameSettings';

export default class VictoryScreen extends ZepetoScriptBehaviour {
    public resetButton: Button; //Get Reset button reference
    public nextLevelButton: Button; //Get Reset button reference

    Start () {
        this.resetButton.onClick.AddListener( this.ResetBtnAction );
        this.nextLevelButton.onClick.AddListener( () => {
            this.NextLevelBtnAction()
        } );
    }

    ResetBtnAction (): void {
        GameSettings.Instance.ResetMap();
    }

    NextLevelBtnAction (): void {
        GameSettings.Instance.NextLevel();
        this.gameObject.SetActive( false );
    }
}