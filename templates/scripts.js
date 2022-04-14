function onOff(){
    document
        .querySelector("#modal")
            .classList
            .toggle("hide")
    document
        .querySelector("body")
        .classList
        .toogle("hideScroll")
    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")

}

document
    .querySelector("button.fat")
    .addEventListener("click",function(){
        document
                window.scrollTo({
                top:0,
                behavior: 'smooth'
            })
            
    })
