define('Mobile/SalesLogix/Views/Help', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/dom-class',
    'dojo/dom-construct',
    'argos/ErrorManager',
    'argos/Detail',
    'dojo/NodeList-manipulate'
], function(
    declare,
    string,
    domClass,
    domConstruct,
    ErrorManager,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Help', [Detail], {
        //Templates
        errorTemplate: new Simplate([
            '<div data-dojo-attach-point="errorNode" class="panel-validation-summary">',
            '<h2>{%: $.errorText %}</h2>',
            '<ul>',
            '<li>{%: $.errorMessageText %}</li>',
            '</ul>',
            '</div>'
        ]),

        //Localization
        titleText: 'Help',
        errorText: 'Error',
        errorMessageText: 'Unable to load the help document.',

        //View Properties
        id: 'help',
        url: 'help/help.html',
        icon: 'content/images/icons/help_24.png',
        expose: false,

        createToolLayout: function() {
            return this.tools && (this.tools.tbar = []);
        },
        onRequestFailure: function(response, o) {
            domConstruct.place(this.errorTemplate.apply(this), this.contentNode, 'last');
            domClass.remove(this.domNode, 'panel-loading');

            var errorItem = {
                viewOptions: this.options,
                serverError: response
            };
            ErrorManager.addError(this.errorMessageText, errorItem);
        },
        onLocalizedRequestFirstFailure: function(response, o) {
            Sage.SData.Client.Ajax.request({
                url: this.resolveGenericLocalizedUrl(),
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onLocalizedRequestSecondFailure,
                scope: this
            });
        },
        onLocalizedRequestSecondFailure: function(response, o) {
            Sage.SData.Client.Ajax.request({
                url: this.url,
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onRequestFailure,
                scope: this
            });
        },
        onRequestSuccess: function(response, o) {
            this.processContent(response, o);
            domClass.remove(this.domNode, 'panel-loading');
        },
        resolveLocalizedUrl: function() {
            var localizedUrl = string.substitute("help/help_${0}.html", [Mobile.CultureInfo['name']]);
            return localizedUrl;
        },
        resolveGenericLocalizedUrl: function() {
            var languageSpec = Mobile.CultureInfo['name'],
                languageGen = (languageSpec.indexOf('-') !== -1) ? languageSpec.split('-')[0] : languageSpec,
                localizedUrl = string.substitute("help/help_${0}.html", [languageGen]);
            return localizedUrl;
        },
        requestData: function() {
            domClass.add(this.domNode, 'panel-loading');

            Sage.SData.Client.Ajax.request({
                url: this.resolveLocalizedUrl(),
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onLocalizedRequestFirstFailure,
                scope: this
            });
        },
        processContent: function(xhr, o) {
            domConstruct.place(xhr.responseText, this.contentNode, 'last');
        }
    });
});