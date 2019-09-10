public class CalendarController2 {
	@AuraEnabled
    public static List<Task__c> getTasks(Id RecordId){
        List<Task__c> result =  [Select Id, Name,End_Date__c, Start_Date__c,LastModifiedDate from Task__c Where Project__c = :RecordId
                                 AND Overdue__c = False];
        return result ; 
    } 
    @AuraEnabled
    public static List<PEvent__c> getEvents(Id RecordId){
        List<PEvent__c> result =  [Select Id, Name, Date__c from PEvent__c where Project__c = :RecordId];
        return result ; 
    } 
}