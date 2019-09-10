<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Task_Due_Alert</fullName>
        <description>Task Due Alert</description>
        <protected>false</protected>
        <recipients>
            <field>participant_Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Task_Due_Alert</template>
    </alerts>
    <alerts>
        <fullName>Task_Start_Alert</fullName>
        <description>Task Start Alert</description>
        <protected>false</protected>
        <recipients>
            <field>participant_Email__c</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/task_started</template>
    </alerts>
</Workflow>
