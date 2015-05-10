var app = angular.module('timelineApp', []);
app.controller('UserEventController', function($scope, $http) {
	
	$scope.fetchEvents = function() {

		
		FB.api('/me/posts?limit=10000', function(response) {
			var events = [];
    	for (i = 0; i < response.data.length; i++) { 
    		if (response.data[i].story && response.data[i].created_time ) {
    			fmtDate = $scope.getDate(response.data[i].created_time);
    			event =  {title:response.data[i].story, date:fmtDate , picture:response.data[i].picture, description:response.data[i].description, type:"user"};
    			events.push(event);	
    		}
    		
		}
			if ($scope.events) {
				$scope.events = $scope.events.concat(events);
			}else {
				$scope.events = events;	
			}

				$http.get("http://192.168.25.103:8080/events").success(function(response){

    			for ( i =0;i< response.data.length; i++) {
    				response.data[i].type = "other";
    				response.data[i].date = $scope.getDate(response.data[i].date);
    			}
    			if ($scope.events) {
					$scope.events = $scope.events.concat(response.data);
				}else {
					$scope.events = response.data;	
				}
				$scope.events.sort(function(a,b){
				var c = new Date(a.date);
				var d = new Date(b.date);
				return d-c;
				});
				$scope.$apply();
				});

				// serverEvents = '{"data":[{"type":"other", "title":"A","picture":"https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xfp1/v/t15.0-10/p130x130/11188847_761161560663386_126597787_n.jpg?oh=50dbde3a0df7ce600adbf9cfbb176062&oe=55C0B1F4&__gda__=1440684883_c4c5b14328d7b3311740688e4b7c75a1","date":"2015-05-05T04:13:05+0000"},{"type":"other","title":"B","picture":"https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xfp1/v/t15.0-10/p130x130/11188847_761161560663386_126597787_n.jpg?oh=50dbde3a0df7ce600adbf9cfbb176062&oe=55C0B1F4&__gda__=1440684883_c4c5b14328d7b3311740688e4b7c75a1","date":"2015-05-05T03:13:05+0000"},{"type":"other", "title":"C","picture":"https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xfp1/v/t15.0-10/p130x130/11188847_761161560663386_126597787_n.jpg?oh=50dbde3a0df7ce600adbf9cfbb176062&oe=55C0B1F4&__gda__=1440684883_c4c5b14328d7b3311740688e4b7c75a1","date":"2015-05-05T02:13:05+0000"},{"type":"other", "title":"D","picture":"https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xfp1/v/t15.0-10/p130x130/11188847_761161560663386_126597787_n.jpg?oh=50dbde3a0df7ce600adbf9cfbb176062&oe=55C0B1F4&__gda__=1440684883_c4c5b14328d7b3311740688e4b7c75a1","date":"2015-05-05T01:13:05+0000"}]}';
		});
		
		var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		$scope.getDate = function(dateStr) {
			date = new Date(dateStr);

			return date.getDate() + " " + months[date.getMonth()] +" "+date.getFullYear();
		};
		
		$('#cd-timeline').show();


	};
});