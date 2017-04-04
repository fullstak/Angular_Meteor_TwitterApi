import angular from "angular";
import angularMeteor from "angular-meteor";
import {Meteor} from "meteor/meteor";


class TwitterService{
    constructor(){
        this.followers = {
            data: []
        }
    }
    getFollowers(params, scope){
        let ref = this;
        Meteor.call("getFollowers",params,function(err,response){
            ref.setFollowers(response.res, scope);
        });
    }
    setFollowers(data, scope){
        this.followers.data = data;
        scope.$apply();
    }
}

export default angular.module("twitterService",[
    angularMeteor
]).service("TwitterService",TwitterService);