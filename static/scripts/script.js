document.addEventListener('DOMContentLoaded', function(){
        //SET active link on menu
        let path = location.pathname;
        let menuLinks = Array.from(document.getElementsByClassName("nav-link"));

        //թիթիզություն, յանմ խի՞ map-ով որ
        menuLinks.map(function(link){
            (link.pathname == path)?link.classList.add("active"):link.classList.remove("active")  

        });
        //End of SET active link on menu
  
    }
);

