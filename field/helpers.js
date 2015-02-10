
var isSelected = function( value, choice, selectedString ){
  var choiceClean = choice.__name__ === "ModelInstance" ? choice._id : choice;

  if ( value instanceof Array ){
    for ( var i=0; i < value.length; i++ ){
      if ( value[ i ] === choiceClean ) return selectedString;
    }
  } else {
    if ( value == choiceClean ) return selectedString;
  }
};



UI.registerHelper( "selected", function( value ){
  return isSelected( value, this, "selected" );
});


UI.registerHelper( "checked", function( value ){
  return isSelected( value, this, "checked" );
});

UI.registerHelper( "checkboxed", function( value ){
  if ( value ) return "checked";
});


UI.registerHelper( "setAttributes", function( options ){
  if ( typeof( options ) !== "object" ) return;
  if ( typeof( options.hash ) !== "object" ) return;

  var field = options.hash.context;
  delete options.hash.context;
  return field.setAttributes( options.hash );
});
