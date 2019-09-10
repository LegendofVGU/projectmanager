({
	doInit: function(component,event, helper) {
		helper.getData(component,event,helper);
	},
    reloadRC: function(component,event,helper){
        component.find('recordLoaderId').reloadRecord(true) 
    }
})