class MessageSvc {
    constructor($http) {
        this.$http = $http;
    }

    getUserMessages() {
        return this.$http.get("/api/user-messages/");
    }

    setUserMessageAsRead(messageGuid) {
        return this.$http.post("/api/user-messages/mark-as-read/", {userMessageGUID: messageGuid, isDeleted: false});
    }

    deleteMessageForUser(messageGuid) {
        return this.$http.delete(`/api/user-messages/user-delete-message/${messageGuid}/`);
    }
}

MessageSvc.$inject = ["$http"];
MessageSvc.angularName = "MessageSvc";
MessageSvc.angularType = "service";

export default MessageSvc;
