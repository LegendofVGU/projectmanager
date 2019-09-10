({
	doInit : function(component, event, helper) {
		helper.getData(component,event,helper);
	},
    allowDrop: function(component, event, helper) {
        event.preventDefault();
    },
    
    drag: function (component, event, helper) {
        event.dataTransfer.setData("text", event.target.id);
    },
    drag2: function (component, event, helper) {
        event.dataTransfer.setData("text2", event.target.id);
    },
    drop: function (component, event, helper) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var tar = event.target;
        while(tar.tagName != 'ul' && tar.tagName != 'UL')
            tar = tar.parentElement;
        tar.appendChild(document.getElementById(data));
        helper.updateTask(component,event,helper,event.dataTransfer.getData("text"),tar.getAttribute('data-Pick-Val'));
        //document.getElementById(data).style.backgroundColor = "#ffb75d";
    },
    drop2: function (component, event, helper) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text2");
        var tar = event.target;
        while(tar.tagName != 'ul' && tar.tagName != 'UL')
            tar = tar.parentElement;
        tar.appendChild(document.getElementById(data));
        helper.updateTask2(component,event,helper,event.dataTransfer.getData("text2"),tar.getAttribute('data-Pick-Val'));
        //document.getElementById(data).style.backgroundColor = "#ffb75d";
    },
    hover: function(component,event,helper){
        var idx = event.target.value;
        $A.util.addClass(idx,'orangeColor');

    },
    handleClick: function(component,event, helper) {
        var createParticipant = $A.get("e.force:createRecord");
        createParticipant.setParams({
        	"entityApiName": "Participant__c"
    	});
        createParticipant.fire();
    },
    Click2: function(component,event,helper){
        event.stopPropagation();
    },
    
    openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      var tar = event.currentTarget;
      var taskid = tar.dataset.taskid;
      var action = component.get('c.getdaTask');
        action.setParams({
            taskId: taskid
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.selectedTask',response.getReturnValue())
      					component.set("v.isModalOpen", true);
            }
        })
        $A.enqueueAction(action);
   },
  
   closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
   },
  
   submitDetails: function(component, event, helper) {
      // Set isModalOpen attribute to false
      //Add your code to call apex method or do some processing
      component.set("v.isModalOpen", false);
   },
    
    newTask: function(component, event, helper){
        var createProject = $A.get("e.force:createRecord");
        createProject.setParams({
        	"entityApiName": "Task__c",
            "recordTypeId": "0122v0000017FTEAA2",
            "defaultFieldValues": {
                'Project__c' : component.get('v.recordId')
            }
    	});
        createProject.fire();
    },
    newSprint: function(component, event, helper){
        var sprintlstsize = component.get('v.Sprints').length;
        component.set('v.lstsize',sprintlstsize);
        var action2 = component.get('c.newSprinte');
        action2.setParams({
            RecordId: component.get('v.recordId'),
            num: component.get('v.lstsize')
        });
        action2.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var init = component.get('c.doInit');
                $A.enqueueAction(init);
            }
        })
        $A.enqueueAction(action2);
    },
    completeSprint: function(component, event, helper){
        var action3 = component.get('c.completeSprinte');
        action3.setParams({
            Sprinte: component.get('v.activeSprint')
        });
        action3.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been updated successfully. Please refresh."
                });
                toastEvent.fire();
                var init21 = component.get('c.callParentRefresh');
                $A.enqueueAction(init21);
                var init22 = component.get('c.doInit');
                $A.enqueueAction(init22);
            }
        })
        $A.enqueueAction(action3);
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
                var init211 = component.get('c.callParentRefresh');
                $A.enqueueAction(init211);
                var init222 = component.get('c.doInit');
                $A.enqueueAction(init222);
            }
        })
        $A.enqueueAction(del);
    },
    
    
    handleSubmit: function(component,event,helper){
        component.set('v.isModalOpen',false);
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
    
    callParentRefresh: function(component, event, helper){
        var callparent = component.get('v.parent');
        callparent.refresh();
    },
    
})