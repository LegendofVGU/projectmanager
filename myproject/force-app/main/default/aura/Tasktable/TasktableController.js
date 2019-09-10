({
	doInit : function(component, event, helper) {
		component.set('v.columns', [
            {label: 'Name', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_self'}},
            {label: 'Due Date', fieldName: 'Due Date', type: 'date'}
        ]);
        helper.getData(component,event,helper);
	}
})