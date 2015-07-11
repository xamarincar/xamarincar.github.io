angular.module('DcApp', ['ui.router']);



angular.module('DcApp').run(function($rootScope, $state) {
  // Go to start state
  $state.transitionTo('MainView');
});

angular.module('DcApp').factory('RecordHelper', function($rootScope, $http) {
  return {
    GetRecordById: function(recordId, successCallback) {
      $http.post("/WebServices/DcWebService.asmx/GetRecordById", {recordId: recordId}).success(function (data) { successCallback(data.d); });
    },

    GetAllRecords: function(successCallback) {
      $http.post("/WebServices/DcWebService.asmx/GetAllRecords", {}).success(function (data) { successCallback(data.d); });
    }
  };
});

angular.module('DcApp').directive('dcFileUpload', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: function($scope) {
    },
    template: '<div>'
              + '<div id="dc_uploader">Your browser doesn\'t have Flash, Silverlight or HTML5 support.</div>'
            + '</div>',
    link: function($scope) {
      $("#dc_uploader").pluploadQueue({
        // General settings
        runtimes : 'html5,flash,silverlight,html4',
        url : "/PLUploadHandler.ashx",
         
        chunk_size : '1mb',
        rename : true,
        dragdrop: true,
         
        filters : {
            // Maximum file size
            max_file_size : '10mb',
            // Specify what files to browse for
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"}
            ]
        },
 
 
        // Flash settings
        flash_swf_url : '/Scripts/plupload/js/Moxie.swf',
     
        // Silverlight settings
        silverlight_xap_url : '/Scripts/plupload/js/Moxie.xap'
      });

      var uploader = $("#dc_uploader").pluploadQueue();

    }
  };  
});