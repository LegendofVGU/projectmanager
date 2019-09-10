({
	doInit : function(component, event, helper) {
	},
    handleUploadFinished: function(component,event,helper){
        var uploadedFiles = event.getParam("files");
        component.set('v.file',uploadedFiles.Name);
    },
    addNewPrice : function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Project_Cost__c",
            "defaultFieldValues": {
                'Project__c' : component.get('v.RecordId')
            },
            "panelOnDestroyCallback": function() {
                
            }
        });
        createRecordEvent.fire();
    },
    delet : function(component, event, helper){
        <!-- Delete the whole project -->
        var action = component.get('c.deleteProject');
        action.setParams({
            RecordId: component.get('v.RecordId')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been deleted successfully."
                });
                toastEvent.fire();
                window.close();
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
	},
    callP: function(component,event,helper){
        var p = component.get('v.parent');
        p.refresh();
    }
})