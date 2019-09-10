({
	getResponse: function(component) {
        //Populate calendar with tasks and events
        var action = component.get("c.getTasks");
        var eventArr = [];
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log("Data: \n" + result);
                result.forEach(function(key) {
                    eventArr.push({
                        'id':key.Id,
                        'start':key.Start_Date__c,
                        'title':key.Name,
                        'color':'CadetBlue'
                    });
                    eventArr.push({
                        'id':key.Id,
                        'start':key.End_Date__c,
                        'title':key.Name + ' Due Date',
                        'url':'/'+key.Id,
                        'color':'CadetBlue'
                    });
                });
                
                	var action2 = component.get("c.getEvents");
                    action2.setCallback(this, function(response) {
                        var state = response.getState();
                        if (state === "SUCCESS") {
                            var result = response.getReturnValue();
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
        $A.enqueueAction(action);
    },
    
    //Set calendar settings
    loadCalendar :function(component, data){   
        var m = moment();
        $('#calendar').fullCalendar({
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
            
            events:data //Or the eventArr in the function above
        });
    },
})