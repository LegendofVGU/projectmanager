({
    doInit: function(component,event, helper) {
        var channelOptions = 
          component
          .get("v.participants")
          .map(function(participant) { return { value: participant.Id, label: participant.Name } });
        component.set("v.participantOptions", channelOptions);//For comobobox use
	},
    openModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", true);
   },
	closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
   },
    submitDetails: function(component, event, helper) {
      var inputField = component.find('newtask');
      var value = inputField.get('v.value');
      if(value != ''){
          var newTask = component.get("v.newTask");
          helper.createExpense(component, newTask);//check if field is empty
      }
      else{
        inputField.set('v.validity', {valid:false, badInput :true});
        inputField.showHelpMessageIfInvalid();
            
        }
   },
})