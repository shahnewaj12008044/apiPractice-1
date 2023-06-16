const loadCountries = () =>{
    fetch('https://restcountries.com/v3.1/all ')
     .then(res => res.json())
      .then(data => showDetails(data.slice(0,5)));
}
const showDetails = (info) =>{
    info.forEach(country => {
        console.log(country.region);
       const cardContainer = document.getElementById('info');
       const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl p-5">
            <div class="card-body">
                 <h2 class="font-bold text-2xl">${country.name.common}</h2>
                    <h3 class='text-2xl'>${country.region}</h3>
             </div>
         <figure><img src="${country.flags.png}" alt="Shoes" /></figure>
        </div>
        `
        cardContainer.appendChild(div);

    });

}
const loadFullCountries = () =>{
    fetch('https://restcountries.com/v3.1/all ')
     .then(res => res.json())
      .then(data => showDetails(data));
}

loadCountries();