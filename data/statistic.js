let party = { 
      democrats: [],
      republicans: [],
      independents: [] 
    }, lessOftenVote = [];

function partFill (data) {
  

      data.filter(data=> {
        if (data.party === "D") party.democrats.push(data)
        else if (data.party === "R") party.republicans.push(data)
        else party.independents.push(data)
      })
    
      statistics["number_of_democrats"] = party.democrats.length;
      statistics["number_of_republicans"] = party.republicans.length;
      statistics["number_of_independents"] = party.independents.length;

}


function votesWithParty (){

    for(let keys in party){
      if (keys === "democrats"){
      statistics["democrats_vote_with_party"] = (party.democrats.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_democrats"]);
      console.log(statistics["democrats_vote_with_party"])
    } else if (keys === "republicans"){
      statistics["republicans_vote_with_party"] = (party.republicans.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_republicans"]);
      console.log(statistics["republicans_vote_with_party"])
    }  else if (keys === "independents"){
      statistics["independents_vote_with_party"] = (party.independents.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_independents"]);
      console.log(statistics["independents_vote_with_party"])
    } 

    }

}

function leastVote (data){
  let time = data.length * 0.1,
    tempData=[...data],
      result = [], i=0;
    
    tempData.sort ((a,b)=> a.votes_with_party_pct - b.votes_with_party_pct )
    
    while(i <= time ){
    result.push(tempData[i])
    
      while (i>=time && tempData[i].votes_with_party_pct === tempData[i+1].votes_with_party_pct){
        i++;
        result.push(tempData[i]);
        if (tempData[i].votes_with_party_pct != tempData[i+1].votes_with_party_pct) break
      }
   
    i++;
  }
    return result;
}



