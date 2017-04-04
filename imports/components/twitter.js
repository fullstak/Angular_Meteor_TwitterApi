import angular from "angular"
import angularMeteor from "angular-meteor"
import template from "./twitter.html"

class TwitterListCtrl{
    constructor($scope, TwitterService){
        console.log("Component INIT!!")
        this.scope = $scope;
        this._twitterService = TwitterService;
        this.followers = this._twitterService.followers;
        this.selectedFollowers = {
            data: []
        }
        this.dmCounter = 0;
        this.message = {
            messageType: "directmessage",
            messageDM: "",
            messageTweet: ""
        }
        this.getFollowers();
    }
    postDirectMessage(id){
        let ref = this;
        this.dmCounter++;
        Meteor.call("sendDirectMessage", {user_id: id, text: this.message.messageDM}, function(err, response){
            console.log("Redirect Message Posted "+ JSON.stringify(response));
            ref.postDM();
        });
    }
    postDM(){
        let totalMsg = this.selectedFollowers.data.length;
        console.log(this.dmCounter< this.totalMsg)
        if(this.dmCounter < totalMsg){
            setTimeout(()=>{
                this.postDirectMessage(this.selectedFollowers.data[this.dmCounter].id);
            }, 1000)
        }
        else{
            console.log("All Messages Sent !!!");
        }
    }
    postTweet(){
        Meteor.call("postTweet", {screen_name: '', status: this.message.messageTweet}, function(err, response){
            console.log("Tweet Posted "+ JSON.stringify(response));
        });
    }
    postMessage(event){
        event.preventDefault();
        if(this.message.messageType === "directmessage" && this.message.messageDM.length >0){
            this.dmCounter = 0;
            this.postDM();
        }else if(this.message.messageTweet.length >0){
            this.postTweet();
        }
    }
    getFollowers(){
        this._twitterService.getFollowers({screen_name:''},this.scope);
    }
    updateSelectedList(followerObject, action){
        if(action === "add"){
            this.selectedFollowers.data.push(followerObject);
        }
        else{
            for(let i = 0;i<this.selectedFollowers.data.length;i++){
                if(this.selectedFollowers.data[i].id === followerObject.id){
                    this.selectedFollowers.data.splice(i,1);
                }
            }
        }
    }
    isSelected(followerObject){
        if(followerObject.checked === true){
            this.updateSelectedList(followerObject, "add");
        }
        else{
            this.updateSelectedList(followerObject, "remove");
        }
    }
    removeItem(event, index){
        event.preventDefault();
        this.selectedFollowers.data[index].checked = false;
        this.selectedFollowers.data.splice(index,1);
    }
}

export default angular.module("twitterCtrl",[
    angularMeteor
]).component("twitterList",{
    templateUrl: template,
    controller: ["$scope","TwitterService",TwitterListCtrl]
})