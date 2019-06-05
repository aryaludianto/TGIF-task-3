
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
      if (part.independents)result =  (party.independents.map(dem => dem["votes_with_party_pct"]).reduce((prev, next) => prev + next)/statistics["number_of_independents"]);
      else result = 0;
    } 
    return Math.round(result*100)/100 ;
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




//------------------display the data---------------------

function glanceTab (member) {
  
  while(document.getElementById("atGlance").hasChildNodes())
  {
    document.getElementById("atGlance").removeChild(document.getElementById("atGlance").firstChild);
  }
      member["number_of_total"] = Math.round((member["number_of_democrats"] + member["number_of_republicans"] + member["number_of_independents"]) * 100 )/100,
      member["total_vote_with_party"] = Math.round(((member["democrats_vote_with_party"] + member["republicans_vote_with_party"] + member["independents_vote_with_party"])/3)*100)/100;

      let senTab = document.getElementById("atGlance");
      let textParty = ["Republicans","Democrats", "Independents", "Total"]
    
    textParty.forEach(text => {
      let row = document.createElement("tr");
      let textNice = [text, member[`number_of_${text.toLowerCase()}`], member[`${text.toLowerCase()}_vote_with_party`]]
        
      textNice.forEach(textFill => {
          
          let col = document.createElement("td");
          let text = document.createTextNode(textFill)
          col.appendChild(text)
          return row.appendChild(col)

        })

        return senTab.appendChild(row)

    })
}


function leastLoyalTab (member) {

  while(document.getElementById("leastLoyal").hasChildNodes())
  {
    document.getElementById("leastLoyal").removeChild(document.getElementById("leastLoyal").firstChild);
  }

  let senTab = document.getElementById("leastLoyal");
  let persons = member.members_often_not_vote_with_party

  persons.forEach(person=> {
    let row = document.createElement("tr"),
        text = [fullName = nameVal(person), 
          partyVotes = document.createTextNode(person.total_votes), 
          partyVotesPercs = document.createTextNode(person.votes_with_party_pct)]

        text.forEach(text=> {
          let col =document.createElement("td");
          col.appendChild(text);

          return row.appendChild(col)

        })

        return senTab.appendChild(row);
  })

}

function mostLoyalTab (member) {

  while(document.getElementById("mostLoyal").hasChildNodes())
  {
    document.getElementById("mostLoyal").removeChild(document.getElementById("mostLoyal").firstChild);
  }

  let senTab = document.getElementById("mostLoyal");
  let persons = member.members_often_vote_with_party

  persons.forEach(person=> {
    let row = document.createElement("tr"),
        text = [fullName = nameVal(person), 
          partyVotes = document.createTextNode(person.total_votes), 
          partyVotesPercs = document.createTextNode(person.votes_with_party_pct)]

        text.forEach(text=> {
          let col =document.createElement("td");
          col.appendChild(text);

          return row.appendChild(col)

        })

        return senTab.appendChild(row);
  })

}



function leastEngageTab (member) {

  while(document.getElementById("leastEngagedTab").hasChildNodes())
  {
    document.getElementById("leastEngagedTab").removeChild(document.getElementById("leastEngagedTab").firstChild);
  }

  let senTab = document.getElementById("leastEngagedTab");
  let persons = member.members_missed_most_vote

  persons.forEach(person=> {
    let row = document.createElement("tr"),
        text = [fullName = nameVal(person), 
          partyVotes = document.createTextNode(person.missed_votes), 
          partyVotesPercs = document.createTextNode(person.missed_votes_pct)]

        text.forEach(text=> {
          let col =document.createElement("td");
          col.appendChild(text);

          return row.appendChild(col)

        })

        return senTab.appendChild(row);
  })

}



function mostEngageTab (member) {

  while(document.getElementById("mostEngageTab").hasChildNodes())
  {
    document.getElementById("mostEngageTab").removeChild(document.getElementById("mostEngageTab").firstChild);
  }

  let senTab = document.getElementById("mostEngageTab");
  let persons = member.members_missed_least_vote

  persons.forEach(person=> {
    let row = document.createElement("tr"),
        text = [fullName = nameVal(person), 
          partyVotes = document.createTextNode(person.missed_votes), 
          partyVotesPercs = document.createTextNode(person.missed_votes_pct)]

        text.forEach(text=> {
          let col =document.createElement("td");
          col.appendChild(text);

          return row.appendChild(col)

        })

        return senTab.appendChild(row);
  })

}

//----display data all-------

function dispDataLoyalty () {
  glanceTab(statistics);
  leastLoyalTab(statistics);
  mostLoyalTab(statistics);
}


function dispDataAttendance () {
  glanceTab(statistics);  
  leastEngageTab(statistics);
  mostEngageTab(statistics);
}
