public class participantsController {
	@AuraEnabled
    public static List<Participant__c> getParticipants(Id RecordId){
        return [SELECT Id, Name, User__r.Name, User__r.Id, User__r.MediumPhotoUrl, User__r.Email, User__r.Phone FROM Participant__c WHERE Project__r.Id = :RecordId];
    }
    
    @AuraEnabled
    public static List<Project_Cost__c> getPrices(Id RecordId){
        return [SELECT Id, Name, Price__c FROM Project_Cost__c WHERE Project__r.Id = :RecordId];
    }
    
    @AuraEnabled
    public static List<ContentDocument> getDocs(Id RecordId){
        List<ContentDocumentLink> linklst = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :RecordId];
        List<Id> linkIds = new List<Id>();
        for(ContentDocumentLink link : linklst){
            linkIds.add(link.ContentDocumentId);
        }
        return [Select Id ,Title from ContentDocument Where ID In :linkIds];
    }
    
    @AuraEnabled
    public static List<Task__c> getTasks(Id RecordId){
        return [SELECT Id, Name, Project__c,
                Project__r.Name, Priority__c, Status__c,
                Sprint__c, Participant__r.User__r.MediumPhotoUrl,
                Participant__r.User__r.Name, Start_Date__c, Overdue__c,
                End_Date__c FROM Task__c WHERE Project__c = :RecordId];
    }
    
    public static void zzz(){
        User a = [SELECT Name, Alias, ReceivesAdminInfoEmails, MediumPhotoUrl FROM User];
    }
    @AuraEnabled
    public static Participant__c getdaParticipant(String parId){
        Id daId = Id.valueOf(parId);
        return [SELECT Id, Name, User__r.Name, User__r.Email, User__r.Phone FROM Participant__c WHERE Id = :daId];
    }
    
    @AuraEnabled
    public static void delPar(Participant__c par){
            delete par;
    }
    
    public class DataSet{
        public DataSet(String label ,Integer count){
            this.label  = label ; 
            this.count = count ;
        }
        @AuraEnabled
        public String label {get;set;}
        @AuraEnabled
        public Integer  count {get;set;}
        
        
    }
}