Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    /**
     * artifactType:  the artifact typepath to populate the combobox with
     */
    artifactType: 'portfolioitem/roadmap',

    items: [{
        xtype: 'container',
        itemId: 'artifactSelectorBox',
        padding: 10
    },{
        xtype: 'container',
        itemId: 'selectedArtifactBox',
        padding: 10,
        tpl: '<tpl><b>{FormattedID}: {Name}</b> was selected.</tpl>'
    }],

    launch: function() {
        //Write app code here
        this.addArtifactPicker();
    },

    addArtifactPicker: function(){

        var cb = Ext.create('Rally.ui.combobox.ComboBox',{
            storeConfig: {
                model: this.artifactType,
                /**
                 * the fetch list must contain all the fields that
                 * are required for the filtering and display.
                 */
                fetch: ['FormattedID','ObjectID','Name'],
                remoteFilter: false,
                autoLoad: true
            },
            valueField: 'ObjectID',
            displayField: 'FormattedID',
            width: 300,
            /**
             * listConfig formats the display of the dropdown list.  This template may be different
             * from what is displayed when something is selected.  That is set by the displayTpl (see below)
             */
            listConfig: {
                itemTpl: '{FormattedID}: {Name}'
            },
            /**
             * filterProperties configuration is to allow us to override the type ahead filter to include all
             * elements of our list display (Name and FormattedID)
             *
             * See the required overrides in the Overrides.js file
             */
            filterProperties: ['Name','FormattedID'],
            displayTpl: '<tpl for=".">' +
                '{[values["FormattedID"]]}: {[values["Name"]]}' +
                '<tpl if="xindex < xcount">,</tpl>' +
                '</tpl>'
        });
        cb.on('ready', this.updateArtifact, this);

        /**
         * In the case of this selector, we should use the "select" event becuase
         * the "change" event will trigger everytime a key is entered into the dropdown.
         * The "select" event will only trigger when a selection is made.
         */
        cb.on('select', this.updateArtifact, this);
        this.down('#artifactSelectorBox').add(cb);
    },
    updateArtifact: function(cb){
        if (cb && cb.getRecord()){
            this.down('#selectedArtifactBox').update(cb.getRecord().getData());
        }
    }
});
