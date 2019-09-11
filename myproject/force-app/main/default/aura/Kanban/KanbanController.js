({
	doInit : function(component, event, helper) {
		helper.getData(component,event,helper);
	},
    allowDrop: function(component, event, helper) {
        event.preventDefault();//For safety
    },
    
    drag: function (component, event, helper) {
        event.dataTransfer.setData("text", event.target.id);//data named text
    },
    drop: function (component, event, helper) {//set task status after dropping
        event.preventDefault();
        component.set('v.error','');//Delete error message
        var data = event.dataTransfer.getData("text");
        var tar = event.target;
        while(tar.tagName != 'ul' && tar.tagName != 'UL')
            tar = tar.parentElement; //parent element = the ul
        tar.appendChild(document.getElementById(data));//data-Pick-Val = kanban statuses
        helper.updateTask(component,event,helper,event.dataTransfer.getData("text"),tar.getAttribute('data-Pick-Val'));
        //document.getElementById(data).style.backgroundColor = "#ffb75d";
    },
    hover: function(component,event,helper){
        var idx = event.target.value;
        $A.util.addClass(idx,'orangeColor');//Tried changing the color of component on hover but didnt work

    },
    handleClick: function(component,event, helper) {
        //Create new record
        var createParticipant = $A.get("e.force:createRecord");
        createParticipant.setParams({
        	"entityApiName": "Participant__c"
    	});
        createParticipant.fire();
    },    
    openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      var tar = event.currentTarget;
      var taskid = tar.dataset.taskid;
      //Get the chosen task
      var action = component.get('c.getdaTask');
        action.setParams({
            taskId: taskid
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.selectedTask',response.getReturnValue());
                var action2 = component.get('c.getFollowups');
                action2.setParams({
                    task: component.get('v.selectedTask')
                });
                action2.setCallback(this,function(response){
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set('v.relatedFollowups',response.getReturnValue());
      					component.set("v.isModalOpen", true);
                    }
                })
                $A.enqueueAction(action2);
            }
        })
        $A.enqueueAction(action);
   },
    
    handleDeleteRecord: function(component, event, helper) {
        var del = component.get('c.deleteTask');
        del.setParams({
            taske: component.get('v.selectedTask')
        });
        del.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Task has been deleted"
                });
                toastEvent.fire();
                component.set("v.isModalOpen", false);
                //To create a refresh effect
                helper.getData(component,event,helper);
            }
        })
        $A.enqueueAction(del);
        
        
    },
    
    
    
    newFollowup: function(component, event, helper){
        //Call create record pop-up
        var createProject2 = $A.get("e.force:createRecord");
        createProject2.setParams({
        	"entityApiName": "Task_Followup__c",
            "defaultFieldValues": {
                'MasterTask__c' : component.get('v.selectedTask').Id
            }
    	});
        createProject2.fire();
    },
    
    handleSubmit: function(component,event,helper){
        component.set('v.isModalOpen',false);
        //Update the currently selected task when 'save' is clicked
        var updateAct = component.get('c.updatedaTask');
        updateAct.setParams({
            taske: component.get('v.selectedTask')
        })
        updateAct.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var a = component.get('c.doInit');
        		$A.enqueueAction(a);
            }
        })
        $A.enqueueAction(updateAct);
        
    },
    
    newEvent: function(component,event,helper){
        //Just create a new event
        var createEvt = $A.get("e.force:createRecord");
        createEvt.setParams({
        	"entityApiName": "PEvent__c",
            "defaultFieldValues": {
                'Project__c' : component.get('v.recordId')
            }
    	});
        createEvt.fire();
    }

})