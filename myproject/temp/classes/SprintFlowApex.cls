public class SprintFlowApex {
	@InvocableMethod
    public static void keepOneActive(List<Sprint__c> Sprints){
        List<Id> inputIds = new List<Id>();
        for(Sprint__c sprint : Sprints){
            inputIds.add(sprint.Id);
        }
        List<Sprint__c> otherActiveSprints = [SELECT Id, Name, Status__c FROM Sprint__c WHERE NOT(Id IN :inputIds)];
        for(Sprint__c activeSprint : otherActiveSprints){
            if(activeSprint.Status__c == 'Active'){
                activeSprint.Status__c = 'Inactive';
            }
        }
        if(otherActiveSprints.size() > 0){
            update otherActiveSprints;
        }
    }
}