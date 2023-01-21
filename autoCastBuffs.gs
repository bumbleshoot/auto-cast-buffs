/**
 * Auto Cast Buffs v1.0.2 by @bumbleshoot
 * 
 * See GitHub page for info & setup instructions:
 * https://github.com/bumbleshoot/auto-cast-buffs
 */

 const USER_ID = "";
 const API_TOKEN = "";
 const RESERVE_MANA = 0;
 
/*************************************\
 *  DO NOT EDIT ANYTHING BELOW HERE  *
\*************************************/ 
 
const PARAMS = {
  "headers": {
    "x-api-user": USER_ID, 
    "x-api-key": API_TOKEN,
    "x-client": "35c3fb6f-fb98-4bc3-b57a-ac01137d0847-AutoCastBuffs"
  },
  "muteHttpExceptions": true
};
const GET_PARAMS = Object.assign({ "method": "get" }, PARAMS);
const POST_PARAMS = Object.assign({ "method": "post" }, PARAMS);

const scriptProperties = PropertiesService.getScriptProperties();
 
function install() {
  if (validateConstants()) {
    ScriptApp.newTrigger("castBuffs")
      .timeBased()
      .everyMinutes(15)
      .create();
  }
}
 
function uninstall() {
  for (trigger of ScriptApp.getProjectTriggers()) {
    ScriptApp.deleteTrigger(trigger);
  }
}

function validateConstants() {

  let valid = true;

  if (typeof USER_ID !== "string" || USER_ID == "") {
    console.log("ERROR: USER_ID must equal your Habitica User ID.\n\neg. const USER_ID = \"abcd1234-ef56-gh78-ij90-abcdef123456\";\n\nYour Habitica User ID can be found at https://habitica.com/user/settings/api");
    valid = false;
  }

  if (typeof API_TOKEN !== "string" || API_TOKEN == "") {
    console.log("ERROR: API_TOKEN must equal your Habitica API Token.\n\neg. const API_TOKEN = \"abcd1234-ef56-gh78-ij90-abcdef123456\";\n\nYour Habitica API Token can be found at https://habitica.com/user/settings/api");
    valid = false;
  }

  if (valid) {
    try {
      fetch("https://habitica.com/api/v3/user", GET_PARAMS);
    } catch (e) {
      if (e.stack.includes("There is no account that uses those credentials")) {
        console.log("ERROR: Your USER_ID and/or API_TOKEN is incorrect. Both of these can be found at https://habitica.com/user/settings/api");
        valid = false;
      }
    }
  }

  if (typeof RESERVE_MANA !== "number" || RESERVE_MANA < 0) {
    console.log("ERROR: RESERVE_MANA must be a positive number.\n\neg. const RESERVE_MANA = 0;\n    const RESERVE_MANA = 22.5;");
    valid = false;
  }

  return valid;
}

 /**
 * fetch(url, params)
 * 
 * Wrapper for Google Apps Script's UrlFetchApp.fetch(url, params):
 * https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetchurl,-params
 * 
 * Retries failed API calls up to 2 times & handles Habitica's rate 
 * limiting.
 */
function fetch(url, params) {

  // try up to 3 times
  for (let i=0; i<3; i++) {

    // if rate limit reached
    let rateLimitRemaining = scriptProperties.getProperty("X-RateLimit-Remaining");
    let rateLimitReset = scriptProperties.getProperty("X-RateLimit-Reset");
    if (rateLimitRemaining != null && Number(rateLimitRemaining) < 1) {

      // wait until rate limit reset
      let waitUntil = new Date(rateLimitReset);
      waitUntil.setSeconds(waitUntil.getSeconds() + 1);
      let now = new Date();
      Utilities.sleep(Math.max(waitUntil.getTime() - now.getTime(), 0));
    }

    // call API
    let response;
    let addressUnavailable = 0;
    while (true) {
      try {
        response = UrlFetchApp.fetch(url, params);
        break;

      // if address unavailable, wait 5 seconds & try again
      } catch (e) {
        if (addressUnavailable < 12 && e.stack.includes("Address unavailable")) {
          addressUnavailable++;
          Utilities.sleep(5000);
        } else {
          throw e;
        }
      }
    }

    // store rate limiting data
    scriptProperties.setProperties({
      "X-RateLimit-Reset": response.getHeaders()["x-ratelimit-reset"],
      "X-RateLimit-Remaining": response.getHeaders()["x-ratelimit-remaining"]
    });

    // if success, return response
    if (response.getResponseCode() < 300) {
      return response;

    // if rate limited due to running multiple scripts, try again
    } else if (response.getResponseCode() === 429) {
      i--;

    // if 3xx or 4xx or failed 3 times, throw exception
    } else if (response.getResponseCode() < 500 || i >= 2) {
      throw new Error("Request failed for https://habitica.com returned code " + response.getResponseCode() + ". Truncated server response: " + response.getContentText());
    }
  }
}

/**
 * castBuffs()
 * 
 * If user level > 13, casts the user's class buff 
 * until mana reaches RESERVE_MANA.
 * 
 * Run this function every 15 mins.
 */
function castBuffs() {
  try {

    let user = JSON.parse(fetch("https://habitica.com/api/v3/user", GET_PARAMS)).data;

    if (user.stats.lvl < 13) {
      console.log("User level " + user.stats.lvl + ", cannot cast buffs");
      return;
    }

    let skillName;
    let spellId;
    let manaCost;
    if (user.stats.class == "wizard") {
      skillName = "Earthquake";
      spellId = "earth";
      manaCost = 35;
    } else if (user.stats.class == "rogue") {
      skillName = "Tools of the Trade";
      spellId = "toolsOfTrade";
      manaCost = 25;
    } else if (user.stats.class == "healer") {
      skillName = "Protective Aura";
      spellId = "protectAura";
      manaCost = 30;
    } else {
      skillName = "Valorous Presence"
      spellId = "valorousPresence";
      manaCost = 20;
    }

    let numCasts = Math.floor((user.stats.mp - RESERVE_MANA) / manaCost);

    console.log("Casting " + skillName + " " + numCasts + " time(s)");

    for (let i=0; i<numCasts; i++) {
      fetch("https://habitica.com/api/v3/user/class/cast/" + spellId, POST_PARAMS);
    }

  } catch (e) {
    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      DriveApp.getFileById(ScriptApp.getScriptId()).getName() + " failed!",
      e.stack
    );
    throw e;
  }
}