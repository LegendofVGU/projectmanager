public class deleteApex {
	@InvocableMethod
    public static void delFollowup(List<Task_Followup__c> Taske)
    {
        
        delete Taske;
   }
}