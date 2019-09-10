({
	getData : function(component,event,helper) {
        component.set('v.Sprints',null);
        component.set('v.activeSprint',null);
		var action = component.get('c.getSprints2');
        action.setParams({
            RecordId: component.get('v.recordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
        		component.set('v.inactiveSprints',[]);
                component.set('v.Sprints',[]);
                component.set('v.Sprints',response.getReturnValue());
                var inactiveSprints = component.get('v.inactiveSprints');
                for(var i = 0; i < component.get('v.Sprints').length; i++){
                    var status = component.get('v.Sprints')[i].Status__c
                    if(status == 'Active'){
                        component.set('v.activeSprint',component.get('v.Sprints')[i]);
                    }
                    else if(status == 'Inactive'){
                        inactiveSprints.push(component.get('v.Sprints')[i]);
                    }
                }
                component.set('v.inactiveSprints',inactiveSprints);
            }
        })
        $A.enqueueAction(action);
	},
    
    updateTask : function(component,event,helper,updateId,updatedetail){
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
    },
    
    updateTask2 : function(component,event,helper,updateId,updatedetail){
        var updateAction = component.get('c.updateTasks2');
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