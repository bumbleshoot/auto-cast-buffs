Auto Cast Buffs is an automation script for Habitica that casts stat-buffing skills every 15 mins. The script checks the player's class to determine which skill to cast, and checks the player's mana to determine how many times to cast that skill. The player can configure how much mana they want left over after casting.

## Before Installing
First you must uninstall any scripts that do the same thing(s) as Auto Cast Buffs. For example, if you are running the [Auto Cast Party Buff Skills](https://habitica.fandom.com/wiki/Google_Apps_Script#Auto_Cast_Party_Buff_Skills) script, you need to uninstall it, because Auto Cast Buffs also casts buffs, and these two scripts will conflict with each other. To uninstall a script:
1. Click [here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in. Then click on "My Projects" in the main menu on the left.
2. Click on the script you want to uninstall.
3. Click the blue "Deploy" button near the top of the page, then click "Manage deployments".
4. Click the "Archive" button (looks like a box with a down arrow inside), then click the "Done" button. If the script has no deployments, there will be no archive button, and you will see the message "This project has not been deployed yet". In this case, just click "Cancel".
5. In the main menu on the left, click on "Triggers" (looks like an alarm clock).
6. Hover your mouse over each trigger in the list, click the three dots on the right, and click "Delete trigger".
7. If your script had no deployments, you can skip to the last step. If you clicked the "Archive" button, continue to the next step.
8. Click [here](https://habitica.com/user/settings/api) to open your API Settings. Highlight and copy your User ID (it looks something like this: `35c3fb6f-fb98-4bc3-b57a-ac01137d0847`).
9. Click [here](https://robwhitaker.com/habitica-webhook-editor/) to open the Habitica Webhook Editor. Paste your User ID in the "User ID" box.
10. On the same page where you copied your User ID, click the "Show API Token" button, and copy your API Token.
11. In the Habitica Webhook Editor, paste your API Token in the "API Token" box, then click "Login".
12. Click the "Delete" button next to every webhook that belongs to the script you are uninstalling. The webhook should have a large title that matches the name of the script.
13. Repeat the above steps for every script you need to uninstall.

## Setup Instructions
Make sure you read the [Before Installing](#before-installing) section above, and follow the instructions there if applicable!
1. Click [here](https://script.google.com/d/1zP3Qb7F0HJyyVCMap_Fj_g_UXUAiGHiAZaytmwl5s-CDJ9i3LVKlZ4jC/edit?usp=sharing) to go to the Auto Cast Buffs script. If you're not already signed into your Google account, you will be asked to sign in.
2. In the main menu on the left, click on "Overview" (looks like a lowercase letter i inside a circle).
3. Click the "Make a copy" button (looks like two pages of paper).
4. At the top of your screen, click on "Copy of Auto Cast Buffs". Rename it "Auto Cast Buffs" and click the "Rename" button.
5. Click [here](https://habitica.com/user/settings/api) to open your API Settings. Highlight and copy your User ID (it looks something like this: `35c3fb6f-fb98-4bc3-b57a-ac01137d0847`). In the Auto Cast Buffs script, paste your User ID between the quotations where it says `const USER_ID = "";`. It should now look something like this: `const USER_ID = "35c3fb6f-fb98-4bc3-b57a-ac01137d0847";`
6. On the same page where you copied your User ID, click the "Show API Token" button, and copy your API Token. In the Auto Cast Buffs script, paste your API Token between the quotations where it says `const API_TOKEN = "";`. It should now look something like this: `const API_TOKEN = "35c3fb6f-fb98-4bc3-b57a-ac01137d0847";`
7. Update `RESERVE_MANA` to the amount of mana you want left over after the script casts your buffs for you. Only edit the number in between the `=` and the `;`.
8. Click the "Save project" button near the top of the page (looks like a floppy disk).
9. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "install" from the drop-down.
10. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".

You're all done! If you need to change the settings or uninstall the script at some point, follow the steps below.

## Changing the Settings
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in.  Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Cast Buffs".
3. Update `RESERVE_MANA` to the amount of mana you want left over after the script casts your buffs for you. Only edit the number in between the `=` and the `;`.
4. Click the "Save project" button near the top of the page (looks like a floppy disk).

## Uninstalling the Script
1. [Click here](https://script.google.com/home) to see a list of your scripts. If you're not already signed into your Google account, click the "Start Scripting" button and sign in.  Then click on "My Projects" in the main menu on the left.
2. Click on "Auto Cast Buffs".
3. Click the drop-down menu to the right of the "Debug" button, near the top of the page. Select "uninstall" from the drop-down.
4. Click the "Run" button to the left of the "Debug" button. Wait for it to say "Execution completed".

## Updating the Script
1. Follow the steps in [Uninstalling the Script](#uninstalling-the-script) above.
2. In the main menu on the left, click on "Overview" (looks like a lowercase letter i inside a circle).
3. Click the "Remove project" button (looks like a trash can).
4. Follow the [Setup Instructions](#setup-instructions) above.

## Contact
:grey_question: Questions: [https://github.com/bumbleshoot/auto-cast-buffs/discussions/categories/q-a](https://github.com/bumbleshoot/auto-cast-buffs/discussions/categories/q-a)  
:bulb: Suggestions: [https://github.com/bumbleshoot/auto-cast-buffs/discussions/categories/suggestions](https://github.com/bumbleshoot/auto-cast-buffs/discussions/categories/suggestions)  
:lady_beetle: Report a bug: [https://github.com/bumbleshoot/auto-cast-buffs/issues](https://github.com/bumbleshoot/auto-cast-buffs/issues)  
:heartpulse: Donate: [https://github.com/sponsors/bumbleshoot](https://github.com/sponsors/bumbleshoot)