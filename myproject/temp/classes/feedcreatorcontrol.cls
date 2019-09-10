public class feedcreatorcontrol {
    @AuraEnabled
    public static List<PComment__c> getFeeds(Id ProjectId){
        return [SELECT Id, Name, Comment__c, Date__c, User__c, User__r.Name FROM PComment__c WHERE Project__c = :ProjectId];
    }
    
	@AuraEnabled
    public static void createFeed(PComment__c comment,Id ProjectId, Date today){
        comment.Project__c = ProjectId;
        comment.Date__c = today;
        comment.User__c = userInfo.getUserId();
        insert comment;
    }
}