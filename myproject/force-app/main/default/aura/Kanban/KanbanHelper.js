({
	getData : function(component,event,helper) {
        //Get all tasks related to project
		var action = component.get('c.getTasks');
        action.setParams({
            RecordId: component.get('v.recordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.Tasks',[]);//Prevent lists multiplying when this function is called many times
                component.set('v.Tasks',response.getReturnValue());
            }
        })
        $A.enqueueAction(action);
	},
    
    updateTask : function(component,event,helper,updateId,updatedetail){
        //update a task's status when dropped into a zone
        var updateAction = component.get('c.updateTasks');
        updateAction.setParams({
            taskdesc: updatedetail,
            TaskId: updateId
        });
        updateAction.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
            }
        })
        $A.enqueueAction(updateAction);
        
    }
})