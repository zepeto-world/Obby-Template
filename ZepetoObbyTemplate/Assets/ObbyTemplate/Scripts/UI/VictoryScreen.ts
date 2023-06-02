import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from '../Managers/GameSettings';


// Class that controls the interactions with the victory screen
export default class VictoryScreen extends ZepetoScriptBehaviour {
    public resetButton: Button; //Get Reset button reference
    public nextLevelButton: Button; //Get Reset button reference

    // Set the buttons action
    Start () {
        this.resetButton.onClick.AddListener( this.ResetBtnAction );
        this.nextLevelButton.onClick.AddListener( () => {
            this.NextLevelBtnAction()
        } );
    }

    // Call to reload the scene
    ResetBtnAction (): void {
        GameSettings.Instance.ResetMap();
    }

    // Call to instance the next level and disable this gameobject
    NextLevelBtnAction (): void {
        GameSettings.Instance.NextLevel();
        this.gameObject.SetActive( false );
    }
}