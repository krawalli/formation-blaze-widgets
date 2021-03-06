Template.DatetimeInput.events( genericEvents( ['input', 'propertychange', 'paste', 'change'], 'input' ) );

Template.DatetimeInput.rendered = function(){
  var self = this;

  var el = self.$(".datetimepicker");
  if ( $(el).datetimepicker ){
    self.$(".datetimepicker").datetimepicker({
      defaultDate: new Date(),
      minDate: new Date( self.data.field.min ),
      maxDate: new Date( self.data.field.max ),
    });
  }

  self.$(".datetimepicker").on( "dp.change", function(){
    self.$( "input" ).change();
  });

};

Template.DateInput.rendered = function(){
  var self = this;

  self.$(".datetimepicker").datetimepicker({
    format: "M/D/YYYY",
    defaultDate: new Date(),
    minDate: new Date( self.data.field.min ),
    maxDate: new Date( self.data.field.max ),

  });

  self.$(".datetimepicker").on( "dp.change", function(){
    self.$( "input" ).change();
  });

};
