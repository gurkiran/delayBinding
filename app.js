var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', function($scope){
  $scope.customers = [
      {
          name : 'Gurkiran',
          url : 'www.google.com'
      },
      {
          name : 'akash',
          url : 'www.google.com'
      }
  ]
}]);

var delayBindWithCompile = ['$interpolate', function ($interpolate){

    var compile = function(tElem, tAttrs){
//        console.log('In compile');
        var interpolateFunc  = $interpolate(tAttrs.delayBind);
        tAttrs.$set('delayBind', null);

        return {
            pre : function(scope, elem , attrs){
//                console.log('In pre link '+ elem[0].tagName);
            },
            post : function(scope, elem, attrs){
//                console.log('In post link '+ elem[0].tagName);
                elem.on(attrs.trigger, function(event){
                    var attr = attrs.attribute,
                        val = interpolateFunc(scope);

                    console.log(attr);
                    console.log(val);

                    if(attr && !elem.attr(attr)){
                        elem.attr(attr, val);
                    }
                });
            }
        };
    };


    return{
        restrict : 'A',
        compile : compile
    }

 }];

app.directive('delayBind', delayBindWithCompile);
