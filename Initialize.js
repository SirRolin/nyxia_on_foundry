import {nyxia} from "./module/config.js";
import NyxiaActors from "./module/sheets/Character.js";
import {CharacterData} from "./module/sheets/Character.js";

Hooks.once("init", function() {
  console.log("Nyxia Classless | Initializing");

  // Assign data model to chatacter sheets
  CONFIG.Actor.dataModels.character = CharacterData;

  // get configs
  CONFIG.nyxia = nyxia;

  // Initiative
  CONFIG.Combat.initiative = {
        formula: "1d20 + @initiative * 1.01",
        decimals: 2
    };

  // Resources that can be bars and values
  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: ["damageTaken", "stamina"],
      value: ["initiative"]
    }
  };

  Actors.unregisterSheet("core", foundry.appv1?.sheets?.ActorSheet);
  Actors.registerSheet("player", NyxiaActors, {makeDefault: true});
})