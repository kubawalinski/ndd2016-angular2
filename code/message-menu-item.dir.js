class MessageMenuItemDir {
    constructor() {
        this.restrict = "EA";
        this.templateUrl = "/app/messages/message-menu-item.html";
        this.scope = { };
        this.controller = "MessageMenuItemCtrl";
        this.controllerAs = "vm";
        this.bindToController = true;
    }

    static directiveFactory() {
        MessageMenuItemDir.instance = new MessageMenuItemDir();
        return MessageMenuItemDir.instance;
    }
}

MessageMenuItemDir.directiveFactory.$inject = [];
MessageMenuItemDir.instanceNumber = 0;
MessageMenuItemDir.angularName = "messageMenuItem";
MessageMenuItemDir.angularType = "directive";

export default MessageMenuItemDir;
