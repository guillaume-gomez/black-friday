const productTitleElement = document.querySelector("#fpBulletPointReadMore");

if (productTitleElement) {
    // console.log(productTitleElement, 'ssd')
    //identifier l'appareil
    let product = '';
    let bestPoint = '';
    switch (product){
        case "pc":
            bestPoint = 'Ce magnifique ordinateur contient des minéraux rares polluants et non-utilisable par la suite '
            break;
        default:
            bestPoint = "Un produit qui vous rendra heureux quelques minutes";
            break;
    }
    const additionalInfo = document.createElement("div");
    additionalInfo.textContent = bestPoint;
    productTitleElement.insertBefore(additionalInfo, productTitleElement.firstChild);
}

function messageBeforeCheckout() {
    const text = "Inserer ici un message pour parler que l'addiction au shopping est un probleme";

    const possibleBaskets = document.getElementsByClassName("l-basket-content u-mb-xl");
    if(possibleBaskets.length !== 1) {
        console.error("cannot add a checkout message");
        return;
    }
    const basketDiv = possibleBaskets[0];
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(...["bProductLine", "jsbProductLine",  "jsbProductExpressAction"]);

    cardDiv.innerHTML = `<p class='bProductLineDescTitle'>
        ${text}
    </p>`;

    basketDiv.insertBefore(cardDiv, basketDiv.firstChild);
}

function generateBannerMessage() {
    const possibleBanners = document.getElementsByClassName("overPa1600 c-banner js-banner");

    const bannerMessages = [
        "Un peu d'argent sur votre compte ? On vous aide à le dépenser rapidement !",
        "Besoin d'un objet inutile ? On a la solution pour vous !",
        "Des livraisons quasiment gratuites pour vous. Les gaz à effet de serre sont offerts"
    ]
    const randomBannerMessagesIndex = Math.floor(Math.random() * bannerMessages.length);

    if(possibleBanners.length !== 1) {
        console.error("cannot add a banner message");
        return;
    }
    
    const banner = possibleBanners[0];
    const titleDiv = document.createElement("div");
    titleDiv.style = "font-size: 20px; font-weight: 600; color: black";
    titleDiv.innerHTML = `
        <p>${bannerMessages[randomBannerMessagesIndex]}</p>
    `;
    banner.appendChild(titleDiv);
    
}

function subCarouselMessage() {
    const possibleCarousels = document.getElementsByClassName("c-carousel c-carousel--slideshow js-carousel c-carousel--loaded");

    if(possibleCarousels.length !== 1) {
       console.error("cannot add a carousel message");
        return;
    }

    const text = "super idée de depenser plus pour polluer plus :p ";

    const subCarousel = possibleCarousels[0];
    const titleDiv = document.createElement("div");
    titleDiv.style = "font-size: 20px; color: black";
    titleDiv.innerHTML = `
        <p>${text}</p>
    `;
    subCarousel.appendChild(titleDiv);
}

generateBannerMessage();
messageBeforeCheckout();
subCarouselMessage();
