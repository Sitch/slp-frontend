define(function (require) {
  'use strict';

  return {
    
    parse: function(response){

      var ds = new DataStore();
      var icons = ds.get('IconCollection');
      var accounts = ds.get('AccountsCollection');
      var fileTypesCollection = ds.get('FileTypesFilterCollection');
      var account = accounts.get(response.accountID);
      var accountType = account.get('type');
      var invalidTime = (response.lastModifiedTime === 0);
      var extPos = response.name.lastIndexOf('.') + 1;
      var extension = response.name.substring(extPos);
      var fileType = response.type;

      switch(fileType){
        case "email-contact":
        case "google-contact":
          response = ContactModel.prototype.parse(response);
          response.fileTypeIcon = icons.get(fileType).get('icon');
          return response;
        case "google-drive-file":
        case "email-attachment":
        case "dropbox-file":
        case "desktop-file":
          fileTypesCollection.find(function(model){
            if(model.get('filetypes').indexOf(extension) > -1){
              return fileType = model.get('type').toLowerCase();
            }
          });
          break;
        case "gmail-email":
        case "imap-email":
        case "exchange-email":
          fileType = "email";
          break;
      }

      response.fileType = fileType;
      response.prettyType = response.type.replace(/-?(\w+)/gi, function(_, word) { return word.substr(0, 1).toUpperCase() + word.substr(1) + ' '; });
      response.prettyTime = (invalidTime) ? "" : moment(response.lastModifiedTime).fromNow();
      response.accountName = account.get('name');
      response.accountTypeName = account.get('accountTypeName');
      response.accountTypeIcon = icons.get(accountType).get('icon');
      response.fileTypeIcon = icons.get(fileType).get('icon');
      response.entityTypeIcon = icons.get(response.type).get('icon');
      response.formattedTime = (invalidTime) ? "" : moment(response.lastModifiedTime).format('MM/DD/YYYY h:mma');
      response.addToTaskURL = '/tasks/incomplete?entityUUID=' + response.uuid;
      response.url = (response.url) ? response.url : [
        '/entity/'
        , response.type
        , '/'
        , response.uuid
      ].join('');
      
      return response;
    }

  });

});
