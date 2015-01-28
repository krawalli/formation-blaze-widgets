Package.describe({
  name: "quietcreep:formation-blaze-widgets",
  summary: "Blaze-based HTML widgets for meteor-formation",
  version: "2.0.0",
  git: "http://github.com/quietcreep/formation-blaze-widgets",
  documentation: null,
});


Package.onUse( function( api ) {

  api.versionsFrom( 'METEOR@0.9.2.2' );

  var both = [ 'client', 'server' ];

  api.use([ 'quietcreep:formation-core@2.0.0' ]);
  api.imply([ 'quietcreep:formation-core@2.0.0' ]);

  api.use( 'tsega:bootstrap3-datetimepicker@3.1.3_3', 'client' );
  api.imply( 'tsega:bootstrap3-datetimepicker@3.1.3_3', 'client' );

  api.use([ 'templating', 'ui', 'tracker', 'reactive-var' ], 'client' );

  //// fields ///////////////////////
  var fields = [
    'boolean',
    'char',
    'choice',
    'date',
    'datetime',
    'email',
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
