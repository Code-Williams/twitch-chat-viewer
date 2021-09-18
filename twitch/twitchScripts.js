let autoScroll = true

var messageShower = document.getElementById("messageShower");
var statusButton = document.getElementById("showMessageButton");
var inputChannelName = document.getElementById('nameInput');
var autoStatusButton = document.getElementById("autoScrollButton");
var cookies = document.cookie.split('; ')
console.log(cookies)
for(const i of cookies){
    console.log("Checking cookie")
    if(i.startsWith('channelName')){
        console.log('Founded')
        const lastChannelName = i.replace('channelName=', '')
        inputChannelName.value = lastChannelName
    }
}

statusButton.addEventListener('click', function(){

    var channelName = inputChannelName.value;
    if(channelName !== ""){
        var channelNameCookie = document.cookie = `channelName=${channelName}`;
        console.log(`Cookie saved : ${channelNameCookie}`)
        const client = new tmi.Client({
            connection: {
                secure: true,
                reconnect: true
            },
            channels: [`${channelName}`]
        });
        
        client.connect();
        
        client.on('message', (channel, tags, message, self) => {
            console.log(tags)
            var messageStyleHolder = document.createElement("li")
            messageShower.appendChild(messageStyleHolder);  
            try{
                if("vip" in tags.badges){
                    
                    var vipImage = document.createElement("img")
                    messageStyleHolder.appendChild(vipImage);
                    vipImage.src = "../Images/vip.png"
                    vipImage.style.float = "left"
                    vipImage.style.borderRadius = "2px"
                    vipImage.style.backgroundColor = "rgb(224,5,185)"
                    vipImage.style.marginRight = "5px"
                    vipImage.style.userSelect = "none"

                }
            }catch{

            }
            if(tags.mod){
                messageStyleHolder.style.backgroundColor = "#004705";
                messageStyleHolder.style.background = 'url("../Images/backgroundIcons.png") no-repeat #004705'
                messageStyleHolder.style.backgroundPosition = "right"
            }else if (tags.subscriber){
                messageStyleHolder.style.backgroundColor = "#39265e"
            }else{
                messageStyleHolder.style.backgroundColor = "#2b1d47";
            }
            

            var newMessage = document.createElement("div")
            messageStyleHolder.appendChild(newMessage);
            newMessage.innerHTML = `${tags['display-name']}:`;
            newMessage.style.color = `${tags.color}`;
            newMessage.style.float = "left";
            var messagePlace = document.createElement("p")
            messagePlace.innerHTML = `${message}`
            messagePlace.style.color = `white`
            messagePlace.style.marginRight = "10px"
            messagePlace.classList.add('persianFont')
            newMessage.appendChild(messagePlace);
            
            if (autoScroll == true){
                messageStyleHolder.scrollIntoView({behavior: "smooth"});
            }
        });
        statusButton.style.border = "1px solid green"
        statusButton.innerHTML = "Turn OFF"
        btnStats = true
        statusButton.style.display = "none";
        inputChannelName.style.display = "none";
    }else{
        alert("Please enter your channel name")
    }

});

autoStatusButton.addEventListener('click', function(){
    if(autoScroll == true){
        autoStatusButton.innerHTML = "Auto scroll is OFF";
        autoScroll = false
    }else{
        autoStatusButton.innerHTML = "Auto scroll is ON";
        autoScroll = true
    }
});


// // DISABLE CONTEXT MENU
// document.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

// document.onkeydown = function(e) {
//     if(event.keyCode == 123) {
//        return false;
//     }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//        return false;
//     }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//        return false;
//     }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//        return false;
//     }
//     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//        return false;
//     }
// }