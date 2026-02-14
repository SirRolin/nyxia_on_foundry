export default class NyxiaActors extends foundry.appv1.sheets.ActorSheet {
  get template() {
    console.log(this.actor.system);
    return `systems/nyxia_on_foundry/templates/actor/${this.actor.type}-sheet.html`;
  };

  getData() {
    const data = super.getData();

    data.config = CONFIG.nyxia;

    return data;
  }
  
}

const {
  HTMLField, SchemaField, NumberField, StringField, FilePathField, ArrayField
} = foundry.data.fields;

export class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      biography: new HTMLField(),
      attributes: new SchemaField({

      }),
      skills: new SchemaField({

      }),
      initiative: new NumberField({ required: true, integer: true, initial: 1}),
      damageTaken: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 50 })
      }),
      stamina: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
      })
      /*// templates for making more
      health: new SchemaField({
        value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
        min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        max: new NumberField({ required: true, integer: true, min: 0, initial: 10 })
      }),
      proficiencies: new SchemaField({
        weapons: new ArrayField(new StringField()),
        skills: new ArrayField(new StringField())
      }),
      crest: new FilePathField({ required: false, categories: ["IMAGE"] }),
      xp: new NumberField({ required: true, integer: true, min: 0, initial: 0 })*/
    };
  }

  static migrateData(source) {
    const attributes = source.attributes ?? {};
    const skills = source.skills ?? {};
    if(source.initiative == null){
      source.initiative = 2;
    }
    if(source.damageTaken == null){
      source.damageTaken = {};
      source.damageTaken.value = 0;
      source.damageTaken.max = 50;
    }
    if(source.stamina == null){
      source.stamina = {};
      source.stamina.value = 0;
      source.stamina.max = 0;
    }
    return super.migrateData(source);
  }
}