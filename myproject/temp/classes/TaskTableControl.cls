public class TaskTableControl {
	@AuraEnabled
    public static List<Task__c> getTasks(){
        //Query for sprint active or not overdue tasks
        Id CurrentUsr = UserInfo.getUserId();
        List<Task__c> bigList = [SELECT Id, Name, Participant__r.User__r.Name, Project__c, End_Date__c FROM Task__c WHERE Status__c != 'Completed'
                AND OverDue__c = False
               	And Participant__r.User__c = :CurrentUsr
                AND Sprint__c = NULL];
        List<Task__c> agileTask = [SELECT Id, Name, Participant__r.User__r.Name, Project__c, End_Date__c FROM Task__c WHERE Status__c != 'Completed'
               	And Participant__r.User__c = :CurrentUsr
                AND Sprint__c != NULL
                AND Sprint__r.Status__c = 'Active'];
        for(Task__c atask : agileTask){
            Date myDate = date.newinstance(atask.Sprint__r.End_Date__c.year(), atask.Sprint__r.End_Date__c.month(), atask.Sprint__r.End_Date__c.day());
            atask.End_Date__c = myDate;
            bigList.add(atask);
        }
        return bigList;
    }
}