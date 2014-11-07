Package.describe({
  name: "quietcreep:formation-blaze-widgets",
  summary: "Blaze-based HTML widgets for meteor-formation",
  version: "1.0.2",
  // git: "http://github.com/quietcreep/meteor-formation"
});


// Npm.depends({
//   knox: "0.8.5"
// });


Package.onUse( function( api ) {

  api.versionsFrom( 'METEOR@0.9.2.2' );

  var both = [ 'client', 'server' ];

  api.use([ 'quietcreep:formation-core@1.0.0' ]);
  api.imply([ 'quietcreep:formation-core@1.0.0' ]);

  api.use([ 'templating', 'ui', 'tracker' ], 'client' );

  //// fields ///////////////////////
  var fields = [
    'boolean',
    'char',
    'choice',
    'date',
    'datetime',
    'email',
    'fileUpload',
    'modelChoice',
    'number',
    'password',
    'slug',
    'time',
    'url'
  ];


  api.addFiles( 'field/widgets.html', 'client' );
  api.addFiles( 'field/widgets.js', 'client' );
  api.addFiles( 'field/helpers.js', 'client' );
  api.addFiles( 'field/extras.html', 'client' );
  api.addFiles( 'field/extras.js', 'client' );

  for ( var i=0; i < fields.length; i++ ){
    api.addFiles( ''+ fields[ i ] +'/widget.html', 'client' );
    api.addFiles( ''+ fields[ i ] +'/widget.js', 'client' );
  }

});


Package.onTest( function( api ) {
  // api.use( 'tinytest' );
  // api.use( 'quietcreep:formation' );
  // api.addFiles( 'quietcreep:formation-tests.js' );
});
