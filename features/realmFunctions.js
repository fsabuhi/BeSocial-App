import { wordSchema, SuperMemoSchema } from "../api/schema.js";
import {
    useApp,
    UserProvider,
    AppProvider,
    useUser,
    RealmProvider,
    useRealm
  } from "@realm/react";

export async function getWords() {
    const realm = useRealm(); 
    const user = useUser();
    const mongodb = user.mongoClient("mongodb-atlas");
    const wordCollection = mongodb.db("BeSocial").collection("words");
    var searchResult = await wordCollection.find();
    if (searchResult.length > 0){
    realm.write(() => {
      for (const word of searchResult) {
        realm.create('word', word, "modified");
      }
    });
}}


export async function getSuperMemo() {
    const realm = useRealm(); 
    const user = useUser();
    const mongodb = user.mongoClient("mongodb-atlas");
    const wordCollection = mongodb.db("BeSocial").collection("SuperMemo");
    var searchResult = await wordCollection.find({'user':user.id});
      // console.log(user.id);
      // console.log(user.customData['level']);
      // console.log(searchResult);  
    if (searchResult.length > 0){
    realm.write(() => {
      for (const SuperMemo of searchResult) {
        realm.create("SuperMemo", SuperMemo, "modified");

      }
    });
    
  }}

export async function sync() {
    const realm = useRealm();
    const user = useUser();
    const mongodb = user.mongoClient("mongodb-atlas");
    const SuperMemoCollection = mongodb.db("BeSocial").collection("SuperMemo");
    await SuperMemoCollection.insertMany(realm.objects('SuperMemo'))

}



