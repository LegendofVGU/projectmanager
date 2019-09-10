({
	getData : function(component,event,helper) {
        //Get non overdue tasks
		var action = component.get('c.getTasks');
        action.setParams({});
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                
                var data = response.getReturnValue();
                data.forEach(function(data){
                    try{
                        data['linkName']="/" + data.Project__c;
                        data['Due Date']=data.End_Date__c;
                    }catch(e){}
                })
                component.set("v.data", data);
            }
        })
        $A.enqueueAction(action);
	},
})