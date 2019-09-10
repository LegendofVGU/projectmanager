({
    doInit : function(component,event,helper){  
        helper.getClient(component,event,helper)
    },
	closeModal : function(component, event, helper) {
		var modal = component.find("contactModal");
        var modalBackdrop = component.find("contactModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
	},
    createContact: function(component, event, helper) {
        helper.insertContact(component, event, helper);
        var refresh = component.get('v.doInit');
        $A.enqueueAction(refresh);
    },
    openModal: function(component, event, helper) {
        var modal = component.find("contactModal");
        var modalBackdrop = component.find("contactModalBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");
    },
    dodelete: function(component, event, helper){
        component.set('v.error','here');
        //Delete the client then refresh
        var action = component.get('c.deleteClient');
        action.setParams({
            deId: component.get('v.project').Client__c
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
                helper.getClient(component,event,helper);
            }
            else if(state === "ERROR"){
                var errors = response.getError();
                if (errors) {
                if (errors[0] && errors[0].message) {
                var toastEvent2 = $A.get("e.force:showToast");
                toastEvent2.setParams({
                    "title": "Success!",
                    "message": errors[0].message
                });
                toastEvent2.fire();
                        }
                }
                else {
                component.set("v.error", 'Request Failed!' );
                }
            }
        })
        $A.enqueueAction(action);
    }
})