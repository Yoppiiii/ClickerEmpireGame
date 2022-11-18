const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
}

class User {
    constructor(name, age, days, money, items){
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.clickCount = 0;
        this.incomePerClick = 25;
        this.incomePerSec = 0;
        this.stock = 0;
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
    static startTimer(user){
        let days = user.days;
        setInterval(function(){
            days++;
            user.days = days;
            if(user.days % 365 == 0){
                user.age++; 
                View.updateUserInfo(user);
            } else{
                View.updateUserInfo(user);
            }
        },1000)
    }

    static getTotalPrice(userItems, input){
        let total = 0;
        input = Number(input);
        if(userItems.name == "ETF Stock"){
            for(let i = 0; i < input; i++){
                total += parseInt(userItems.price * Math.pow(1+userItems.perRate, i))
            }
            return total;
        } else if(input > 0 && input % 1 == 0) return total += userItems.price * input;
        else return total;
    }

    static puchaseItems(user, num, countInput){
        if(countInput <= 0 || countInput % 1 != 0){
            alert("Invalid Number");
        } else if(this.getTotalPrice(user.items[num], countInput) > user.money){
            alert("You don't have enough money.");
        } else if(user.items[num].currentAmount + countInput > user.items[num].maxAmount && user.items[num].type != "investment"){
            alert("You can't buy anymore");
        } else {
            user.money -= this.getTotalPrice(user.items[num], countInput);
            user.items[num].currentAmount += Number(countInput);
            if(user.items[num].name == "ETF Stock"){
                user.stock += this.getTotalPrice(user.items[num], countInputt);
                user.items[num].price = this.calculateEtfStockPrice(user.items[num], countInput);
                this.updateUserIncome(user, user.items[num], countInput);
            } else if(user.items[num].name == "ETF Bonds"){
                user.stock += this.getTotalPrice(user.items[num], countInput);
                this.updateUserIncome(user, user.items[num], countInput);
            } else this.updateUserIncome(user, user.items[num], countInput);
        }
    }

    static calculateEtfStockPrice(item, countInput){
        return parseInt(item.price * Math.pow(1 + item.perRate, countInput));
    }

    static updateUserIncome(user, items, countInput){
        countInput = Number(countInput);
        if(items.type == "ability"){
            user.incomePerClick += items.perMoney * countInput;
        } else if(items.type == "investment"){
            user.incoPerSec += user.stock * items.perRate;
        } else if(items.type == "realState"){
            user.incomePerSec += items.perMoney * countInput;
        }
    }
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
        let container = document.createElement("div");
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
        container.querySelectorAll("#burgerStatus")[0].append(View.createBugerStatus(user));
        container.querySelectorAll("#userInfo")[0].append(View.createUserInfo(user));
        container.querySelectorAll("#displayItems")[0].append(View.createItemPage(user));

        return container;
    }

    static createBugerStatus(user){
        let container = document.createElement("div");
        container.innerHTML =
        `
            <div class="text-center bg-navy">
                <h5>${user.clickCount} Burgers</h5>
                <p>one click ¥25</p>
            </div>
            <div class="p-2 pt-5 d-flex justify-content-center">
                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width=80% class="py-2 hover img-fuid" id="burger">
            </div>
        `

        let burgerStatus = container.querySelectorAll("#burger")[0];
        burgerStatus.addEventListener("click", function(){
            Controller.updateByClickBurger(user);
        })

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
                    <p>¥${user.money}</p>
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
                <div class="d-sm-flex align-items-center m-1 selectItem bg-navy" id="itemPage">
                    <div class="d-none d-sm-block p-1 col-sm-3">
                        <img  src=${user.items[i].url} class="py-2 img-fluid">
                    </div>
                    <div class="col-sm-9">
                        <div class="d-flex justify-content-between">
                            <h4>${user.items[i].name}</h4>
                            <h4>${user.items[i].currentAmount}</h4>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p>¥ ${user.items[i].price}</p>
                            <p class="text-success">¥${View.displayItemIncome(user.items[i], user.items[i].type)}</p>
                        </div>
                    </div>        
                </div>  
            `
            let items = container.querySelectorAll("#itemPage");
            for(let i = 0; i < items.length; i++){
                items[i].addEventListener("click", function(){
                    Controller.movePurchasePage(user, i);
                });
            }
        }
        return container;
    }

    static createPurchasePage(user, num){
        let container = document.createElement("div");
        container.innerHTML=
        `
        <div class="p-2 m-1 bg-navy" id="purchasePage">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h4>${user.items[num].name}</h4>
                    <p>Max purchases: ${View.displayMaxPurchase(user.items[num].maxAmount)}</p>
                    <p>Price ¥${user.items[num].price}</p>
                    <p>Get ¥${View.displayItemIncome(user.items[num], user.items[num].type)}</p>
                </div>
                <div class="p-2 d-sm-block col-sm-5">
                    <img  src=${user.items[num].url} class="py-2 img-fluid">
                </div>
            </div>
            <p>How many would you like to buy?</p>
            <input type="number" placeholder="0" class="col-12 form-control">
            <p class="text-right" id="totalPrice">total: ¥0</p>
            <div class="d-flex justify-content-between pb-3">
                <button class="btn btn-outline-primary col-5 bg-light" id="back">Go Back</button>
                <button class="btn btn-primary col-5" id="purchase">Purchase</button>
            </div>
        </div>
        `

        let countInput = container.querySelectorAll("input")[0];
        countInput.addEventListener("input", function(){
            container.querySelectorAll("#totalPrice")[0].innerHTML=
            `
            total: ¥${Model.getTotalPrice(user.items[num], countInput.value)}
            `
        })

        let backBtn = container.querySelectorAll("#back")[0];
        backBtn.addEventListener("click", function(){
            View.updateMainPage(user);
        })

        let purchaseBtn = container.querySelectorAll("#purchase")[0];
        purchaseBtn.addEventListener("click", function(){
            Model.puchaseItems(user, num, countInput.value);
            View.updateMainPage(user);
        })

        return container;
    }

    static displayItemIncome(item, type){
        if(type == "ability") return item.perMoney + "/click";
        else if(type == "investment") return item.perRate + "/sec";
        else return item.perMoney + "/sec";
    }

    static displayMaxPurchase(maxAmount){
        if(maxAmount == -1) return "∞";
        else return maxAmount;
    }

    static updateBurgerPage(user){
        let burgerStatus = config.mainPage.querySelectorAll("#burgerStatus")[0];
        burgerStatus.innerHTML='';
        burgerStatus.append(View.createBugerStatus(user));
    }

    static updateUserInfo(user){
        let userInfo = config.mainPage.querySelectorAll("#userInfo")[0];
        userInfo.innerHTML='';
        userInfo.append(View.createUserInfo(user));
    }

    static updateMainPage(user){
        config.mainPage.innerHTML='';
        config.mainPage.append(View.createMainPage(user));
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
        Model.startTimer(user);
    }

    static updateByClickBurger(user){
        user.clickCount++;
        user.money += user.incomePerClick;
        View.updateBurgerPage(user);
        View.updateUserInfo(user);
    }

    static movePurchasePage(user, num){
        config.mainPage.querySelectorAll("#displayItems")[0].innerHTML='';
        config.mainPage.querySelectorAll("#displayItems")[0].append(View.createPurchasePage(user, num));
    }
}

Controller.startGame();
