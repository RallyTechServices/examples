Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        //Write app code here
        this.buildTreeStoreWithMixedArtifacts();
    },
    getTypePaths: function(){
        return ['TestCase','HierarchicalRequirement','Defect'];
    },
    buildTreeStoreWithMixedArtifacts: function(){

        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: this.getTypePaths(),
            root: {
                expanded: true
            },
            enableHierarchy: true,
            filters: this.getFilters()
        }).then({
            success: this.addGridboard,
            scope: this
        });
    },
    /**
     * This filter will show all user stories and defects that have test cases
     * and any test cases that do not belong to stories at the top level
     * @returns {A WSAPI filter object}
     */
    getFilters: function(){

        var filters = [{
            property: 'WorkProduct',
            operator: '=',
            value: ""
        },{
            property: 'TestCases.ObjectID',
            operator: '>',
            value: 0
        }];
        return Rally.data.wsapi.Filter.or(filters);
    },
    addGridboard: function(store){
        var context = this.getContext();

        this.add({
            xtype: 'rallygridboard',
            context: context,
            gridConfig: {
                store: store,
                storeConfig: {
                    filters: this.getFilters()
                },
                columnCfgs: ['Name'],
                showPagingToolbar: true
            },
            plugins: [
                'rallygridboardaddnew',
                {
                    ptype: 'rallygridboardcustomfiltercontrol',
                    filterControlConfig: {
                        modelNames: this.getTypePaths(),
                        stateful: true,
                        stateId: context.getScopedStateId('custom-filter-example')
                    },
                    showOwnerFilter: false
                },{
                    ptype: 'rallygridboardfieldpicker',
                    headerPosition: 'left',
                    modelNames: this.getTypePaths(),
                    stateful: true,
                    stateId: context.getScopedStateId('columns-example')
            }],
            modelNames: this.getTypePaths(),
            height: this.getHeight()
        });
    }
});
