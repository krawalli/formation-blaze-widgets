

Template.dxButtons.events({
  'click [data-action=btn-save]': function( event ){
    event.preventDefault();
    this.save();
  },
  'click [data-action=btn-edit]': function( event ){
    event.preventDefault();
    this.editMode( true );
  },
  'click [data-action=btn-cancel]': function( event ){
    event.preventDefault();
    this.revert();
    this.editMode( false );
  }
});

var dxArrayDep = new Tracker.Dependency;

Template.dxArray.helpers({
  instances: function(){
    dxArrayDep.depend();
    return this.model[ this.field ];
  },
  _dxParent: function( parent ){
    Object.defineProperty( this, "_dxParent", {
      value: parent.model[ parent.field ],
      writable: true,
      enumerable: false
    })
  }
});

Template.dxArray.events({
  'click [data-action=btn-add]': function( event, template ){
    event.preventDefault();
    event.stopPropagation();
    template.data.model[ template.data.field ].push( new template.data.model._model[ template.data.field ][0].newInstance );
    dxArrayDep.changed();
  },
  'click [data-action=btn-remove]': function( event, template ){
    event.preventDefault();
    event.stopPropagation();
    template.data.model[ template.data.field ] = _.without( template.data.model[ template.data.field ], this );
    dxArrayDep.changed();
  }

})
