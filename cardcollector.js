async function loadcards() 
{
   let cardTable = document.getElementById("myCards")
   let inEuro=document.getElementById("currency");
   const EURO_CONVERSION = 0.87;
   let priceMultipler;

   if(inEuro.checked){
    priceMultipler=EURO_CONVERSION;
   }
   else{
    priceMultipler = 1;
   }
   
    try {
        const response = await fetch("https://kaybedengenc.github.io/dragonShopping/card.json");
        let cardsJson = await response.json();
        //console.log(cardsJson);
        var cards = cardsJson.map(function(card) {

            var cardToShow = {
                "id" : card.id,
                "name" : card.name,
                "priceUSD" : card.priceUSD,
                "isRare" : card.isRare

            }
            return cardToShow;
        })


    } catch (error) {
        alert(error);
    }

    cardTable.innerHTML = "<tr><td>ID</td><td>Name</td><td>Price</td><td>Is Rare</td></tr>";
    let rareCards= cards.filter(obj=>obj.isRare==true).map(obj=>(
        {
            "id": obj.id,"name": obj.name,"priceUSD": obj.priceUSD,"isRare": obj.isRare
        }
    ));

    let onlyRares = document.getElementById("raresOnly")

    if(onlyRares.checked){
        for(var i=0; i<rareCards.length; i++){
            cardTable.innerHTML += "<tr><td>" + rareCards[i].id + "</td><td>" + rareCards[i].name + "</td><td>" + Math.round(rareCards[i].priceUSD*priceMultipler) + "</td><td>" + rareCards[i].isRare + "</td></tr>";
        }
    }else{
        for(var i=0; i<cards.length; i++){
            cardTable.innerHTML += "<tr><td>" + cards[i].id + "</td><td>" + cards[i].name + "</td><td>" + Math.round(cards[i].priceUSD*priceMultipler) + "</td><td>" + cards[i].isRare + "</td></tr>";
        }

    }
    
}
