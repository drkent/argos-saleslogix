define('Mobile/SalesLogix/Views/MainToolbar', [
    'dojo/_base/declare',
    'argos/MainToolbar'
], function(
    declare,
    MainToolbar
) {

    return declare('Mobile.SalesLogix.Views.MainToolbar', [MainToolbar], {
        titleText: 'Sage Saleslogix',
        showTools: function(tools) {
            var hasLeftSideTools;

            if (tools)
            {
                for (var i = 0; i < tools.length; i++)
                {
                    if (tools[i].side == 'left')
                    {
                        hasLeftSideTools = true;
                        break;
                    }
                }
            }

            if (!hasLeftSideTools && tools !== false)
            {
                if (App.getPrimaryActiveView() != App.getView('home'))
                {
                    tools = (tools || []).concat([{
                        id: 'back',
                        place: 'left',
                        fn: this.navigateBack,
                        scope: this
                    },{
                        id: 'home',
                        place: 'left',
                        fn: this.navigateToHomeView,
                        scope: this
                    }]);
                }
            }

            this.inherited(arguments);
        },
        navigateBack: function() {
            ReUI.back();
        },
        navigateToHomeView: function() {
            App.navigateToHomeView();
        }
    });
});