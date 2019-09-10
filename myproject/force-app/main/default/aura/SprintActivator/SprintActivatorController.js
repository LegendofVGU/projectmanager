({
	openModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen2", true);
   },
	closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen2", false);
   },
    submitDetails: function(component, event, helper) {
        var validExpense = component.find('newtask').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            return validSoFar && inputCmp.get('v.validity').valid;//To check if fields are empty
        }, true);
        // pass error checking
        if(validExpense){
            helper.activateSprint(component,event,helper)
        }
        else{
            component.set('v.error','Invalid input! Please check if your start and end date is logical compared to the project')
        }
   },
})