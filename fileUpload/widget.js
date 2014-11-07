function err( msg ){ throw new Error( msg ) };

Template.FileInput.events({
  // 'click .btn-upload' : function( event, template ){
  //   var self = this;
  //   event.preventDefault();
  //   var file = self.fromDOM( template.find( 'input' ).files[0] );
  //   var uploadTo = self.field.uploadTo;
  //
  //   var reader = new FileReader;
  //   var fileData = {
  //     name: file.name,
  //     size: file.size,
  //     type: file.type
  //   };
  //
  //   reader.onload = function () {
  //     fileData.data = new Uint8Array( reader.result );
  //     self.value = Meteor.call( "S3upload", fileData, uploadTo, function( error, result ){
  //       if ( error ){
  //         console.log( error );
  //       } else {
  //         self.value = result;
  //         self.validate();
  //       }
  //     });
  //   };
  //
  //   reader.readAsArrayBuffer( file );
  // },

  // for client-side upload
  'click .btn-upload' : function( event, template ){
    event.preventDefault();
    var self = this;
    var file = self.fromDOM( template.find( 'input' ).files[0] );
    var reader = new FileReader;
    var fileData;

    // after file reader has read data from field
    reader.onloadend = function(){
      fileData = reader.result.split(',');
      fileType = fileData[0].split(':')[1].split(';')[0];
      fileData = fileData[1];

      Meteor.call( "S3GeneratePolicy", self.field.uploadTo, function( err, requestOb ){
        if ( err ) console.log( err );
        if ( err ) throw new Error( "Please check the file you've selected to upload" );

        var bucket = Formation.Settings.S3.bucket || err( "Please set Formation.Settings.S3.bucket" );
        var url = "http://" + bucket + ".s3.amazonaws.com/";

        // create boundary
        var bound = new Date;
        bound = bound.getTime();
        bound = '--' + bound;

        var postBody = [ bound ];
        var form = {
          "key": self.field.uploadTo,
          "acl": requestOb.acl,
          "Content-Type": fileType,
        	"x-amz-algorithm": requestOb.algorithm,
        	"x-amz-credential": requestOb.credential,
        	"x-amz-date": requestOb.date,
        	"Policy": requestOb.policy64,
        	"x-amz-signature": requestOb.signature,
        };


        // create headers
        postHeaders = {
          "Content-Type": "multipart/form-data; boundary=" + bound,
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          // "Accept-Language": "en-US,en;q=0.5",
          // "Content-Length": file.size
        };

        // add each field in form
        for ( field in form ){
          postBody.push( "Content-Disposition: form-data; name=\"" + field + "\"",
                          '',
                          form[ field ],
                          bound );
        }

        // add data
        postBody.push( "Content-Disposition: form-data; name=\"file\"; filename=\"" + file.name + "\"" );
        postBody.push( "Content-Type: " + fileType, '' );
        postBody.push( fileData );
        postBody.push( bound + "--", '' );

        var bodyString = postBody.join( "\r\n" );

        // post to S3
        HTTP.post( url, {
          headers: postHeaders,
          content: bodyString
        }, function( error, result ){
          if ( error ) console.log( error );
          if ( result ) console.log( result );
        })
      })
    }

    reader.readAsDataURL( file );
  }
});
