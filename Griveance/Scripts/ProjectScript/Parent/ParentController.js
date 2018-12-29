﻿angular.module('GR').controller('UsersController', UsersController);

function UsersController($scope, Service, DTOptionsBuilder) {

    var form = $(".student-admission-wrapper");
    $scope.ViewGetSingleParentInfoes = {};
    $scope.UserCredentialModel = {};

    $scope.Initialize = function () {
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withPaginationType('full_numbers').withDisplayLength(10)

        $scope.UserCredentialModel.UserId = "";
        $scope.UserCredentialModel.Password = "";
        Service.Post("api/Users/GetParentInfo").then(function (result) {

            // $scope.ParamUserLogin.Name = result.data.Name
            $scope.ViewGetSingleParentInfoes = result.data;
            $scope.Parents = result.data.ResultData;
            console.log(result.data);

        })

    }
    $scope.GetData = function () {
        debugger;
        var data = sessionStorage.getItem('emp-key');
        $scope.UserCredentialModel.StudentCode = data;
        var userid = sessionStorage.getItem('userid');
        $scope.UserCredentialModel.UserId = userid;
        var password = sessionStorage.getItem('Password');
        $scope.UserCredentialModel.Password = password;
        Service.Post("api/Common/GetMyGrievance", $scope.UserCredentialModel).then(function (result) {

            // $scope.ParamUserLogin.Name = result.data.Name
            $scope.ViewGetStudentInfoes = result.data;
            $scope.Student = result.data.ResultData;
            console.log(result.data);

        })

    }
    //$scope.GetInfo = function () {
    //    Service.Post("api/Grievance/GriveanceTypeInfo").then(function (result) {
    //        debugger;
    //        // $scope.ParamUserLogin.Name = result.data.Name
    //        $scope.tbl_grievance_list = result.data;
    //        $scope.Grievance = result.data.ResultData;
    //        console.log(result.data);

    //    })

    //}
    $scope.SavePost = function () {
        var data = sessionStorage.getItem('userid');
        var Password = sessionStorage.getItem('Password');
        var code = sessionStorage.getItem('emp-key');
        var email = sessionStorage.getItem('Email');
        var type = sessionStorage.getItem('Type');
        PostGr = {
            GriveanceType: $scope.GriveanceType,
            Subject: $scope.Subject,
            PostDetails: $scope.PostDetails,
            UserId: data,
            Password: Password,
            Code: code,
            Email: email,
            Type: type
        };
        Service.Post("api/Grievance/PostGrievance", JSON.stringify(PostGr)).then(function (result) {
            debugger;
            // $scope.ParamUserLogin.Name = result.data.Name

            console.log(result.data);
            if (result.data.IsSucess) {
                debugger;
                console.log(result.data);
                window.location = "./ParentGrievance"
            }
            else
            {
                window.alert('Record Not Inserted.')
                window.location = "./PostGrievance"
            }

        })
    }
    
}

