({
    init : function(component, event, helper) {
    var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
    component.set('v.today', today);
    var action2 = component.get('c.getFeeds');
        action2.setParams({
            ProjectId: component.get('v.RecordId')
        });
        action2.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
				component.set('v.Comments',response.getReturnValue());
            }
        });
        $A.enqueueAction(action2);
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
        var action = component.get('c.createFeed');
        action.setParams({
            comment: component.get('v.newComment'),
            ProjectId: component.get('v.RecordId'),
            today: component.get('v.today')
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.isModalOpen", false);
                var init = component.get('c.init');
                $A.enqueueAction(init);

            }
        });
        $A.enqueueAction(action);
   },
})