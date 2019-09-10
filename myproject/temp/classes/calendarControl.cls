public class calendarControl {
	@AuraEnabled
    public static List<Task__c> getTasks(){
        List<Task__c> result =  [Select Id, Name,End_Date__c, Start_Date__c,LastModifiedDate from Task__c ];
        return result ; 
    } 
    
    @AuraEnabled
    public static List<PEvent__c> getEvents(){
        List<PEvent__c> result =  [Select Id, Name, Date__c from PEvent__c ];
        return result ; 
    } 
}