({
	getData : function(component,event,helper) {
        //Call controller action
		var action = component.get('c.getProjects');
        action.setCallback(this,function(response){
            //Check response's status
            var state = response.getState();
            if (state === "SUCCESS") {
                var pageSize = component.get('v.pageSize');
                
                var data = response.getReturnValue();//get a list of projects
                data.forEach(function(data){
                    try{
                        data['linkName']="/" + data.Id;//Add data to datatable by setting temporary fields
                        data['Creator']=data.CreatedBy.Name;
                        data['Rctype'] = data.RecordType.Name;
                    }catch(e){}
                })
                component.set("v.data", data);
                component.set("v.totalRecords", component.get("v.data").length);
                component.set('v.total',component.get('v.data.length'));
                // set star as 0
                component.set("v.startPage",0);
                
                component.set("v.endPage",pageSize-1);
                var PaginationList = [];//Only show records in current page
                for(var i=0; i< pageSize; i++){
                    if(component.get("v.data").length> i)
                        PaginationList.push(response.getReturnValue()[i]);    
                }
                component.set('v.PaginationList', PaginationList);
                //Nested action
                var action2 = component.get('c.getRcTypeIds');
                action2.setCallback(this,function(response){
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        //Populate the combobox choices
                        var items = [];
                        component.set('v.lstIds',response.getReturnValue());
                        items.push({'label': 'Agile','value': component.get('v.lstIds')[0]});
                        items.push({'label': 'Kanban','value': component.get('v.lstIds')[1]});
                        component.set('v.options',items);
                    }
                })
                $A.enqueueAction(action2);
            }
        })
        $A.enqueueAction(action);
	},
    next : function(component, event){
        var sObjectList = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++){
            if(sObjectList.length > i){
                Paginationlist.push(sObjectList[i]);
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    previous : function(component, event){
        var sObjectList = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                Paginationlist.push(sObjectList[i]);
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
})