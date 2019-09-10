({
	getData : function(component,event,helper) {
        component.set('v.Tasks',[]);
        component.set('v.allTasks',[]);
        component.set('v.overdueTasks',[]);
        component.set('v.incompleteTasks',[]);
        //Prevent excess records
		var action = component.get('c.getParticipants');
        action.setParams({
            RecordId: component.get('v.recordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.participants',response.getReturnValue());
                var action2 = component.get('c.getTasks');
                action2.setParams({
                    RecordId: component.get('v.recordId')
                });
                action2.setCallback(this,function(response){
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set('v.allTasks',response.getReturnValue());
                        
                        //Putting tasks in groups
                        var Tasks = component.get('v.Tasks');
                        for(var i = 0; i < component.get('v.allTasks').length; i++){
                                    if(component.get('v.allTasks')[i].Overdue__c == false){
                                        Tasks.push(component.get('v.allTasks')[i]);
                    		}
                        }
                        component.set('v.Tasks',Tasks);
                        
                        var overTasks = component.get('v.overdueTasks');
                        for(var i = 0; i < component.get('v.allTasks').length; i++){
                            if(component.get('v.allTasks')[i].Overdue__c == true){
                                  overTasks.push(component.get('v.allTasks')[i]);
                    		}
                        }
                        component.set('v.overdueTasks',overTasks);
                        
                        var incompleteTasks = component.get('v.incompleteTasks');
                        for(var i = 0; i < component.get('v.allTasks').length; i++){
                                    var status = component.get('v.allTasks')[i].Status__c;
                                    if(component.get('v.allTasks')[i].Status__c == 'Completed'
                                       && component.get('v.allTasks')[i].Overdue__c == false){
                                        incompleteTasks.push(component.get('v.allTasks')[i]);
                    		}
                        }
                        component.set('v.incompleteTasks',incompleteTasks);
                        
                        //get uploaded files
                        var action3 = component.get('c.getDocs');
                        action3.setParams({
                            RecordId: component.get('v.recordId')
                        });
                        action3.setCallback(this,function(response){
                            var state = response.getState();
                            if (state === "SUCCESS") {
                                component.set('v.ContentDocuments',response.getReturnValue());
                                
                                var action4 = component.get('c.getPrices');
                                action4.setParams({
                                    RecordId: component.get('v.recordId')
                                });
                                action4.setCallback(this,function(response){
                                    var state = response.getState();
                                    if (state === "SUCCESS") {
                                        component.set('v.Costs',response.getReturnValue());
                                    }
                                })
                                $A.enqueueAction(action4);
                            }
                        })
                        $A.enqueueAction(action3);
                    }
                })
                $A.enqueueAction(action2);
            }
        })
        $A.enqueueAction(action);
	}
})