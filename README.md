# projectmanager installion guide
-----------
Requirement: A free or paid Salesforce dx account at https://developer.salesforce.com/platform/dx, Visual Studio Code with the Salesforce Extension (Salesforce CLI). Other code editors (Eclipse, etc) with a Salesforce CLI tool should work too, but they are not tested on this project.
-----------
Step 1: Move to the myproject folder with Visual Studio Code

Step 2: Authenticate with the Salesforce dx org: sfdx force:auth:web:login -d -a myhuborg

Step 3: Create a scratch org: sfdx force:org:create -s -f config/project-scratch-def.json -a  myscratchorg

Step 4: Push code to scratch org: sfdx force:source:push

Step 5: Assign the permission set to the current user: sfdx force:user:permset:assign -n projectmanager

Step 6: Open the scratch org: sfdx force:org:open

Step 7: Launch the application "Project Manager" from the app selection on the top of the Lightning Experience page.

-----------
Notes: 
+ The application is not available in Salesforce Classic. In the first time logging in to the Salesforce dx account, the user should change press "Switch to the Lightning Experience" immediately if they are in Salesforce Classic.
+ Most of the project's code is in myproject/force-app/main/default, categorized into Aura Components, Classes, Custom Objects, etc. Out of those only the Components, controllers, Automated Processes and Custom Objects mentioned in the thesis are relevant.
+ The user can contact the email cs2015_quan.lh@student.vgu.edu.vn for an account with the Administrator profile in the main subdomain  https://superlegendofvgu-dev-ed.lightning.force.com. Both versions of the apps are the latest version. The code is available there too.
