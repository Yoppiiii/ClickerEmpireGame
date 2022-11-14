const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
}

class User {
    constructor(name, age, days, money,items){
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.items = items;
    }
}

class Items {
    constructor(name, type, currentAmount, maxAmount, perMoney, perRate, price, url){
        this.name = name;
        this.type = type;
        this.currentAmount = currentAmount;
        this.maxAmount = maxAmount;
        this.perMoney = perMoney;
        this.perRate = perRate;
        this.price = price;
        this.url = url;
    }
}

class Model {

}

class View {
    static createInitialPage(){
        let container = document.createElement("div");
        container.classList.add("vh-100", "bg-dark", "d-flex", "justify-content-center", "align-items-center");
        container.innerHTML=`
            <div class="bg-white d-felx p-4">
                <h2 class="pb-3">Clicker Empire Game</h2>
                <input type="text" class="form-control align-items-center mb-4" placeholder="Your name" required>
                <div class="d-flex justify-content-betwenn pt-2">
                    <div class="col-6 pl-0">
                        <button type="submit" class="col-12 btn btn-primary" id="newGame">New</button>
                    </div>
                    <div class="col-6 pr-0">
                        <button type="submit" class="col-12 btn btn-primary" id="login">Login</button>
                    </div>
                </div>
            </div>
        `
        return config.initialPage.append(container);
    }

    static createMainPage(user){
        let container = config.mainPage;
        container.innerHTML=
        `
            <div class="vh-100 d-flex justify-content-center p-md-5 pb-5">
                <div class="bg-navy d-flex p-2 text-white col-md-11 col-lg-10">
                    <div class="col-4 bg-dark p-2" id="burgerStatus">
                    </div>
                    <div class="col-8">
                        <div class="p-1" id="userInfo">
                        </div>
                        <div class="bg-dark mt-2 p-1 overflow-auto flowHeight" id="displayItems">
                        </div>
                    </div>
                </div>
            </div>
        `

        container.querySelectorAll("#burgerStatus")[0].append(View.createBugerStatus());
        container.querySelectorAll("#userInfo")[0].append(View.createUserInfo(user));
        container.querySelectorAll("#displayItems")[0].append(View.createItemPage(user));

        return container;
    }

    static createBugerStatus(){
        let container = document.createElement("div");
        container.innerHTML =
        `
            <div class="text-center bg-navy">
                <h5>0 Burgers</h5>
                <p>one click ¥25</p>
            </div>
            <div class="p-2 pt-5 d-flex justify-content-center">
                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width=80% class="py-2 hover img-fuid" id="burger">
            </div>
        `
        return container;
    }

    static createUserInfo(user){
        let container = document.createElement("div");
        container.innerHTML =
        `
            <div class="d-flex flex-wrap p-1">
                <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
                    <p>${user.name}</p>
                </div>
                <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
                    <p>${user.age} years old</p>
                </div>
                <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
                    <p>${user.days} days</p>
                </div>
                <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
                    <p>¥ ${user.money}</p>
                </div>
            </div>
        `
        return container;
    }

    static createItemPage(user){
        let container = document.createElement("div");
        for(let i = 0; i < user.items.length; i++){
            container.innerHTML +=
            `
                <div class="d-sm-flex align-items-center m-1 selectItem bg-navy">
                    <div class="d-none d-sm-block p-1 col-sm-3">
                        <img  src=${user.items[i].url} class="py-2 img-fluid">
                    </div>
                    <div class="col-sm-9">
                        <div class="d-flex justify-content-between">
                            <h4>${user.items[i].name}</h4>
                            <h4>0</h4>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p>¥ ${user.items[i].price}</p>
                            <p class="text-success">¥${user.items[i].perRate} /click</p>
                        </div>
                    </div>        
                </div>  
            `
        }
        return container;
    }

}

class Controller {
    static startGame(){
        View.createInitialPage();
        let newGameBtn = config.initialPage.querySelectorAll("#newGame")[0];            
        newGameBtn.addEventListener("click", function(){
            let userName = config.initialPage.querySelectorAll("input")[0].value;
            if(userName == ""){
                alert("Please put your name");
            } else{
                let user = Controller.createUserAccount(userName);
                Controller.moveInitialToMain(user);
            }
        })
    }

    static createUserAccount(userName){
        let itemsList = [
            new Items("Flip machine", "ability", 0, 500, 25, 0, 15000, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"),
            new Items("ETF Stock", "investment", 0, -1, 0, 0.1, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
            new Items("ETF Bonds", "investment", 0, -1, 0, 0.07, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
            new Items("Lemonade Stand", "realState", 0, 1000, 30, 0, 30000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
            new Items("Ice Cream Truck", "realState", 0, 500, 120, 0, 100000, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"),
            new Items("House", "realState", 0, 100, 32000, 0, 20000000, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"),
            new Items("TownHouse", "realState", 0, 100, 64000, 0, 40000000, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"),
            new Items("Mansion", "realState", 0, 20, 500000, 0, 250000000, "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"),
            new Items("Industrial Space", "realState", 0, 10, 2200000, 0, 1000000000, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"),
            new Items("Hotel Skyscraper", "realState", 0, 5, 25000000, 0, 10000000000, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"),
            new Items("Bullet-Speed Sky Railway", "realState", 0, 1, 30000000000, 0, 10000000000000, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png")   
        ]
        return new User(userName, 20, 0, 50000, itemsList);
    }

    static moveInitialToMain(user){
        config.initialPage.classList.add("d-none");
        config.mainPage.append(View.createMainPage(user));
    }    
}

Controller.startGame();