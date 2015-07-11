angular.module('DcApp').config(function ($stateProvider) {

  $stateProvider.state('MainView', {
    url: '/',
    views:
    {
      'header': {
        template: '<h1>Records list<hr/></h1>'
      },
      'content': {
        template:
              '<ul>'
                + '<li ng-repeat="record in Records">'
                    + '<a href="#/record/{{record.RecordId}}"> {{record.Title}} </a>'
                + '</li>'
            + '</ul>',
        controller: function ($scope, RecordHelper) {
          $scope.Records = null;
          RecordHelper.GetAllRecords(function(records) {
            $scope.Records = records;
          });
        }
      },
      'footer': {
        template: '<p><hr/><i>Footer</i></p>'
      },
    }
  });

  $stateProvider.state('UserView', {
    url: '/record/:id',
    views:
    {
      'header': {
        template: '<h1>Record info<hr/></h1>'
      },
      'content': {
        template:
              '<div>'
                + '<p> RecordId: {{Record.RecordId}} </p>'
                + '<p> Url: {{Record.RecordImages}} </p>'
            + '</div>',
        controller: function ($scope, $stateParams, RecordHelper) {
          var recordId = $stateParams.id;
          $scope.Record = null;
          RecordHelper.GetRecordById(recordId, function(record) {
            $scope.Record = record;
          });
        }
      },
      'footer': {
        template: '<p><hr/><i>Footer</i></p>'
      },
    }
  });

  $stateProvider.state('AddView', {
    url: '/add/',
    views:
    {
      'header': {
        template: '<h1>Add <hr/></h1>'
      },
      'content': {
        template:
              '<div>'
                + '<dc-file-upload></dc-file-upload>'
            + '</div>',
        controller: function ($scope, $stateParams, RecordHelper) {
        }
      },
      'footer': {
        template: '<p><hr/><i>Footer</i></p>'
      },
    }
  });
});