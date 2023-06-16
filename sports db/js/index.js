const loadPlayer = (Id) =>{
    const searchvalue = document.getElementById('seach-bar').value;
    document.getElementById('spinner').classList.remove('hidden');
    const searchId = Id || searchvalue;

    const URL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchId}`;
    fetch(URL)
     .then(res => res.json())
      .then(data => showPlayerData(data.player))
       .catch(err => console.log(err))
}
const showPlayerData = (players) =>{
    console.log(players);
    document.getElementById("spinner").classList.add('hidden');
    const parent = document.getElementById('container');
    parent.innerHTML = "";
    players.forEach( player => {
        console.log(player);
        const {strPlayer,strThumb,dateBorn,idPlayer} = player;
        
        const div = document.createElement('div');
        div.innerHTML =`<div class="card bg-orange-400 shadow-2xl mb-4" style="height:400px;width:340px">
        <figure class="px-10 pt-10">
          <img src="${strThumb?strThumb:'https://picsum.photos/500/300?random=3'}" alt="Player" class="rounded-xl p-2 img-fluid" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${strPlayer}</h2>
          <p>date of birth:${dateBorn}</p>
          <div class="card-actions">
            <button onclick="singlePlayer(${idPlayer})" class="btn btn-primary">Details</button>
            
          </div>
        </div>
      </div>`
        parent.appendChild(div);
    })
}

const singlePlayer = (Id) =>{
  document.getElementById('spinner-2').classList.remove('hidden');
  document.getElementById('male').classList.add('hidden');
  document.getElementById('female').classList.add('hidden');
  const URL = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${Id}
  `;
  fetch(URL)
   .then(res => res.json())
    .then(data => showPlayerDetails(data.players[0]))
}

const showPlayerDetails = (data) =>{
  document.getElementById('spinner-2').classList.add('hidden');
  console.log(data);
  const {strGender,strFacebook,strDescriptionEN,strInstagram,strPlayer,strThumb} = data;
  const container = document.getElementById('player-details');
  const div = document.createElement('div');
  container.innerHTML = "";
  if(strGender ==="Male"){

    document.getElementById('male').classList.remove('hidden');
  }else{
    document.getElementById('female').classList.remove('hidden')
  };
  
  div.innerHTML =`
  <div class="card card-side bg-base-100 shadow-xl">
  <figure><img src="${strThumb? strThumb:'https://picsum.photos/500/300?random=3'}" alt="Movie"/></figure>
  <div class="card-body">
    <h2 class="card-title">${strPlayer}</h2>
    <p>${strDescriptionEN?strDescriptionEN.slice(0,130):"there is no description available here"}...</p>
    <div class="card-actions justify-end">
    <div class='flex items-center'>
    <i class="fa-brands fa-facebook"></i>
    </div>
      <button class="btn btn-danger">Delete</button>
    </div>
  </div>
</div>
  `;
  container.appendChild(div);

}

loadPlayer('messi');