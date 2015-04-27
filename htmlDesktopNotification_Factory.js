'use strict';

(function(){
	function desktopNotification($window, $timeout){

		var _notificationsArr_ = [];

		
		// Checking if the broser supports Desktop Notifications
		// if it does then request permission (opens the browser dialog)
		// if it doesn't then call a error function (onErr) you pass to the method (To alert the user or use a fallback of your own)


		desktopNotification.requestPermission = function(onErr){
			if($window.Notification.permission !== 'granted'){
				$window.Notification ? $window.Notification.requestPermission() : onErr();
			}
		};


		// Will check for permission
		//
		// if it isn't 'granted' then call a error function (onErr) you pass to the method (To alert the user or use a fallback of your own)

		desktopNotification.show = function(title, body, options, onErr){
			if($window.Notification.permission === 'granted'){

				var _options_ = options ? options : {
					icon: 'https://raw.githubusercontent.com/angular/angular.js/master/images/logo/AngularJS-Shield.exports/AngularJS-Shield-small.png',
					tag: 'notification',
					lang: 'en'
				}

				_options_.body = body;

				var notification = new $window.Notification(title, _options_);


				notification.onshow = function (){ 
					$timeout(notification.close.bind(notification),  5000); 
					_notificationsArr_.push(notification);
				};

				notification.onclose = function(){
					_notificationsArr_.splice(notification, 1);
				};



			}else{
				onErr ? onErr() : console.error('desktopNotification: Desktop notifications not allowed.');
			}
		};

		desktopNotification.killAll = function(){
			_notificationsArr_.forEach(function(element, index, array){
				element.close();
				array.splice(index, 1);
			})
		};



		return desktopNotification;
	};
	angular.module('unJS', [])
		.factory('desktopNotification', desktopNotification)
})();