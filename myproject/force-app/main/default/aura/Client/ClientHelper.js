({
	insertContact : function(component,event,helper) {
		var contact = component.get('v.contact');
        var recId = component.get('v.RecordId');
        //Create a client from the fields filled by the form and set this project's Client to it
        var action = component.get('c.createClient');
        action.setParams({
            client: component.get('v.contact'),
            RecordId: component.get('v.RecordId')
        });
        action.setCallback(this, function(response) {           
            // Getting the state from response
            var state = response.getState();
            if(state === 'SUCCESS') {
                var modal = component.find("contactModal");
                var modalBackdrop = component.find("contactModalBackdrop");
                $A.util.removeClass(modal,"slds-fade-in-open");
                $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
                this.getClient(component,event,helper);
            }
            else if(state === 'ERROR'){
                component.set('v.clicked','Some error happened!!');
            }
        })
        $A.enqueueAction(action)
	},
    
    getClient : function(component,event,helper) {
        //Actually getting full information on the roject
        var action = component.get('c.getProj');
        action.setParams({
            RecordId : component.get('v.RecordId')
        });
        action.setCallback(this, function(response) {           
            // Getting the state from response
            var state = response.getState();
            if(state === 'SUCCESS') {
                component.set('v.project',response.getReturnValue());
            }
            else if(state === 'ERROR'){
            }
        })
        $A.enqueueAction(action)
    }
})