
let party = { 
  democrats: [],
  republicans: [],
  independents: [] 
};

function statFill (member) {

    partFill(member);
    statistics["number_of_democrats"] = party.democrats.length;
    statistics["number_of_republicans"] = party.republicans.length;
    statistics["number_of_independents"] = party.independents.length;
    statistics["democrats_vote_with_party"] = votesWithParty("democrats");
    statistics["republicans_vote_with_party"] = votesWithParty("republicans");
    statistics["independents_vote_with_party"] = votesWithParty("independents");
    statistics["members_often_not_vote_with_party"] = vote("least","party",member);
    statistics["members_often_vote_with_party"] = vote("most","party",member);
    statistics["members_missed_most_vote"] = vote ("most","member",member);
    statistics["members_missed_least_vote"] = vote ("least","member",member);
  }


function partFill (data) {
      data.filter(data=> {
        if (data.party === "D") party.democrats.push(data)
        else if (data.party === "R") party.republicans.push(data)
        else party.independents.push(data)
      })
}


function votesWithParty (part){
    let result;
    if (part === "democrats"){
        result = (party.democrats.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_democrats"]);
    } else if (part === "republicans"){
      result =  (party.republicans.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_republicans"]); 
    }  else if (part === "independents"){
      result =  (party.independents.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_independents"]);
    } 
    return result;
}

// function vote --> type = "most"/"least", vote = "party"/"member"
function vote (type, vote, data){
  let time = data.length * 0.1,
    tempData=[...data],
      result = [], i=0, 
      voteType = vote === "party" ? "votes_with_party_pct" : "missed_votes_pct"; 
    
    tempData.sort ((a,b)=> type === "least" ? a[voteType] - b[voteType] : b[voteType] - a[voteType])
   
    while(i <= time ){
    result.push(tempData[i])
      while (i>=time && tempData[i][voteType] === tempData[i+1][voteType]) {
        i++;
        result.push(tempData[i]);
        if (tempData[i][voteType]  != tempData[i+1][voteType] ) break;
      }
    i++;
  }
    return result;
}



