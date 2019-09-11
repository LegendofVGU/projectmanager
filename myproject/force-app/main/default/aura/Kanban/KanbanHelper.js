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
            else if (state === "ERROR"){
                let errors = response.getError();
                let message = 'Unknown error'; // Default error message
                // Retrieve the error message sent by the server
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                component.set('v.error',message);
            }
        })
        $A.enqueueAction(updateAction);
        
    }
})