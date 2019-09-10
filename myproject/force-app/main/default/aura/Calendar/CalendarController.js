({
	afterScriptsLoaded : function(component, event, helper) {
        component.set('v.att','Script loaded')//Check if script really loaded
        helper.getResponse(component);
    },
})