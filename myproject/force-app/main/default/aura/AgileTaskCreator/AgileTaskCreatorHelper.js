({
	createExpense : function(component, newTask) {
		var action = component.get('c.insertTaskAgile');
        var newTask = component.get('v.newTask');
        newTask.Project__c = component.get('v.recordId');
        component.set('v.newTask',newTask)
        action.setParams({
            taske: component.get('v.newTask')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been created successfully."
                });
                toastEvent.fire();
                component.set('v.isModalOpen',false);
                var p = component.get("v.parent");
    			p.refresh();
            }
        })
        $A.enqueueAction(action);
	}
})