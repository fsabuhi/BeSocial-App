export class SuperMemo {
  constructor(_id,user,word,repetition,efactor,interval) {
    this._id = _id;
    this.user = user;
    this.word = word;
    this.repetition = repetition; //repetition number (times you repeated)
    this.efactor = efactor; // easiness factor
    this.interval = interval; //interval (days)
  }
  reCalculate(user_grade) {
    if (user_grade >= 3) {
      if (this.repetition == 0) {
        this.interval = 1;
      } else if (this.repetition == 1) {
        this.interval = 6;
      } else {
        this.interval = Math.round(this.interval * this.efactor);
      }
      this.repetition += 1;
    } 
    else {
      this.repetition = 0;
      this.interval = 1;
    }
    this.efactor = this.efactor + (0.1 - (5 - user_grade) * (0.08 + (5 - user_grade) * 0.02))
    if (this.efactor < 1.3){
        this.efactor = 1.3
    }
  }
}

