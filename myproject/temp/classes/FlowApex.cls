public class FlowApex {
	@InvocableMethod
    public static List<CollaborationGroup> findGroup(List<Participant__c> Participants){
        List<Id> ParIds = new List<Id>();
        for(Participant__c par : Participants){
            ParIds.add(par.Id);
        }
        List<Participant__c> detailedLst = [SELECT Id, Name, Project__r.Id FROM Participant__c WHERE Id IN :ParIds];
        List<Id> ProjectIds = new List<Id>();
        for(Participant__c proj : detailedLst){
            ProjectIds.add(proj.Project__r.Id);
        }
        List<CollaborationGroupRecord> GroupRecords = [SELECT Id, CollaborationGroupId FROM CollaborationGroupRecord];
        List<Id> GroupIds = new List<Id>();
        for(CollaborationGroupRecord groupre : GroupRecords){
            GroupIds.add(groupre.CollaborationGroupId);
        }
        return [SELECT Id, Name FROM CollaborationGroup WHERE Id IN :GroupIds];
    }
}