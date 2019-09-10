public class setWorkHour {
	@InvocableMethod
    public static void setWH(List<Sprint__c> sprints){//method to be called by process builder
        List<Id> sprIds = new List<Id>();
        for(Sprint__c sprint : sprints){
            sprIds.add(sprint.Id);
        }
        List<Sprint__c> fullsprints = [SELECT Id, Name, Start_Date__c, End_Date__c, FinishDate__c, WorkHours__c FROM Sprint__c WHERE Id IN: sprIds];
        for(Sprint__c sprint : fullsprints){
            sprint.EstHours__c = Decimal.valueOf((sprint.End_Date__c.getTime() - sprint.Start_Date__c.getTime())/3600000);
            sprint.WorkHours__c = Decimal.valueOf((sprint.FinishDate__c.getTime() - sprint.Start_Date__c.getTime())/3600000);
        }
        update fullsprints;
    }
}