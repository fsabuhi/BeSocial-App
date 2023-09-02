async function getAudioLink(word) {
  try {
    word = word.toString().toLowerCase();
    //let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { method: 'GET' });
    let response = await fetch(
      `https://api.freedictionary.dev/api/v2/entries/en/${word}`,
      { method: "GET" }
    );
    var responseJson = await response.json();
    for await (var i of responseJson){
      if (i["phonetics"].length != 0){
        var uri = i["phonetics"][0]["audio"];
        console.log(uri)
        break;
      }
      else{
        var uri = ''
      }
    }
    return uri;
  } catch (error) {
    alert(JSON.stringify(error));
    console.error(error);
  }
}
export default getAudioLink;
