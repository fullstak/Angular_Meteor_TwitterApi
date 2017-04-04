import { Meteor } from 'meteor/meteor';
let Twit = Meteor.npmRequire("twit");
let Future = Meteor.npmRequire("fibers/future");
let twit = null;

Meteor.startup(() => {
  // code to run on server at startup
  console.log("Server Init");
  twit = twitterApiInit();
  Meteor.methods({
    postTweet: postTweet,
    getFollowers: getFollowers,
    sendDirectMessage: sendDirectMessage
  })
  
});

function twitterApiInit(){

  let twit = new Twit({
    consumer_key: 'mSlFyDSSwtRCqCiSnJl1M68Vq',
    consumer_secret: 'dSSYeuXVbqnW9IPa8QhxVQL4C3SNP3FykGRunsjeN4ptgRqeX2',
    access_token: '3246916644-KeKpziK77exdD6ichw7fI2JmtQezFLYjnX3tfZm',
    access_token_secret: 'ABJRMkGqsAgxY5QndULGVhUV0ttCL9yaPmzzBLFuAJnLl'
  });
  
  return twit;

}
function postTweet(params){
  let future = new Future();
  twit.post("statuses/update",params, function(err,data,response){
    future.return({
      err: err,
      res: data
    })
  })
  return future.wait();
}

function getFollowers(params){
  let future = new Future();
  twit.get("followers/list",params, function(err,data,response){
    let array = new Array();
    data.users.forEach(function(object){
      let obj = {
        screen_name: object.screen_name,
        id: object.id,
        name: object.name,
        profile_image: object.profile_image_url
      }
      array.push(obj);
    });
    future.return({
      err: err,
      res: array
    })
  })
  return future.wait();
}

function sendDirectMessage(params){
  let future = new Future();
  twit.post("direct_messages/new",params, function(err,data,response){
    future.return({
      err: err,
      res: data
    })
  })
  return future.wait();
}


