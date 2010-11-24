/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.DetailForLead = Ext.extend(Mobile.SalesLogix.Activity.DetailBase, {
        //Localization
        companyText: 'company',
        leadText: 'lead',

        //View Properties
        editView: 'activity_edit_for_lead',
        id: 'activity_detail_for_lead',

        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.DetailForLead.superclass.createLayout.apply(this, arguments);

            this.layout = layout.concat([
                {
                    name: 'LeadName',
                    label: this.leadText
                },
                {
                    name: 'AccountName',
                    label: this.companyText
                }
            ]);

            return this.layout;
        }
    });
})();