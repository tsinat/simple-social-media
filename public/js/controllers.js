'use strict';

var app = angular.module('authApp');

app.controller('mainCtrl', function($scope, Auth){

    $scope.$watch(function(){
        return Auth.currentUser;
    }, function(newVal){
        $scope.currentUser = newVal;
    });

    // Auth.getProfile()
    //     .then(res => {
    //         $scope.currentUser = res.data;
    //     })
    //     .catch(res => {
    //         $scope.currentUser = null;
    //     });
    $scope.logout = () => {
        Auth.logout()
            .then(res => {
                $scope.currentUser = null;
                $state.go('home');
            })
    }
});
app.controller('homeCtrl', function($scope){
    console.log('homeCtrl');

    $scope.currentUser = 'jim';
});

app.controller('authFormCtrl', function($scope, Auth, $state){
    console.log('authFormCtrl');
    $scope.currentState = $state.current.name

    $scope.submitForm = () => {
        if($scope.currentState === 'register'){
            //register user
            if($scope.user.password !== $scope.user.password2){
                scope.user.password = '';
                scope.user.password2 = '';
                alert('passwords must match.')
            }else {
                Auth.register($scope.user)
                .then(res => {
                    return Auth.login($scope.user);
                    // $state.go('home');
                })
                .catch(res => {
                    alert(res.data.error);
                });
            }
        } else {
            //login user
            Auth.login($scope.user)
                .then(res => {
                    $state.go('home');
                })
                .catch(res => {
                    alert(res.data.error);
                })
        }

    };
})
