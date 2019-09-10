({
	afterScriptsLoaded : function(component, event, helper) {
        component.set('v.att','Script loaded')
        helper.getResponse(component);
    },
    newEvent: function(component,event,helper){
        var createEvt = $A.get("e.force:createRecord");
        createEvt.setParams({
        	"entityApiName": "PEvent__c",
            "defaultFieldValues": {
                'Project__c' : component.get('v.recordId')
            },
            "panelOnDestroyCallback": function(event) {
                $A.get("e.force:navigateToSObject").setParams({
                    recordId: component.get("v.recordId")
                }).fire();
                helper.getResponse(component);
            }
    	});
        createEvt.fire();
    }
})