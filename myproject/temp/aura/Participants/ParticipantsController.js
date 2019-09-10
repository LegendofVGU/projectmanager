({
	doInit: function(component,event, helper) {
		helper.getData(component,event,helper);
	},
    handleClick: function(component,event, helper) {
        //Call salesforce create record action
        var createParticipant = $A.get("e.force:createRecord");
        createParticipant.setParams({
        	"entityApiName": "Participant__c",
            "defaultFieldValues": {
                'Project__c': component.get('v.recordId')
            },
            "panelOnDestroyCallback": function(event) {
                helper.getData(component,event,helper);
                //refresh data when panel destroyed
            }
    	});
        createParticipant.fire();
    },
    hover: function(component,event,helper){
        var selectedItem = event.currentTarget;
        var Name = selectedItem.dataset.record;
        component.set('v.aString',Name)
    },
    noHover: function(component,event,helper){
        component.set('v.aString','');
    },
    openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set('v.parTasks',null);
      var tar = event.currentTarget;
      var parid = tar.dataset.parid;
        //Get currently clicked participant
      var action = component.get('c.getdaParticipant');
        action.setParams({
            parId: parid
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.selectedPar',response.getReturnValue());
                var parTasks = component.get('v.parTasks');
                for(var i = 0; i < component.get('v.Tasks').length;i++){
                    
                }
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
    
   delPar: function(component, event, helper) {//Old delete function now used to navigate to default
       											//record page
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get("v.selectedPar").Id
        });
        navEvt.fire();
   }
})