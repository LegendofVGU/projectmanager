public class AgileKanbanController2 {
	@AuraEnabled
    public static List<Task__c> getTasks(Id RecordId){
        return [SELECT Id, Name, Project__c, Project__r.Name, Priority__c, Sprint__c, Participant__r.User__r.MediumPhotoUrl, Participant__r.User__r.Name, Start_Date__c, End_Date__c FROM Task__c WHERE Project__c = :RecordId];
    }
    
    @AuraEnabled
    public static void newSprinte(Id RecordId,Integer num){
        Integer nume = num + 1;
        Sprint__c newSpri = new Sprint__c(Name='Sprint ' + nume,Status__c = 'Inactive',Project__c = RecordId);
        insert newSpri;
    }
    
        @AuraEnabled
    public static void updatedaTask(Task__c taske){
        update taske;
    }
    
    @AuraEnabled
    public static void deleteTask(Task__c taske){
        Task__c tasktodel = [SELECT Id, Name FROM Task__c WHERE Id = :taske.Id ];
        delete tasktodel;
    }
    
    @AuraEnabled
    public static void completeSprinte(Sprint__c Sprinte){
        Sprinte.Status__c = 'Finished';
        update Sprinte;
    }
    
    @AuraEnabled
    public static List<Sprint__c> getSprints2(Id RecordId){
        return [SELECT Id, Name, Status__c, EstHours__c, WorkHours__c FROM Sprint__c WHERE Project__c = :RecordId ORDER BY Name];
    }
    
    @AuraEnabled
    public static void updateTasks(String taskdesc, String TaskId){
        Id daId = Id.valueOf(TaskId);
        Task__c tasktoUpdate = [SELECT Id, Status__c FROM Task__c WHERE Id = :daId];
        tasktoUpdate.Status__c = taskdesc;
        update tasktoUpdate;
    }
    
    @AuraEnabled
    public static void updateTasks2(String taskdesc, String TaskId){
        if(taskdesc != null){
            Id daId = Id.valueOf(TaskId);
            Id sprintId = Id.valueOf(taskdesc);
            Task__c tasktoUpdate = [SELECT Id, Sprint__c FROM Task__c WHERE Id = :daId];
            tasktoUpdate.Sprint__c = sprintId;
            update tasktoUpdate;
        }
        else{
            Id daId = Id.valueOf(TaskId);
            Task__c tasktoUpdate = [SELECT Id, Sprint__c FROM Task__c WHERE Id = :daId];
            tasktoUpdate.Sprint__c = null;
            update tasktoUpdate;
        }
    }
    
    @AuraEnabled
    public static Task__c getdaTask(String taskId){
        Id daId = Id.valueOf(TaskId);
        return [SELECT Id, Name,
                Project__c,
                Project__r.Name,
                Priority__c,
                Status__c,
                Participant__r.User__r.MediumPhotoUrl,
                Participant__r.User__r.Name,
                Description__c,
                Start_Date__c,
                End_Date__c FROM Task__c WHERE Id = :daId];
    }
    
    public class KanbanWrap{
        @AuraEnabled
        List<Task__c> Tasks {get;set;}
        @AuraEnabled
        List<String> pickVals {get;set;}
        
        public kanbanWrap(List<Task__c> tasks, List<String> pVals){
            this.Tasks = tasks;
            this.pickVals = pVals;
        }
    }
}