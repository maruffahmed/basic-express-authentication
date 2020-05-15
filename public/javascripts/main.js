var goBack = document.querySelector("#go-back");
if(goBack){
    goBack.addEventListener("click",function(){
        var prevPath = document.referrer;
        if(prevPath.length > 0){
            window.location = prevPath;
        }else{
            window.location = '/';
        }
        
    })
}
