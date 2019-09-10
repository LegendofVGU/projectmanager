public class ClientController2 {
@AuraEnabled
    public static String createClient(Contact client, Id RecordId){
        try{
        Contact a = new Contact(FirstName = client.FirstName,
                                LastName = client.LastName,
                                Email = Client.Email,
                                Phone = Client.Phone);
		Project__c proj = [SELECT Id, Name, Client__c FROM Project__c WHERE Id = :RecordId];
        insert a;
        proj.Client__c = a.Id;
        update proj;
        }
        catch(DmlException e){
            return 'Some error happened';
        }
        return null;
        
    }
    
    @AuraEnabled
    public static List<Contact> findClient(Id ContactId){
        return [SELECT Id, FirstName, LastName, Email, Phone FROM Contact WHERE Id = :ContactId];
        
    }
    
    @AuraEnabled
    public static Project__c getProj(Id RecordId){
        return [SELECT Id, Name, Client__c, Client__r.FirstName, Client__r.LastName, Client__r.Email, Client__r.Phone
                FROM Project__c
                WHERE Id = :RecordId];
    }
    
    @AuraEnabled
    public static void deleteClient(Id deId){
        Contact deClient = [SELECT Id, Name FROM Contact WHERE Id = :deId];
        try{
        delete deClient;
        }
        catch(Dmlexception e){
            throw new AuraHandledException('Error Exception happend: '+e.getDmlMessage(0));
        }
    }
}