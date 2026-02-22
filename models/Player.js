export default class Player{
    constructor(id, name, role){
        this.id = id;
        this.name = name;
        this.role = role;
        this.money = 1000;
        this.shorange = 1;
        this.longrange = 1;
        this.buildings = [];
        this.silos = [];
        this.defenses = [];
        this.saveGame = false;
    }

    addMoney(amount){
        this.money += amount;
    }

    spendMoney(amount){
        if(this.money >= amount){
            this.money -= amount;
            return true;
        }
        return false;
    }

    addBuilding(building){
        this.buildings.push(building);
    }
}