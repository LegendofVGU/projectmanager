public class RecipentFlowAction {
	@InvocableMethod
    public static void findGroup(List<PEvent__c> PEvents){
        //Query for emails of related participants then send email to them
        List<Id> evtIds = new List<Id>();
        for(PEvent__c evt : PEvents){
            evtIds.add(evt.Id);
        }
        
        List<PEvent__c> allEvts = [SELECT Id, Name, Project__c, Description__c FROM PEvent__c WHERE Id IN :evtIds];
        List<Id> ProjIds = new List<Id>();
        for(PEvent__c evt : allEvts){
            ProjIds.add(evt.Project__c);
        }
        List<Participant__c> participants = [SELECT Id, User__r.Id, User__r.Email FROM Participant__c WHERE Project__c IN :ProjIds];
        List<String> emails = new List<String>();
        for(Participant__c par : participants){
            emails.add(par.User__r.Email);
        }
        String mess = 'An event ' + allEvts[0].Name + ' is happening right now. Description: ' + allEvts[0].Description__c;
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = emails;
        message.optOutPolicy = 'FILTER';
        message.subject = 'New Event alert';
        message.plainTextBody = mess;
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);
        
        if (results[0].success) 
        {
            System.debug('The email was sent successfully.');
        } else 
        {
            System.debug('The email failed to send: ' + results[0].errors[0].message);
        }
    }
}