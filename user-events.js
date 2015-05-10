var app = angular.module('timelineApp', []);
app.controller('UserEventController', function($scope, $http) {
	
	$scope.fetchEvents = function() {
		$('#loader').show();
		
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
				$('#cd-timeline').show();
				});
				$('#loader').hide();

		});
		
		var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		$scope.getDate = function(dateStr) {
			date = new Date(dateStr);

			return date.getDate() + " " + months[date.getMonth()] +" "+date.getFullYear();
		};
		
		


	};
});