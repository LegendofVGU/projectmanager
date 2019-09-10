({
	activateSprint : function(component,event,helper) {
		var action = component.get('c.activateSprinte');//Activate the sprint
        action.setParams({
            Sprint: component.get('v.sprint'),
            Startdate: component.get('v.sprint').Start_Date__c,
            Enddate: component.get('v.sprint').End_Date__c
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been activated successfully."
                });
                toastEvent.fire();
                component.set('v.isModalOpen2',false);
                var p = component.get("v.parent");
                p.refresh();
    			p.refresh2();
            }
            else if(state === "ERROR"){
                var errors = response.getError();
                if (errors) {
                if (errors[0] && errors[0].message) {
                component.set("v.error",errors[0].message );//Fetching Custom Message.
                        }
                }
                else {
                component.set("v.error", 'Request Failed!' );
                }
            }
        })
        $A.enqueueAction(action);
	}
})