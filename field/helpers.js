Template.dxField.helpers({
  instanceSummary: function( value ){
    if ( value === undefined || value === null  ){
      return '';
    }

    if ( value instanceof Array ){
      var valueArray = [];

      for ( var i=0; i < value.length; i++ ){
        if ( value[ i ].__name__ === "ModelInstance" ){
          valueArray.push( value[ i ].summary() );
        } else {
          valueArray.push( value[ i ] );
        }
      }

      return valueArray.join( ', ' );
    } else if ( value.__name__ === "ModelInstance" ){
      return value.summary();
    } else if ( value instanceof Formation.Time ){
      return value.toString();
    } else {
      return value;
    }
  },
})


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


UI.registerHelper( "withAttributes", function( options ){
  var context = Template.currentData();

  if ( typeof( options ) !== "object" ) return context;
  if ( typeof( options.hash ) !== "object" ) return context;

  context = options.hash.context || context;
  if ( typeof( context ) === "object" ){
    context.attributes        = context.attributes  || {};
    context.attributes.class  = options.hash.class  || context.attributes.class;
    context.attributes.name   = options.hash.name   || context.attributes.name;
    context.attributes.role   = options.hash.role   || context.attributes.role;
    context.attributes.id     = options.hash.id     || context.attributes.id;
    context.attributes.type   = options.hash.type   || context.attributes.type;
    context.attributes.horizontal   = typeof( options.hash.horizontal ) === "boolean" ? options.hash.horizontal : context.attributes.horizontal;
  }
  return context;
});


UI.registerHelper( "setAttributes", function( options ){
  if ( typeof( options ) !== "object" ) return;
  if ( typeof( options.hash ) !== "object" ) return;

  var field = options.hash.context;
  delete options.hash.context;
  return field.setAttributes( options.hash );
});
