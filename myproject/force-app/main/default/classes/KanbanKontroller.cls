public class KanbanKontroller {
	@AuraEnabled
    public static List<Task__c> getTasks(Id RecordId){
        return [SELECT Id, Name, Project__c, Project__r.Name, Priority__c, Status__c, Participant__r.User__r.MediumPhotoUrl, Participant__r.User__r.Name, Start_Date__c, End_Date__c, Overdue__c FROM Task__c WHERE Project__c = :RecordId];
    }
    
    @AuraEnabled
    public static void updateTasks(String taskdesc, String TaskId){
        Id daId = Id.valueOf(TaskId);
        Task__c tasktoUpdate = [SELECT Id, Status__c FROM Task__c WHERE Id = :daId];
        tasktoUpdate.Status__c = taskdesc;
        update tasktoUpdate;
    }
    
    @AuraEnabled
    public static void updatedaTask(Task__c taske){
        update taske;
    }
    
    @AuraEnabled
    public static void deleteTask(Task__c taske){
        List<Task_Followup__c> followups = [SELECT Id, Name FROM Task_Followup__c WHERE MasterTask__c = :taske.Id];
        Task__c tasktodel = [SELECT Id, Name FROM Task__c WHERE Id = :taske.Id ];
        delete followups;
        delete tasktodel;
    }
    
    @AuraEnabled
    public static List<Task_Followup__c> getFollowups(Task__c task){
        return [SELECT Id, Name FROM Task_Followup__c WHERE MasterTask__c = :task.Id];
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
                Participant__r.User__R.Name,
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