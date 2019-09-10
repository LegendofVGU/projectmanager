({
    doInit: function(component,event, helper) {
        var channelOptions = 
          component
          .get("v.participants")
          .map(function(participant) { return { value: participant.Id, label: participant.Name } });
        component.set("v.participantOptions", channelOptions);//get the participants for user information
	},
    openModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", true);
      component.set('v.error',null);
   },
	closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
   },
    submitDetails: function(component, event, helper) {
      var validExpense = component.find('newtask').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
            var newTask = component.get("v.newTask");
            helper.createExpense(component, newTask);
        }
        else{
        }
   },
})