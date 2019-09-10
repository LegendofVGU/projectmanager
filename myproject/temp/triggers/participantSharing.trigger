trigger participantSharing on Participant__c (after insert) {
    List<Participant__c> parLst = new List<Participant__c>();
    List<Project__Share> projShare = new List<Project__Share>();//Salesforce define sharing by share objects
    for(Participant__c par : trigger.new){
        if(par.User__c != UserInfo.getUserId()){//Cause a crash if the condition is not used
            Project__Share share = new Project__Share();
            share.ParentId = par.Project__c;
            share.UserOrGroupId = par.User__c;
            share.AccessLevel = 'edit';
            projShare.add(share);
        }
    }
    insert projShare;
}