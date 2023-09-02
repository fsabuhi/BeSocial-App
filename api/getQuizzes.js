
async function getquizzes () {
    const x = await mongodb.db('BeSocial').collection('SuperMemo').find({'user':user.id,'interval':0});
   setquizzes(x);
  } 
  async function getWordData(){
    const x = await mongodb.db('BeSocial').collection('words').findOne({'word':word});
    return x;
  }