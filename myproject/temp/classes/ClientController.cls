public class ClientController {
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
    
    
}