import angular from "angular"
import angularMeteor from "angular-meteor"

import twitter from "../imports/components/twitter"
import twitterService from "../imports/api/twitterService"

angular.module("twitterapp",[
  angularMeteor,
  twitter.name,
  twitterService.name
])