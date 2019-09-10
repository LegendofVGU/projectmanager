({
	scriptsLoaded : function(component, event, helper) {
		var sprints = component.get('v.Sprints');
        var labelset=[] ;
        var dataset1=[] ;
        var dataset2=[] ;
        sprints.forEach(function(key){
            labelset.push(key.Name);
            dataset1.push(key.EstHours__c);
            dataset2.push(key.WorkHours__c);
        });
        new Chart(document.getElementById("pie-chart"), {
                    type: 'line',
                    data: {
                        labels:labelset,
                        datasets: [{
                            label: "Est Work Hours",
                            backgroundColor: "blue",
                            data: dataset1
                        },
                        {
                            label: "Real Work Hours",
                            backgroundColor: "red",
                            data: dataset2
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Est Work Hours vs Work Hours on Sprints'
                        }
                    }
                });
	}
})