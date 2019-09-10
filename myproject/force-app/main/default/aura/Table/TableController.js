({
	doInit: function(component,event, helper) {
		component.set('v.columns', [
            {label: 'Name', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_self'}},
            {label: 'Created by', fieldName: 'Creator', type: 'text'},
            {label: 'Type', fieldName: 'Rctype', type: 'text'}
        ]);//Set data types in datatable
        helper.getData(component,event,helper);
	},
    createNewProject: function(component,event, helper) {
        //Call the default create record action
        var createProject = $A.get("e.force:createRecord");
        createProject.setParams({
        	"entityApiName": "Project__c"
    	});
        createProject.fire();
    },
    //For pagination
    next: function (component, event, helper) {
        helper.next(component, event);
    },
    previous: function (component, event, helper) {
        helper.previous(component, event);
    },
    handleChange: function (cmp, event) {
        // This will contain the string of the "value" attribute of the selected option
        var selectedOptionValue = event.getParam("value");
        cmp.set('v.cboxvalue',selectedOptionValue);
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
      // Set isModalOpen attribute to false
      component.set("v.isModalOpen", false);
       //Create a new record with prefilled Fields
       var createProject = $A.get("e.force:createRecord");
        createProject.setParams({
        	"entityApiName": "Project__c",
            "recordTypeId": component.get('v.cboxvalue') //The only option to choose record type is through Id
    	});
        createProject.fire();
   },
    
})