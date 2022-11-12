class Model {

}

class View {
    static config = {
        initialPage: document.getElementById("initialPage"),
        mainPage: document.getElementById("mainPage"),
    }

    static createInitialPage(){
        let initialInfo = this.config.initialPage;
        initialInfo.classList.add("vh-100", "bg-dark", "d-flex", "justify-content-center", "align-items-center");
        initialInfo.innerHTML=`
            <div class="bg-white d-felx p-4">
                <h2 class="pb-3">Clicker Empire Game</h2>
                <input type="text" name="userName" class="form-control align-items-center mb-4" placeholder="Your name" required>
                <div class="d-flex justify-content-betwenn pt-2">
                    <div class="col-6 pl-0">
                        <button type="submit" class="col-12 btn btn-primary">New</button>
                    </div>
                    <div class="col-6 pr-0">
                        <button type="submit" class="col-12 btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        `
    }

}

class Controller {
    static startGame(){
        View.createInitialPage();
    }
    
}

Controller.startGame();