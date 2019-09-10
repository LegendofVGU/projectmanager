public class TaskCreatorControl {
	@AuraEnabled
    public static void insertTask(Task__c taske){
        try{
        insert taske;
        }
        catch(DmlException e){
            throw new AuraHandledException('Error Exception happend'+e.getDmlMessage(0));
        }
    }
    
    @AuraEnabled
    public static void insertTaskAgile(Task__c taske){
        taske.Status__c = 'Not Started';
        try{
        	insert taske;
        }
        catch(DmlException e){
            throw new AuraHandledException('Error Exception happend'+e.getDmlMessage(0));
        }
    }
    
    @AuraEnabled
    public static void activateSprinte(Sprint__c Sprint, Date Startdate, Date Enddate){
        Sprint.Status__c = 'Active';
        Sprint.Start_Date__c = Startdate;
        Sprint.End_Date__c = Enddate;
        try{
        update Sprint;
        }
        catch(DmlException e){
            throw new AuraHandledException('Error Exception happend'+e.getDmlMessage(0));
        }
    }
}