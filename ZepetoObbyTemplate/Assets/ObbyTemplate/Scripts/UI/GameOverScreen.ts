import { SceneManager } from 'UnityEngine.SceneManagement';
import { Button } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

// Class that controls the interactions with the gameover screen
export default class GameOverScreen extends ZepetoScriptBehaviour 
{
    public retryButton: Button; // Get retry button reference

    // Start is called on the frame when a script is enabled just before any of the Update methods is called the first time
    Start() 
    {
        // We add a function to "retryButton" when we click on it
        this.retryButton.onClick.AddListener(this.RetryBtnAction);
    }

    // This method have the actions that will make the RetryButton
    RetryBtnAction(): void 
    {
        // https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html
        // Reload the scene
        SceneManager.LoadScene(SceneManager.GetActiveScene().name); 
    }
}