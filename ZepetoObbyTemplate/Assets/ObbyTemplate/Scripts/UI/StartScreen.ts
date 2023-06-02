import { Button } from 'UnityEngine.UI'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import GameSettings from '../Managers/GameSettings';

// Class that controls the interactions with the start screen
export default class StartScreen extends ZepetoScriptBehaviour {

    public mainButton: Button; // button reference

    // Set the action for the button
    Start () {
        this.mainButton.onClick.AddListener( () => {
            this.OnClick();
        } );
    }
    
    //  Call to the onstart UI and hide the gameobject
    OnClick (): void {
        GameSettings.Instance.OnStartGame();
        this.gameObject.SetActive( false );
    }

}