({
	getData : function(component,event,helper) {
        //Get list of all participants attached to project
		var action = component.get('c.getParticipants');
        action.setParams({
            RecordId: component.get('v.recordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.participants',response.getReturnValue());
            }
        })
        $A.enqueueAction(action);
	}
})