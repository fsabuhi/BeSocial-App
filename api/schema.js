import Realm from "realm";

export const SuperMemoSchema = {
  name: 'SuperMemo',
  properties: {
    _id: 'objectId?',
    efactor: 'double?',
    interval: 'int?',
    repetition: 'int?',
    user: 'string?',
    word: 'string?',
  },
  primaryKey: '_id',
};


export const wordSchema = {
  name: 'word',
  properties: {
    _id: 'objectId?',
    example: 'string?',
    level: 'string?',
    meaning: 'string?',
    translation: 'string?',
    word: 'string?',
  },
  primaryKey: '_id',
};
