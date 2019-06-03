let party = { 
      democrats: [],
      republicans: [],
      independents: [] 
    };

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
  let dem = statistics["number_of_democrats"],
      rep = statistics["number_of_republicans"];

    for(let keys in party){
      if (keys === "democrats"){
      statistics["democrats_vote_with_party"] = (party.democrats.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_democrats"]);
        console.log(statistics["democrats_vote_with_party"])
    } else if (keys === "republicans"){
      statistics["republicans_vote_with_party"] = (party.republicans.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_republicans"]);
      console.log(statistics["republicans_vote_with_party"])
    } 
    }

}



