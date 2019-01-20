var app = angular.module("app", []);
app.controller("MainCtrl", function ($scope, $http) {

    $scope.email = "martin.derouet0@gmail.com"
    $scope.password = "azerty"
    // We should return userId when logging (when getting token) it's hardcoded here to just give it a shot
    $scope.userId = "4"
    $scope.token = "NULL"
    $scope.contact = "NULL"
    $scope.contacts = "NULL"
    $scope.skills = "NULL"

    $scope.getToken = function () {
        var data =
            {
                email: $scope.email,
                password: $scope.password
            };

        $http.post('http://localhost:8080/secure/login', data).then(function successCallback(response) {
            $scope.token = response.data.token
            console.log(response.data)
            alert("Login success !")
        }, function errorCallback(response) {
            console.log(response)
            alert("Wrong email / password")
        });
    };

    $scope.getMyInformation = function () {


        var req = {
            method: 'GET',
            url: 'http://localhost:8080/api/contact/'+$scope.userId,
            headers: {
                'Authorization': $scope.token
            }
        }

        $http(req).then(function successCallback(response) {
            $scope.contact = response.data
            console.log($scope.contact)
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.getListContacts = function () {


        var req = {
            method: 'GET',
            url: 'http://localhost:8080/api/contact/',
            headers: {
                'Authorization': $scope.token
            }
        }

        $http(req).then(function successCallback(response) {
            $scope.contacts = response.data
            console.log($scope.contacts)
        }, function errorCallback(response) {
            console.log(response)
        });
    };


    $scope.getListSkills = function () {


        var req = {
            method: 'GET',
            url: 'http://localhost:8080/api/skill/',
            headers: {
                'Authorization': $scope.token
            }
        }

        $http(req).then(function successCallback(response) {
            $scope.skills = response.data
            console.log($scope.skills)

        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.changeMyInformations = function () {
        var newInformations =
            {
                email: $scope.contact.email,
                firstname: $scope.contact.firstname,
                lastname: $scope.contact.lastname,
                address: $scope.contact.address,
                mobilePhoneNumber: $scope.contact.mobilePhoneNumber
            };

        var req = {
            method: 'PUT',
            url: 'http://localhost:8080/api/contact/'+$scope.userId,
            headers: {
                'Authorization': $scope.token
            },
            data:newInformations
        }
        console.log(req)
        $http(req).then(function successCallback(response) {
            console.log(response.data)
            alert("Information updated successfully")
        }, function errorCallback(response) {
            console.log(response)
            alert("Wrong data entered")
        });
    };


})
