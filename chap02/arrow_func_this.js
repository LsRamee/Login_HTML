const relation = {
    name: "Zero",
    friends: ["Nero", "Hero", "Xero"],
    logFriends: function(){
        console.log("logFriends()안에 this =>", this);
        console.log("relation.name => ", this.name);
        this.friends.forEach((friend) => {
            console.log("relation.name in forEach=> ", this.name);
            console.log(friend);
        })
    }
}
relation.logFriends()