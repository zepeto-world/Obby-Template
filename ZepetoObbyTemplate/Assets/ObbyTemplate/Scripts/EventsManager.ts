import { Action } from 'System';
import { Debug } from 'UnityEngine';
import { UnityEvent } from 'UnityEngine.Events';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class EventsManager extends ZepetoScriptBehaviour {

    public OnGameOver: Action;

    private static instance: EventsManager;

    public static GetInstance(): EventsManager {
        if (!EventsManager.instance) {
            EventsManager.instance = new EventsManager();
        }

        return EventsManager.instance;
    }

}