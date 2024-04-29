class itemMenu{
    private _opcao:string
    private _textoDaOpcao:string
    constructor(opcao,textoDaOpcao){
        this._opcao = opcao
        this._textoDaOpcao = textoDaOpcao
    }
    get opcao(){
        return this._opcao
    }
    get textoDaOpcao(){
        return this._textoDaOpcao
    }
} 

class Menu{ 
    itemMenu: itemMenu[] = [];

    ImprimirMenu(){
     prompt(`Selecione um dos numeros abaixo para executar a ação\n
        1 - Atacar;\n
        2 - Ataque especial;\n
        3 - Tomar poção de Cura de HP;\n
        4 - tomar poção que restaura MP;\n
        5 - Defender;`)
        
    }
}

class Monstro{
    private _hpDoMonstro:number
    private _ataqueDoMonstro:number
    private _defesaDoMonstro:number
    public constructor(hp, ataque, defesaDoMonstro){
        this._hpDoMonstro=hp
        this._ataqueDoMonstro=ataque
        this._defesaDoMonstro=defesaDoMonstro
    }
    get hpDoMonstro(){
        return this.hpDoMonstro
    }
    get ataqueDoMonstro(){
        return this.ataqueDoMonstro
    }
    get defesaDoMonstro(){
        return this.defesaDoMonstro
    }
    set hpDoMonstro(hp){
        this.hpDoMonstro = hp
    }
    set ataqueDoMonstro(ataque){
        this.ataqueDoMonstro = ataque
    } 
    set defesaDoMonstro(defesa){
        this.defesaDoMonstro = defesa
    }

    public receberDano(danoSofrido: number): void {
        if (this.hpDoMonstro < this.hpDoMonstro * 0.25) {
            danoSofrido = danoSofrido / 2;
            this.ataqueDoMonstro *= 1.10;
            this.defesaDoMonstro *= 1.30;
            if (this.defesaDoMonstro >= danoSofrido) {
               return;
            }
        
        }
        
        this.hpDoMonstro -= danoSofrido - this.defesaDoMonstro;
        if(this.hpDoMonstro <= 0){
            console.log("Monstro derrotado!");
        }
    }
    public ataque():number {
        return this.ataqueDoMonstro;
    }
}   

class Coliseu{
    private _boss: Monstro;
    constructor(boss){
        this._boss = boss;
    }
    get boss(){
        return this._boss
    }
}

class Equipamento{
    private _nome: string;
    private _aumentoDeAtaque: number;
    private _aumentoDeDefesa: number;
    constructor(nome,aumentoDeAtaque,aumentoDeDefesa){
        this._nome = nome;
        this._aumentoDeAtaque = aumentoDeAtaque;
        this._aumentoDeDefesa = aumentoDeDefesa;
    }
    get nome(){
        return this._nome
    } 
    get aumentoDeAtaque(){
        return this._aumentoDeAtaque
    }  
    get aumentoDeDefesa(){
        return this._aumentoDeDefesa
    }  
}




class Lutador{
    private _hpDoLutador: number;
    private _mpDoLutador: number;
    private _ataqueDoLutador: number;
    private _defesaDoLutador:number;
    
    constructor(hpDoLutador,mpDoLutador ,ataqueDoLutador,defesaDoLutador){
        this._hpDoLutador=hpDoLutador;
        this._mpDoLutador = mpDoLutador;
        this._ataqueDoLutador = ataqueDoLutador;
        this._defesaDoLutador = defesaDoLutador;  
    }
    get hpDoLutador(){
        return this._hpDoLutador
    }
    get mpDoLutador(){
        return this._mpDoLutador
    }
    get ataqueDoLutador(){
        return this._ataqueDoLutador
    }
    get defesaDoLutador(){
        return this._defesaDoLutador
    }
    set hpDoLutador(hp){
        this.hpDoLutador = hp
    }
    set mpDoLutador(mp){
        this.mpDoLutador = mp
    }
    set ataqueDoLutador(ataque){
        this.ataqueDoLutador = ataque
    }
    set defesaDoLutador(defesa){
        this.defesaDoLutador = defesa
    }

    public equipar(equipamento: Equipamento): void{
        this.ataqueDoLutador += equipamento.aumentoDeAtaque;
        this.defesaDoLutador += equipamento.aumentoDeDefesa;
    }
    
    public exibirInfoLutador(): void{
        console.log(`HP: ${this.hpDoLutador}\nMP: ${this.mpDoLutador}\nAtaque: ${this.ataqueDoLutador}\nDefesa: ${this.defesaDoLutador}`);
    }
    public ataque(): number{
        return this.ataqueDoLutador;
    }
    public ataqueEspecial(): number {
        if (this.mpDoLutador <= 0) {
            console.log("MP insuficiente");
        }else{
            this.ataqueDoLutador *= 0.50;
            this.mpDoLutador -= this.mpDoLutador * 0.25;
        }
        return this.ataqueDoLutador;
    }
    public receberDano(danoSofrido):number{
        if (this.defesaDoLutador >= danoSofrido) {
            return this.hpDoLutador;
        }   
        return this.hpDoLutador = this.hpDoLutador - (danoSofrido-this.defesaDoLutador);
    }
    public tomarPocaoHp(): number{
        this.hpDoLutador *= 1.25;
        return this.hpDoLutador;
    }
    public tomarPocaoMp(): number{
        this.mpDoLutador *= 1.25;
        return this.mpDoLutador;
    }
}

class Jogo{   
    menu: Menu;
    lutador: Lutador;
    coliseu: Coliseu;
    constructor(lutador, coliseu){
        this.lutador = lutador;
        this.coliseu = coliseu;
    }
    jogar(): void {
        while (true) {
            this.menu.ImprimirMenu();
            const escolha = String(this.menu.ImprimirMenu());
            
            switch (escolha) {
                case "1":
                    this.coliseu.boss.receberDano(this.lutador.ataque());
                    break;
                    case "2":
                        this.coliseu.boss.receberDano(this.lutador.ataqueEspecial());
                        break;
                        case "3":
                            this.lutador.tomarPocaoHp();
                            break;
                            case "4":
                                this.lutador.tomarPocaoMp();
                    break;
                    default:
                        console.log("Opção inválida..... tente de novo");
                        break;
                    }
                    
                    if (this.coliseu.boss.hpDoMonstro <= 0) {
                        console.log("Parabéns, você venceu a luta do coliseu!");
                break;
            } else if (this.lutador.hpDoLutador <= 0) {
                console.log("Você foi destroçado pelo monstro...");
                break;
            }
        }
    }
}
    
const coroaDoRei = new Equipamento("Coroa do Rei", 10, 20);
const tiaraDeElf = new Equipamento("Tiara de Elf", 5, 10);
const capaceteViking = new Equipamento("Capacete Viking", 15, 25);
const bandanaDeNinja = new Equipamento("Bandana de Ninja", 8, 15);
const mascaraDeFalcao = new Equipamento("Máscara de Falcão", 12, 18);   
const chapeuDeMago = new Equipamento("Chapéu de Mago",20, 300); 
const diademaDeSacerdotisa = new Equipamento("Diadema de Sacerdotisa", 25, 35); 
const elmoDeValquiria = new Equipamento("Elmo de Valquiria", 30, 40);

const equipamentosParaCabeca: Equipamento[] = [ 
    coroaDoRei,tiaraDeElf,capaceteViking,bandanaDeNinja,mascaraDeFalcao,chapeuDeMago,diademaDeSacerdotisa,elmoDeValquiria
];

const armaduraDePecoPeco = new Equipamento("Armadura de PecoPeco", 15, 30);
const vestidoDeFada = new Equipamento("Vestido de Fada", 10, 15);
const cotaDeCouro = new Equipamento("Cota de Couro", 20, 35);
const armaduraDePlatina = new Equipamento("Armadura de Platina", 25, 40);
const vestimentaDeBatalha = new Equipamento("Vestimenta de Batalha", 30, 45);
const mantoDeAdepto = new Equipamento("Manto de Adepto", 35, 50);
const mantoDeValquiria = new Equipamento("Manto de Valquíria", 40, 55);
const armaduraDeOssos = new Equipamento("Armadura de Ossos", 45, 60);

const equipamentosParaCorpo: Equipamento[] = [
    armaduraDePecoPeco,vestidoDeFada,cotaDeCouro,armaduraDePlatina,vestimentaDeBatalha,mantoDeAdepto,mantoDeValquiria,armaduraDeOssos
];

const machadoDeGuerra = new Equipamento("Machado de Guerra", 30, 0);
const arcoDeCaca = new Equipamento("Arco de Caça", 25, 5);
const varinhaMagica = new Equipamento("Varinha Mágica", 40, 10);
const cajadoDaVida = new Equipamento("Cajado da Vida", 35, 15);
const lancaDoDestino = new Equipamento("Lança do Destino", 45, 5);
const foiceDoInferno = new Equipamento("Foice do Inferno", 50, 20);
const marteloDoTrovao = new Equipamento("Martelo do Trovão", 60, 10);
const bestaDePrecisao = new Equipamento("Besta de Precisão", 55, 25);


const equipamentoArma: Equipamento[] = [
    machadoDeGuerra,arcoDeCaca,varinhaMagica,cajadoDaVida,lancaDoDestino,foiceDoInferno,marteloDoTrovao,bestaDePrecisao
];
