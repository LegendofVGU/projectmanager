({
	getResponse: function(component) {
        var eventArr = [];//only getting events
                var action2 = component.get("c.getEvents");
                action2.setParams({
                    RecordId: component.get('v.recordId')
                })
                    action2.setCallback(this, function(response) {
                        var state = response.getState();
                        if (state === "SUCCESS") {
                            var result = response.getReturnValue();
                            console.log("Data: \n" + result);
                            result.forEach(function(key) {
                                eventArr.push({
                                    'id':key.Id,
                                    'start':key.Date__c,
                                    'title':key.Name,
                                    'color':'Red',
                                    'url':'/'+key.Id,
                                });
                            });
                            console.log(eventArr);
                            this.loadCalendar(component,eventArr);
                            
                        } else if (state === "INCOMPLETE") {
                        } else if (state === "ERROR") {
                            var errors = response.getError();
                            if (errors) {
                                if (errors[0] && errors[0].message) {
                                    console.log("Error message: " + errors[0].message);
                                }
                            } else {
                                console.log("Unknown error");
                            }
                        }
                    });
                    $A.enqueueAction(action2);
    },
    
    loadCalendar :function(component, data){   
        var m = moment();
        $('#calendar2').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate: m.format(),
            editable: false,
            navLinks: true, // can click day/week names to navigate views
            weekNumbers: true,
            weekNumbersWithinDays: true,
            weekNumberCalculation: 'ISO',
            editable: false,
            eventLimit: true,
            
            events:data
        });
    },
})