public class TableController {
	@AuraEnabled
    public static List<Project__c> getProjects() {
        return [SELECT Id, Name, CreatedBy.Name, RecordType.Name FROM Project__c];
    }
    
    @AuraEnabled
    public static List<Id> getRcTypeIds(){
        Id agileId = Schema.SObjectType.Project__c.getRecordTypeInfosByName().get('Agile').getRecordTypeId();
        Id kanbanId = Schema.SObjectType.Project__c.getRecordTypeInfosByName().get('Kanban').getRecordTypeId();
        List<Id> lstId = new List<Id>();
        lstId.add(agileId);
        lstId.add(kanbanId);
        return lstId;
    }
}