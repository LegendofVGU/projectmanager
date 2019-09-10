public class Infocontroller {
	@AuraEnabled
    public static void deleteProject(Id RecordId){
        Project__c proj = [SELECT Id, Name, OwnerId FROM Project__c WHERE Id = :RecordId];
        if(UserInfo.getUserId() == proj.OwnerId){
            List<Task__c> tasks = [SELECT Id, Name FROM Task__c WHERE Project__c = :RecordId];
            List<Sprint__c> sprints = [SELECT Id, Name FROM Sprint__c WHERE Project__c = :RecordId];
            List<Task_Followup__c> followups = [SELECT Id, Name FROM Task_Followup__c WHERE MasterTask__r.Project__c = :RecordId];
            List<Participant__c> participants = [SELECT Id, Name FROM Participant__c WHERE Project__c = :RecordId];
            List<Project_Cost__c> costs = [SELECT Id, Name FROM Project_Cost__c WHERE Project__c = :RecordId];
            try{
                delete followups;
                delete costs;
                delete tasks;
                delete sprints;
                delete participants;
                delete proj;
            }
            catch(Dmlexception e){
                throw new AuraHandledException('Error Exception happend'+e.getDmlMessage(0));
            }
        }
        else{
            throw new AuraHandledException('You are not the owner');
        }
    }
}