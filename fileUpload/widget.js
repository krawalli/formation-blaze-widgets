function err( msg ){ throw new Error( msg ) };



var hiddenFields = new ReactiveVar;
var progressPercent = new ReactiveVar;
var currentFile = new ReactiveVar;

Template.FileInput.rendered = function(){
  var self = this;

  var policyOptions = {
    path: this.data.field.uploadTo,
    type: this.data.field.type,
    bucket: this.data.field.bucket,
  };

  var result;
  Meteor.call( "S3GeneratePolicy", policyOptions, function( err, value ){
    hiddenFields.set( value );
  })

  currentFile.set( this.data.toDOM() );
};



Template.FileInput.helpers({
  'hiddenFields': function(){
    var f = hiddenFields.get();
    var result = [];

    if ( f ){
      for ( field in f ){
        result.push({ name: field, value: f[ field ] })
      }
    }
    return result;
  },
  'uploadURL': function(){
    var f = hiddenFields.get();
    if ( f ) return "http://" + f.bucket + ".s3.amazonaws.com/";
  },
  'progress': function(){
    return progressPercent.get();
  },
  'currentFile': function(){
    return currentFile.get();
  }
})



Template.FileInput.events({
  // for client-side upload
  'click .btn-upload' : function( event, template ){
    event.preventDefault();
    var self = this;

    var bucket = "http://" + this.field.bucket + ".s3.amazonaws.com/";
    var file = template.find( "input[type=file]" ).files[0];
    var filename = file.name;
    var form = template.find("form");
    var formData = new FormData( form );
    var post = new XMLHttpRequest();

    post.upload.onprogress = function( oProgress ){
      if ( oProgress.lengthComputable ){
        var prog = Math.ceil(( oProgress.position / oProgress.totalSize * 100 ));
        progressPercent.set( prog + "%" );
      }
    };

    post.onload = function( oEvent ) {
      if ( post.status == 200 || post.status == 201 || post.status == 204 ) {
        progressPercent.set( undefined );
        self.value = bucket + self.field.uploadTo + filename;
        self.validate();
        currentFile.set( self.value );
      } else {
        progressPercent.set( "There was a problem uploading your file" );
      }
    };

    post.open( "POST", bucket, true );
    post.send( formData );
  }
});
